import { useState, useEffect, useMemo } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { fields, schema, type FormData } from "./fields";
import { FormField } from "./components/FormField";
import { Stepper } from "./components/Stepper";
import { FormNavigation } from "./components/FormNavigation";
import { CheckCircle, Sun, Moon } from "lucide-react";

export default function App() {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [darkMode, setDarkMode] = useState<boolean>(false);

  // Calculate total steps dynamically
  const totalSteps = useMemo(() => {
    const pages = fields.map((f) => f.page);
    return Math.max(...pages);
  }, []);

  const formContext = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onTouched",
    shouldFocusError: true,
  });

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    const html = document.documentElement;
    html.classList.toggle("dark", !darkMode);
    localStorage.setItem("theme", !darkMode ? "dark" : "light");
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const handleNext = async () => {
    const currentPageFields = fields
      .filter((f) => f.page === currentStep)
      .map((f) => f.name);

    const isValid = await formContext.trigger(currentPageFields);
    if (isValid) setCurrentStep((s) => Math.min(s + 1, totalSteps));
  };

  const handlePrevious = () => setCurrentStep((s) => Math.max(s - 1, 1));

  const handleSubmit = (data: FormData) => {
    console.log("Form Submitted:", data);
    formContext.reset();
    setCurrentStep(1);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 5000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden p-8">
        <button
          onClick={toggleDarkMode}
          className="fixed top-4 right-4 p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          aria-label={`Toggle ${darkMode ? "light" : "dark"} mode`}
        >
          {darkMode ? <Moon /> : <Sun />}
        </button>

        <h1 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
          Multi-Step Form
          <span className="block mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">
            {`Complete your registration in ${totalSteps} simple steps`}
          </span>
        </h1>

        <Stepper totalSteps={totalSteps} currentStep={currentStep} />

        <FormProvider {...formContext}>
          <form
            onSubmit={formContext.handleSubmit(handleSubmit)}
            className="space-y-6"
          >
            <div className="space-y-4">
              {fields
                .filter((f) => f.page === currentStep)
                .map((f) => (
                  <FormField key={f.name} field={f} />
                ))}
            </div>

            <FormNavigation
              currentStep={currentStep}
              totalSteps={totalSteps}
              onNext={handleNext}
              onPrevious={handlePrevious}
              isLastStep={currentStep === totalSteps}
            />
          </form>
        </FormProvider>

        {showSuccess && (
          <Alert className="fixed bottom-4 right-4 w-80 bg-emerald-50 dark:bg-emerald-950 border-emerald-500 dark:border-emerald-400">
            <CheckCircle className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
            <AlertTitle className="text-emerald-800 dark:text-emerald-200 font-semibold">
              Form Submitted Successfully!
            </AlertTitle>
            <AlertDescription className="text-emerald-700 dark:text-emerald-300 mt-2">
              Your registration has been completed. Check the console for
              submitted data details.
              <button
                type="button"
                onClick={() => setShowSuccess(false)}
                className="mt-2 text-emerald-800 dark:text-emerald-200 hover:text-emerald-900 dark:hover:text-emerald-100 underline text-sm block"
              >
                Close this message
              </button>
            </AlertDescription>
          </Alert>
        )}
      </div>
    </div>
  );
}
