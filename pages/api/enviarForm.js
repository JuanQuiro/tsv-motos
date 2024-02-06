import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const handler = async (req, res) => {
  if (req.method === 'POST') {
    const data = req.body
    if (!data || !data.name || !data.email || !data.subject || !data.message) {
      return res.status(400).send({ message: 'Bad request' })
    }

    try {
      const newUser = await prisma.user.create({
        data: {
          name: 'Alice',
          email: 'alice@prisma.io',
          Ingresos: '500',
          Yummy: true,
          Extranjero: true,
          Cedula: 'sasasa',
          PrimerNombre: 'sasasa',
          SegundoNombre: 'sasasas',
          PrimerApellido: 'asasas',
          SegundoApellido: 'saasa',
          Dirrecion: 'asa',
          message: 'as',
          Pais: 'paris',
          subject: 'sasa'
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
