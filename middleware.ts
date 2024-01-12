import { authMiddleware } from '@clerk/nextjs'
export default authMiddleware({
  publicRoutes: ["/", "/somos"],
})

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)']
}
