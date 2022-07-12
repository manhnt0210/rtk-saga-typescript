import * as React from 'react';
import { useAppDispatch } from '../../../app/hooks';
import { studentActions } from '../studentSlice';

export default function ListPage () {
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(studentActions.fetchStudentList({
      _page: 1,
      _limit: 10,
    }))
  }, [dispatch]);

  return (
    <div>
      List Page
    </div>
  );
}
