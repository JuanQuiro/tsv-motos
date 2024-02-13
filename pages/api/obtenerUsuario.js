import prisma from '../../lib/prisma'

const handler = async (req, res) => {
  if (req.method === 'GET') {
    try {
      const clerks = await prisma.clerk.findMany()
      return res.status(200).json(clerks)
    } catch (err) {
      console.log(err)
      return res.status(400).json({ message: err.message })
    }
  }
  return res.status(400).json({ message: 'Bad request' })
}

export default handler