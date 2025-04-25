"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { AddDataSource } from "@/components/pipeline/add-data-source";
import { PipelineAiAssistant } from "@/components/pipeline/ai-assistant";
import { PipelineDetails } from "@/components/pipeline/details";
import { ScheduleAndInformation } from "@/components/pipeline/schedule-and-information";
import { PipelineSummary } from "@/components/pipeline/summary";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { cn } from "@/lib/utils";

const TOTAL_STEPS = 5;

const stepComponents = [
  <PipelineDetails key="details" />,
  <AddDataSource key="datasource" />,
  <PipelineAiAssistant key="ai" />,
  <ScheduleAndInformation key="schedule" />,
  <PipelineSummary key="summary" />,
  ,
];

const motionVariants = {
  enter: { opacity: 0, x: 50 },
  center: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -50 },
};

export default function CratePipelineForm() {
  const [step, setStep] = useState(0);
  const isFirstStep = step === 0;
  const isLastStep = step === TOTAL_STEPS - 1;

  const form = useForm();
  const { handleSubmit, reset } = form;

  const onSubmit = async (formData: unknown) => {
    if (!isLastStep) return setStep((s) => s + 1);
    console.log(formData);
    reset();
    setStep(0);
    toast.success("Form successfully submitted");
  };

  const handleBack = () => setStep((s) => (s > 0 ? s - 1 : s));

  const StepForm = (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-y-4">
        {stepComponents[step]}
        <div className="flex justify-between">
          <Button
            type="button"
            size="sm"
            className="font-medium cursor-pointer"
            onClick={handleBack}
            disabled={isFirstStep}
          >
            Back
          </Button>
          <Button
            type="submit"
            size="sm"
            className="font-medium cursor-pointer"
          >
            {isLastStep ? "Create Pipeline" : "Next"}
          </Button>
        </div>
      </form>
    </Form>
  );

  return (
    <div className="space-y-4">
      {/* stepper */}
      <div className="flex items-center justify-center">
        {Array.from({ length: TOTAL_STEPS }).map((_, index) => (
          <div key={index} className="flex items-center">
            <div
              className={cn(
                "w-4 h-4 rounded-full transition-all duration-300 ease-in-out",
                index <= step ? "bg-primary" : "bg-primary/30"
              )}
            />
            {index < TOTAL_STEPS - 1 && (
              <div
                className={cn(
                  "w-8 h-0.5",
                  index < step ? "bg-primary" : "bg-primary/30"
                )}
              />
            )}
          </div>
        ))}
      </div>

      {/* animated form */}
      <Card className="shadow-sm">
        <CardContent>
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              variants={motionVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.1 }}
            >
              {StepForm}
            </motion.div>
          </AnimatePresence>
        </CardContent>
      </Card>
    </div>
  );
}
