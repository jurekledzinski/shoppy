import 'server-only';
import { AppRouteHandlerFn } from 'next/dist/server/route-modules/app-route/module';
import { AuthError } from 'next-auth';
import { errorMessage, transformMessage } from '@/helpers';
import { MongoClient } from 'mongodb';
import { z } from 'zod';
import type { NextRequest, NextResponse } from 'next/server';

export type State = {
  message: string;
  success: boolean;
  body?: { email: string; id: string; name: string };
};

if (!process.env.ATLAS_URL) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
}

const url = process.env.ATLAS_URL;

let client: MongoClient;

if (process.env.NODE_ENV === 'development') {
  const globalWithMongo = global as typeof globalThis & {
    _mongoClient?: MongoClient;
  };

  if (!globalWithMongo._mongoClient) {
    globalWithMongo._mongoClient = new MongoClient(url);
  }
  client = globalWithMongo._mongoClient;
} else {
  client = new MongoClient(url);
}

const db = client.db(process.env.DB_NAME);

const connectDB = (
  fn: (req: NextRequest, res: NextResponse) => Promise<unknown> | Promise<void>
) => {
  return async (req: NextRequest, res: NextResponse) => {
    try {
      await client.connect();
      return await fn(req, res);
    } catch (err) {
      const error = err as Error;
      console.log('db normal ----------- ', err);
      const message = transformMessage(error.name);
      return errorMessage(500, message);
    }
  };
};

const connectDBAuth = (
  fn: (
    req: NextRequest,
    ctx: { params?: Record<string, string | string[]> }
  ) => ReturnType<AppRouteHandlerFn>
) => {
  return async (
    req: NextRequest,
    ctx: { params?: Record<string, string | string[]> }
  ) => {
    try {
      await client.connect();
      return await fn(req, ctx);
    } catch (err) {
      const error = err as Error;
      console.log('db auth ----------- ', err);
      const message = transformMessage(error.name);
      return errorMessage(500, message);
    }
  };
};

const connectDBAction = (
  fn: (prevState: unknown, formData: FormData) => Promise<State>
) => {
  return async (prevState: unknown, formData: FormData): Promise<State> => {
    try {
      await client.connect();
      return await fn(prevState, formData);
    } catch (error) {
      console.log('db action ----------- ', error);
      if (error instanceof z.ZodError) {
        return {
          message: 'Incorrect credentials',
          success: false,
        };
      } else if (error instanceof AuthError) {
        if (error.type === 'AccessDenied') {
          return { message: transformMessage(error.type), success: false };
        }

        if (error.type === 'CredentialsSignin') {
          return { message: transformMessage(error.type), success: false };
        }

        return {
          message: 'Authentication failed',
          success: false,
        };
      } else {
        const err = error as Error;
        return { message: err.message, success: false };
      }
    }
  };
};

const getCollectionDb = <T extends object>(name: string) => {
  return db && db.collection<T>(name);
};

export { connectDB, connectDBAuth, db, getCollectionDb, connectDBAction };
