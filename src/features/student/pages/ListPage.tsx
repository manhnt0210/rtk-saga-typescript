import { Box, Button, LinearProgress, Pagination, styled, Typography } from '@mui/material';
import * as React from 'react';
import studentApi from '../../../api/studentApi';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { ListParams, Student } from '../../../models';
import { selectCityList, selectCityMap } from '../../city/citySlice';
import StudentFilter from '../components/StudentFilter';
import StudentTable from '../components/StudentTable';
import { selectStudentFilter, selectStudentList, selectStudentLoading, selectStudentPagination, studentActions } from '../studentSlice';

const StyledBox = styled(Box)(({theme}) => ({
  position: 'relative',
  padding: theme.spacing(1)
}));

const StyledLoading = styled(LinearProgress)(({theme}) => ({
  position: 'absolute',
  top: theme.spacing(-1),
  width: '100%',
}));

export default function ListPage () {
  const dispatch = useAppDispatch();
  const studentList = useAppSelector(selectStudentList);
  const pagination = useAppSelector(selectStudentPagination);
  const filter = useAppSelector(selectStudentFilter);
  const loading = useAppSelector(selectStudentLoading);
  const cityMap = useAppSelector(selectCityMap);
  const cityList = useAppSelector(selectCityList);

  React.useEffect(() => {
    dispatch(studentActions.fetchStudentList(filter))
  }, [dispatch, filter]);

  const handleChangePage = (e: any, page: number) => {
    dispatch(studentActions.setFilter({
      ...filter,
      _page: page
    }))
  };

  const handleSearchChange = (newFilter: ListParams) => {
    dispatch(studentActions.setFilterWithDebounce(newFilter));
  }

  const handleFilterChange = (newFilter: ListParams) => {
    dispatch(studentActions.setFilter(newFilter));
  }
  
  const handleRemoveStudent = async (student : Student) => {
    try {
      await studentApi.remove(student?.id || '');

      dispatch(studentActions.setFilter({...filter}));
    } catch (error) {
      console.log('Remove student failed', error)
    }
  }

  return (
    <div>
      <StyledBox>
        {loading && <StyledLoading sx={{ marginBottom: '16px' }} />}
        <Box sx={{
          display: 'flex',
          flexFlow: 'row nowrap',
          justifyContent: 'space-between',
          alignItem: 'center',
          marginBottom: '32px',
        }}>
          <Typography variant="h4">Students</Typography>
          <Button variant="contained" color="primary">Add new student</Button>
        </Box>

        <Box mb={3}>
          <StudentFilter filter={filter} cityList={cityList} onSearchChange={handleSearchChange} onChange={handleFilterChange} />
        </Box>

        <StudentTable studentList={studentList} cityMap={cityMap} onRemove={handleRemoveStudent} />

        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '16px'}}>
          <Pagination
            color="primary"
            count={Math.ceil(pagination._totalRows / pagination._limit)}
            page={pagination?._page} onChange={handleChangePage}
          />
        </Box>
      </StyledBox>
    </div>
  );
}
