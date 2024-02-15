'use client'
import React from "react";
import ReactDOM from "react-dom";
import { MuiFileInput } from "mui-file-input";
import { Controller, useForm } from "react-hook-form";
import { auth } from '@clerk/nextjs';
import { Button } from "@nextui-org/react";




const App = () => {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      file: null,
      file2: null,
      file3: null,
      file4: null,
    },
  });
  
  const onSubmit = (data: any) => {
    alert(JSON.stringify(data.file));
    console.log(data);
    
    const apiResolver  = async () => {
      const formData = new FormData()
      formData.append('image', data.file)
      formData.append('image2', data.file2)
      formData.append('image3', data.file3)
      formData.append('image4', data.file4)
      const response = await fetch('/api/documento', {
        method: 'POST',
        body: formData
      })
    }


    apiResolver()



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
              placeholder="Inserte la cedula de identidad"
              helperText={fieldState.invalid ? "Dato es invalido" : ""}
              error={fieldState.invalid}
            />
          );
        }}
        name='file'
      />

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
              placeholder="Inserte la cedula de identidad"
              helperText={fieldState.invalid ? "Dato es invalido" : ""}
              error={fieldState.invalid}
            />
          );
        }}
        name='file2'
      />

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
              placeholder="Inserte Imagen de dashoard de Yummy"
              helperText={fieldState.invalid ? "Dato es invalido" : ""}
              error={fieldState.invalid}
            />
          );
        }}
        name='file3'
      />

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