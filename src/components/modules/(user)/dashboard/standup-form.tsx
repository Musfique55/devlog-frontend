"use client";

import AppFields from "@/components/shared/form/AppFields";
import { AppSubmitButton } from "@/components/shared/form/AppSubmitButton";
import AppTextArea from "@/components/shared/form/AppTextArea";
import { useAuth } from "@/hooks/useAuth";
import { createLog } from "@/services/standupLogs.services";
import { logValidator } from "@/zod/logValidator";
import { useForm } from "@tanstack/react-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";

export interface StandupData {
  today: string;
  tomorrow: string;
  blocker?: string;
}

export function StandupForm() {
  const [serverError, setServerError] = useState<string | null>(null);
  const {data : user} = useAuth();

  const queryClient = useQueryClient();


  const { mutateAsync, isPending } = useMutation({
    mutationFn: createLog,
    onSuccess : () => {
      queryClient.invalidateQueries({
        queryKey : ['myDashboardInfo']
      })
    }
  });

  const form = useForm({
    defaultValues: {
      todayWork: "",
      tomorrowWork: "",
      blocker: "",
      projectTag: "",
    },
    onSubmit: async ({ value }) => {
      setServerError(null);
      try {
        const result = await mutateAsync({
          ...value,
          userId : user?.id
        });
        // console.log(result);
        if (result.success === false) {
          setServerError(result.message as string);
          return;
        }
        toast.success("Standup Log Created Successfully");
        form.reset();
        setServerError(null);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        setServerError(error.message!);
      }
    },
  });

  return (
    <section className="bg-zinc-900/60 p-8 rounded-xl border border-zinc-800/50 relative overflow-hidden">
      {/* Decorative blur */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 blur-3xl rounded-full"></div>

      <h2 className="text-xl font-bold text-zinc-100 mb-8">
        Today&apos;s Standup
      </h2>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
        className="space-y-6 relative z-10"
      >
        {/* Today */}
        <div>
          <form.Field name="todayWork" validators={{onChange : logValidator.createLog.shape.todayWork}}>
            {(field) => (
              <AppTextArea
                field={field}
                label="What did you do today?"
                placeholder="Starting the auth module refactor..."
              />
            )}
          </form.Field>
        </div>

        {/* Tomorrow */}
        <div>
          <form.Field name="tomorrowWork" validators={{onChange : logValidator.createLog.shape.tomorrowWork}}>
            {(field) => (
              <AppTextArea
                field={field}
                label="What will you do tomorrow?"
                placeholder="Starting the auth module refactor..."
              />
            )}
          </form.Field>
        </div>

        {/* Blockers */}
        <div>
          <form.Field name="blocker">
            {(field) => (
              <AppTextArea
                field={field}
                rows={4}
                label="Any blockers?"
                placeholder="Waiting for PR review on #1204"
              />
            )}
          </form.Field>
        </div>

        <div>
          <form.Field name="projectTag">
            {(field) => (
              <AppFields
                type="text"
                field={field}
                label="Project Tags"
                placeholder="enter tag"
              />
            )}
          </form.Field>
        </div>

        {/* Submit Button */}
        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
        >
          {([canSubmit, isSubmitting]) => (
            <AppSubmitButton
              isPending={isPending || isSubmitting}
              pendingLabel="creating…"
              disabled={!canSubmit}
            >
              Submit Log
            </AppSubmitButton>
          )}
        </form.Subscribe>
        {serverError && <p>{serverError}</p>}
      </form>
    </section>
  );
}
