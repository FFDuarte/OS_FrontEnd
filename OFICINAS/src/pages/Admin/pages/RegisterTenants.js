import * as Yup from 'yup';
import { useState } from 'react';
import { useFormik, Form, FormikProvider } from 'formik';
import { useNavigate } from 'react-router-dom';
// material
import { Stack, TextField, IconButton, InputAdornment , FormControl,Card,Container,Typography} from '@mui/material';
import { LoadingButton } from '@mui/lab';
// component
import Iconify from '../../components/Iconify';
import axios from 'axios';
import api from '../../utils/api'
// ----------------------------------------------------------------------
import Page from '../../components/Page';
import {getAcessToken} from '../../utils/services/auth'

export default function RegisterTenants() {
  
var accesstoken = JSON.parse(getAcessToken())
    const navigate = useNavigate();

  const [nome, setNome] = useState();
  const [empresa, setEmpresa] = useState();
  const [fantasia, setEmpresaFantasia] = useState();
  const [tenant_id, setTenant_id] = useState(empresa);
  const [cnpf_cnpj, setCpfCnpj] = useState();
  const [logradouro, setLogradouro] = useState();
  const [numero, setNumero] = useState();
  const [bairro, setBairro] = useState();
  const [cidade, setCidade] = useState();
  const [uf, setUf] = useState();
  const [cep, setCep] = useState();
  const [telefone1, setTelefone1] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [password_confirmation, setPassword_confirmation] = useState();


  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };


  var access_token = accesstoken
  async function adminLogin() {
    await api.post("/dashboard/registrar",{
          email,
          password,
          password_confirmation,
          tenant_id,

          nome,
          empresa,
          cnpf_cnpj,
          fantasia,

          logradouro,
          numero,
          bairro,
          cidade,
          uf,
          cep,

          telefone1,
      
      } ,{
        headers: {
          'Authorization': `Bearer ${access_token}`
        },
      }).then((response) =>{
        console.log(response.data)
    })
 }

 

   

   const handleSubmit = async e => {
    e.preventDefault();
    adminLogin();
  }
 


  return (
    <Page title="Clientes">   
   
      <Container maxWidth="xl">
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>

          <Typography variant="h4" gutterBottom>
            Cadastro de Usuarios
          </Typography>

          
        </Stack>

        <Card style={cardForm}>
          <FormControl  style={StachForm} >
            <form autoComplete="off" noValidate onSubmit={handleSubmit}>
              <Stack spacing={3}>

                <TextField
                  fullWidth
                  required
                  autoComplete="username"
                  type="text"
                  label="Nome Completo"
                  onChange={e => setNome(e.target.value)}
                />

                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                  <TextField
                    fullWidth
                    required
                    autoComplete="username"
                    type="text"
                    label="Nome da Empresa"
                    onChange={e => setEmpresa(e.target.value)}
                  />

                  <TextField
                    fullWidth
                    required
                    autoComplete="username"
                    type="text"
                    label="Nome Fantasia"
                    onChange={e => setEmpresaFantasia(e.target.value)}
                  />
                </Stack>


                <TextField
                      fullWidth
                      required
                      autoComplete="username"
                      type="text"
                      label="Nome para registro da Empresa"
                      onChange={e => setTenant_id(e.target.value)}
                    />

                  <TextField
                      fullWidth
                      required
                      autoComplete="username"
                      type="text"
                      label="CPF/CNPJ"
                      onChange={e => setCpfCnpj(e.target.value)}
                    />

                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                    <TextField
                      fullWidth
                      autoComplete="username"
                      type="text"
                      label="Logradouro (Opcional)"
                      onChange={e => setLogradouro(e.target.value)}

                    />

                    <TextField
                      fullWidth
                      autoComplete="username"
                      type="number"
                      label="Numero (Opcional)"
                      onChange={e => setNumero(e.target.value)}

                    />

                    <TextField
                      fullWidth
                      autoComplete="username"
                      type="text"
                      label="Bairro (Opcional)"
                      onChange={e => setBairro(e.target.value)}

                    />
                </Stack>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                    <TextField
                      fullWidth
                      autoComplete="username"
                      type="text"
                      label="Cidade (Opcional)"
                      onChange={e => setCidade(e.target.value)}
                    />

                    <TextField
                      fullWidth
                      autoComplete="username"
                      type="text"
                      label="Uf (Opcional)"
                      onChange={e => setUf(e.target.value)}
                    />

                    <TextField
                      fullWidth
                      autoComplete="username"
                      type="text"
                      label="Cep (Opcional)"
                      onChange={e => setCep(e.target.value)}
                    />
                </Stack>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                    <TextField
                      fullWidth
                      required
                      autoComplete="username"
                      type="text"
                      label="Telefone"
                      onChange={e => setTelefone1(e.target.value)}
                    />

                </Stack>


                <Stack spacing={3}>
                <TextField
                  fullWidth
                  required
                  autoComplete="username"
                  type="email"
                  label="Email address"
                  onChange={e => setEmail(e.target.value)}

              
                
                />

                <TextField
                  fullWidth
                  required
                  autoComplete="current-password"
                  type={showPassword ? 'text' : 'password'}
                  inputProps={{ minlength: 8}}
                  label="Senha"
                  onChange={e => setPassword(e.target.value)}
                  helperText="Mínimo 8 Caracteres"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment  position="end">
                        <IconButton edge="end" onClick={handleShowPassword}  >
                          <Iconify  icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                
                />


                <TextField
                  fullWidth
                  required
                  autoComplete="current-password"
                  type={showPassword ? 'text' : 'password'}
                  label="Confirmar senha "
                  onChange={e => setPassword_confirmation(e.target.value)}
                  helperText="Mínimo 8 Caracteres"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment  position="end">
                        <IconButton edge="end" onClick={handleShowPassword}  >
                          <Iconify  icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                
                />
              </Stack>

            
        

                <LoadingButton fullWidth size="large" type="submit" variant="contained" >
                  Register
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

