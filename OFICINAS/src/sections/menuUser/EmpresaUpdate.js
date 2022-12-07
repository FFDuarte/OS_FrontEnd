
import * as Yup from 'yup';
import { useEffect, useState } from 'react';
import InputMask from 'react-input-mask';
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
// material
import { Stack, TextField, FormControl} from '@mui/material';
import { LoadingButton } from '@mui/lab';
// component
import axios from 'axios'
import {getTenant_id,getAcessToken} from '../../utils/services/auth'

export default function NewwAssociados(associado) {



  const navigate = useNavigate();

  const [nome, setNome] = useState(associado.associado.nome);
  const [nome_artistico, setFantasia] = useState(associado.associado.nome_artistico);
  const [cnpf_cnpj, setCpfCnpj] = useState(associado.associado.cnpf_cnpj);
  const [rua, setLogradouro] = useState(associado.associado.rua);
  const [numero, setNumero] = useState(associado.associado.numero);
  const [cidade, setCidade] = useState(associado.associado.cidade);
  const [uf, setUf] = useState(associado.associado.uf);
  const [cep, setCep] = useState(associado.associado.cep);
  const [telefone1, setTelefone1] = useState(associado.associado.telefone1);
  const [telefone2, setTelefone2] = useState(associado.associado.telefone2);
  const [email, setEmail] = useState(associado.associado.email);
  const [email2, setEmail2] = useState(associado.associado.email2);
  const [data_nascimento,setData_nascimento] = useState(associado.associado.data_nascimento);
  const [pais, setPais] = useState(associado.associado.pais);
  const [data_cobranca,setdateCobranca] = useState(associado.associado.data_cobranca);






  const tenant_id = getTenant_id()
  var access_token = getAcessToken()

  

  async function formAssociados() {
    await axios.post(`http://localhost:8000/api/dashboard/${tenant_id}/associados/atualizar/${associado.associado.id}`,{
 

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
          tenant_id

      
      },{
        headers: {
          'Authorization': `Bearer ${access_token}`
        },
  
      } ).then((response) =>{
       
    })
 }
 
   const handleSubmit = async e => {
    formAssociados()
    e.preventDefault();
   
  }
 

  


  return (
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
            Registrar
          </LoadingButton>
        </Stack>
      </form>
    </FormControl>
  );
}

