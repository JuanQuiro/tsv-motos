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

      console.log(userId)
      const resultClerck = await prisma.clerck.create({
        data: {
          id: `${dataClerck.id}`,
          username: `${dataClerck.username}`,
          object: `${dataClerck.object}`,
          primary_email_address_id: `${dataClerck.primary_email_address_id}`,
          primary_phone_number_id: `${dataClerck.primary_phone_number_id}`,
          primary_web3_wallet_id: `${dataClerck.primary_web3_wallet_id}`,
          username: `${dataClerck.username}`,
          first_name: `${dataClerck.first_name}`,
          last_name: `${dataClerck.last_name}`,
          profile_image_url: `${dataClerck.profile_image_url}`,
          image_url: `${dataClerck.image_url}`
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
