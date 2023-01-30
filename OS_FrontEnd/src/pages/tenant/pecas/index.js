import React from "react"
import Particles from 'react-tsparticles'
import { loadFull } from "tsparticles";
 
import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// material
import {
  Box,
  Card,
  Modal,
  Table,
  Stack,
  Avatar,
  Button,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
  Link
} from '@mui/material';
// components
import Page from '../../../components/Page';
import Label from '../../../components/Label';
import Scrollbar from '../../../components/Scrollbar';
import Iconify from '../../../components/Iconify';
import SearchNotFound from '../../../components/SearchNotFound';
import { UserListHead, UserListToolbar,UserMoreMenu } from '../../../sections/@dashboard/user';
// mock
import { Menu, MenuItem, IconButton, ListItemIcon, ListItemText } from '@mui/material';

import {users} from '../../../_mock/clientes';
import api from '../../../utils/api';
import {getAcessToken , getTenant_id} from '../../../utils/services/auth'
import NewwAssociados from '../../../sections/associados'
import AtuliazarAssociados from '../../../sections/associados/AtuliazarAssociados'

import { Edit } from '@mui/icons-material';
import { width } from '@mui/system';



// ----------------------------------------------------------------------
var tenantId = JSON.parse(getTenant_id())

var access_token = JSON.parse(getAcessToken())



// ----------------------------------------------------------------------
const TABLE_HEAD = [
  { id: 'nome', label: 'Nome', alignRight: false },
  { id: 'marca', label: 'Marca', alignRight: false },
  { id: 'aplicacao', label: 'Aplicação', alignRight: false },
  { id: 'categoria', label: 'Categoria', alignRight: false },
  { id: 'preco', label: 'Preço', alignRight: false },
  { id: 'material', label: 'Material', alignRight: false },
  { id: 'descricao', label: 'Descrição', alignRight: false },
  { id: 'ano_fabricacao', label: 'Ano de fabrição', alignRight: false },
  { id: 'opcoes', label: 'Opções', alignRight: false },
  
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    
    return filter(array, (_user) => 
    _user.data_cobranca.toLowerCase().indexOf(query.toLowerCase()) !== -1   || 
    _user.nome.toLowerCase().indexOf(query.toLowerCase()) !== -1            || 
    _user.cnpf_cnpj.toLowerCase().indexOf(query.toLowerCase()) !== -1       ||
    _user.nome_artistico.toLowerCase().indexOf(query.toLowerCase()) !== -1  ||
    _user.telefone1.toLowerCase().indexOf(query.toLowerCase()) !== -1       ||
    _user.email.toLowerCase().indexOf(query.toLowerCase()) !== -1                
   
      
 
     );  
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function Pecas() {
  

  const [fetchedData, setFetchedData] = useState([]);



  useEffect(() => {
    const getData = async () => {
      const data = await api.get(`dashboard/${tenantId}/pecas`, {
        headers: {
          'Authorization': `Bearer ${access_token}`
        }
        })
      
      setFetchedData(data.data);
    };
    getData();
  }, []);

  const teste = Array(fetchedData)
  


  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = teste.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };



  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - teste.length) : 0;

  const filteredUsers = applySortFilter(teste[0], getComparator(order, orderBy), filterName);      
  
  const isUserNotFound = filteredUsers.length === 0;

  const [open, setOpen] = useState(false);

  const [editAssociado, setEditAssociado] = useState(false);

  const [associado , setAssociado] = useState();





  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  async function formGetAssociado(id) {
    await api.get(`dashboard/${tenantId}/associados/buscar/${id}`,{
       headers: {
         'Authorization': `Bearer ${access_token}`
       },
 
     } ).then((response) =>{

   
      setAssociado(response.data)
   })


 }
 
 

  
    const EditOpen = (id) =>{

      try {
        formGetAssociado(id);
      } catch (error) {
        
      }
      
      setEditAssociado(true);

    }

    const EditClose = (event) =>{
        event.preventDefault();
        setEditAssociado(false);
    }


    
    const [idAssociados, setIdAssociado] = useState(null);

    const [getDelte, setDelete] = useState(false);
    
    const DeletOpen = (id) =>{
        setIdAssociado(id)
        
        setDelete(true);
    }


    const DeleteClose = () =>{
        setDelete(false);

    }


    const deleteAssociado = async (id) =>  {
    

    
      if(id != null & id != '' ){
        await api.post(`dashboard/${tenantId}/associados/deletar/${id}`,{
        },{
          headers: {
            'Authorization': `Bearer ${access_token}`
          },
    
        } ).then((response) =>{
    
      })
      window.location.reload();
      }
    }
    const particlesInit = async (main) => {

   
      // you can initialize the tsParticles instance (main) here, adding custom shapes or presets
      // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
      // starting from v2 you can add only the features you need reducing the bundle size
      await loadFull(main);
    };
  
    const particlesLoaded = (container) => {
     
    };
  

  return (
    <Page title="Clientes">   
   

      <Container maxWidth="xl">
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Button >
            <Typography variant="h4" color="black" gutterBottom>
              Peças
            </Typography>
          </Button>
     
          <Link href="/dashboard/novoassociado" variant="body2">
          <Button    variant="contained"  startIcon={<Iconify icon="eva:plus-fill" />} >
            Adicionar Peça
          </Button>
        </Link>
        

         
        </Stack>

        <Card>
          <UserListToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                order={order}
                orderBy={orderBy}
                headLabel={TABLE_HEAD}
                numSelected={selected.length}
                onRequestSort={handleRequestSort}
                onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                    const { id , nome ,marca,descricao,aplicacao,categoria,preco,material,
                      ano_fabricacao} = row;
                    const isItemSelected = selected.indexOf(nome) !== -1;

                    return (  
                      <TableRow
                        hover
                        key={id}
                        tabIndex={-1}
                        role="checkbox"
                        selected={isItemSelected}
                        aria-checked={isItemSelected}
                     
                      >
                      
                          <TableCell align="left">{nome}</TableCell>
                          <TableCell align="left">{marca}</TableCell>
                          <TableCell align="left">{aplicacao}</TableCell>
                          <TableCell align="left">{categoria}</TableCell>
                  
                          <TableCell align="left">{preco}</TableCell>
                          <TableCell align="left">{material}</TableCell>
                          <TableCell align="left">{descricao}</TableCell>
                          <TableCell align="left">{ano_fabricacao}</TableCell>
                          <TableCell align="left">

                            <MenuItem sx={{ color: 'text.secondary' }} onClick={() => DeletOpen(id)}>
                              <ListItemIcon>
                                <Iconify icon="eva:trash-2-outline" width={24} height={24} />
                              </ListItemIcon>
                              <ListItemText primary="Deletar" primaryTypographyProps={{ variant: 'body2' }} />
                            </MenuItem>
                            
                            <RouterLink   to={"/dashboard/atualizarassociado/" + id}>
                            <MenuItem  to={"/dashboard/atualizarassociado" + id} sx={{ color: 'text.secondary' }}>
                              <ListItemIcon>
                                <Iconify icon="eva:edit-fill" width={24} height={24} />
                              </ListItemIcon>
                              <ListItemText primary="Editar" primaryTypographyProps={{ variant: 'body2' }} />
                            </MenuItem>

                            </RouterLink>
                         
                            <Modal open={editAssociado} onClose={EditClose} aria-labelledby="parent-modal-title" aria-describedby="parent-modal-description">
                              <Box >
                                <Card style={modalStyle}>
                                  <AtuliazarAssociados associado={associado}></AtuliazarAssociados>
                                </Card>
                              </Box>
                            </Modal>


                            <Modal open={getDelte} onClose={DeleteClose} aria-labelledby="parent-modal-title" aria-describedby="parent-modal-description">
                              <Box >
                                <Card style={modalStyleAlert}>
                                    <Typography> Deseja Realmente excluir?  </Typography>

                                    <Box style={boxAlert}>
                                      <Button  onClick={() => deleteAssociado(idAssociados)} color="inherit" size="small" >
                                        Excluir
                                      </Button> 
                                      
                                      <Button  onClick={DeleteClose}  color="inherit" size="small">
                                      Carcelar
                                      </Button>
                                    </Box>
                                </Card>
                              </Box>
                            </Modal>
                          </TableCell>
                      </TableRow>
                    );
                  })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>

                {isUserNotFound && (
                  <TableBody >
                    <TableRow    >
                      <TableCell align="center" colSpan={12} sx={{ py: 3 }} > 
                        <SearchNotFound searchQuery={filterName} />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>
         
        
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={teste.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>
        
    </Page>
  );
}


const modalStyle = {
  position: 'absolute' ,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  border: '2px solid #f2f2f2',
  boxShadow: 25,
  padding: '1em',

}

const modalStyleAlert = {
  position: 'absolute' ,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  border: '2px solid #f2f2f2',
  boxShadow: 25,
  padding: '1em',
  display: 'flex',
  flexDirection: 'column',
  width: '300px'

}

const boxAlert = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  padding: '1em'
}

