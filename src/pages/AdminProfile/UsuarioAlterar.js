import * as Yup from 'yup';
import { useState } from 'react';
import InputMask from 'react-input-mask';
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import {getTenant_id,getAcessToken} from '../../utils/services/auth'
// material
import { Stack, TextField, FormControl} from '@mui/material';
import { LoadingButton } from '@mui/lab';
// component
import axios from 'axios'
// ----------------------------------------------------------------------

export default function UsuarioAlterar(usuarios) {

 

  const navigate = useNavigate();

  const [nome, setNome] = useState(usuarios.usuarios.nome);
  const [email, setEmail] = useState(usuarios.usuarios.email);
  const [password, setPassword] = useState(usuarios.usuarios.password);



  const tenant_id = JSON.parse(getTenant_id())
  var access_token = JSON.parse(getAcessToken())


  async function formAssociados() {
    await axios.post(`http://localhost:8000/api/dashboard/${tenant_id}/usuarios/atualizar/usertenant/${usuarios.usuarios.id}`,{
 
      nome,
      email,
      password,
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
    formAssociados();
  }
 



  return (
    <FormControl >
      <form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>

       
            <TextField
              fullWidth
              required
              autoComplete="username"
              type="text"
              label="Usuario"
              value={nome}
              onChange={e => setNome(e.target.value)}
            />
            <TextField
              fullWidth
              required
              autoComplete="username"
              type="text"
              label="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />

            <TextField
              fullWidth
              required
              autoComplete="username"
              type="text"
              label="Senha"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
        
  
          <LoadingButton fullWidth size="large" type="submit" variant="contained" >
            Registrar
          </LoadingButton>
        </Stack>
      </form>
    </FormControl>
  );
}
