import { authMiddleware } from '@clerk/nextjs'
export default authMiddleware({
  publicRoutes: ["/", "/somos", "/credito"],
})

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)']
}
