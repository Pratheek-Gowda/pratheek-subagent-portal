import './globals.css'
import { 
  ClerkProvider, 
  SignInButton, 
  SignedIn, 
  SignedOut, 
  UserButton 
} from '@clerk/nextjs'

// 🚨 BUILD DEBUGGER: This will print in your Vercel logs during the build step
// If you don't see the keys here, Vercel's build environment isn't receiving them.
if (!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY) {
  console.error("\n❌ FATAL BUILD ERROR: NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY is missing in Vercel!");
} else {
  console.log("\n✅ SUCCESS: Publishable key found during build!");
}

if (!process.env.CLERK_SECRET_KEY) {
  console.error("❌ FATAL BUILD ERROR: CLERK_SECRET_KEY is missing in Vercel!\n");
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <header style={{ display: 'flex', justifyContent: 'space-between', padding: '20px', borderBottom: '1px solid #eee' }}>
            <strong>Pratheek Enterprises</strong>
            <SignedOut>
              <SignInButton mode="modal" />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </header>
          <main style={{ padding: '20px' }}>
            {children}
          </main>
        </body>
      </html>
    </ClerkProvider>
  )
}
