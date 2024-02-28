import prisma from '../../lib/prisma'

const handler = async (req, res) => {

  if (req.method === 'POST') {
    const currentDate = new Date()
    const currentDateTime = currentDate.toLocaleString()

    const info = req.body

    try {
      await prisma.clerk.create({
        data: {
          id_clerk: `${info.id}`,
          number: `${info.primaryPhoneNumber.phoneNumber}`,
          gmail: `${info.externalAccounts[0].emailAddress}`,
          img: `${info.imageUrl}`,
          username: `${info.username}`,
          first_name: `${info.firstName}`,
          last_name: `${info.lastName}`,
          estado_formulario: 'Formulario',
          fecha: `${currentDateTime}`,
          estado_proceso: 'documentos',
          aprobacion_yummy: false,
          aprobacion_tvs: false,
          aprobacion_final: false,
          rechazo_yummy: false,
          rechazo_tvs : false
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
