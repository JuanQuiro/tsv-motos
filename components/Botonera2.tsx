import React, { useState } from "react";
import {Button} from "@nextui-org/react";
import { Carousel } from 'flowbite-react';


const ComponenteEspecificoUno = () => {
  return <div className="bg-gray-200 p-4 rounded-lg shadow-md">
  <h2 className="text-2xl font-bold mb-4">Motor</h2>
  <p className="mb-2">
    <span className="font-semibold">Tipo de Motor: </span> 4 Tiempos, Refrigerado por Aire Natural
  </p>
  <p className="mb-2"><span className="font-semibold">Desplazamiento del Motor: </span> 147,49 cc</p>
  <p className="mb-2"><span className="font-semibold">Potencia Maxima: </span> 8,9kw a 7500 rpm</p>
  <p className="mb-2"><span className="font-semibold">Torque Maximo: </span> 12,3 Nm a 5000 rpm</p>
  <p className="mb-2"><span className="font-semibold">Arranque: </span>Arranque Eléctrico y Arranque a Pedal</p>
  <p className="mb-2"><span className="font-semibold">Embrague y Transmisión: </span>Húmedo, Tipo Múltiples Discos</p>
  <p className="mb-2"><span className="font-semibold">Transmisión: </span>Toma Constante de 5 Velocidades</p>
</div>

};

const ComponenteEspecificoDos = () => {
    return <div className="bg-gray-200 p-4 rounded-lg shadow-md">
    <h2 className="text-2xl font-bold mb-4">Dimensiones y Pesos</h2>
    <p className="mb-2">
      <span className="font-semibold">Largo: </span> 2040 mm
    </p>
    <p className="mb-2"><span className="font-semibold">Ancho: </span> 745 mm</p>
    <p className="mb-2"><span className="font-semibold">Alto: </span> 1150 mm</p>
    <p className="mb-2"><span className="font-semibold">Distencia entre ejes: </span>1295 mm</p>
    <p className="mb-2"><span className="font-semibold">Altura del Asiento: </span>834 mm</p>
    <p className="mb-2"><span className="font-semibold">Despeje del Suelo: </span>195 mm</p>
    <p className="mb-2"><span className="font-semibold">Peso en orden de marcha del vehiculo: </span>119 kg</p>
  </div>
  
  };

const ComponenteEspecificoTres = () => {
    return <div className="bg-gray-200 p-4 rounded-lg shadow-md">
    <h2 className="text-2xl font-bold mb-4">Chasis</h2>
    <p className="mb-2"><span className="font-semibold">Suspensión Delantera: </span>Viaje de Horquilla, Telescópico</p>
  <p className="mb-2"><span className="font-semibold">Suspensión Trasera: </span>Amortiguador hidráulico</p>
  </div>
  
  };


  const ComponenteEspecificoCuatro = () => {
    return <div className="bg-gray-200 p-4 rounded-lg shadow-md">
    <h2 className="text-2xl font-bold mb-4">Eletrico De Los Controles</h2>
    <p className="mb-2"><span className="font-semibold">Indicación de Cambios: </span>12 V, 1,7 W x 5</p>
  </div>
  
  };

  const ComponenteEspecificoSeis = () => {
    return <div className="bg-gray-200 p-4 rounded-lg shadow-md">
    <h2 className="text-2xl font-bold mb-4">Tanque De Combustible</h2>
    <p className="mb-2"><span className="font-semibold">Capacidad del Tanque de Combustible: </span>12 litros</p>
    <p className="mb-2"><span className="font-semibold">Capacidad de la Reserva: </span>2 litros</p>
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

const Botonera = () => {
  const [botonSeleccionado, setBotonSeleccionado] = useState(0);

  const cambiarBotonSeleccionado = (indice: React.SetStateAction<number>) => {
    setBotonSeleccionado(indice);
  };

  const botones = ["Motor y Transmisión", "Dimensiones y Pesos", "Chasis", "Frenos", "Eletrico De Los Controles", "Tanque de Combustible", "Imagenes"];

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