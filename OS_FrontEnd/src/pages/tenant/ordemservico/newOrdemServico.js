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
  TablePagination,
  CardHeader,
  Divider,
  ListItem,
  Paper,
  ListItemText,} from '@mui/material';
import { LoadingButton } from '@mui/lab';
// component
import api from '../../../utils/api'
// ----------------------------------------------------------------------

export default function NewOrdemServico() {


  const navigate = useNavigate();

  const [cliente, setCliente] = useState();
  const [carro, setCarro] = useState();
  const [peca, setPeca] = useState();
  const [valor_servico, setValorServico] = useState();
  const [descricao_servico, setDescricaoServico] = useState();

  const tenantId = JSON.parse(getTenant_id())

  var access_token = JSON.parse(getAcessToken())


  async function formAssociados() {
    await api.post(`/dashboard/${tenantId}/os/add`,{
 

          cliente,
          carro,
          peca,
          valor_servico,
          descricao_servico

      
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
              Novo Associado
            </Typography>
          </Button>
     

        
        </Stack>

        <Card style={cardForm} >
          <FormControl style={StachForm} >
            <form autoComplete="off" noValidate onSubmit={handleSubmit}>
              <Stack spacing={3}  >
               
                <Stack direction={{ xs: 'column', sm: 'column' }} spacing={2}  >
                    <Stack direction={{ xs: 'column', sm: 'row' }}>
                      <Card sx={{mr:2}}>
                        <Typography sx={{p: 1}}> Dados do Cliente</Typography>
                        <Divider ></Divider>
                        <Box sx={{p: 2}}>
                          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{p:1}}>
                                
                                <TextField
                                  fullWidth
                                  required
                                  autoComplete="username"
                                  type="text"
                                  label="Selecionar CLiente"
                                  onChange={e => setCarro(e.target.value)}
                                  style={controlFormCep}
                                />
                          </Stack>
                          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{p:1}}>
                                <TextField
                                  fullWidth
                                  required
                                  autoComplete="username"
                                  type="text"
                                  label="Nome do Cliente"
                                  onChange={e => setCliente(e.target.value)}
                                  style={controlFormCep}
                                />
                                <TextField
                                  fullWidth
                                  required
                                  autoComplete="username"
                                  type="text"
                                  label="CPF/CNPJ "
                                  onChange={e => setCarro(e.target.value)}
                                  style={controlFormCep}
                                />
                          </Stack>
                          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{p:1}}>
                                <TextField
                                  fullWidth
                                  required
                                  autoComplete="username"
                                  type="text"
                                  label="Telefone"
                                  onChange={e => setCliente(e.target.value)}
                                  style={controlFormCep}
                                />
                                <TextField
                                  fullWidth
                                  required
                                  autoComplete="username"
                                  type="text"
                                  label="Email"
                                  onChange={e => setCarro(e.target.value)}
                                  style={controlFormCep}
                                />
                          </Stack>
                        </Box>
                      </Card>

                      <Card >
                        <Typography sx={{p: 1}}> Dados do Veiculo</Typography>
                        <Divider ></Divider>

                       <Box sx={{p: 2}}>
                          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{p:1}}>
                            <TextField
                                  fullWidth
                                  required
                                  autoComplete="username"
                                  type="text"
                                  label="Selecionar Veiculo"
                                  onChange={e => setCliente(e.target.value)}
                                  style={controlFormCep}
                                />
                          </Stack>

                          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{p:1}}>
                                <TextField
                                  fullWidth
                                  required
                                  autoComplete="username"
                                  type="text"
                                  label="Placa"
                                  onChange={e => setCliente(e.target.value)}
                                  style={controlFormCep}
                                />
                                <TextField
                                  fullWidth
                                  required
                                  autoComplete="username"
                                  type="text"
                                  label="Ano"
                                  onChange={e => setCarro(e.target.value)}
                                  style={controlFormCep}
                                />
                          </Stack>

                          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{p:1}}>
                                <TextField
                                  fullWidth
                                  required
                                  autoComplete="username"
                                  type="text"
                                  label="Modelo"
                                  onChange={e => setCliente(e.target.value)}
                                  style={controlFormCep}
                                />
                                <TextField
                                  fullWidth
                                  required
                                  autoComplete="Fabricante"
                                  type="text"
                                  label="CPF/CNPJ "
                                  onChange={e => setCarro(e.target.value)}
                                  style={controlFormCep}
                                />
                          </Stack>
                       </Box>
                      </Card>
                    </Stack>

                    <Card sx={{pt:1,pb:1}} >
                        <Typography sx={{p: 1}}> Peças</Typography>
                        <Divider ></Divider>
                          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{p:2}} >
                                <TextField
                                  fullWidth
                                  required
                                  autoComplete="username"
                                  type="text"
                                  label="Selecionar Peças"
                                  onChange={e => setCliente(e.target.value)}
                                  style={controlFormCep}
                                />
                          </Stack>
                          <ListItem style={ListItemHeader}>
                                <ListItemText primary="Nome" />
                                <ListItemText primary="Marca" />    
                                <ListItemText primary="Ano Fabricação" />   
                                <ListItemText primary="Categoria" />          
                                <ListItemText primary="Preço" />            
                                <ListItemText style={itemText} primary="Admin" />       
                          </ListItem> 
                          <Paper style={paperGrid} >
                            <ListItem  divider>
                              <ListItem>
                                <ListItemText primary="Nome" />
                                <ListItemText primary="Marca" />    
                                <ListItemText primary="Ano Fabricação" />   
                                <ListItemText primary="Categoria" />          
                                <ListItemText primary="Preço" />            
                                <ListItemText style={itemText} primary="Admin" />       
                              </ListItem> 
                            </ListItem>
                            <ListItem  divider>
                              <ListItem>
                                <ListItemText primary="Nome" />
                                <ListItemText primary="Marca" />    
                                <ListItemText primary="Ano Fabricação" />   
                                <ListItemText primary="Categoria" />          
                                <ListItemText primary="Preço" />            
                                <ListItemText style={itemText} primary="Admin" />       
                              </ListItem> 
                            </ListItem>
                            <ListItem  divider>
                              <ListItem>
                                <ListItemText primary="Nome" />
                                <ListItemText primary="Marca" />    
                                <ListItemText primary="Ano Fabricação" />   
                                <ListItemText primary="Categoria" />          
                                <ListItemText primary="Preço" />            
                                <ListItemText style={itemText} primary="Admin" />       
                              </ListItem> 
                            </ListItem>
                            <ListItem  divider>
                              <ListItem>
                                <ListItemText primary="Nome" />
                                <ListItemText primary="Marca" />    
                                <ListItemText primary="Ano Fabricação" />   
                                <ListItemText primary="Categoria" />          
                                <ListItemText primary="Preço" />            
                                <ListItemText style={itemText} primary="Admin" />       
                              </ListItem> 
                            </ListItem>
                            <ListItem  divider>
                              <ListItem>
                                <ListItemText primary="Nome" />
                                <ListItemText primary="Marca" />    
                                <ListItemText primary="Ano Fabricação" />   
                                <ListItemText primary="Categoria" />          
                                <ListItemText primary="Preço" />            
                                <ListItemText style={itemText} primary="Admin" />       
                              </ListItem> 
                            </ListItem>
                            <ListItem  divider>
                              <ListItem>
                                <ListItemText primary="Nome" />
                                <ListItemText primary="Marca" />    
                                <ListItemText primary="Ano Fabricação" />   
                                <ListItemText primary="Categoria" />          
                                <ListItemText primary="Preço" />            
                                <ListItemText style={itemText} primary="Admin" />       
                              </ListItem> 
                            </ListItem>
                            <ListItem  divider>
                              <ListItem>
                                <ListItemText primary="Nome" />
                                <ListItemText primary="Marca" />    
                                <ListItemText primary="Ano Fabricação" />   
                                <ListItemText primary="Categoria" />          
                                <ListItemText primary="Preço" />            
                                <ListItemText style={itemText} primary="Admin" />       
                              </ListItem> 
                            </ListItem>
                            <ListItem  divider>
                              <ListItem>
                                <ListItemText primary="Nome" />
                                <ListItemText primary="Marca" />    
                                <ListItemText primary="Ano Fabricação" />   
                                <ListItemText primary="Categoria" />          
                                <ListItemText primary="Preço" />            
                                <ListItemText style={itemText} primary="Admin" />       
                              </ListItem> 
                            </ListItem>
                            <ListItem  divider>
                              <ListItem>
                                <ListItemText primary="Nome" />
                                <ListItemText primary="Marca" />    
                                <ListItemText primary="Ano Fabricação" />   
                                <ListItemText primary="Categoria" />          
                                <ListItemText primary="Preço" />            
                                <ListItemText style={itemText} primary="Admin" />       
                              </ListItem> 
                            </ListItem>
                            <ListItem  divider>
                              <ListItem>
                                <ListItemText primary="Nome" />
                                <ListItemText primary="Marca" />    
                                <ListItemText primary="Ano Fabricação" />   
                                <ListItemText primary="Categoria" />          
                                <ListItemText primary="Preço" />            
                                <ListItemText style={itemText} primary="Admin" />       
                              </ListItem> 
                            </ListItem>
                          </Paper>
                          
                    </Card>


                    <Card sx={{pt:1,pb:1}} >
                      <Typography sx={{p: 1}}> Dados do Serviço</Typography>
                      <Divider ></Divider>
                      <Box sx={{p: 2}}>
                        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{p:1}} >
                                  <TextField
                                    fullWidth
                                    required
                                    autoComplete="username"
                                    type="text"
                                    label="Descrição do serviço"
                                    onChange={e => setCliente(e.target.value)}
                                    style={controlFormCep}
                                  />
                                  <TextField
                                    fullWidth
                                    required
                                    autoComplete="username"
                                    type="text"
                                    label="Valor do Serviço "
                                    onChange={e => setCarro(e.target.value)}
                                    style={controlFormCep}
                                  />
                        </Stack>
                        <Stack spacing={2} sx={{p:1}} >
                              <TextField
                                      fullWidth
                                      required
                                      autoComplete="username"
                                      type="text"
                                      label="Observações"
                                      onChange={e => setCarro(e.target.value)}
                                      style={controlFormCep}
                                    />
                        </Stack>
                      </Box>
                    </Card>
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
  alignItems: "center",
  width: "100%",
}


const controlFormCep= {
  height: "55px",
  borderRadius: 10
}




const ListItemHeader = {
  paddingTop: '1.5em',
  paddingLeft: '2em',
  background: "#E5E4E2",
  boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px"
}









const style = {
  bgcolor: 'background.paper',
  border: '1px solid rgba(0,0,0,0.2)',
  padding: '1em',
  borderRadius: '1em'

};

const gridStyle = {
  paddingTop: '1.5em',
  paddingLeft: '2em'
}

const itemText = {
  fontSize: 14,
  color: "gray",
  textAlign: "right",

}

const TradeItem = {
  diplay: 'flex',
  justifyContent: 'space-between'
}


const paperGrid = {
  maxHeight: 250, 
  overflow: 'auto'
}







































