import { transporter } from '../../config/nodemailer'

const generateEmailContent = data => {
  const CONTACT_MESSAGE_FIELDS = {
    name: 'ADMIN',
    email: `${data.email}`,
    subject: 'motostudiove@gmail.com',
    message: 'EMAIL'
  }
  const stringData = Object.entries(data).reduce(
    (str, [key, val]) =>
      (str += `${CONTACT_MESSAGE_FIELDS[key]}: \n${val} \n \n`),
    ''
  )

  return {
    text: stringData,
    html: `<!DOCTYPE html> <html> <head> <title>Inicio de proceso</title> </head> <body> <p>Estimado usuario de TVS Finances,</p> <p>Nos complace informarle que su proceso esta en proceso </p> </body> </html>`
  }
}

const handler = async (req, res) => {
  if (req.method === 'POST') {
    const data = req.body
    console.log(data);

    const mailOptionsUsuario = {
      from: process.env.EMAIL,
      to: data.email
    }

    try {
      await transporter.sendMail({
        ...mailOptionsUsuario,
        ...generateEmailContent(data),
        subject: 'Nueva Solicitud de Crédito - TVS Finances'
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
