'use server';
import { connectDBAction, getCollectionDb } from '@/lib';
import { errorMessageAction, roundAvergeRate } from '@/helpers';
import { getToken } from 'next-auth/jwt';
import { headers } from 'next/headers';
import { ObjectId } from 'mongodb';
import { Product, Review, ReviewSchema } from '@/models';
import { revalidateTag } from 'next/cache';

const secret = process.env.AUTH_SECRET;

export const review = connectDBAction(
  async (prevState: unknown, formData: FormData) => {
    const reviewHeaders = await headers();
    const body = Object.fromEntries(formData);
    const fomattedBody = { ...body, rate: parseFloat(body.rate.toString()) };

    const parsedData = ReviewSchema.parse(fomattedBody) as Omit<Review, '_id'>;

    const token = await getToken({ req: { headers: reviewHeaders }, secret });

    if (!token) return errorMessageAction('Unauthorized');

    const collectionReview = getCollectionDb<Omit<Review, '_id'>>('reviews');

    if (!collectionReview) return errorMessageAction('Internal server error');

    await collectionReview.insertOne({ ...parsedData });

    const reviewProductId = parsedData.productId;

    const productSumRate = await collectionReview
      .aggregate([
        {
          $match: { productId: reviewProductId },
        },
        {
          $group: {
            _id: '$productId',
            totalRate: { $sum: '$rate' },
            amount: { $sum: 1 },
          },
        },
      ])
      .toArray();

    const averageRate = productSumRate[0].totalRate / productSumRate[0].amount;

    const collectionProducts =
      getCollectionDb<Omit<Product, '_id'>>('products');

    if (!collectionProducts) return errorMessageAction('Internal server error');

    const newRate = roundAvergeRate(averageRate);

    await collectionProducts.updateOne(
      {
        _id: new ObjectId(reviewProductId),
      },
      { $set: { rate: newRate } }
    );

    revalidateTag('get_product_reviews');
    revalidateTag('get_product');

    return { message: 'Review successful', success: true };
  }
);
