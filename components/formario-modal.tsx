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
import { toast, Toaster } from "sonner";





const App = ({userId} : any) => {
  const router = useRouter()

  const [state, setState] = useState({}) as any

  const { control, handleSubmit } = useForm({
    defaultValues: {
      file: null,
    },
  });
  
  const onSubmit = (data: any) => {

    
    const apiResolver  = async () => {
      const formData = new FormData()
      formData.append('image', data.file)
      formData.append('user', userId)


      try {
        const response = await fetch('/api/rechazo', {
          method: 'POST',
          body: formData
        });
        
        // Aquí puedes realizar el procesamiento de la respuesta de la primera llamada
       
      } catch (error) {
        // Manejar el error de la primera llamada
        console.error('Error en la primera llamada:', error);
      }
    }

    

   /*
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
    */

    const response = apiResolver()
    console.log(response);
    
  };

  return (
    <>
    <div>

    <Toaster />
    </div>

    <div className="grid  items-center">

    <form onSubmit={handleSubmit(onSubmit)}>
        <h3>Inserte la razon de rechazo</h3>
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
              placeholder="Inserte la razon de rechazo"
              helperText={fieldState.invalid ? "Dato es invalido" : ""}
              error={fieldState.invalid}
            />
          );
        }}
        name='file'
      />

<div className="pt-5 grid ">

        <Button className=" bg-black text-white" type="submit">
          Enviar
        </Button>
</div>
    </form>
        </div>
            </>
  );
};

export default App