import { z, type ZodTypeAny } from "zod";

export interface FieldConfig {
  name: string;
  label: string;
  type: string;
  validation: ZodTypeAny;
  page: number;
  options?: { label: string; value: string }[];
  placeholder?: string;
  description?: string;
  required?: boolean;
}

export const fields: FieldConfig[] = [
  {
    name: "firstName",
    label: "First Name",
    type: "text",
    placeholder: "John",
    description: "Your legal first name",
    validation: z.string().min(1, "First name is required"),
    page: 1,
    required: true,
  },
  {
    name: "lastName",
    label: "Last Name",
    type: "text",
    placeholder: "Doe",
    description: "Your legal last name",
    validation: z.string().min(1),
    page: 1,
    required: true,
  },
  {
    name: "email",
    label: "Email",
    type: "email",
    placeholder: "john@example.com",
    description: "We'll never share your email",
    validation: z.string().email("Invalid email format"),
    page: 1,
    required: true,
  },
  {
    name: "phone",
    label: "Phone Number",
    type: "tel",
    placeholder: "+20 123 456 7890",
    description: "Include country code",
    validation: z
      .string()
      .min(10, "Must be at least 10 digits")
      .regex(/^[0-9+ ]+$/, "Invalid phone format")
      .optional(),
    page: 1,
  },

  {
    name: "address",
    label: "Street Address",
    type: "text",
    placeholder: "123 Main St",
    description: "Your street address",
    validation: z.string().min(1),
    page: 2,
    required: true,
  },
  {
    name: "city",
    label: "City",
    type: "text",
    placeholder: "New York",
    description: "Your city",
    validation: z.string().min(1),
    page: 2,
    required: true,
  },
  {
    name: "zip",
    label: "ZIP Code",
    type: "text",
    placeholder: "12345",
    description: "Your ZIP code",
    validation: z
      .string()
      .min(5, "Must be at least 5 characters")
      .regex(/^\d{5}(-\d{4})?$/, "Invalid ZIP format"),
    page: 2,
    required: true,
  },
  {
    name: "country",
    label: "Country",
    type: "select",
    description: "Select your country of residence",
    validation: z.enum(["EG", "US", "OTHER"], {
      errorMap: () => ({ message: "Please select a country" }),
    }),
    options: [
      { label: "Egypt", value: "EG" },
      { label: "United States", value: "US" },
      { label: "Other", value: "OTHER" },
    ],
    page: 2,
    required: true,
  },

  {
    name: "username",
    label: "Username",
    type: "text",
    placeholder: "johndoe",
    description: "Your unique username",
    validation: z.string().min(3),
    page: 3,
    required: true,
  },
  {
    name: "password",
    label: "Password",
    type: "password",
    placeholder: "••••••••",
    description: "Must be at least 6 characters",
    validation: z.string().min(6),
    page: 3,
    required: true,
  },
  {
    name: "confirm",
    label: "Confirm Password",
    type: "password",
    placeholder: "••••••••",
    description: "Confirm your password",
    validation: z.string().min(6, "Password must be at least 6 characters"),
    page: 3,
    required: true,
  },

  {
    name: "bio",
    label: "Short Bio",
    type: "textarea",
    placeholder: "Tell us about yourself...",
    description: "Max 200 characters",
    validation: z
      .string()
      .max(200, "Maximum 200 characters allowed")
      .optional(),
    page: 4,
  },
  {
    name: "subscribe",
    label: "Subscribe to newsletter",
    type: "checkbox",
    description: "Subscribe to our newsletter",
    validation: z.boolean().optional(),
    page: 4,
  },

  {
    name: "terms",
    label: "Accept Terms & Conditions",
    type: "checkbox",
    description: "Accept our terms and conditions",
    validation: z.literal(true, {
      errorMap: () => ({ message: "You must accept the terms" }),
    }),
    page: 5,
    required: true,
  },
];

export const schema = z
  .object(Object.fromEntries(fields.map((f) => [f.name, f.validation])))
  .superRefine((data, ctx) => {
    if (data.password !== data.confirm) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Passwords do not match",
        path: ["confirm"],
      });
    }
  });

export type FormData = z.infer<typeof schema>;
