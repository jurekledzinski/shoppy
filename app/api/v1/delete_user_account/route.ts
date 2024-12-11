import 'server-only';
import { auth } from '@/auth';
import { connectDBAuth, getCollectionDb } from '@/lib';
import { errorMessage } from '@/helpers';
import { NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';
import { UserRegister } from '@/models';

export const DELETE = connectDBAuth(
  auth(async (request) => {
    if (!request.auth) return errorMessage(401);

    const userId = request.auth.user.id;

    const collection = getCollectionDb<Omit<UserRegister, '_id'>>('users');

    if (!collection) return errorMessage(500);

    await collection.deleteOne({
      _id: new ObjectId(userId),
    });

    const response = NextResponse.json({
      success: true,
    });

    return response;
  })
);
