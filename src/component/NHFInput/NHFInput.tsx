"use client"
import { NHFInputProps } from '@/lib/types/TypeProps';
import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';
const NHFInput:React.FC<NHFInputProps> = ({ name, className, ...other }) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field}) => (
          <input
            {...field}
            className={className}
            placeholder={other.placeholder}
            type={other.type}
           
          />
      
      )}
    />
  );
};

export default NHFInput;
