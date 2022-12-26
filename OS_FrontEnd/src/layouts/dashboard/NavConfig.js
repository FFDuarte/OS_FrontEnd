// component
import Iconify from '../../components/Iconify';
// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;





const TenantConfig = [
 
  {
    title: 'Clientes',
    path: '/dashboard/clientes',
    icon: getIcon('eva:people-fill'),
  },
  {
    title: 'Adicionar Cliente',
    path: '/dashboard/novocliente',
    icon: getIcon('akar-icons:person-add'),
  },

  {
    title: 'Carros',
    path: '/dashboard/carros',
    icon: getIcon('akar-icons:person-add'),
  },
  {
    title: 'Adicionar Carros',
    path: '/dashboard/novocarro',
    icon: getIcon('akar-icons:person-add'),
  },
  {
    title: 'Peças',
    path: '/dashboard/pecas',
    icon: getIcon('mdi:list-status'),
  },
  {
    title: 'Adicionar Peças',
    path: '/dashboard/novapeca',
    icon: getIcon('mdi:list-status'),
  },
  {
    title: 'Ordem de Serviço',
    path: '/dashboard/ordemservico',
    icon: getIcon('mdi:list-status'),
  },
  {
    title: 'Adicionar Ordem de Serviço',
    path: '/dashboard/novaos',
    icon: getIcon('mdi:list-status'),
  },
];

export default TenantConfig;

