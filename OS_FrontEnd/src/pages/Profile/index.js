
import { useState } from 'react';
import React from "react"
import Particles from 'react-tsparticles'
import { loadFull } from "tsparticles";
import { useNavigate } from 'react-router-dom';
import api from '../../utils/api'
import {getTenant_id,setUsuarioData} from '../../utils/services/auth'
// material
import {
  Card,
  Grid,
  Container,
  ListItem,
  ListItemText,
  Avatar,
  Paper,
  Button,
  Modal,
  Box,

} from '@mui/material';
// components
import Page from '../../components/Page';
import  UserListToolbar  from '../../sections/menuUser';
import { useEffect } from 'react';
import EmpresaAlterar from './EmpresaAlterar'
import EnderecoAlterar from './Endereco'


export default function Profile() {
  const [fetchedData, setFetchedData] = useState([]);
  const [usuarios, setUsuario] = useState([]);
  const tenantId = JSON.parse(getTenant_id());
  setUsuarioData(usuarios)

  useEffect(() => {
    const getData = async () => {
      const data = await api.get(`/dashboard/${tenantId}/usuarios/pesquisar/${tenantId}`, {
       
        })
  
      setFetchedData(data.data);
    };
    getData();

  }, []);

 



  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };


  const handleClose = () => {
    setOpen(false);
  };



  const [openEndereco, setOpenEndereco] = React.useState(false);

  const handleOpenEndereco = () => {
    setOpenEndereco(true);
  };


  const handleCloseEndereco = () => {
    setOpenEndereco(false);
  };






 

  return (
    <Page title="User">
  
      <Container maxWidth="xl">
        <Card>
          <UserListToolbar> </UserListToolbar>
          <Grid   container spacing={3}>

            <Grid item xs={12} md={6} lg={5} style={gridStyle}>
              <Paper style={style}  >

                  <ListItem button divider>
                    <Avatar alt="Empresa" src="/static/images/avatar/1.jpg" />
                    <ListItem>    
                      <ListItemText primary="Empresa" />                
                    </ListItem> 
                  
                  </ListItem>

                  <ListItem button divider>
                    <ListItemText primary="Nome da Empresa" />              
                    <ListItemText style={itemText}  primary={fetchedData.empresa} />
                  </ListItem>

                  <ListItem button divider>
                    <ListItemText primary="Nome Fantasia" />              
                    <ListItemText style={itemText}  primary={fetchedData.fantasia} />
                  </ListItem>

                  <ListItem button divider>
                    <ListItemText primary="CNPJ" />              
                    <ListItemText style={itemText}  primary={fetchedData.cnpf_cnpj} />
                  </ListItem>


                  <ListItem button divider>
                    <ListItemText primary="Telefone" />              
                    <ListItemText style={itemText}  primary={fetchedData.telefone1} />
                  </ListItem>

                  <ListItem button divider>
                    <ListItemText primary="Telefone Adicional" />              
                    <ListItemText style={itemText}  primary={fetchedData.telefone2} />
                  </ListItem>


                  
                <ListItem style={ButtonItem}>
                  <Button variant="contained"  onClick={() => handleOpen()} >Alterar</Button>
                </ListItem>

                <Modal open={open} onClose={handleClose} aria-labelledby="parent-modal-title" aria-describedby="parent-modal-description">
                  <Box >
                    <Card style={modalStyleAlert}>
                        <EmpresaAlterar empresa={fetchedData}></EmpresaAlterar>
                    </Card>
                  </Box>
                </Modal>

              </Paper>
            </Grid>

            <Grid item xs={12} md={6} lg={5} style={gridStyle}>
              <Paper style={style} >
                <ListItem  divider>
                  <Avatar alt="Endereço" src="/static/images/avatar/1.jpg" />
                  <ListItem>
                    <ListItemText primary="Endereço" />    
                  </ListItem> 
                </ListItem>


                <ListItem button divider>
                  <ListItemText primary="Rua " />              
                  <ListItemText style={itemText} primary={fetchedData.logradouro}  />
                </ListItem>

                <ListItem button divider>
                  <ListItemText primary="Numero " />              
                  <ListItemText style={itemText} primary={fetchedData.numero}  />
                </ListItem>

                <ListItem button divider>
                  <ListItemText primary="Cep " />              
                  <ListItemText style={itemText} primary={fetchedData.cep}  />
                </ListItem>


                <ListItem button divider>
                  <ListItemText primary="Bairro" />               
                  <ListItemText style={itemText} primary={fetchedData.bairro}   />
                </ListItem>

                <ListItem button divider>
                  <ListItemText primary="Cidade" />               
                  <ListItemText style={itemText} primary={fetchedData.cidade}  />
                </ListItem>

                <ListItem button divider>
                  <ListItemText primary="Estado" />               
                  <ListItemText style={itemText} primary={fetchedData.uf}  />
                </ListItem>


                


                <ListItem style={ButtonItem}>
                  <Button variant="contained"  onClick={() => handleOpenEndereco()} >Alterar</Button>
                </ListItem>

                <Modal open={openEndereco} onClose={handleCloseEndereco} aria-labelledby="parent-modal-title" aria-describedby="parent-modal-description">
                  <Box >
                    <Card style={modalStyleAlert}>
                        <EnderecoAlterar empresa={fetchedData}></EnderecoAlterar>
                    </Card>
                  </Box>
                </Modal>

              </Paper>
            </Grid>

          </Grid>

        
        </Card>
      </Container>
    </Page>
  );
}


const style = {
  bgcolor: 'background.paper',
  border: '1px solid rgba(0,0,0,0.2)',
  padding: '1em',
  borderRadius: '1em'

};
const style2 = {

  border: '1px solid rgba(0,0,0,0.2)',
  padding: '1em',
  borderRadius: '1em'
}
const styleitem = {
  bgcolor: 'white',
  padding: '1em',

}
const stylePaper2 = {
  bgcolor: 'background.paper',
  border: '1px solid rgba(0,0,0,0.2)',
  padding: '1em',
  borderRadius: '1em',
  marginTop: '2em'

};

const gridStyle = {
  padding: '3em'
}

const itemText = {
  fontSize: 14,
  color: "gray",
  textAlign: "right",

}

const ButtonItem = {
  diplay: 'flex',
  justifyContent: 'space-between'
}
const paperGrid = {
  maxHeight: 300, 
  overflow: 'auto',


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


}

