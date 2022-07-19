import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@mui/material';
import * as React from 'react';
import { useController } from 'react-hook-form';

export interface SelectOption {
  label?: string;
  value: number | string;
}

export interface SelectFieldProps{
  name: string;
  control: any;
  label?: string;
  disabled?: boolean;
  options: SelectOption[];
}

export function SelectField ({name, control, label, disabled, options}: SelectFieldProps) {
  const { 
    field: { value, onChange, onBlur },
    fieldState: {invalid, error},
  } = useController({
    name, control,
  });

  return (
    <FormControl fullWidth variant="outlined" margin="normal" size="small" error={invalid} disabled={disabled}>
      <InputLabel id={`${name}_label`} >{label}</InputLabel>
      <Select
        label={label}
        value={value}
        onBlur={onBlur}
        onChange={onChange}
        labelId={`${name}_label`}
      >
        {options.map(option => (
          <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
        ))}
      </Select>
      <FormHelperText>
        {error?.message}
      </FormHelperText>
    </FormControl>
  );
}

