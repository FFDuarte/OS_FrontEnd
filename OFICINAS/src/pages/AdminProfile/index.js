
import { useState } from 'react';
import React from "react"
import Particles from 'react-tsparticles'
import { loadFull } from "tsparticles";
import { useNavigate } from 'react-router-dom';
import api from '../../utils/api'
import {getAcessToken} from '../../utils/services/auth'

// material
import {
  Card,
  Grid,
  Container,
  ListItem,
  ListItemText,
  Avatar,
  Paper,
  Button,
  Modal,
  Box,

} from '@mui/material';
// components
import Page from '../../components/Page';
import  UserListToolbar  from '../../sections/menuUser';
import { useEffect } from 'react';

export default function AdminProfile() {

  const [usuarios,setUsuarios] = useState("")
  var access_token = JSON.parse(getAcessToken())


  useEffect(() => {
    const getData = async () => {
      const data = await api.get(`/admin/usuarios`, {
        headers: {
          'Authorization': `Bearer ${access_token}`
        },
  
        })
  
      setUsuarios(data.data[0]);
    };
    getData();

  }, []);

  console.log(usuarios)


  
  


  const particlesInit = async (main) => {
    // you can initialize the tsParticles instance (main) here, adding custom shapes or presets
    // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
    // starting from v2 you can add only the features you need reducing the bundle size
    await loadFull(main);
  };

  const particlesLoaded = (container) => {
    
  };

  return (
    <Page title="User">
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
            }}
        /> 
      <Container maxWidth="xl">
        <Card>
          <UserListToolbar> </UserListToolbar>
          <Grid   container spacing={3}>
            <Grid item xs={12} md={6} lg={5} style={gridStyle}>
              <Paper style={style} elevation={4}>
                  <ListItem button divider>
                    <ListItemText primary="Nome da Empresa" />      
                    <ListItemText style={itemText}  primary={usuarios.nome} />
                  </ListItem>

                  <ListItem button divider>
                    <ListItemText primary="Email" />   
                    <ListItemText style={itemText}  primary={usuarios.email} />
                  </ListItem>

              

              </Paper>
      
            </Grid>

          

          </Grid>

        
        </Card>
      </Container>
    </Page>
  );
}


const style = {
  bgcolor: 'background.paper',
  border: '1px solid rgba(0,0,0,0.2)',
  padding: '1em',
  borderRadius: '1em'

};
const style2 = {

  border: '1px solid rgba(0,0,0,0.2)',
  padding: '1em',
  borderRadius: '1em'
}
const styleitem = {
  bgcolor: 'white',
  padding: '1em',

}
const stylePaper2 = {
  bgcolor: 'background.paper',
  border: '1px solid rgba(0,0,0,0.2)',
  padding: '1em',
  borderRadius: '1em',
  marginTop: '2em'

};

const gridStyle = {
  padding: '3em'
}

const itemText = {
  fontSize: 14,
  color: "gray",
  textAlign: "right",

}

const ButtonItem = {
  diplay: 'flex',
  justifyContent: 'space-between'
}
const paperGrid = {
  maxHeight: 300, 
  overflow: 'auto',


}


const modalStyleAlert = {
  position: 'absolute' ,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  border: '2px solid #f2f2f2',
  boxShadow: 25,
  padding: '1em',
  display: 'flex',
  flexDirection: 'column',


}

