import { UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

/**
 * Pratheek Enterprises - Secure Dashboard
 * Location: app/dashboard/page.tsx
 */
export default async function DashboardPage() {
  const user = await currentUser();

  // 1. Protection: If no user is logged in, send them back to the landing page
  if (!user) {
    redirect("/");
  }

  // 2. Admin Check: Specifically checking for your email
  const userEmail = user.emailAddresses[0]?.emailAddress;
  const isAdmin = userEmail === 'pratheek@myyahoo.com';

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f1f5f9', fontFamily: 'system-ui, -apple-system, sans-serif', color: '#1e293b' }}>
      
      {/* TOP NAVIGATION BAR */}
      <nav style={{ 
        backgroundColor: '#1e3a8a', 
        color: 'white', 
        padding: '1rem 2rem', 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        position: 'sticky',
        top: 0,
        zIndex: 10
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ backgroundColor: 'white', color: '#1e3a8a', width: '32px', height: '32px', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>P</div>
          <h1 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 'bold' }}>Pratheek Enterprises</h1>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          {isAdmin && (
            <span style={{ 
              backgroundColor: '#fbbf24', 
              color: '#78350f', 
              padding: '4px 10px', 
              borderRadius: '6px', 
              fontSize: '0.7rem', 
              fontWeight: 'bold',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}>
              ADMIN ACCESS
            </span>
          )}
          <UserButton afterSignOutUrl="/" />
        </div>
      </nav>

      <main style={{ maxWidth: '1100px', margin: '0 auto', padding: '2rem' }}>
        
        {/* MASTER ADMIN PANEL: Only visible to pratheek@myyahoo.com */}
        {isAdmin && (
          <div style={{ 
            marginBottom: '2.5rem', 
            backgroundColor: '#ffffff', 
            padding: '1.5rem', 
            borderRadius: '16px', 
            border: '2px solid #fbbf24',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' 
          }}>
            <h2 style={{ margin: '0 0 1.2rem 0', color: '#92400e', fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>👑</span> Master Control Panel
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
              <div style={{ backgroundColor: '#fffbeb', padding: '20px', borderRadius: '12px' }}>
                <p style={{ margin: 0, fontSize: '0.75rem', color: '#b45309', fontWeight: 'bold', textTransform: 'uppercase' }}>Master Wallet</p>
                <p style={{ margin: '8px 0 0 0', fontSize: '1.75rem', fontWeight: '800' }}>₹ 50,000.00</p>
              </div>
              <div style={{ backgroundColor: '#fffbeb', padding: '20px', borderRadius: '12px' }}>
                <p style={{ margin: 0, fontSize: '0.75rem', color: '#b45309', fontWeight: 'bold', textTransform: 'uppercase' }}>Pending Approvals</p>
                <p style={{ margin: '8px 0 0 0', fontSize: '1.75rem', fontWeight: '800' }}>12</p>
              </div>
              <div style={{ backgroundColor: '#fffbeb', padding: '20px', borderRadius: '12px' }}>
                <p style={{ margin: 0, fontSize: '0.75rem', color: '#b45309', fontWeight: 'bold', textTransform: 'uppercase' }}>Active Agents</p>
                <p style={{ margin: '8px 0 0 0', fontSize: '1.75rem', fontWeight: '800' }}>8</p>
              </div>
            </div>
          </div>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem' }}>
          
          {/* COLUMN 1: Agent Stats */}
          <section>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '1.2rem', color: '#334155' }}>Your Monthly Sales</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '14px', borderLeft: '6px solid #ef4444', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 'bold', color: '#ef4444', letterSpacing: '0.05em' }}>AIRTEL MOBILE</span>
                <p style={{ fontSize: '2.25rem', fontWeight: '800', margin: '8px 0 0 0' }}>0</p>
              </div>
              <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '14px', borderLeft: '6px solid #2563eb', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 'bold', color: '#2563eb', letterSpacing: '0.05em' }}>VI (VODAFONE IDEA)</span>
                <p style={{ fontSize: '2.25rem', fontWeight: '800', margin: '8px 0 0 0' }}>0</p>
              </div>
              <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '14px', borderLeft: '6px solid #fbbf24', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 'bold', color: '#b45309', letterSpacing: '0.05em' }}>RELIANCE JIO</span>
                <p style={{ fontSize: '2.25rem', fontWeight: '800', margin: '8px 0 0 0' }}>0</p>
              </div>
            </div>
          </section>

          {/* COLUMN 2: Reporting Form */}
          <section>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '1.2rem', color: '#334155' }}>Report New Activation</h3>
            <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '18px', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '8px', fontWeight: '600', color: '#475569' }}>Select Operator</label>
                  <select style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1', backgroundColor: '#f8fafc', fontSize: '1rem', outline: 'none' }}>
                    <option value="">Choose...</option>
                    <option value="airtel">Airtel</option>
                    <option value="vi">Vi</option>
                    <option value="jio">Jio</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '8px', fontWeight: '600', color: '#475569' }}>Customer Mobile Number</label>
                  <input type="tel" placeholder="10-digit number" style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1', boxSizing: 'border-box', fontSize: '1rem' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '8px', fontWeight: '600', color: '#475569' }}>Recharge Amount (₹)</label>
                  <input type="number" placeholder="e.g. 299" style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1', boxSizing: 'border-box', fontSize: '1rem' }} />
                </div>
                <button type="button" style={{ 
                  marginTop: '10px', 
                  backgroundColor: '#1e3a8a', 
                  color: 'white', 
                  padding: '14px', 
                  borderRadius: '10px', 
                  fontWeight: 'bold', 
                  border: 'none', 
                  cursor: 'pointer',
                  fontSize: '1rem',
                  boxShadow: '0 4px 6px rgba(30, 58, 138, 0.2)'
                }}>
                  Submit Activation Log
                </button>
                <p style={{ fontSize: '0.7rem', color: '#94a3b8', textAlign: 'center', lineHeight: '1.4' }}>
                  Submitted logs are verified against operator systems. <br /> False reporting results in wallet deduction.
                </p>
              </div>
            </div>
          </section>

        </div>
      </main>

      <footer style={{ padding: '3rem 2rem', textAlign: 'center', color: '#94a3b8', fontSize: '0.85rem', borderTop: '1px solid #e2e8f0', marginTop: '2rem' }}>
        © 2024 Pratheek Enterprises • Authorized Distribution Portal • v1.4
      </footer>
    </div>
  );
}
