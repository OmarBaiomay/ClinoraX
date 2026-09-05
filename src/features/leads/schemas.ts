import { z } from "zod";

export const leadSchema = z.object({
  contactName: z.string().trim().min(2).max(100),
  clinicName: z.string().trim().min(2).max(100),
  phone: z
    .string()
    .trim()
    .min(8)
    .max(20)
    .regex(/^[+0-9\s()-]+$/),
  email: z
    .string()
    .trim()
    .email()
    .optional()
    .or(z.literal("")),
  clinicSize: z.enum(["solo", "small", "multi", "unsure"]),
  message: z.string().trim().max(1000).optional().or(z.literal("")),
  locale: z.enum(["ar", "en"]).default("ar"),
  source: z.string().default("landing-demo"),
});

export type LeadInput = z.infer<typeof leadSchema>;

export const contactSchema = z.object({
  name: z.string().trim().min(2).max(100),
  phone: z
    .string()
    .trim()
    .min(8)
    .max(20)
    .regex(/^[+0-9\s()-]+$/),
  email: z.string().trim().email().optional().or(z.literal("")),
  message: z.string().trim().min(5).max(2000),
  locale: z.enum(["ar", "en"]).default("ar"),
});

export type ContactInput = z.infer<typeof contactSchema>;
