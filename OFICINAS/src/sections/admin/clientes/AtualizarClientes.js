import * as Yup from 'yup';
import { useEffect, useState } from 'react';
import InputMask from 'react-input-mask';
import { useNavigate, useParams } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import {getAcessToken} from '../../../utils/services/auth'
import Particles from 'react-tsparticles'
import { loadFull } from "tsparticles";
import Page from '../../../components/Page';
import {  TextField, FormControl,

  Card,
  Stack,
  Button,
  Container,
  Typography
 } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import axios from 'axios';
import api from '../../../utils/api';





var accesstoken = JSON.parse(getAcessToken())



export default function AtualizarClientes() {


  var access_token = accesstoken

  const idAssociado = useParams();

  let  navigate = useNavigate();

  const [associado , setAssociado] = useState(null);
  const [nome, setNome] = useState("");
  const [nome_artistico, setFantasia] = useState("");
  const [cnpf_cnpj, setCpfCnpj] = useState("");
  const [rua, setLogradouro] = useState("");
  const [numero, setNumero] = useState("");
  const [cidade, setCidade] = useState("");
  const [uf, setUf] = useState("");
  const [cep, setCep] = useState("");
  const [telefone1, setTelefone1] = useState("");
  const [telefone2, setTelefone2] = useState("");
  const [email, setEmail] = useState("");
  const [email2, setEmail2] = useState("");
  const [data_nascimento,setData_nascimento] = useState("");
  const [pais, setPais] = useState("");
  const [data_cobranca,setdateCobranca] = useState("");;
  const [status, setStatus] = useState("");
  const [tenant_id, setTenantId] = useState("");

  


 



  




  async function formGetAssociado(id) {
    await api.get(`admin/buscartenant/${id}`,{
       headers: {
         'Authorization': `Bearer ${access_token}`
       },
 
     } ).then((response) =>{  
     
      setNome(response.data.nome)
      setEmail(response.data.email)
      setTenantId(response.data.tenant_id)


      
   })


 }


 
 useEffect(() => {
    // Atualiza o título do documento usando a API do browser
    formGetAssociado(idAssociado.id)
  }, []);
  

  async function formAssociados() {
    await api.post(`admin/atualizartenant/${idAssociado.id}`,{
 

          nome,
          email
        

      
      },{
        headers: {
          'Authorization': `Bearer ${access_token}`
        },
  
      } ).then((response) =>{
        window.location.reload();
     
    })


 

 }
 
   const handleSubmit = async e => {
    e.preventDefault();
    await  formAssociados()

   
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

      <Card style={cardForm}>
      <FormControl  style={StachForm} >
      <form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField
                fullWidth
                type="text"
                label="Nome"
                value={nome}
                onChange={e => setNome(e.target.value)}
            />
            <TextField
              fullWidth
              type="text"
              label="Empresa"
              value={tenant_id}
              block
            />
          </Stack>

      
          <TextField
                fullWidth
                required
                autoComplete="username"
                type="email"
                value={email}
                label="Email"
                onChange={e => setEmail(e.target.value)}

          
          />
          

   

          <LoadingButton fullWidth size="large" type="submit" variant="contained" >
            Salvar Alteração
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
