import { Button } from "@/components/ui/button";

interface FormNavigationProps {
  currentStep: number;
  totalSteps: number;
  onNext: () => void;
  onPrevious: () => void;
}

export const FormNavigation = ({
  currentStep,
  totalSteps,
  onNext,
  onPrevious,
}: FormNavigationProps) => (
  <div className="flex justify-between gap-4 mt-8">
    {currentStep > 1 && (
      <Button type="button" variant="outline" onClick={onPrevious}>
        Previous
      </Button>
    )}

    <div className="flex-1" />

    {currentStep < totalSteps ? (
      <Button type="button" onClick={onNext}>
        Next
      </Button>
    ) : (
      <Button type="submit" variant="default">
        Submit
      </Button>
    )}
  </div>
);
