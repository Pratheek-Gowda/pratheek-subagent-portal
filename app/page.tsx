import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

export default function HomePage() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
      
      <div style={{ backgroundColor: '#ffffff', padding: '40px', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', textAlign: 'center', maxWidth: '500px', width: '100%' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '10px', color: '#1e3a8a' }}>
          Pratheek Enterprises
        </h1>
        <p style={{ color: '#4b5563', marginBottom: '30px', lineHeight: '1.5' }}>
          Welcome to the Subagent Management Portal. Please sign in to view your Vi, Airtel, and Jio activations.
        </p>
        
        {/* Shown ONLY when the user is logged out */}
        <SignedOut>
          <div style={{ display: 'inline-block' }}>
            <SignInButton mode="modal">
              <button style={{ backgroundColor: '#2563eb', color: 'white', padding: '12px 24px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', border: 'none', fontSize: '16px' }}>
                Sign In to Portal
              </button>
            </SignInButton>
          </div>
        </SignedOut>

        {/* Shown ONLY when the user is logged in */}
        <SignedIn>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px' }}>
            <UserButton />
            <p style={{ color: '#10b981', fontWeight: 'bold', margin: 0 }}>
              Authentication Successful!
            </p>
          </div>
        </SignedIn>

      </div>

    </div>
  );
}
