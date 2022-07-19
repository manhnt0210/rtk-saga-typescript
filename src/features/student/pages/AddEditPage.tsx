import { ChevronLeft } from '@mui/icons-material';
import { Box, Typography } from '@mui/material';
import * as React from 'react';
import { Link, useParams } from 'react-router-dom';
import studentApi from '../../../api/studentApi';
import { Student } from '../../../models';
import StudentForm from '../components/StudentForm';

export default function AddEditPage () {
  const {studentId} = useParams<{studentId: string}>();
  const isEdit = Boolean(studentId);

  const [student, setStudent] = React.useState<Student>()

  React.useEffect(() => {
   if (!studentId) return;
   
    (async () => {
      try {
        const data: Student = await studentApi.getById(studentId);
        setStudent(data);
      } catch (error) {
        console.log('Not found student', error);
      }
   })();
  }, [studentId]);

  const handleStudentFormSubmit = (formValue: Student) => {

  }

  const initialValues: Student = {
    name: '',
    mark: '',
    gender: 'male',
    city: '',
    ...student,
  } as Student;

  return (
    <Box>
      <Link to="/admin/students">
        <Typography variant="caption" sx={{ display: 'flex', alignItems: 'center'}}>
          <ChevronLeft />Back to student list
        </Typography>
      </Link>

      <Typography variant="h4">{isEdit ? 'Update student info' : 'Add new student'}</Typography>

      {(!isEdit || Boolean(student)) && (
        <Box mt={3}>
          <StudentForm initialValues={initialValues} onSubmit={handleStudentFormSubmit}/>
        </Box>
      )}
      
    </Box>
  );
}
