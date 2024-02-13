
const QuienesSomos = async () => {

  
    return (
      <div className="bg-gray-100">
        <div className="container mx-auto py-8">
          <h2 className="text-3xl font-bold text-center mb-4">Quiénes somos</h2>
          <p className="text-lg text-center mb-8">
            Somos una empresa dedicada a proporcionar créditos de motos a los venezolanos, brindando soluciones financieras accesibles y adaptadas a las necesidades de nuestros clientes.
          </p>
          <div className="grid grid-cols-2 gap-8">
            <div className="p-4 bg-white rounded shadow">
              <h3 className="text-xl font-semibold mb-2">Misión</h3>
              <p className="text-base">
                Nuestra misión es ayudar a los venezolanos a adquirir una motocicleta a través de créditos flexibles y accesibles, contribuyendo así a su movilidad y mejorando su calidad de vida.
              </p>
            </div>
            <div className="p-4 bg-white rounded shadow">
              <h3 className="text-xl font-semibold mb-2">Visión</h3>
              <p className="text-base">
                Nuestra visión es convertirnos en la empresa líder en la financiación de motos para venezolanos, ofreciendo un servicio de calidad y generando oportunidades de crecimiento para nuestros clientes.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  export default QuienesSomos;