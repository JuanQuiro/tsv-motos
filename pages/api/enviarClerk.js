import prisma from '../../lib/prisma'

const handler = async (req, res) => {
  if (req.method === 'POST') {
    const info = req.body

    try {
      await prisma.clerk.create({
        data: {
          id: `${info.id}`,
          number: `${info.number}`,
          gmail: `${info.gmail}`,
          img: `${info.img}`,
          username: `${info.username}`,
          first_name: `${info.first_name}`,
          last_name: `${info.last_name}`
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
