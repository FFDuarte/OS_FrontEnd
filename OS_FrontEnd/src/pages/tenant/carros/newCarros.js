import * as Yup from 'yup';
import { useState } from 'react';
import InputMask from 'react-input-mask';
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import {getTenant_id,getAcessToken} from '../../../utils/services/auth'
// material
import Particles from 'react-tsparticles'
import { loadFull } from "tsparticles";
 
import Page from '../../../components/Page';
import {  TextField, FormControl,

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
  TablePagination,} from '@mui/material';
import { LoadingButton } from '@mui/lab';
// component
import api from '../../../utils/api'
// ----------------------------------------------------------------------

export default function NewCarros() {


  const navigate = useNavigate();

  const [ano, setAno] = useState();
  const [placa, setPlaca] = useState();
  const [modelo, setModelo] = useState();
  const [fabricante, setFabricante] = useState();
  const [cliente, setCliente] = useState();


  const tenantId = JSON.parse(getTenant_id())

  var access_token = JSON.parse(getAcessToken())


  async function formAssociados() {
    await api.post(`/dashboard/${tenantId}/carros/add`,{
 

          ano,
          placa,
          modelo,
          fabricante,
          cliente

      
      },{
        headers: {
          'Authorization': `Bearer ${access_token}`
        },
  
      } ).then((response) =>{
        console.log(response)
        if(response.status == 200){
          alert("Campo(s) Obrigatirio(s) esta(ão) vazio(s)!")
        }
        if(response.status == 201){
          alert("Cadastrado com Sucesso")
        }
    })
 }

   const handleSubmit = async e => {
    e.preventDefault();
    formAssociados();


  }
 
  const particlesInit = async (main) => {
    console.log(main);
 
    // you can initialize the tsParticles instance (main) here, adding custom shapes or presets
    // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
    // starting from v2 you can add only the features you need reducing the bundle size
    await loadFull(main);
  };

  const particlesLoaded = (container) => {
    console.log(container);
  };



  return (
    <Page title="Clientes">   
     
      <Container maxWidth="xl">
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Button >
            <Typography variant="h4" color="black" gutterBottom>
              Novo Carro
            </Typography>
          </Button>
     

        
        </Stack>

        <Card style={cardForm}>
          <FormControl style={StachForm} >
            <form autoComplete="off" noValidate onSubmit={handleSubmit}>
              <Stack spacing={3}  >
               
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} >

                  <Stack direction={{ xs: 'column', sm: 'column' }} spacing={2} >

                      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                        <TextField
                          fullWidth
                          required
                          autoComplete="username"
                          type="text"
                          label="Ano"
                          onChange={e => setAno(e.target.value)}
                          style={controlFormCep}
                        />
                        <TextField
                          fullWidth
                          required
                          autoComplete="username"
                          type="text"
                          label="Placa"
                          onChange={e => setPlaca(e.target.value)}
                          style={controlFormCep}
                        />
                      </Stack>


                      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                        <TextField
                          fullWidth
                          required
                          autoComplete="username"
                          type="text"
                          label="Modelo"
                          onChange={e => setModelo(e.target.value)}
                          style={controlFormCep}
                        />
                        <TextField
                          fullWidth
                          required
                          autoComplete="username"
                          type="text"
                          label="Fabricante"
                          onChange={e => setFabricante(e.target.value)}
                          style={controlFormCep}
                        />
                      </Stack>


                      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                        <TextField
                          fullWidth
                          required
                          autoComplete="username"
                          type="text"
                          label="Cliente"
                          onChange={e => setCliente(e.target.value)}
                          style={controlFormCep}
                        />
                        
                      </Stack>

                      
                  </Stack>
                  
                
                </Stack>

                <LoadingButton fullWidth size="large" type="submit" variant="contained" >
                  Registrar
                </LoadingButton>
              </Stack>

            </form>
          </FormControl>
        </Card>
      </Container>   
    </Page>
  );
}



const cardForm ={
  padding: "2em"
}


const StachForm ={
  display: "flex",
  justifyContent: "center",
  alignItems: "center"
}


const controlFormCep= {
  height: "55px",
  borderRadius: 10
}




const textoAjudaDC = {
  fontSize: 11,
  margin: 3
}















































