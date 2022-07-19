import { FormControl, FormControlLabel, FormHelperText, FormLabel, Radio, RadioGroup } from '@mui/material';
import * as React from 'react';
import { useController } from 'react-hook-form';

export interface RadioOption {
  label?: string;
  value: number | string;
}

export interface RadioGroupFieldProps{
  name: string;
  control: any;
  label?: string;
  disabled?: boolean;
  options: RadioOption[];
}

export function RadioGroupField ({name, control, label, disabled, options}: RadioGroupFieldProps) {
  const { 
    field: { value, onChange, onBlur },
    fieldState: {invalid, error},
  } = useController({
    name, control,
  });

  return (
    <FormControl disabled={disabled} error={invalid}>
      <FormLabel id="demo-radio-buttons-group-label">{label}</FormLabel>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        value={value}
        name={name}
        onChange={onChange}
        onBlur={onBlur}
      >
        {options.map(option => (
          <FormControlLabel key={option.value} value={option.value} control={<Radio />} label={option.label}  />
        ))}
      </RadioGroup>
      <FormHelperText>
        {error?.message}
      </FormHelperText>
    </FormControl>
  );
}

