'use client'
import React from "react";
import ReactDOM from "react-dom";
import { MuiFileInput } from "mui-file-input";
import { Controller, useForm } from "react-hook-form";

import { Box, Button } from "@mui/material";

const App = () => {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      file: null,
    },
  });

  const onSubmit = (data: any) => {
    alert(JSON.stringify(data.file));
    console.log(data);
    
    const apiResolver  = async () => {
      const formData = new FormData()
      formData.append('file', data.file)
      const response = await fetch('/api/documento', {
        method: 'POST',
        body: formData
      })
    }

    apiResolver()

  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
              placeholder="Insert a file"
              helperText={fieldState.invalid ? "File is invalid" : ""}
              error={fieldState.invalid}
            />
          );
        }}
        name="file"
      />
      <Box>
        <Button type="submit" variant="contained" sx={{ mt: 2 }}>
          Submit
        </Button>
      </Box>
    </form>
  );
};

export default App