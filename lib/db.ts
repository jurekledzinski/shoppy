import 'server-only';
import type { NextRequest, NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';
import { errorMessage, transformMessage } from '@/helpers';
import { AppRouteHandlerFn } from 'next/dist/server/route-modules/app-route/module';

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
      const message = transformMessage(error.name);
      return errorMessage(500, message);
    }
  };
};

const getCollectionDb = <T extends object>(name: string) => {
  return db && db.collection<T>(name);
};

export { connectDB, connectDBAuth, db, getCollectionDb };
