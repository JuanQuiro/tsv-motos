import { currentUser } from '@clerk/nextjs'

export default async function Page() {
  const user = await currentUser()

  return user
}
