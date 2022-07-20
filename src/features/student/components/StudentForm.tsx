import { Alert, Box, Button, CircularProgress } from '@mui/material';
import * as React from 'react';
import { useForm } from 'react-hook-form';
import { useAppSelector } from '../../../app/hooks';
import { RadioGroupField, InputField, SelectField } from '../../../components/FormFields';
import { Student } from '../../../models';
import { selectCityOptions } from '../../city/citySlice';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

export interface StudentFormProps {
  initialValues?: Student;
  onSubmit?: (formValue: Student) => void;
}

const schema = yup.object({
  name: yup.string().required('Please enter name'),
  age: yup.number()
    .positive('Please enter a positive number.')
    .integer('Please enter an integer.')
    .required('Please enter age')
    .typeError('Please enter a valid number'),
  mark: yup.number().min(0, 'Min is 0')
    .typeError('Please enter a valid number'),
  gender: yup
    .string()
    .oneOf(['male', 'female'], 'Please select either male or female'),
  city: yup.string()
    .required('Please select city'),
}).required();

export default function StudentForm ({initialValues, onSubmit}: StudentFormProps) {
  const cityOptions = useAppSelector(selectCityOptions);
  const [error, setError] = React.useState('');

  const {
    control,
    handleSubmit,
    formState: {isSubmitting}
  } = useForm<Student>({
    defaultValues: initialValues,
    resolver: yupResolver(schema)
  });

  const handleFormSubmit = async (formValues: Student) => {
    try {
      setError('');
      await onSubmit?.(formValues);
    } catch (error: any) {
      setError(error.message);
    }
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

        {Array.isArray(cityOptions) && cityOptions.length > 0 && (
          <SelectField options={cityOptions} name="city" control={control} label="City" />
        )}

        {error && <Alert severity="error">{error}</Alert>}

        <Box mt={3}>
          <Button variant="contained" color="primary" type="submit" disabled={isSubmitting} >
            { isSubmitting && <CircularProgress size={16} />} Save
          </Button>
        </Box>
      </form>
    </Box>
  );
}

