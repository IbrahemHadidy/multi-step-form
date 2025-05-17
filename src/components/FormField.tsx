import { useFormContext } from "react-hook-form";
import type { FieldConfig } from "../fields";
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
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar"; 
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export const FormField: React.FC<{ field: FieldConfig }> = ({ field }) => {
  const form = useFormContext();

  return (
    <FormFieldPrimitive
      control={form.control}
      name={field.name}
      render={({ field: controllerField, fieldState }) => (
        <FormItem className="space-y-1 flex flex-col">
          <FormLabel className="gap-1">
            {field.label}
            {field.required && <span className="text-destructive">*</span>}
          </FormLabel>

          {field.type === "radio" ? (
            <RadioGroup
              onValueChange={controllerField.onChange}
              value={controllerField.value}
              className="flex flex-col space-y-1"
            >
              {field.options?.map((option) => (
                <div className="flex items-center space-x-2" key={option.value}>
                  <RadioGroupItem value={option.value} id={option.value} />
                  <label htmlFor={option.value} className="text-sm font-medium">
                    {option.label}
                  </label>
                </div>
              ))}
            </RadioGroup>
          ) : field.type === "date" ? (
            <Popover>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {controllerField.value ? (
                      format(controllerField.value, "PPP")
                    ) : (
                      <span>{field.placeholder || "Pick a date"}</span>
                    )}
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={controllerField.value}
                  onSelect={controllerField.onChange}
                  initialFocus
                  disabled={(date) =>
                    date > new Date() || date < new Date("1900-01-01")
                  }
                />
              </PopoverContent>
            </Popover>
          ) : field.type === "select" ? (
            <Select
              {...controllerField}
              onValueChange={controllerField.onChange}
              value={controllerField.value}
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
            <Textarea
              {...controllerField}
              placeholder={field.placeholder}
              maxLength={200}
            />
          ) : field.type === "checkbox" ? (
            <div className="flex items-center gap-2">
              <Checkbox
                checked={controllerField.value}
                onCheckedChange={controllerField.onChange}
              />
              <span className="text-sm">{field.description}</span>
            </div>
          ) : (
            <Input
              type={field.type}
              {...controllerField}
              placeholder={field.placeholder}
            />
          )}

          {field.description && field.type !== "checkbox" && (
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
