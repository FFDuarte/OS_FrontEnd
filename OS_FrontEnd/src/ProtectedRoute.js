import { Navigate ,useRoutes} from "react-router-dom";
import { getTenant_id } from "./utils/services/auth";
import DashboardApp from './pages/Dashboard';
import DashboardLayout from './layouts/dashboard';
import Profile from './pages/Profile';
import AtualizarAssociado from './sections/associados/AtuliazarAssociados'


import Pecas from './pages/tenant/pecas';
import Carros from './pages/tenant/carros';
import Clientes from './pages/tenant/clientes';
import OrdemServico from './pages/tenant/ordemservico';


import NewClient from './pages/tenant/clientes/newClient'
import NewCarros from './pages/tenant/carros/newCarros'
import NewPeca from './pages/tenant/pecas/newPecas'
import NewOs from './pages/tenant/ordemservico/newOrdemServico'


import EditCarros from './pages/tenant/carros/editCarros'
import EditClient from './pages/tenant/clientes/editClientes'

export const ProtectedRoute = ({ children }) => {

  var tenantId = getTenant_id();
    console.log(tenantId)
    if(tenantId != null){
      return children
    }
    
   return <Navigate to="/" />;
};


export  function RouteAutenticate() {
  return useRoutes([
    {
      path: '/',
      element: <DashboardLayout />,
      children: [
        { path: 'app', element: <DashboardApp /> },
        { path: 'profile', element: <Profile /> },

        { path: 'clientes', element: <Clientes /> },
        { path: 'novocliente', element: <NewClient /> },
        { path: 'editcliente/:id', element: <EditClient /> },

        { path: 'carros', element: <Carros /> },
        { path: 'novocarro', element: <NewCarros /> },
        { path: 'editcarro/:id',element: <EditCarros /> },

        
        { path: 'pecas', element: <Pecas /> },
        { path: 'novapeca', element: <NewPeca /> },


        
        { path: 'ordemservico', element: <OrdemServico /> },
        { path: 'novaos', element: <NewOs /> },

        { path: 'atualizarassociado/:id', element: <AtualizarAssociado /> },

      ],
    },
  ]);
}