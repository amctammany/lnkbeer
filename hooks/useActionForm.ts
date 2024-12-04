"use client";
import { State } from "@/lib/validateSchema";
import { useActionState, useEffect, useMemo } from "react";
import { FieldValues, useForm } from "react-hook-form";

export function useActionForm<T extends FieldValues>(action: any, data: T) {
  const [state, formAction] = useActionState<State<T>>(action, {
    success: true,
    errors: undefined,
    data: data,
  });
  const { reset, setError, register, control, getValues } = useForm<T>({
    values: state.data,
  });
  useEffect(() => {
    if (!state.success) {
      reset(state.data); // {
      //keepDirty: true,
      //keepDefaultValues: true,
      //keepValues: true,
      //});
      Object.entries(state?.errors ?? []).map(([n, err]) => {
        setError(err.path as any, err);
      });
    }
  }, [state, reset, setError]);

  //return {
  //state,
  //formAction,
  //reset,
  //register,
  //};
  return useMemo(
    () => ({ register, reset, state, formAction, control, getValues }),
    [state, formAction, register, reset, control, getValues],
  );
}