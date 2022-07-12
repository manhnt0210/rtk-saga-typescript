import * as React from 'react';
import { Route, Routes } from 'react-router-dom';
import AddEditPage from './pages/AddEditPage';
import ListPage from './pages/ListPage';

export default function Student() {
  return (
    <Routes>
      <Route path='/add' element={<AddEditPage />}></Route>
      <Route path='/:studentId' element={<AddEditPage />}></Route>
      <Route path='*' element={<ListPage />}></Route>
    </Routes>
  );
}
