import { Box, Button } from '@mui/material';
import * as React from 'react';
import { useForm } from 'react-hook-form';
import { useAppSelector } from '../../../app/hooks';
import { RadioGroupField, InputField, SelectField } from '../../../components/FormFields';
import { Student } from '../../../models';
import { selectCityOptions } from '../../city/citySlice';

export interface StudentFormProps {
  initialValues?: Student;
  onSubmit?: (formValue: Student) => void;
}

export default function StudentForm ({initialValues, onSubmit}: StudentFormProps) {
  const cityOptions = useAppSelector(selectCityOptions);

  const {
    control,
    handleSubmit
  } = useForm<Student>({
    defaultValues: initialValues,
  });

  const handleFormSubmit = (formValues: Student) => {
    console.log({formValues})
  }

  return (
    <Box maxWidth={400}>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <InputField name="name" control={control} label="Full Name" />
        <RadioGroupField 
          name="gender"
          control={control}
          label="Gender"
          options={[
            {label: 'Male', value: 'male'},
            {label: 'Female', value: 'female'},
          ]}
        />
        <InputField name="age" control={control} label="Age" type="number" />
        <InputField name="mark" control={control} label="Mark" type="number" />
        <SelectField options={cityOptions} name="city" control={control} label="City" />

        <Box mt={3}>
          <Button variant="contained" color="primary" type="submit">
            Save
          </Button>
        </Box>
      </form>
    </Box>
  );
}

