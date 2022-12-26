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
} from '@mui/material';
// components
import Page from '../../components/Page';
import Scrollbar from '../../components/Scrollbar';
import SearchNotFound from '../../components/SearchNotFound';
import { UserListHead, UserListToolbar } from '../../sections/@dashboard/user';
// mock
import {  MenuItem, ListItemText } from '@mui/material';

import api from '../../utils/api';
import {getAcessToken , getTenant_id} from '../../utils/services/auth'


import AtuliazarStatus from '../../sections/admin/associados/AtuliazarStatus'



// ----------------------------------------------------------------------
var tenantId = JSON.parse(getTenant_id())
var access_token = JSON.parse(getAcessToken())

// ----------------------------------------------------------------------
const TABLE_HEAD = [
  { id: 'nome', label: 'Nome Completo', alignRight: false },
  { id: 'nome_artistico', label: 'Nome artístico', alignRight: false },
  { id: 'cnpf_cnpj', label: 'CPf', alignRight: false },
  { id: 'telefone1', label: 'Telefone', alignRight: false },
  { id: 'email', label: 'Email', alignRight: false },
  { id: 'status', label: 'Status Pagamento', alignRight: false },
  { id: 'data_cobranca', label: 'Data de Registro', alignRight: false }


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
    _user.status.toLowerCase().indexOf(query.toLowerCase()) !== -1          ||
    _user.nome_artistico.toLowerCase().indexOf(query.toLowerCase()) !== -1  ||
    _user.telefone1.toLowerCase().indexOf(query.toLowerCase()) !== -1       ||
    _user.email.toLowerCase().indexOf(query.toLowerCase()) !== -1    
     );  
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function StatusAssociados() {
  

  const [fetchedData, setFetchedData] = useState([]);



  useEffect(() => {
    const getData = async () => {
      const data = await api.get(`admin/listarassociados`, {
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

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }
    setSelected(newSelected);
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
  const [associado , setAssociado] = useState();






  async function formGetAssociado(id) {
    await api.get(`admin/buscarassociado/${id}`,{
       headers: {
         'Authorization': `Bearer ${access_token}`
       },
 
     } ).then((response) =>{
      
   
   
      setAssociado(response.data)
   })


 }
 
 

  
    

    
    const particlesInit = async (main) => {
    
   
      // you can initialize the tsParticles instance (main) here, adding custom shapes or presets
      // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
      // starting from v2 you can add only the features you need reducing the bundle size
      await loadFull(main);
    };
  
    const particlesLoaded = (container) => {
   
    };
  


    const [editStatus, setEditStatus] = useState(false);
    const OpenStatus = (id) =>{
      try {
        formGetAssociado(id);
      } catch (error) {
        
      }
      setEditStatus(true);
      
   }
   
   const EditCloseStatus = (event) =>{
       event.preventDefault();
       setEditStatus(false);
   }
   

  return (
    <Page title="Clientes">   
    <Particles
    id="tsparticles"
    init={particlesInit}
    loaded={particlesLoaded}
        options={{
      background: {
        color: '#ffffff',
      },
      fpsLimit: 40,
      interactivity: {
        detectsOn: 'canvas',
        events: {
          resize: true
        },
      },
      particles: {
        color: {
          value: "#000000"
        },
        number: {
          density: {
            enable: true,
            area: 1080
          },
          limit: 0,
          value: 200,
        },
        opacity: {
          animation: {
            enable: true,
            minimumValue: 1,
            speed: 3,
            sync: false,
          },
          random: {
            enable: true,
            minimumValue: 0.1,
          },
          value: 1,
        },
        shape: {
          type: 'circle',
 
        },
        size: {
          random: {
            enable: true,
            minimumValue: 1.5
          },
          value: 1
        }
      }
    }}
/> 
      <Container maxWidth="xl">
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>

         
         
            <Button    to="#" style={statusAbout} >
              <Stack direction={{ xs: 'column', sm: 'column', mt: 5 }}  fullWidth  style={stackSelect} >

                <Stack direction={{ xs: 'column', sm: 'column', mt: 5 }}  fullWidth  style={stackSelect} >
                  <Typography style={tituloHelpText} color="black">Os status podem variar nas seguintes opções a baixo:</Typography>
                </Stack>

                <Stack direction={{ xs: 'column', sm: 'row'}}  fullWidth  style={stackSelect} >
                  <Stack direction={{ xs: 'column', sm: 'column'}}  fullWidth  style={stackOptions} >
                    <Typography style={tituloHelpText} color="green">Aprovado</Typography>
                    <Typography style={conteudoHelpText}>Pagmento Realizado</Typography>
                  </Stack>

                  <Stack direction={{ xs: 'column', sm: 'column'}}  fullWidth  style={stackOptions} >
                    <Typography style={tituloHelpText} color="red">Bloqueado</Typography>
                    <Typography style={conteudoHelpText}>Pagamento não foi realizado dentro do prazo</Typography>
                  </Stack>

                  <Stack direction={{ xs: 'column', sm: 'column' }}  fullWidth  style={stackOptions} >
                    <Typography style={tituloHelpText} color="#eed269">Pendente</Typography>
                    <Typography style={conteudoHelpText}>Pagamento a ser realizado</Typography>
                  </Stack>
                </Stack>
                
              </Stack>
           </Button>

       
         
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
                    const { id , nome , data_cobranca,telefone1,cnpf_cnpj,nome_artistico,email,status } = row;
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
                          <TableCell align="left">{nome_artistico}</TableCell>
                          <TableCell align="left">{cnpf_cnpj}</TableCell>
                          <TableCell align="left">{telefone1}</TableCell>
                          <TableCell align="left">{email}</TableCell>
       
                          <TableCell align="left">
                            <MenuItem  to="#" onClick={() => OpenStatus(id)} style={colorStatus(status)}>
                              
                              <ListItemText primary={status}  primaryTypographyProps={{ variant: 'body2' }} />
                            </MenuItem>

                            <Modal open={editStatus} onClose={EditCloseStatus} aria-labelledby="parent-modal-title" aria-describedby="parent-modal-description">
                              <Box >
                                <Card style={modalStyle}>
                                <AtuliazarStatus associado={associado}></AtuliazarStatus>
                                </Card>
                              </Box>
                            </Modal>
                          </TableCell>

                          <TableCell align="left">{data_cobranca}</TableCell>

                          

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


const statusAbout = {
 
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

const colorStatus = (status) => {

if(status == "pendente"){
  const color= {
    background: "#f0dc82",
    borderRadius: 20,
    textAlign: "center",
    color: "black"
  }
  return color
}else if(status == "aprovado"){
  const color= {
    background: "#7ba05b",
    borderRadius: 20,
    textAlign: "center",
    color: "black"
  }
  return color
}else if(status == "bloqueado"){
  const color= {
    background: "#da6351",
    borderRadius: 20,
    textAlign: "center",
    color: "black"
  }
  return color
}


}

const tituloStatus = {
  marginBottom: 15,
  fontSize: 18,
  fontWeight: 600,
  
 }
 
 const stackSelect = {
   marginBottom: 15
 }

 const stackOptions = {
  marginTop: 15,
  marginBottom: 15,
  marginLeft: 0,
  marginRight: 20
 }
 
 const tituloHelpText = {
   fontSize: 15,
   fontWeight: 600,
 }
 
 const conteudoHelpText = {
   fontSize: 13,
   fontWeight: 500,
   color: "black"
 }
 