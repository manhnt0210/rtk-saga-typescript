import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import cityApi from './api/cityApi';
import { NotFound, PrivateRoute } from './components/Common';
import { AdminLayout } from './components/Layout';
import LoginPage from './features/auth/pages/LoginPage';

function App() {
  useEffect(() => {
    cityApi.getAll().then((res) => console.log(res));
  });

  return (
    <div>
      <Routes>
        <Route path='/login'
          element={<LoginPage />}
        >
        </Route>

        <Route
          path='/admin'
          element={<PrivateRoute component={<AdminLayout/>} />}
        />

        <Route path='*'
          element={<NotFound />}
        >
        </Route>
      </Routes>
    </div>
  );
}

export default App;
