import { Routes, Route} from 'react-router-dom';

import Login from './pages/LoginRegister/Login';
import Register from './pages/LoginRegister/Register';
import NotFound from './pages/PageErro';

import {ProtectedRoute,RouteAutenticate} from './ProtectedRoute'
import {ProtectedRouteAdmin,RouteAutenticateAdmin} from './ProtectedRouteAdmin'




export default function Router() {

  
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/Register" element={<Register />} />
      <Route path="/404" element={<NotFound />} />
      <Route path="*" element={<NotFound />} />
      <Route
        path="/dashboard/*"
        element={
          <ProtectedRoute>
            <RouteAutenticate />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/*"
        element={
          <ProtectedRouteAdmin>
            <RouteAutenticateAdmin />
          </ProtectedRouteAdmin>
        }
      />
    </Routes>
  );
}
// ----------------------------------------------------------------------




