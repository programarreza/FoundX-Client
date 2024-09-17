import { z } from "zod";

const registerValidationSchema = z.object({
  name: z.string().min(1, "Please enter your name!"),
  email: z.string().trim().email("Please enter a valid email "),
  mobileNumber: z
    .string()
    .regex(/^\d{11}$/, "Please enter a valid mobile number!"),
  password: z
    .string()
    .trim()
    .min(6, "Password needs to be at lest 6 character "),
});

export default registerValidationSchema;
