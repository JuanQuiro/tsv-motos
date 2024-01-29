import React, { useState } from "react";
import {Button} from "@nextui-org/react";
import { Carousel } from 'flowbite-react';


const ComponenteEspecificoUno = () => {
  return <div className="bg-gray-200 p-4 rounded-lg shadow-md">
  <h2 className="text-2xl font-bold mb-4">Motor</h2>
  <p className="mb-2">
    <span className="font-semibold">Tipo: </span> Motor de un Solo Cilindro, de 4 tiempos, refrigerado por aire y con encendido a chispa
  </p>
  <p className="mb-2"><span className="font-semibold">Capacidad Del Motor: </span> 147,49 cc</p>
  <p className="mb-2"><span className="font-semibold">Potencia Maxima: </span> 8,8 kw a 7500 rpm</p>
  <p className="mb-2"><span className="font-semibold">Torque Maximo: </span> 12,3 Nm a 5000 rpm</p>
  <p className="mb-2"><span className="font-semibold">Tipo De Carburador: </span> MIKUNI BS 26 (tipo CV)</p>
  <p className="mb-2"><span className="font-semibold">Valvula Por Cilindro: </span>: 2 válvulas</p>
  <p className="mb-2"><span className="font-semibold">Arranque: </span>: Arranque a Pedal y Arranque Eléctrico</p>
  <p className="mb-2"><span className="font-semibold">Caja de Cambios: </span> 5 Velocidades, marchas constantes :1D4U</p>
</div>

};

const ComponenteEspecificoDos = () => {
    return <div className="bg-gray-200 p-4 rounded-lg shadow-md">
    <h2 className="text-2xl font-bold mb-4">Chasis y Suspencion</h2>
    <p className="mb-2">
      <span className="font-semibold">Tipo: </span> Tipo armazón simple
    </p>
    <p className="mb-2"><span className="font-semibold">Bastidor: </span> Telescópica sumergida en aceite</p>
    <p className="mb-2"><span className="font-semibold">Suspensión Delantera: </span> Amortiguadores hidráulicos ajustables de 5 pasos con balancín rectangular</p>
  </div>
  
  };

const ComponenteEspecificoTres = () => {
    return <div className="bg-gray-200 p-4 rounded-lg shadow-md">
    <h2 className="text-2xl font-bold mb-4">Sitema Elétrico</h2>
    <p className="mb-2"><span className="font-semibold">Batería: </span>12V, 5 Ah</p>
  <p className="mb-2"><span className="font-semibold">Faro Delantero: </span>12V, 35/35W, HS1</p>
  <p className="mb-2"><span className="font-semibold">Faro Trasero: </span>12V, 5/21 Wxl</p>
  </div>
  
  };


  const ComponenteEspecificoCuatro = () => {
    return <div className="bg-gray-200 p-4 rounded-lg shadow-md">
    <h2 className="text-2xl font-bold mb-4">Neumaticos Y Frenos</h2>
    <p className="mb-2"><span className="font-semibold">Neumático (delantero): </span>2,75 -17</p>
  <p className="mb-2"><span className="font-semibold">Neumático (trasero): </span>90/90 -17</p>
  <p className="mb-2"><span className="font-semibold">Freno Delantero: </span>Operado a mano, ampliándose internamente 130 mm de diámetro. Tambor</p>
  <p className="mb-2"><span className="font-semibold">Freno Trasero: </span>Operado a pie, ampliándose internamente 130 mm de diámetro. Tambor.</p>
  <p className="mb-2"><span className="font-semibold">Líquido de Freno: </span>DOT 3 / DOT 4</p>
  </div>
  
  };

  const ComponenteEspecificoSeis = () => {
    return <div className="bg-gray-200 p-4 rounded-lg shadow-md">
    <h2 className="text-2xl font-bold mb-4">Capacidades</h2>
    <p className="mb-2"><span className="font-semibold">Capacidad del Tanque de Combustible: </span>12 L</p>
  </div>
  
  };

  const ComponenteEspecificoCinco = () => {
    return <div className="bg-gray-200 p-4 rounded-lg shadow-md">
    <h2 className="text-2xl font-bold mb-4">Dimensiones</h2>
    <p className="mb-2"><span className="font-semibold">Alto: </span>1150 mm</p>
  <p className="mb-2"><span className="font-semibold">Largo: </span>2030 mm</p>
  <p className="mb-2"><span className="font-semibold">Ancho: </span>745 mm</p>
  <p className="mb-2"><span className="font-semibold">Distancia Entre Ejes: </span>1295 mm</p>
  <p className="mb-2"><span className="font-semibold">Despeje del Suelo: </span>195 mm</p>
  <p className="mb-2"><span className="font-semibold">Altura del Asiento: </span>775 mm</p>
  <p className="mb-2"><span className="font-semibold">Peso en Vacío (con 90% de combustible y kit de herramientas): </span>120 kg</p>
  </div>
  
  };


  const ComponenteEspecificoSiete = () => {
    return <div className="h-56 sm:h-64 xl:h-80 2xl:h-96">
      <Carousel>
        <img src="https://flowbite.com/docs/images/carousel/carousel-1.svg" alt="..." />
        <img src="https://flowbite.com/docs/images/carousel/carousel-2.svg" alt="..." />
        <img src="https://flowbite.com/docs/images/carousel/carousel-3.svg" alt="..." />
        <img src="https://flowbite.com/docs/images/carousel/carousel-4.svg" alt="..." />
        <img src="https://flowbite.com/docs/images/carousel/carousel-5.svg" alt="..." />
      </Carousel>
    </div>
  
  };

const Botonera = () => {
  const [botonSeleccionado, setBotonSeleccionado] = useState(6);

  const cambiarBotonSeleccionado = (indice: React.SetStateAction<number>) => {
    setBotonSeleccionado(indice);
  };

  const botones = ["Motor", "Chasis y Suspencio", "Sistema Elétrico", "Neumaticos y Frenos", "Dimensiones", "Capacidades", "Imagenes"];

  return (
    <div className="grid grid-cols-2 gap-2">
      {botones.map((boton, indice) => (
        <Button
          key={indice}
          size="sm"
          className={`text-xs sm:text-sm ${
            botonSeleccionado === indice ? "bg-blue-500 text-white" : "bg-gray-200"
          } ${
            boton === 'Imagenes' ? "col-span-2" : ""
          }`}
          onClick={() => cambiarBotonSeleccionado(indice)}
        >
          {boton}
        </Button>
      ))}
      <div className="col-span-2">
      {botonSeleccionado === 0 && <ComponenteEspecificoUno />}
      {botonSeleccionado === 1 && <ComponenteEspecificoDos />}
      {botonSeleccionado === 2 && <ComponenteEspecificoTres />}
      {botonSeleccionado === 3 && <ComponenteEspecificoCuatro />}
      {botonSeleccionado === 4 && <ComponenteEspecificoCinco />}
      {botonSeleccionado === 5 && <ComponenteEspecificoSeis />}
      {botonSeleccionado === 6 && <ComponenteEspecificoSiete />}
      </div>
    </div>
  );
};

export default Botonera;