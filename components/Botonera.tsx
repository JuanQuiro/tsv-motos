import React, { useState } from "react";

const ComponenteEspecificoUno = () => {
  return <div className="bg-gray-200 p-4 rounded-lg shadow-md">
  <h2 className="text-2xl font-bold mb-4">Motor</h2>
  <p className="mb-2">
    Tipo: Motor de un Solo Cilindro, de 4 tiempos, refrigerado por aire y con encendido a chispa
  </p>
  <p className="mb-2">Capacidad del Motor: 147,49 cc</p>
  <p className="mb-2">Potencia Máxima: 8,8 kw a 7500 rpm</p>
  <p className="mb-2">Torque Máximo: 12,3 Nm a 5000 rpm</p>
  <p className="mb-2">Tipo de Carburador: MIKUNI BS 26 (tipo CV)</p>
  <p className="mb-2">Válvula por Cilindro: 2 válvulas</p>
  <p className="mb-2">Arranque: Arranque a Pedal y Arranque Eléctrico</p>
  <p className="mb-2">Caja de Cambios: 5 Velocidades, marchas constantes :1D4U</p>
</div>

};

const Botonera = () => {
  const [botonSeleccionado, setBotonSeleccionado] = useState(0);

  const cambiarBotonSeleccionado = (indice: React.SetStateAction<number>) => {
    setBotonSeleccionado(indice);
  };

  const botones = ["Motor", "Chasis y Suspencio", "Sistema Eletrico", "Naumaticos y Frenos", "Dimensiones", "Capacidades"];

  return (
    <div className="grid grid-cols-6 gap-2">
      {botones.map((boton, indice) => (
        <button
          key={indice}
          className={`p-4 ${
            botonSeleccionado === indice ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => cambiarBotonSeleccionado(indice)}
        >
          {boton}
        </button>
      ))}
      <div className="ml-4 col-span-6">
      {botonSeleccionado === 0 && <ComponenteEspecificoUno />}
      </div>
    </div>
  );
};

export default Botonera;