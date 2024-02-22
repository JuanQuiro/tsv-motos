'use client'
import React, { useState } from "react";
import ReactDOM from "react-dom";
import { MuiFileInput } from "mui-file-input";
import { Controller, useForm } from "react-hook-form";
import { auth } from '@clerk/nextjs';
import { Button } from "@nextui-org/react";
import { sendContactForm, usuarioCorreo } from "@/lib/api";
import axios from "axios";
import { useRouter } from 'next/navigation'





const App = ({userId} : any) => {
  const router = useRouter()

  const [state, setState] = useState({}) as any

  const { control, handleSubmit } = useForm({
    defaultValues: {
      file: null,
      file2: null,
      file3: null,
      file4: null,
    },
  });
  
  const onSubmit = (data: any) => {
    console.log(data);
    
    const apiResolver  = async () => {
      const formData = new FormData()
      formData.append('image', data.file)
      formData.append('image2', data.file2)
      formData.append('image3', data.file3)
      formData.append('image4', data.file4)
      formData.append("username", userId || 'ERROR');


      const response = await fetch('/api/documento', {
        method: 'POST',
        body: formData
      })
      
      const responses = await fetch('/api/documentos', {
        method: 'POST',
        body: JSON.stringify(userId),
      })
    }

    

   
    const obtenerUsuario = async () => {
      try {
        const response = await axios.get('/api/obtenerUsuario');
        return response.data;
      } catch (error) {
        console.error(error);
      }
    };
    
    const mostrarUsuario = async () => {
      const usuario = await obtenerUsuario();
      const usuarioData = usuario[0]
      //console.log('usuario',usuarioData);
      return usuarioData
    };
    
    const correos = async (state : any) => {
      console.log('estado',state);
      
      const data = {
        primerNombre: state.primerNombre,
        segundaNombre: state.segundaNombre,
        email: state.gmail,
        subject: '',
        message: '',
        // Documentos - 01
        CedulaDocumento: state.id_clerk,
        id: state.id_clerk,
      };

      await sendContactForm(data)
      await usuarioCorreo(data)
    }

    const apis =  async() => {
      const data = await mostrarUsuario();
      console.log('sasa',data)
      
      await correos(data)
    }

    apis()
    apiResolver()

    router.push('/finalizar')
  };

  return (
    <div className="grid pt-44 items-center">

    <form onSubmit={handleSubmit(onSubmit)}>
        <h3>Inserte la cedula de identidad</h3>
      <Controller
        control={control}
        rules={{
          validate: (value : any) => value instanceof File,
        }}
        render={({ field, fieldState }) => {
          return (
            <MuiFileInput
              inputProps={{ accept: '.png, .jpg' }}
             
              {...field}
              placeholder="Inserte imagen de cedula de identidad"
              helperText={fieldState.invalid ? "Dato es invalido" : ""}
              error={fieldState.invalid}
            />
          );
        }}
        name='file'
      />

<h3>Inserte una imagen de su Dashoard de Yummy</h3>

<Controller
        control={control}
        rules={{
          validate: (value : any) => value instanceof File,
        }}
        render={({ field, fieldState }) => {
          return (
            <MuiFileInput
              inputProps={{ accept: '.png, .jpg' }}
             
              {...field}
              placeholder="Inserte una imagen de su Dashoard de Yummy"
              helperText={fieldState.invalid ? "Dato es invalido" : ""}
              error={fieldState.invalid}
            />
          );
        }}
        name='file2'
      />

<h3>Inserte su rif</h3>

<Controller
        control={control}
        rules={{
          validate: (value : any) => value instanceof File,
        }}
        render={({ field, fieldState }) => {
          return (
            <MuiFileInput
              inputProps={{ accept: '.png, .jpg' }}
             
              {...field}
              placeholder="Inserte imagen de su RIF"
              helperText={fieldState.invalid ? "Dato es invalido" : ""}
              error={fieldState.invalid}
            />
          );
        }}
        name='file3'
      />

<h3>Inserte foto de usted con cedula</h3>

<Controller
        control={control}
        rules={{
          validate: (value : any) => value instanceof File,
        }}
        render={({ field, fieldState }) => {
          return (
            <MuiFileInput
              inputProps={{ accept: '.png, .jpg' }}
             
              {...field}
              placeholder="Inserte una foto de usted con cedula"
              helperText={fieldState.invalid ? "Dato es invalido" : ""}
              error={fieldState.invalid}
            />
          );
        }}
        name='file4'
      />

<div className="pt-5 grid place-items-center">

        <Button className=" bg-black text-white" type="submit">
          Enviar
        </Button>
</div>
    </form>
        </div>
  );
};

export default App