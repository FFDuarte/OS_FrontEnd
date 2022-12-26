import { Link as RouterLink } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import { Card, Link, Container, Typography } from '@mui/material';
// hooks
import useResponsive from '../../hooks/useResponsive';
// components
import Page from '../../components/Page';
import Logo from '../../components/Logo';
// sections
import { LoginForm } from '../../sections/auth/login';
import AuthSocial from '../../sections/auth/AuthSocial';
import React from "react"
import Particles from 'react-tsparticles'
import { loadFull } from "tsparticles";
 
// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

const HeaderStyle = styled('header')(({ theme }) => ({
  top: 0,
  zIndex: 9,
  lineHeight: 0,
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  position: 'absolute',
  padding: theme.spacing(3),
  justifyContent: 'space-between',
  [theme.breakpoints.up('md')]: {
    alignItems: 'flex-start',
    padding: theme.spacing(7, 5, 0, 7),
  },
}));

const SectionStyle = styled(Card)(({ theme }) => ({
  width: '100%',
  maxWidth: 464,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  margin: theme.spacing(2, 0, 2, 2),
}));

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function Login() {
  const smUp = useResponsive('up', 'sm');

  const mdUp = useResponsive('up', 'md');
  const particlesInit = async (main) => {
   
 
    // you can initialize the tsParticles instance (main) here, adding custom shapes or presets
    // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
    // starting from v2 you can add only the features you need reducing the bundle size
    await loadFull(main);
  };

  const particlesLoaded = (container) => {
    
  };

  return (
    <Page title="Login">
      <RootStyle>
        <HeaderStyle>
        
        </HeaderStyle>
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
        {mdUp && (
          <SectionStyle>
            <Typography variant="h6" sx={{ px: 5}} style={styleComplmentoFirst}>
              Ola, bem vindo.
            </Typography>
            <Typography variant="h2" sx={{ px: 5 , mt: 2}}  style={styleTitle}>
            Associados. 
            </Typography>
            <Typography variant="h3" sx={{ px: 5, mt: 2 }} style={styleComplmento}>
            O Programa de Associados da Expertus Digital lhe ajudara a gerenciar seus afiliados, parceiros ou clientes.
            </Typography>
          </SectionStyle>
        )}

        <Container maxWidth="sm">
          <ContentStyle>
         

            <LoginForm />

         
          </ContentStyle>
        </Container>
      </RootStyle>
    </Page>
  );
}
const styleComplmento = {
  fontSize: '20px',
  fontWeight: 500,
  lineHeight: '1.5em'
}


const styleTitle = {
  fontWeight: 900,
  lineHeight: '1.5em'
}

const styleComplmentoFirst = {
  fontSize: '20px',
  fontWeight: 500,
  lineHeight: '1.5em',
  fontStyle: 'italic'
}