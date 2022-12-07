
import * as Yup from 'yup';
import { useEffect, useState } from 'react';
import InputMask from 'react-input-mask';
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
// material
import { Stack, TextField, FormControl, MenuItem, InputLabel, Typography} from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import { LoadingButton } from '@mui/lab';
// component
import axios from 'axios'
import {getAcessToken} from '../../../utils/services/auth'

export default function AtuliazarStatus(associado) {


console.log(associado)

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
const [status, setStatus] = useState("");
const [data_cobranca,setdateCobranca] = useState("");
const [tenant_id,setTenant_id] = useState("");


useEffect(() => {
  if(associado.associado!= null && associado.associado != 'undefined'){
    setNome(associado.associado.nome)
    setFantasia(associado.associado.nome_artistico)
    setCpfCnpj(associado.associado.cnpf_cnpj)
    setLogradouro(associado.associado.rua)
    setNumero(associado.associado.numero)
    setCidade(associado.associado.cidade)
    setUf(associado.associado.uf)
    setCep(associado.associado.cep)
    setTelefone1(associado.associado.telefone1)
    setTelefone2(associado.associado.telefone2)
    setEmail(associado.associado.email)
    setEmail2(associado.associado.email2)
    setData_nascimento(associado.associado.data_nascimento)
    setPais(associado.associado.pais)
    setdateCobranca(associado.associado.data_cobranca)
    setTenant_id(associado.associado.tenant_id)
  }
});





  var access_token = JSON.parse(getAcessToken())

  

  async function formAssociados() {
    await axios.post(`https://associados.api.expertusdigital.com/admin/atualizarassociado/${associado.associado.id}`,{
 

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

          status,
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
    e.preventDefault();
    await  formAssociados()

    window.location.reload();
  }
 

  const handleChange = (event: SelectChangeEvent) => {

    setStatus(event.target.value );
  
  };


  return (
    <FormControl >
      <form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
        <Typography style={tituloStatus}>Selecioneo o status do Associado</Typography>
          
          <Stack direction={{ xs: 'column', sm: 'row', mt: 5 }}  fullWidth  style={stackSelect} >
            <InputLabel fullWidth ></InputLabel>
                <Select fullWidth
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={status}
               
                    onChange={handleChange}
                >
                    <MenuItem value="aprovado">Aprovado</MenuItem>
                    <MenuItem value="bloqueado">Bloqueado</MenuItem>
                    <MenuItem value="pendente">Pendente</MenuItem>
                </Select>
          </Stack>

   

          <LoadingButton fullWidth size="large" type="submit" variant="contained" >
            Alterar status
          </LoadingButton>




          <Stack direction={{ xs: 'column', sm: 'column', mt: 5 }}  fullWidth  style={stackSelect} >
            <Stack direction={{ xs: 'column', sm: 'column', mt: 5 }}  fullWidth  style={stackSelect} >
              <Typography style={tituloHelpText} color="green">Aprovado</Typography>
              <Typography style={conteudoHelpText}>Pagmento Realizado</Typography>
            </Stack>

            <Stack direction={{ xs: 'column', sm: 'column', mt: 5 }}  fullWidth  style={stackSelect} >
              <Typography style={tituloHelpText} color="red">Bloqueado</Typography>
              <Typography style={conteudoHelpText}>Pagamento não foi realizado dentro do prazo</Typography>
            </Stack>

            <Stack direction={{ xs: 'column', sm: 'column', mt: 5 }}  fullWidth  style={stackSelect} >
              <Typography style={tituloHelpText} color="#eed269">Pendente</Typography>
              <Typography style={conteudoHelpText}>Pagamento a ser realizado</Typography>
            </Stack>
          </Stack>


        </Stack>
      </form>
    </FormControl>
  );
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
