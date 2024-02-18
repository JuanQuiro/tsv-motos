'use client'

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";



type Inputs = {
  pass: string;
};

const schema = z.object({
  pass: z.string().nonempty("Token es requerido"),
});

const Home = () => {
  const router = useRouter()
  const { register, handleSubmit, formState: { errors } } = useForm<Inputs>({
    resolver: zodResolver(schema), // Zod resolver
  });

  const [isValidating, setIsValidating] = useState(false);
  const [isTokenValid, setIsTokenValid] = useState(false);

  const onSubmit = async (data: Inputs) => {
    setIsValidating(true);
    try {
      const response = await fetch("/api/validacion-token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: data.pass,
        }),
      });

      const result = await response.json();
      

      if (result.valid) {
        setIsTokenValid(true);
        router.push('/dashboard')
      } else {
        setIsTokenValid(false);
      }
    } catch (error) {
      console.error("Error validating token", error);
    } finally {
      setIsValidating(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-white shadow p-6 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Portal de Administrador</h2>
        {isTokenValid ? (
          <div className="text-green-500 mb-4">Token válido. Acceso concedido.</div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label htmlFor="pass" className="block text-gray-700">Token:</label>
              <input
                id="pass"
                type="text"
                {...register("pass")}
                className={`w-full px-4 py-2 border ${errors.pass ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring focus:ring-blue-200`}
              />
              {errors.pass && <p className="text-red-500">{errors.pass.message}</p>}
            </div>
            
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
              disabled={isValidating}
            >
              {isValidating ? "Validando..." : "Enviar"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Home;