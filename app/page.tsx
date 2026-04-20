import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Link from "next/link";

export default function HomePage() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '20px', background: 'linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)' }}>
      
      <div style={{ backgroundColor: '#ffffff', padding: '40px', borderRadius: '16px', boxShadow: '0 10px 25px rgba(0,0,0,0.05)', textAlign: 'center', maxWidth: '450px', width: '100%' }}>
        <div style={{ width: '60px', height: '60px', backgroundColor: '#2563eb', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px auto', color: 'white', fontSize: '24px', fontWeight: 'bold' }}>
          P
        </div>
        <h1 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '10px', color: '#1e3a8a' }}>
          Pratheek Enterprises
        </h1>
        <p style={{ color: '#4b5563', marginBottom: '30px', lineHeight: '1.5', fontSize: '15px' }}>
          Telecom Retail Management Portal. Securely manage your subagent activations and wallet balances.
        </p>
        
        <SignedOut>
          <div style={{ width: '100%' }}>
            <SignInButton mode="modal">
              <button style={{ width: '100%', backgroundColor: '#2563eb', color: 'white', padding: '14px 24px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', border: 'none', fontSize: '16px', transition: 'background 0.2s' }}>
                Sign In to Portal
              </button>
            </SignInButton>
          </div>
        </SignedOut>

        <SignedIn>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
            <div style={{ padding: '10px 20px', backgroundColor: '#ecfdf5', borderRadius: '50px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ width: '8px', height: '8px', backgroundColor: '#10b981', borderRadius: '50%' }}></div>
              <span style={{ color: '#065f46', fontWeight: '600', fontSize: '14px' }}>Signed In Securely</span>
            </div>
            
            <Link href="/dashboard" style={{ width: '100%' }}>
              <button style={{ width: '100%', backgroundColor: '#1e3a8a', color: 'white', padding: '14px 24px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', border: 'none', fontSize: '16px' }}>
                Go to Dashboard →
              </button>
            </Link>

            <div style={{ borderTop: '1px solid #f3f4f6', paddingTop: '20px', width: '100%' }}>
              <UserButton showName />
            </div>
          </div>
        </SignedIn>
      </div>

      <footer style={{ marginTop: '30px', color: '#9ca3af', fontSize: '12px' }}>
        © 2024 Pratheek Enterprises. All rights reserved.
      </footer>
    </div>
  );
}
