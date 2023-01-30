import * as Yup from 'yup';
import { useEffect, useState } from 'react';
import InputMask from 'react-input-mask';
import { useNavigate, useParams } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import {getTenant_id,getAcessToken} from '../../../utils/services/auth'
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



// ----------------------------------------------------------------------
var tenantId = JSON.parse(getTenant_id())

var accesstoken = JSON.parse(getAcessToken())



export default function EditClientes() {

  const tenant_id = tenantId
  var access_token = accesstoken

  const idAssociado = useParams();

  


  let  navigate = useNavigate();

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

 



  




  async function formGetAssociado(id) {
    await api.get(`dashboard/${tenantId}/clientes/buscar/${id}`,{
       headers: {
         'Authorization': `Bearer ${access_token}`
       },
 
     } ).then((response) =>{  
    
        setNome(response.data.nome)
     
        setCpfCnpj(response.data.cpf)
        setLogradouro(response.data.rua)
        setNumero(response.data.numero)
        setCidade(response.data.cidade)
        setUf(response.data.uf)
        setCep(response.data.cep)
        setTelefone1(response.data.telefone)
      
        setEmail(response.data.email)
       
        setData_nascimento(response.data.data_nascimento)
        setPais(response.data.pais)
      
      
   })


 }


 
 useEffect(() => {
    // Atualiza o título do documento usando a API do browser
    formGetAssociado(idAssociado.id)
  }, []);
  

  async function formAssociados() {
    await api.post(`dashboard/${tenant_id}/clientes/atualizar/${idAssociado.id}`,{
 

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
        telefone,
        tenant_id

      
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
    

    <Container maxWidth="xl">
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Button >
          <Typography variant="h4" color="black" gutterBottom>
            Editar Cliente
          </Typography>
        </Button>
   

      
      </Stack>

      <Card style={cardForm}>
      <FormControl  style={StachForm}>
        <form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <Stack spacing={3}  >
               
               <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} >

                 <Stack direction={{ xs: 'column', sm: 'column' }} spacing={2} >

                     <Stack direction={{ xs: 'column', sm: 'column' }} spacing={2}>
                      <Typography style={textoAjudaDC} sx={{mb: -2}}>Nome</Typography>
                        <TextField
                          fullWidth
                          required
                          autoComplete="username"
                          type="text"
                          value={nome}
                          onChange={e => setNome(e.target.value)}
                          style={controlFormCep}
                        />
                     </Stack>

                     <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                        <Stack direction={{ xs: 'column', sm: 'column' }}>
                          <Typography style={textoAjudaDC}>CPF/CNPJ</Typography>
                          <Form.Control placeholder='CPF/CNPJ *' as={InputMask} fullWidth   value={cpf}      onChange={e => setCpfCnpj(e.target.value)} style={controlFormCep}/>

                        </Stack>
                         
                         <Stack direction={{ xs: 'column', sm: 'column' }}>
                          <Typography style={textoAjudaDC}>Data de Nascimento </Typography>
                          <Form.Control placeholder='Data de Nascimento *' as={InputMask} fullWidth   value={data_nascimento}    mask="9999-99-99"      onChange={e => setData_nascimento(e.target.value)} style={controlFormCep}/>

                        </Stack>

                     

                     </Stack>

                    <Stack>
                    <Typography style={textoAjudaDC}>Telefone</Typography>
                     <Form.Control placeholder='Telefone *' as={InputMask} fullWidth      mask="(99)-99999-9999"   value={telefone}  onChange={e => setTelefone1(e.target.value)} style={controlFormCep}/>

                    </Stack>

                    <Stack>

                    <Typography style={textoAjudaDC}>Email</Typography>
                                        <TextField fullWidth required autoComplete="username" type="email"   value={email} onChange={e => setEmail(e.target.value)}  style={controlFormCep}/>


                    </Stack>
                                        
                 </Stack>
                 
                 <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} >

                   <Stack direction={{ xs: 'column', sm: 'column' }} spacing={2}>
                      <Stack>
                      <Typography style={textoAjudaDC} >Rua</Typography>
                          <TextField
                            fullWidth
                            autoComplete="username"
                            type="text"
                            
                            onChange={e => setLogradouro(e.target.value)}
                            style={controlFormCep}
                            value={rua}
                          />
                      </Stack>

                      <Stack>
                      <Typography style={textoAjudaDC} >Numero</Typography>
                       <TextField
                         fullWidth
                         autoComplete="username"
                         type="number"
                       
                         style={controlFormCep}
                         onChange={e => setNumero(e.target.value)}
                         value={numero}

                       />
                      </Stack>

                      <Stack>
                      <Typography style={textoAjudaDC}>Cep</Typography>
                       <Form.Control as={InputMask} placeholder="Cep"  value={cep} fullWidth mask="999-999-99" onChange={e => setCep(e.target.value)} style={controlFormCep}/>
                      </Stack>
                   </Stack>

                   <Stack direction={{ xs: 'column', sm: 'column' }} spacing={2}>
                      <Stack>
                      <Typography style={textoAjudaDC}>Cidade</Typography>
                       <TextField
                         fullWidth
                         type="text"
                   
                         onChange={e => setCidade(e.target.value)}
                         style={controlFormCep}
                         value={cidade}
                       />
                      </Stack>
                   

                  <Stack>
                  <Typography style={textoAjudaDC}>UF</Typography>
                         <TextField
                           fullWidth
                           type="text"
                       
                           onChange={e => setUf(e.target.value)}
                           style={controlFormCep}
                           inputProps={{ maxLength: 2}}
                           value={uf}
                         />
                  </Stack>
                         
                   

                      <Stack>
                      <Typography style={textoAjudaDC}>Pais</Typography>
                       <TextField
                         fullWidth
                         autoComplete="username"
                         type="text"
                  
                         onChange={e => setPais(e.target.value)}
                         style={controlFormCep}
                         value={pais}
                       />
                      </Stack>

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
  height: "56px",
  marginBottom: 15,
  borderRadius: 8,
  border: "1px solid"
}

const textoAjudaDC = {
  fontSize: 15,
  fontWeight: 700
}




