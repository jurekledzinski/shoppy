'use server';
import { connectDBAction } from '@/lib';
// import { errorMessageAction } from '@/helpers';
import { OrderShippingSchema } from '@/models';

export const shipping = connectDBAction(
  async (prevState: unknown, formData: FormData) => {
    const body = Object.fromEntries(formData);

    console.log('body', body);

    const parsedData = OrderShippingSchema.parse(body);

    console.log('parsedData shipping', parsedData);

    // const collection = getCollectionDb<UserRegister>('users');

    // if (!collection) return errorMessageAction('Internal server error');

    // const user = await collection.findOne<UserRegister>({
    //   email: parsedData.email,
    // });

    // if (user) return errorMessageAction('Email already in use');

    // await collection.insertOne({ ...parsedData });

    return { message: 'Shipping data added successful', success: true };
  }
);
