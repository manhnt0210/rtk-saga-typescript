import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { NotFound, PrivateRoute } from './components/Common';
import { AdminLayout } from './components/Layout';
import LoginPage from './features/auth/pages/LoginPage';

function App() {
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
