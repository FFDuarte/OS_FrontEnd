import React from 'react';
import * as Yup from 'yup';
import { useEffect, useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

import api from '../../../utils/api'
// material
import { Link, Stack, Checkbox, TextField, IconButton, InputAdornment, FormControlLabel, FormControl, FormGroup, Alert, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// component
import Iconify from '../../../components/Iconify';
import {setAcessToken, setTenant_id,getAcessToken,setAcessAdmin } from '../../../utils/services/auth'
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
// ----------------------------------------------------------------------
async function tenantLogin(credentials) {
  return fetch('https://associados.api.expertusdigital.com/dashboard/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  })
    .then(data => data.json())
 }

 async function adminLogin(credentials) {
  return fetch('https://associados.api.expertusdigital.com/admin/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  })
    .then(data => data.json())
 }



 
export default function LoginForm() {



  const [show, setShow] = useState(false);
 

  function  AlertIncorret (valor) {
    
   
  

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(valor);

    useEffect(() => {
      handleShow()
    });
    
  
    return(
      <div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
    )
  }

  const [email, setUserName] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const login = await tenantLogin({
      email,
      password
    });


    const adminlogin = await adminLogin({
      email,
      password
    });
    
    
    if(login != 'Unauthorized' && login != null   ){
      if(login.access_token){
        setAcessToken(login.access_token)
        setTenant_id(login.tenant_id)
        navigate("/dashboard/", { replace: true });

      }
      else if(adminlogin != 'Unauthorized' && adminlogin != null   ){
        if(adminlogin.access_token){
          setAcessToken(adminlogin.access_token)
          setAcessAdmin("admin")
          navigate("/admin/profile", { replace: true });
        }else{
          alert("Login ou Senhas incorreto")
        }
      }
    }


    
     
  }


  return (
    <FormControl >
      <form autoComplete="on" onSubmit={handleSubmit} >
        <Stack spacing={3}>
          <TextField
            fullWidth
            autoComplete="username"
            type="email"
            label="Email address"
            onChange={e => setUserName(e.target.value)}
          
          />

          <TextField
            fullWidth
            autoComplete="current-password"
            type={showPassword ? 'text' : 'password'}
            label="Password"
            onChange={e => setPassword(e.target.value)}
        
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

        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
         
         
        </Stack>
     
        <LoadingButton fullWidth size="large" type="submit" variant="contained"  >
          Login
        </LoadingButton>
      </form>
    </FormControl>
  );
}
