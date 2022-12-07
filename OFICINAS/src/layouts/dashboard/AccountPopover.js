import { useRef, useState,useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { alpha } from '@mui/material/styles';
import { Box, Divider, Typography, Stack, MenuItem, Avatar, IconButton } from '@mui/material';
// components
import MenuPopover from '../../components/MenuPopover';
// mocks_
import {  deleteUsuario, deleteIdUser, deleteAcessToken, deleteTenant_id,getTenant_id,deleteAcessAdmin  } from '../../utils/services/auth'
// ----------------------------------------------------------------------
import { useNavigate } from 'react-router-dom';
import api from '../../utils/api'


const MENU_OPTIONS = [

  {
    label: 'Profile',
    icon: 'eva:person-fill',
    linkTo: 'profile',
  },
];

// ----------------------------------------------------------------------

export default function AccountPopover() {
  let navigate = useNavigate()

  const anchorRef = useRef(null);

  const [open, setOpen] = useState(null);
  
  const [usuarios, setUsuarios] = useState([{
    email: '',
    nome: ''
  }]);

  const tenantId = JSON.parse(getTenant_id());

  useEffect(() => {
   

    const getData = async () => {
      const data = await api.get(`/dashboard/${tenantId}/usuarios/pesquisar/${tenantId}`, {
       
        })
        console.log(data)
        setUsuarios(data.data);
    };
    getData();
  }, []);


  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const handleLogout = () => {

    deleteAcessToken()
    deleteIdUser()
    deleteTenant_id()
    deleteUsuario()
    deleteUsuario()
    deleteAcessAdmin()
    navigate("/", { replace: true });

  };

  return (
    <>
      <IconButton
        ref={anchorRef}
        onClick={handleOpen}
        sx={{
          p: 0,
          ...(open && {
            '&:before': {
              zIndex: 1,
              content: "''",
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              position: 'absolute',
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.8),
            },
          }),
        }}
      >
        <Avatar alt="photoURL" />
      </IconButton>

      <MenuPopover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        sx={{
          p: 0,
          mt: 1.5,
          ml: 0.75,
          '& .MuiMenuItem-root': {
            typography: 'body2',
            borderRadius: 0.75,
          },
        }}
      >
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="subtitle2" noWrap>
            {usuarios.fantasia}
          </Typography>
     
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Stack sx={{ p: 1 }}>
          {MENU_OPTIONS.map((option) => (
            <MenuItem key={option.label} to={option.linkTo} component={RouterLink} onClick={handleClose}>
              {option.label}
            </MenuItem>
          ))}
        </Stack>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <MenuItem onClick={handleLogout} sx={{ m: 1 }}>
          Logout
        </MenuItem>
      </MenuPopover>
    </>
  );
}
