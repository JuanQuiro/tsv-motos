'use client'
import { Button, Link } from "@nextui-org/react";
import React from "react";

const ConfirmationMessage = () => {
  return (
    <div className="grid place-items-center h-screen">
      <div className="bg-blue-200 text-blue-800 py-8 px-10 rounded-lg max-w-md">
        <p className="text-lg font-bold mb-4 text-black">
          ¡Gracias por completar tu aplicación con TVS Finances!
        </p>
        <p className="mb-4">
          Tu información ha sido recibida y nuestro equipo la está revisando cuidadosamente.
          Nos comunicaremos contigo lo antes posible con una respuesta a tu solicitud de crédito.
          Mientras tanto, puedes acceder a tu dashboard para realizar cualquier modificación
          o comunicarte con nuestro servicio técnico.
        </p>
        <p className="mb-4">
          ¡Estamos emocionados de acompañarte en este viaje financiero con TVS!
        </p>
        <Button
        href="/dashoard-tvs"
        as={Link}
        color="primary"
        variant="solid"
        >
        Dashboard TVS
        </Button>
      </div>
    </div>
  );
};

export default ConfirmationMessage;