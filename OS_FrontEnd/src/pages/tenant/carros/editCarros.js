import * as Yup from 'yup';
import { useEffect, useState } from 'react';
import InputMask from 'react-input-mask';
import { useNavigate, useParams } from 'react-router-dom';
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
  TablePagination,
  Autocomplete,} from '@mui/material';
import { LoadingButton } from '@mui/lab';
// component
import api from '../../../utils/api'
// ----------------------------------------------------------------------


export default function EditCarros() {


  const navigate = useNavigate();

  const [ano, setAno] = useState();
  const [placa, setPlaca] = useState();
  const [modelo, setModelo] = useState();
  const [fabricante, setFabricante] = useState();
  const [clienteDados, setCliente] = useState();
  const [listCliente, setListCliente] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const tenant_id = JSON.parse(getTenant_id())

  var access_token = JSON.parse(getAcessToken())




 const idcarros = useParams();

   const handleSubmit = async e => {
    e.preventDefault();
    formAtualizar(idcarros)

  }
 
 

 async function formAtualizar(id) {
  const cliente =  JSON.stringify(clienteDados)
  console.log(id.id)
  await api.post(`dashboard/${tenant_id}/carros/atualizar/${id.id}`,{
    ano,
    placa,
    modelo,
    fabricante,
    cliente,
    tenant_id

  },{
     headers: {
       'Authorization': `Bearer ${access_token}`
     },

   } ).then((response) =>{  
  
 })


}



  useEffect(() => {
    const formGetAssociado = async (id) => {
     await api.get(`dashboard/${tenant_id}/carros/buscar/${id}`,{
      headers: {
        'Authorization': `Bearer ${access_token}`
      }
    } ).then((response)=>{
      setAno(response.data.ano)
      setPlaca(response.data.placa)
      setModelo(response.data.modelo)
      setFabricante(response.data.fabricante)
      setCliente(JSON.parse(response.data.cliente))
   
    })};
    formGetAssociado(idcarros.id)
    
  }, []);


 

setListCliente()
  


  


 



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
               
                
                      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                      <Box>
                 
                      <Typography style={textoAjudaDC} sx={{mb: -2}}>Clientes</Typography>
                        <Autocomplete
                        value={clienteDados}
                        onChange={(event, newValue) => {
                          setCliente(newValue);
                        }}
                        inputValue={inputValue}
                        onInputChange={(event, newInputValue) => {
                          setInputValue(newInputValue);
                        }}
                        id="controllable-states-demo"
                        options={listCliente}
                        
                        sx={{ width: 300 }}
                        renderInput={(params) => <TextField {...params} />}
                        />
                      </Box>
                        
                      </Stack>

                      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                        <Stack>
                          <Typography style={textoAjudaDC} sx={{mb: -2}}>Ano</Typography>
                            <TextField
                              fullWidth
                              required
                              autoComplete="username"
                              type="text"
                              value={ano}
                              onChange={e => setAno(e.target.value)}
                              style={controlFormCep}
                            />
                        </Stack>
                        <Stack>
                          <Typography style={textoAjudaDC} sx={{mb: -2}}>Placa</Typography>

                          <TextField
                            fullWidth
                            required
                            autoComplete="username"
                            type="text"
                            value={placa}
                            onChange={e => setPlaca(e.target.value)}
                            style={controlFormCep}
                          />
                        </Stack>
                      </Stack>


                      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                        <Stack>
                        <Typography style={textoAjudaDC} sx={{mb: -2}}>Modelo</Typography>
                        <TextField
                          fullWidth
                          required
                          autoComplete="username"
                          type="text"
                          value={modelo}
                          onChange={e => setModelo(e.target.value)}
                          style={controlFormCep}
                        />
                        </Stack>

                        <Stack>
                        <Typography style={textoAjudaDC} sx={{mb: -2}}>Fabricante</Typography>
                        <TextField
                          fullWidth
                          required
                          autoComplete="username"
                          type="text"
                          value={fabricante}
                          onChange={e => setFabricante(e.target.value)}
                          style={controlFormCep}
                        />
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
  fontSize: 15,
  margin: 3,
  fontWeight: 700
}















































