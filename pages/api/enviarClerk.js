import prisma from '../../lib/prisma'

const handler = async (req, res) => {
  if (req.method === 'POST') {
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
          last_name: `${info.lastName}`
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
