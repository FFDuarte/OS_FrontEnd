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



export default function NewwAssociados() {


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
    await api.get(`admin/buscarassociado/${id}`,{
       headers: {
         'Authorization': `Bearer ${access_token}`
       },
 
     } ).then((response) =>{  
  
        setNome(response.data.nome)
        setFantasia(response.data.nome_artistico)
        setCpfCnpj(response.data.cnpf_cnpj)
        setLogradouro(response.data.rua)
        setNumero(response.data.numero)
        setCidade(response.data.cidade)
        setUf(response.data.uf)
        setCep(response.data.cep)
        setTelefone1(response.data.telefone1)
        setTelefone2(response.data.telefone2)
        setEmail(response.data.email)
        setEmail2(response.data.email2)
        setData_nascimento(response.data.data_nascimento)
        setPais(response.data.pais)
        setdateCobranca(response.data.data_cobranca)
        setStatus(response.data.status)
        setTenantId(response.data.tenant_id)
      
   })


 }


 
 useEffect(() => {
    // Atualiza o título do documento usando a API do browser
    formGetAssociado(idAssociado.id)
  }, []);
  

  async function formAssociados() {
    await api.post(`admin/atualizarassociado/${idAssociado.id}`,{
 

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

          data_cobranca,
          tenant_id,
          status

      
      },{
        headers: {
          'Authorization': `Bearer ${access_token}`
        },
  
      } ).then((response) =>{
       
     
    })


 

 }
 
   const handleSubmit = async e => {
    e.preventDefault();
    await  formAssociados()

    window.location.reload();
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
      <FormControl >
      <form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField
                fullWidth
                type="text"
             
                value={nome}
                onChange={e => setNome(e.target.value)}
            />
            <TextField
              fullWidth
              type="text"
              value={nome_artistico}
              onChange={e => setFantasia(e.target.value)}
            />
          </Stack>

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField
                  fullWidth
                  required
                  autoComplete="username"
                  type="text"
                  value={cnpf_cnpj}
                  onChange={e => setCpfCnpj(e.target.value)}
            />
             <TextField
                  fullWidth
                  required
                  autoComplete="username"
                  type="data"
                  value={data_nascimento}

                  onChange={e => setData_nascimento(e.target.value)}


                 
            />

          </Stack>
      
          <TextField
                fullWidth
                required
                autoComplete="username"
                type="email"
                value={email}

                onChange={e => setEmail(e.target.value)}

            
              
          />
            <TextField
                fullWidth
                autoComplete="username"
                type="email"
                value={email2}
                onChange={e => setEmail2(e.target.value)}

            
              
          />

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <TextField
                fullWidth
                autoComplete="username"
                type="text"
                value={rua}

                onChange={e => setLogradouro(e.target.value)}

              />

              <TextField
                fullWidth
                autoComplete="username"
                type="number"
                value={numero}

                onChange={e => setNumero(e.target.value)}

              />

            <TextField
                fullWidth
                autoComplete="username"
                type="number"
                value={cep}

                onChange={e => setCep(e.target.value)}

              />

         
          </Stack>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <TextField
                fullWidth
                autoComplete="username"
                type="text"
                value={cidade}

                onChange={e => setCidade(e.target.value)}
              />

              <TextField
                fullWidth
                autoComplete="username"
                type="text"
                value={uf}

                onChange={e => setUf(e.target.value)}
              />

              <TextField
                fullWidth
                autoComplete="username"
                type="text"
                value={pais}

                onChange={e => setPais(e.target.value)}
              />
          </Stack>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <TextField
                fullWidth
                required
                autoComplete="username"
                type="text"
                value={telefone1}

                onChange={e => setTelefone1(e.target.value)}
              />

            <TextField
                fullWidth
                required
                autoComplete="username"
                type="text"
                value={telefone2}

                onChange={e => setTelefone2(e.target.value)}
              />
               
          </Stack>


       
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
      

            <Form.Control
              as={InputMask}
              mask="99-99"
              value={data_cobranca}

              onChange={e => setdateCobranca(e.target.value)}

            />
          </Stack>

   

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


const controlFormCep= {
  height: "55px",
  marginBottom: 15,
  borderRadius: 10
}
