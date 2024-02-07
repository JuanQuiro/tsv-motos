import prisma from '../../lib/prisma'

const handler = async (req, res) => {
  if (req.method === 'POST') {
    const info = req.body
    if (!info || !info.name || !info.email || !info.subject || !info.message) {
      return res.status(400).send({ message: 'Bad request' })
    }

    try {
      const result = await prisma.data_formulario.create({
        data: {
          name: `${info.name}`,
          email: `${info.email}`,
          Ingresos: `${info.Ingresos}`,
          Yummy: info.Yummy,
          Extranjero: info.Extranjero,
          Cedula: `${info.Cedula}`,
          PrimerNombre: `${info.PrimerNombre}`,
          SegundoNombre: `${info.SegundoNombre}`,
          PrimerApellido: `${info.PrimerApellido}`,
          SegundoApellido: `${info.SegundoApellido}`,
          Dirrecion: `${info.Dirrecion}`,
          message: `${info.message}`,
          Pais: `${info.Pais}`,
          subject: `${info.subject}`
        }
      })

      async function fetchData() {
        try {
          // Configura los headers con el Bearer Token
          const config = {
            headers: {
              Authorization: `Bearer ${process.env.CLERK_SECRET_KEY}`
            }
          }

          // Realiza una petición GET a una API con el Bearer Token
          const response = await axios.get(
            'https://api.clerk.com/v1/users/user_2apgrkYwKNabuAuhnbIax9bojTy',
            config
          )
          return response.data
        } catch (error) {
          return 'error'
        }
      }

      const dataClerck = fetchData()

      const resultClerck = await prisma.clerck.create({
        data: {
          dataClerck
        }
      })

      return res.status(200).json({ success: true })
    } catch (err) {
      console.log(err)
      return res.status(400).json({ message: err.message })
    }
  }
  return res.status(400).json({ message: 'Bad request' })
}

export default handler
