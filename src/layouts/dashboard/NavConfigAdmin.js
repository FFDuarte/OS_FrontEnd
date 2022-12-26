// component
import Iconify from '../../components/Iconify';


const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;



const AdminConfig = [


  {
    title: 'Clientes',
    path: 'tenants',
    icon: getIcon('akar-icons:person'),
  },
  {
    title: 'Novo Cliente',
    path: 'register',
    icon: getIcon('akar-icons:person-add'),
  },
  {
    title: 'Associados',
    path: 'associados',
    icon: getIcon('eva:people-fill'),
  },
  {
    title: 'Novo Associado',
    path: 'novoassociado',
    icon: getIcon('akar-icons:person-add'),
  },
  {
    title: 'Status',
    path: 'status',
    icon: getIcon('mdi:list-status')
  }

];

 


export default AdminConfig;