import * as Yup from 'yup';
import { useEffect, useState } from 'react';
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
  TablePagination,
  MenuItem,
  InputLabel,
  Select,} from '@mui/material';
import { LoadingButton } from '@mui/lab';
// component
import axios from 'axios'

import api from '../../../utils/api'

// ----------------------------------------------------------------------

export default function NewwAssociados() {


  const navigate = useNavigate();

  const [nome, setNome] = useState();
  const [nome_artistico, setFantasia] = useState();
  const [cnpf_cnpj, setCpfCnpj] = useState();
  const [rua, setLogradouro] = useState();
  const [numero, setNumero] = useState();
  const [cidade, setCidade] = useState();
  const [uf, setUf] = useState();
  const [cep, setCep] = useState();
  const [telefone1, setTelefone1] = useState();
  const [telefone2, setTelefone2] = useState();
  const [email, setEmail] = useState();
  const [email2, setEmail2] = useState();
  const [data_nascimento,setData_nascimento] = useState();
  const [pais, setPais] = useState();
  const [data_cobranca,setdateCobranca] = useState();

  const tenantId = JSON.parse(getTenant_id())

  var access_token = JSON.parse(getAcessToken())


  async function formAssociados() {
    await axios.post(`https://associados.api.expertusdigital.com/admin/addassociado`,{
 

          nome,
          nome_artistico,
          cnpf_cnpj,
          data_nascimento,

          rua,
          numero,
          cep,
          cidade,
          uf,
          pais,

          email,
          email2,
          telefone1,
          telefone2,

          data_cobranca

      
      },{
        headers: {
          'Authorization': `Bearer ${access_token}`
        },
  
      } ).then((response) =>{
   
        if(response.status == 200){
          alert("Campo(s) Obrigatirio(s) esta(??o) vazio(s)!")
        }
     
        
    })
 }


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

 console.log(fetchedData)

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


  const handleChange = (event: SelectChangeEvent) => {

  
  };


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
            value: 500,
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
      }}/> 

      <Container maxWidth="xl">
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Button >
            <Typography variant="h4" color="black" gutterBottom>
              Novo Associado
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
                        <TextField
                          fullWidth
                          required
                          autoComplete="username"
                          type="text"
                          label="Nome Artistico"
                          onChange={e => setFantasia(e.target.value)}
                          style={controlFormCep}
                        />
                      </Stack>

                      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                    
                          <Form.Control placeholder='CPF/CNPJ *' as={InputMask} fullWidth      mask="999-999-999-99"    onChange={e => setCpfCnpj(e.target.value)} style={controlFormCep}/>
                        
                          <Form.Control placeholder='Data de Nascimento *' as={InputMask} fullWidth      mask="9999-99-99"      onChange={e => setData_nascimento(e.target.value)} style={controlFormCep}/>

                      

                      </Stack>
                      
                      <TextField fullWidth required autoComplete="username" type="email" label="Email address" onChange={e => setEmail(e.target.value)}  style={controlFormCep}/>

                      <TextField  fullWidth  autoComplete="username"  type="email"  label="Email address (opcional)"  onChange={e => setEmail2(e.target.value)}  style={controlFormCep} />

                      <Stack direction={{ xs: 'column', sm: 'column' }}>
                        <Form.Control as={InputMask} placeholder="Data de cobran??a" fullWidth mask="99-99" onChange={e => setdateCobranca(e.target.value)} style={controlFormCep} />
                        <Typography style={textoAjudaDC}>Obs: Preencher com MES e ANO. Ex: 12-22</Typography>
                      </Stack>

                    
                  </Stack>
                  <Stack direction={{ xs: 'column', sm: 'column' }} spacing={2} >
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
                      
                        <Form.Control placeholder='Telefone *' as={InputMask} fullWidth      mask="(99)-99999-9999"    onChange={e => setTelefone1(e.target.value)} style={controlFormCep}/>
                  
                      


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

                      <Form.Control placeholder='Telefone(opcional)' as={InputMask} fullWidth       mask="(99)-99999-9999"     onChange={e => setTelefone2(e.target.value)} style={controlFormCep}/>
                    </Stack>
                    </Stack>

                    <Stack direction={{ xs: 'column', sm: 'row', mt: 5 }}  fullWidth  >
                          <Select fullWidth
                              labelId="demo-simple-select-label"
                              id="demo-simple-select"
                              value="teste"
                              onChange={handleChange}
                          >

                            {fetchedData.map((user: any) => (
                                    
                                    <MenuItem value={user.id}>{user.nome}</MenuItem>
                                    
                                ))}
                          
                         
                          </Select>
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













const tituloStatus = {
  marginBottom: 15,
  fontSize: 18,
  fontWeight: 600,
  
 }
 
 const stackSelect = {
   marginBottom: 15
 }
 
 const tituloHelpText = {
   fontSize: 14,
   fontWeight: 600,
 }
 
 const conteudoHelpText = {
   fontSize: 12,
   fontWeight: 400,
 }



































