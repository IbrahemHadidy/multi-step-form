import { Button } from "@/components/ui/button";

interface FormNavigationProps {
  currentStep: number;
  totalSteps: number;
  onNext: () => void;
  onPrevious: () => void;
  isLastStep: boolean;
}

export const FormNavigation = ({
  currentStep,
  totalSteps,
  onNext,
  onPrevious,
  isLastStep,
}: FormNavigationProps) => (
  <div className="flex justify-between gap-4 mt-8">
    {currentStep > 1 && (
      <Button
        type="button"
        variant="outline"
        onClick={onPrevious}
        aria-label="Previous step"
      >
        Previous
      </Button>
    )}

    <div className="flex-1" />

    {!isLastStep ? (
      <Button
        type="button"
        onClick={onNext}
        aria-label={`Next step (${currentStep} of ${totalSteps})`}
      >
        Next{" "}
        <span className="ml-2 text-sm opacity-75">
          {currentStep}/{totalSteps}
        </span>
      </Button>
    ) : (
      <Button type="submit" variant="default" aria-label="Submit form">
        Submit
      </Button>
    )}
  </div>
);
