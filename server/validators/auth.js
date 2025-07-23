import { z } from 'zod';

const userSchema = z.object({
  username: z.string().min(3).max(30),
  email: z.string().email(),
  password: z.string().min(8).max(100)
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(100)
});

export const validateRegistration = (data) => {
  return userSchema.parse(data);
};

export const validateLogin = (data) => {
  return loginSchema.parse(data);
};