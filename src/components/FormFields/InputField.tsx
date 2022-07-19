import { TextField } from '@mui/material';
import * as React from 'react';
import { useController } from 'react-hook-form';

export interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement>{
  name: string;
  control: any;
  label?: string;
}

export function InputField ({name, control, label, ...inputProps}: InputFieldProps) {
  const { 
    field: { value, onChange, onBlur, ref },
    fieldState: {invalid, error},
  } = useController({
    name, control,
  });

  return (
    <TextField
      fullWidth
      label={label}
      size="small"
      margin="normal"
      variant="outlined" 
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      inputRef={ref}
      error={invalid}
      helperText={error?.message}
      inputProps={inputProps}
    />
  );
}

