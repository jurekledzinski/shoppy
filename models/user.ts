import { z } from 'zod';

export const UserSchema = z.object({
  _id: z.string().optional(),
  name: z
    .string({
      required_error: 'Name is required',
      invalid_type_error: 'Name must be a text',
    })
    .min(1, { message: 'Name is required' }),
  email: z
    .string({ required_error: 'Email is required' })
    .email({ message: 'Email is invalid' })
    .min(1, { message: 'Email is required' }),
  password: z
    .string({ required_error: 'Password is required' })
    .min(8, { message: 'Password required at least 8 characters' }),
});

export const DeleteUserAccountSchema = UserSchema.pick({ _id: true });
export const LoginUserSchema = UserSchema.pick({ email: true, password: true });
export const ForgetPasswordSchema = UserSchema.pick({ email: true });
export const PasswordSchema = UserSchema.pick({ password: true });
export const UpdateUserProfileSchema = UserSchema.pick({
  name: true,
  email: true,
});

export type UserID = z.infer<typeof DeleteUserAccountSchema>;
export type UserRegister = z.infer<typeof UserSchema>;
export type UserLogin = z.infer<typeof LoginUserSchema>;
export type UserForgetPassword = z.infer<typeof ForgetPasswordSchema>;
export type UserResetPassword = z.infer<typeof PasswordSchema> & {
  token?: string;
};
export type UserUpdateProfile = z.infer<typeof UpdateUserProfileSchema>;
export type UserChangePassword = z.infer<typeof PasswordSchema>;
