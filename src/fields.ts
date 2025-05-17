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
  // Page 1: Basic Information (4 fields)
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
    name: "middleName",
    label: "Middle Name",
    type: "text",
    placeholder: "Middle",
    description: "Your middle name (optional)",
    validation: z.string().optional(),
    page: 1,
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
    name: "dob",
    label: "Date of Birth",
    type: "date",
    description: "Your date of birth",
    validation: z.coerce
      .date()
      .min(new Date("1900-01-01"), "Date is too far in the past")
      .max(new Date(), "Date cannot be in the future"),
    page: 1,
    required: true,
  },

  // Page 2: Contact Information (4 fields)
  {
    name: "email",
    label: "Email",
    type: "email",
    placeholder: "john@example.com",
    description: "We'll never share your email",
    validation: z.string().email("Invalid email format"),
    page: 2,
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
    page: 2,
  },
  {
    name: "gender",
    label: "Gender",
    type: "radio",
    options: [
      { label: "Male", value: "M" },
      { label: "Female", value: "F" },
      { label: "Prefer not to say", value: "NA" },
    ],
    validation: z.enum(["M", "F", "NA"], {
      errorMap: () => ({ message: "Please select a gender" }),
    }),
    page: 2,
    required: true,
    description: "Select your gender",
  },

  // Page 3: Address Information (6 fields)
  {
    name: "address",
    label: "Street Address",
    type: "text",
    placeholder: "123 Main St",
    description: "Your street address",
    validation: z.string().min(1),
    page: 3,
    required: true,
  },
  {
    name: "apartment",
    label: "Apartment/Suite",
    type: "text",
    placeholder: "Apt 4B",
    description: "Apartment, suite, or unit number",
    validation: z.string().optional(),
    page: 3,
  },
  {
    name: "city",
    label: "City",
    type: "text",
    placeholder: "New York",
    description: "Your city",
    validation: z.string().min(1),
    page: 3,
    required: true,
  },
  {
    name: "state",
    label: "State/Province",
    type: "text",
    placeholder: "e.g. California",
    description: "Enter your state or province",
    validation: z.string().min(1, "State/Province is required"),
    page: 3,
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
    page: 3,
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
    page: 3,
    required: true,
  },

  // Page 4: Account Security (4 fields)
  {
    name: "username",
    label: "Username",
    type: "text",
    placeholder: "johndoe",
    description: "Your unique username",
    validation: z.string().min(3),
    page: 4,
    required: true,
  },
  {
    name: "securityQuestion",
    label: "Security Question",
    type: "select",
    options: [
      { label: "What was the name of your first pet?", value: "pet" },
      { label: "What city were you born in?", value: "city" },
      { label: "What was your childhood nickname?", value: "nickname" },
    ],
    validation: z.enum(["pet", "city", "nickname"], {
      errorMap: () => ({ message: "Please select a security question" }),
    }),
    page: 4,
    required: true,
    description: "Choose a security question for account recovery",
  },
  {
    name: "securityAnswer",
    label: "Security Answer",
    type: "text",
    placeholder: "Enter your answer...",
    description: "Answer to your security question",
    validation: z
      .string()
      .min(2, "Answer must be at least 2 characters")
      .max(50, "Answer cannot exceed 50 characters"),
    page: 4,
    required: true,
  },
  {
    name: "password",
    label: "Password",
    type: "password",
    placeholder: "••••••••",
    description: "Must be at least 6 characters",
    validation: z.string().min(6),
    page: 4,
    required: true,
  },
  {
    name: "confirm",
    label: "Confirm Password",
    type: "password",
    placeholder: "••••••••",
    description: "Confirm your password",
    validation: z.string().min(6, "Password must be at least 6 characters"),
    page: 4,
    required: true,
  },

  // Page 5: Additional Info & Agreements (3 fields)
  {
    name: "bio",
    label: "Short Bio",
    type: "textarea",
    placeholder: "Tell us about yourself...",
    description: "Max 200 characters",
    validation: z.string().max(200).optional(),
    page: 5,
  },
  {
    name: "subscribe",
    label: "Subscribe to newsletter",
    type: "checkbox",
    description: "Subscribe to our newsletter",
    validation: z.boolean().optional(),
    page: 5,
  },
  {
    name: "terms",
    label: "Accept Terms & Conditions",
    type: "checkbox",
    description: "Accept our terms and conditions",
    validation: z.literal(true),
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
