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
import api from '../../utils/api'
// ----------------------------------------------------------------------

export default function EmpresaAlterar(empresasDados) {

 

  const navigate = useNavigate();

  const [empresa, setEmpresa] = useState(empresasDados.empresa.empresa);
  const [fantasia, setFantasia] = useState(empresasDados.empresa.fantasia);
  const [cnpf_cnpj, setCpfCnpj] = useState(empresasDados.empresa.cnpf_cnpj);
  const [logradouro, setLogradouro] = useState(empresasDados.empresa.logradouro);
  const [numero, setNumero] = useState(empresasDados.empresa.numero);
  const [bairro, setBairro] = useState(empresasDados.empresa.bairro);
  const [cidade, setCidade] = useState(empresasDados.empresa.cidade);
  const [uf, setUf] = useState(empresasDados.empresa.uf);
  const [cep, setCep] = useState(empresasDados.empresa.cep);
  const [telefone1, setTelefone1] = useState(empresasDados.empresa.telefone1);
  const [telefone2, setTelefone2] = useState(empresasDados.empresa.telefone2);
  const [id, setId] = useState(empresasDados.empresa.id);


  const tenantId = JSON.parse(getTenant_id())
  var access_token = JSON.parse(getAcessToken())


  async function formAssociados() {
    await api.post(`/dashboard/${tenantId}/usuarios/atualizar/tenant/${id}`,{
 

          id,
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
          telefone2,

      
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
    formAssociados();
  }
 



  return (
    <FormControl >
      <form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>

        
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <TextField
                fullWidth
                autoComplete="username"
                type="text"
                label="Rua"

                value={logradouro}

                onChange={e => setLogradouro(e.target.value)}

              />

              <TextField
                fullWidth
                autoComplete="username"
                type="number"
                label="Numero"

                value={numero}

                onChange={e => setNumero(e.target.value)}

              />

          

         
          </Stack>


          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
      

            <TextField
                fullWidth
                autoComplete="username"
                type="number"
                label="Cep"

                value={cep}

                onChange={e => setCep(e.target.value)}

              />
  <TextField
                fullWidth
                autoComplete="username"
                type="text"
                label="Bairro"

                value={bairro}

                onChange={e => setBairro(e.target.value)}
              />

         
          </Stack>

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          

              <TextField
                fullWidth
                autoComplete="username"
                type="text"
                label="Cidade"

                value={cidade}

                onChange={e => setCidade(e.target.value)}
              />

              <TextField
                fullWidth
                autoComplete="username"
                type="text"
                label="UF"

                value={uf}
                onChange={e => setUf(e.target.value)}
              />

            
          </Stack>
    
   

          <LoadingButton fullWidth size="large" type="submit" variant="contained" >
          Alterar Informações

          </LoadingButton>
        </Stack>
      </form>
    </FormControl>
  );
}
