import { useFormContext } from "react-hook-form";
import { type FieldConfig } from "../fields";
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
  FormField as FormFieldPrimitive,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

export const FormField: React.FC<{ field: FieldConfig }> = ({ field }) => {
  const form = useFormContext();

  return (
    <FormFieldPrimitive
      {...form}
      name={field.name}
      render={({ field: controllerField, fieldState }) => (
        <FormItem className="space-y-1">
          <FormLabel className="gap-1">
            {field.label}
            {field.required && <span className="text-destructive">*</span>}
          </FormLabel>

          {field.type === "select" ? (
            <Select
              {...controllerField}
              onValueChange={controllerField.onChange}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue
                    placeholder={field.placeholder || `Select ${field.label}`}
                  />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {field.options?.map((o) => (
                  <SelectItem key={o.value} value={o.value}>
                    {o.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          ) : field.type === "textarea" ? (
            <Textarea {...controllerField} placeholder={field.placeholder} />
          ) : field.type === "checkbox" ? (
            <Checkbox
              checked={controllerField.value}
              onCheckedChange={controllerField.onChange}
            />
          ) : (
            <Input
              type={field.type}
              {...controllerField}
              placeholder={field.placeholder}
            />
          )}

          {field.description && (
            <FormDescription>{field.description}</FormDescription>
          )}

          <FormMessage className="text-xs font-medium">
            {fieldState.error?.message}
          </FormMessage>
        </FormItem>
      )}
    />
  );
};
