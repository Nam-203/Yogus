import React, { ReactNode } from 'react';
import { FormProvider as RHFProvider, UseFormReturn, FieldValues } from 'react-hook-form';

interface FormProviderProps<T extends FieldValues> {
  onSubmit: (data: T) => void;
  methods: UseFormReturn<T>;
  children: ReactNode;
}

const CustomFormProvider = <T extends FieldValues>({
  children,
  onSubmit,
  methods,
}: FormProviderProps<T>) => {
  return (
    <RHFProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        {children}
      </form>
    </RHFProvider>
  );
};

export default CustomFormProvider;
