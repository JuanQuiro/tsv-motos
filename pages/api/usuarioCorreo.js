import { mailOptions, transporter } from '../../config/nodemailer'

const CONTACT_MESSAGE_FIELDS = {
  name: 'Juan',
  email: 'juanquirozsana@gmail.com',
  subject: 'juanquirozsana@gmail.com',
  message: 'EMAIL'
}

const generateEmailContent = data => {
  const currentDate = new Date()
  const currentDateTime = currentDate.toLocaleString()

  const stringData = Object.entries(data).reduce(
    (str, [key, val]) =>
      (str += `${CONTACT_MESSAGE_FIELDS[key]}: \n${val} \n \n`),
    ''
  )
  const htmlData = Object.entries(data).reduce((str, [key, val]) => {
    return (str += `<h3 class="form-heading" align="left">${CONTACT_MESSAGE_FIELDS[key]}</h3><p class="form-answer" align="left">${val}</p>`)
  }, '')

  return {
    text: stringData,
    html: `<!DOCTYPE html> <html> <head> <title>Inicio de proceso</title> </head> <body> <p>Estimado usuario de TVS Finances,</p> <p>Nos complace informarle que su proceso esta en proceso </p> </body> </html>`
  }
}

const handler = async (req, res) => {
  if (req.method === 'POST') {
    const data = req.body

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
