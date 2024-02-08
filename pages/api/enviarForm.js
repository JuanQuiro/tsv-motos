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
          Ingresos: `${info.Ingresos}`,
          Yummy: info.Yummy,
          Extranjero: info.Extranjero,
          Cedula: `${info.Cedula}`,
          PrimerNombre: `${info.PrimerNombre}`,
          SegundoNombre: `${info.SegundoNombre}`,
          PrimerApellido: `${info.PrimerApellido}`,
          SegundoApellido: `${info.SegundoApellido}`,
          Dirrecion: `${info.Dirrecion}`,
          Pais: `${info.Pais}`,
          id_clerk: `${info.id}`
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
