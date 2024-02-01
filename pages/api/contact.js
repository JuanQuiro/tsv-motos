import { mailOptions, transporter } from "../../config/nodemailer";

const CONTACT_MESSAGE_FIELDS = {
  name: "Juan",
  email: "juanquirozsana@gmail.com",
  subject: "juanquirozsana@gmail.com",
  message: "EMAIL",
};


const generateEmailContent = (data) => {

  prisma.user.create({
    data: {
      data
    },
  });

  const currentDate = new Date();
  const currentDateTime = currentDate.toLocaleString();

  const stringData = Object.entries(data).reduce(
    (str, [key, val]) =>
      (str += `${CONTACT_MESSAGE_FIELDS[key]}: \n${val} \n \n`),
    ""
  );
  const htmlData = Object.entries(data).reduce((str, [key, val]) => {
    return (str += `<h3 class="form-heading" align="left">${CONTACT_MESSAGE_FIELDS[key]}</h3><p class="form-answer" align="left">${val}</p>`);
  }, "");

  return {
    text: stringData,
    html: `<!DOCTYPE html> <html> <head> <title>Nueva Solicitud de Crédito - TVS Finances</title> </head> <body> <p>Estimado Admin de TVS Finances,</p> <p>Nos complace informarle que un nuevo usuario ha completado exitosamente el formulario de solicitud de crédito.</p> <p>A continuación, los detalles del solicitante:</p> <ul> <li>Nombre: ${data.PrimerNombre}</li> <li>Apellido: ${data.PrimerApellido}</li> <li>Número de Identificación: GENERANDOSE</li> <li>Fecha y Hora de Solicitud: ${currentDateTime}</li> </ul> <p>Para revisar la información completa y tomar las medidas correspondientes, por favor haga clic <a href="enlace al dashboard de administrador de TVS Finance">aquí</a>.</p> <p>Gracias por su atención y pronta acción.</p> <p>Solicitud Número: GENERANDOSE</p> <p>*Este es un mensaje automático, por favor no responder. En caso de inconvenientes lo invitamos a ponerse en contacto con nuestro servicio técnico haciendo clic <a href="Link para enviar correo a servicio técnico">aquí</a>.</p> </body> </html>`,
  };
};

const handler = async (req, res) => {
  if (req.method === "POST") {
    const data = req.body;
    if (!data || !data.name || !data.email || !data.subject || !data.message) {
      return res.status(400).send({ message: "Bad request" });
    }

    try {
      await transporter.sendMail({
        ...mailOptions,
        ...generateEmailContent(data),
        subject: 'Nueva Solicitud de Crédito - TVS Finances',
      });

      return res.status(200).json({ success: true });
    } catch (err) {
      console.log(err);
      return res.status(400).json({ message: err.message });
    }
  }
  return res.status(400).json({ message: "Bad request" });
};
export default handler;