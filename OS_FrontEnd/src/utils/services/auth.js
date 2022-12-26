import React from 'react';
import { Axios } from 'axios';



export const setTenant_id = (tenant_id) => {
    if(tenant_id != null){
        localStorage.setItem("tenant_id", JSON.stringify(tenant_id))
    }

}

export const getTenant_id = () =>{
    const tenant_id = localStorage.getItem("tenant_id");
    return tenant_id ; 
}
export const deleteTenant_id = () =>{
    localStorage.removeItem('tenant_id');

}





export const setAcessAdmin = (acessadmin) => {
    if(acessadmin != null){
        localStorage.setItem("acessadmin", JSON.stringify(acessadmin))
    }

}

export const getAcessAdmin = () =>{
    const acessadmin = localStorage.getItem("acessadmin");
    return acessadmin ; 
}
export const deleteAcessAdmin = () =>{
    localStorage.removeItem('acessadmin');

}











export const setAcessToken = (access_token) => {
   
    if(access_token!= null){
        localStorage.setItem("access_token", JSON.stringify(access_token))
    }

}

export const getAcessToken = () =>{
    const access_token = localStorage.getItem("access_token");
    return access_token
}
export const deleteAcessToken = () =>{
    localStorage.removeItem('access_token');

}








export const setIdUser = (id_user) => {
    localStorage.setItem("id_user", JSON.stringify(id_user))

}

export const getIduser = () =>{
    const id_user = localStorage.getItem("id_user");
    return id_user
}
export const deleteIdUser = () =>{
    localStorage.removeItem('id_user');

}












export const setUsuarioData = (usuario) => {
    localStorage.setItem("usuario", JSON.stringify(usuario))

}

export const getUsuario = () =>{
    const usuario = localStorage.getItem("usuario");
    return usuario
}
export const deleteUsuario = () =>{
    localStorage.removeItem('usuario');

}

export const setUserLogin = (userlogin) => {
    localStorage.setItem("userlogin", JSON.stringify(userlogin))

}

export const getUserLogin = () =>{
    const userlogin = localStorage.getItem("userlogin");
    return userlogin
}
export const deleteUserLogin = () =>{
    localStorage.removeItem('userlogin');

}
