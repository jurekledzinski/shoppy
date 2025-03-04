'use server';
import { connectDBAction, getCollectionDb, getSessionData } from '@/lib';
import { errorMessageAction, roundAvergeRate } from '@/helpers';
import { ObjectId } from 'mongodb';
import { Product, Review, ReviewSchema } from '@/models';
import { revalidateTag } from 'next/cache';

export const review = connectDBAction(
  async (prevState: unknown, formData: FormData) => {
    const { token } = await getSessionData();

    const body = Object.fromEntries(formData);
    const fomattedBody = { ...body, rate: parseFloat(body.rate.toString()) };

    const parsedData = ReviewSchema.parse(fomattedBody) as Omit<Review, '_id'>;

    if (!token) return errorMessageAction('Unauthorized');

    const collectionReview = getCollectionDb<Omit<Review, '_id'>>('reviews');
    const collectionProducts =
      getCollectionDb<Omit<Product, '_id'>>('products');

    if (!collectionProducts || !collectionReview)
      return errorMessageAction('Internal server error');

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

    const newRate = roundAvergeRate(averageRate);

    await collectionProducts.updateOne(
      {
        _id: new ObjectId(reviewProductId),
      },
      { $set: { rate: newRate } }
    );

    revalidateTag('get_product_reviews');
    revalidateTag('get_products');

    return { message: 'Review successful', success: true };
  }
);
