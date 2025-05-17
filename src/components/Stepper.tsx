export const Stepper: React.FC<{ totalSteps: number; currentStep: number }> = ({
  totalSteps,
  currentStep,
}) => (
  <div
    className="mb-8"
    role="progressbar"
    aria-valuenow={currentStep}
    aria-valuemax={totalSteps}
  >
    <div className="flex items-center justify-between">
      {Array.from({ length: totalSteps }).map((_, index) => {
        const step = index + 1;
        const isCompleted = step < currentStep;
        const isCurrent = step === currentStep;

        return (
          <div
            key={step}
            className="flex flex-col items-center flex-1 relative"
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center 
                ${
                  isCompleted
                    ? "bg-green-500 text-white"
                    : isCurrent
                    ? "bg-blue-600 text-white ring-4 ring-blue-200"
                    : "bg-gray-200 text-gray-600" 
                } 
                transition-colors duration-200 z-10`}
              aria-current={isCurrent ? "step" : undefined}
            >
              {step}
              <span className="sr-only">Step {step}</span>
            </div>

            {index < totalSteps - 1 && (
              <div
                className={`absolute top-4 left-1/2 w-full h-1 ${
                  isCompleted ? "bg-green-500" : "bg-gray-200"
                }`}
                aria-hidden="true"
              />
            )}
          </div>
        );
      })}
    </div>
  </div>
);
