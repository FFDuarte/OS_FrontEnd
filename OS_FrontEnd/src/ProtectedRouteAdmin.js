import { Navigate ,useRoutes} from "react-router-dom";
import AdminUsers from './pages/Admin';
import AdminAssociados from './pages/Admin/AdminAssociados';
import AdminTenants from './pages/Admin/AdminTenants';
import DashboardApp from './pages/Dashboard';
import DashboardLayout from './layouts/dashboard';
import AdminStatus from './pages/Admin/AdminStatus'
import RegisterTenants from './pages/Admin/RegisterTenants'

import NewwAssociados from './sections/admin/associados/index'
import AtualizarAssociado from './sections/admin/associados/AtuliazarAssociados'
import AtualizarClientes from './sections/admin/clientes/AtualizarClientes'

import AdminProfile from './pages/AdminProfile'



export const ProtectedRouteAdmin = ({ children }) => {
      return children

};


export  function RouteAutenticateAdmin() {
  return useRoutes([
    {
      path: '/',
      element: <DashboardLayout />,
      children: [
        { path: 'app', element: <DashboardApp /> },
        { path: 'associados', element: <AdminAssociados /> },
        { path: 'tenants', element: <AdminTenants /> },
        { path: 'status', element: <AdminStatus /> },
        { path: 'novoassociado', element: <NewwAssociados /> },
        { path: 'atualizarassociado/:id', element: <AtualizarAssociado /> },
        { path: 'atualizarcliente/:id', element: <AtualizarClientes /> },
        { path: 'register', element: <RegisterTenants /> },
        { path: 'profile', element: <AdminProfile /> }




      ],
    },
  ]);
}