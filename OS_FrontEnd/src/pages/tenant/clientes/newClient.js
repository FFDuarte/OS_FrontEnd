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

export default function NewClient() {


  const navigate = useNavigate();

  const [nome, setNome] = useState();
  const [cpf, setCpfCnpj] = useState();
  const [rua, setLogradouro] = useState();
  const [numero, setNumero] = useState();
  const [cidade, setCidade] = useState();
  const [uf, setUf] = useState();
  const [cep, setCep] = useState();
  const [telefone, setTelefone1] = useState();
  const [email, setEmail] = useState();
  const [data_nascimento,setData_nascimento] = useState();
  const [pais, setPais] = useState();

  const tenant_id = JSON.parse(getTenant_id())

  var access_token = JSON.parse(getAcessToken())


  async function formAssociados() {
    await api.post(`/dashboard/${tenant_id}/clientes/add`,{
 

      nome,
          cpf,
          data_nascimento,
          rua,
          numero,
          cep,
          cidade,
          uf,
          pais,
          email,
          telefone

      
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
              Novo Cliente
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
                          label="Nome Completo"
                          onChange={e => setNome(e.target.value)}
                          style={controlFormCep}
                        />
                        
                      </Stack>

                      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                    
                          <Form.Control placeholder='CPF/CNPJ *' as={InputMask} fullWidth      mask="999-999-999-99"    onChange={e => setCpfCnpj(e.target.value)} style={controlFormCep}/>
                        
                          <Form.Control placeholder='Data de Nascimento *' as={InputMask} fullWidth      mask="9999-99-99"      onChange={e => setData_nascimento(e.target.value)} style={controlFormCep}/>

                      

                      </Stack>
                      <Form.Control placeholder='Telefone *' as={InputMask} fullWidth      mask="(99)-99999-9999"    onChange={e => setTelefone1(e.target.value)} style={controlFormCep}/>

                      <TextField fullWidth required autoComplete="username" type="email" label="Email address" onChange={e => setEmail(e.target.value)}  style={controlFormCep}/>


                      <Stack direction={{ xs: 'column', sm: 'column' }}>
                        <Typography style={textoAjudaDC}>Obs: Preencher com MES e ANO. Ex: 12-22</Typography>
                      </Stack>
                  </Stack>
                  
                  <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} >

                    <Stack direction={{ xs: 'column', sm: 'column' }} spacing={2}>
                        <TextField
                          fullWidth
                          autoComplete="username"
                          type="text"
                          label="Rua"
                          onChange={e => setLogradouro(e.target.value)}
                          style={controlFormCep}
                        />

                        <TextField
                          fullWidth
                          autoComplete="username"
                          type="number"
                          label="Numero"
                          style={controlFormCep}
                          onChange={e => setNumero(e.target.value)}

                        />

                      
                        <Form.Control as={InputMask} placeholder="Cep" fullWidth mask="999-999-99" onChange={e => setCep(e.target.value)} style={controlFormCep}/>
                      
                  
                      


                    </Stack>

                    <Stack direction={{ xs: 'column', sm: 'column' }} spacing={2}>
                        <TextField
                          fullWidth
                          type="text"
                          label="Cidade (Opcional)"
                          onChange={e => setCidade(e.target.value)}
                          style={controlFormCep}
                        />
                    
                          <TextField
                            fullWidth
                            type="text"
                            label="Uf (Opcional)"
                            onChange={e => setUf(e.target.value)}
                            style={controlFormCep}
                            inputProps={{ maxLength: 2}}
                          />
                          
                    

                      
                        <TextField
                          fullWidth
                          autoComplete="username"
                          type="text"
                          label="Pais (Opcional)"
                          onChange={e => setPais(e.target.value)}
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















































