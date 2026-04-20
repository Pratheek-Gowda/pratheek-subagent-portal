import { UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

/**
 * DashboardPage Component
 * Path: app/dashboard/page.tsx
 * * Features:
 * - Server-side authentication check
 * - Brand-consistent styling for Pratheek Enterprises
 * - Real-time statistics layout
 * - Activity logs and commission tracking placeholders
 */
export default async function DashboardPage() {
  const user = await currentUser();

  // Protect the route: if no user is found, redirect to the login page
  if (!user) {
    redirect("/");
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc', fontFamily: 'system-ui, -apple-system, sans-serif', color: '#1e293b' }}>
      
      {/* Main Header / Navbar */}
      <nav style={{ 
        backgroundColor: '#1e3a8a', 
        padding: '0.75rem 2rem', 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        color: 'white',
        position: 'sticky',
        top: 0,
        zIndex: 10,
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ backgroundColor: 'white', color: '#1e3a8a', width: '36px', height: '36px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '1.2rem' }}>P</div>
          <div style={{ lineHeight: 1 }}>
            <h1 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 'bold', letterSpacing: '0.025em' }}>PRATHEEK</h1>
            <span style={{ fontSize: '0.7rem', textTransform: 'uppercase', opacity: 0.8 }}>Enterprises Portal</span>
          </div>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <div style={{ textAlign: 'right', display: 'block' }}>
            <p style={{ margin: 0, fontSize: '0.85rem', fontWeight: '600' }}>{user.firstName || 'Partner'}</p>
            <p style={{ margin: 0, fontSize: '0.7rem', opacity: 0.8 }}>Verified Subagent</p>
          </div>
          <UserButton afterSignOutUrl="/" />
        </div>
      </nav>

      <div style={{ display: 'flex', maxWidth: '1400px', margin: '0 auto' }}>
        
        {/* Main Content Area */}
        <main style={{ flex: 1, padding: '2rem' }}>
          
          {/* Welcome Section */}
          <div style={{ marginBottom: '2.5rem' }}>
            <h2 style={{ fontSize: '1.75rem', fontWeight: '800', color: '#0f172a', margin: '0 0 0.5rem 0' }}>
              Dashboard Overview
            </h2>
            <p style={{ margin: 0, color: '#64748b', fontSize: '1rem' }}>
              Monitoring performance for Vi, Airtel, and Jio activations.
            </p>
          </div>

          {/* Core Metrics Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '2.5rem' }}>
            
            {/* Airtel Card */}
            <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '16px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', borderTop: '4px solid #ef4444' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 'bold', color: '#ef4444', textTransform: 'uppercase' }}>Airtel Mobile</span>
                <span style={{ fontSize: '0.7rem', color: '#10b981', backgroundColor: '#f0fdf4', padding: '2px 8px', borderRadius: '10px', fontWeight: '600' }}>Active</span>
              </div>
              <div style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '0.25rem' }}>0</div>
              <p style={{ margin: 0, fontSize: '0.85rem', color: '#64748b' }}>Activations this month</p>
            </div>

            {/* Vi Card */}
            <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '16px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', borderTop: '4px solid #2563eb' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 'bold', color: '#2563eb', textTransform: 'uppercase' }}>Vi (Vodafone Idea)</span>
                <span style={{ fontSize: '0.7rem', color: '#10b981', backgroundColor: '#f0fdf4', padding: '2px 8px', borderRadius: '10px', fontWeight: '600' }}>Active</span>
              </div>
              <div style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '0.25rem' }}>0</div>
              <p style={{ margin: 0, fontSize: '0.85rem', color: '#64748b' }}>Activations this month</p>
            </div>

            {/* Jio Card */}
            <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '16px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', borderTop: '4px solid #fbbf24' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 'bold', color: '#b45309', textTransform: 'uppercase' }}>Reliance Jio</span>
                <span style={{ fontSize: '0.7rem', color: '#10b981', backgroundColor: '#f0fdf4', padding: '2px 8px', borderRadius: '10px', fontWeight: '600' }}>Active</span>
              </div>
              <div style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '0.25rem' }}>0</div>
              <p style={{ margin: 0, fontSize: '0.85rem', color: '#64748b' }}>Activations this month</p>
            </div>

          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '2rem' }}>
            
            {/* Recent Activity Table Container */}
            <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '16px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
              <h3 style={{ margin: '0 0 1.25rem 0', fontSize: '1.1rem', fontWeight: '700' }}>Recent Activations</h3>
              <div style={{ borderTop: '1px solid #f1f5f9' }}>
                <p style={{ textAlign: 'center', color: '#94a3b8', padding: '3rem 0', fontSize: '0.9rem' }}>
                  No recent activity found for today.
                </p>
              </div>
            </div>

            {/* Wallet & Commission Info */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              
              <div style={{ backgroundColor: '#1e293b', color: 'white', padding: '1.5rem', borderRadius: '16px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
                <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '0.9rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Current Wallet Balance</h3>
                <div style={{ fontSize: '2rem', fontWeight: 'bold', display: 'flex', alignItems: 'baseline', gap: '5px' }}>
                  <span style={{ fontSize: '1.2rem', color: '#94a3b8' }}>₹</span> 0.00
                </div>
                <div style={{ marginTop: '1rem', padding: '10px', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '8px', fontSize: '0.75rem', color: '#94a3b8' }}>
                  Wallet auto-sync with Neon DB is in progress.
                </div>
              </div>

              <div style={{ backgroundColor: '#eff6ff', border: '1px solid #dbeafe', padding: '1.5rem', borderRadius: '16px' }}>
                <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1rem', fontWeight: '700', color: '#1e40af' }}>Commission Tracker</h3>
                <p style={{ margin: 0, fontSize: '0.85rem', color: '#3b82f6', lineHeight: '1.5' }}>
                  Earn up to 4% extra margin on bulk Jio Fiber activations this week. Contact Pratheek for details.
                </p>
              </div>

            </div>
          </div>

        </main>
      </div>

      {/* Footer Branding */}
      <footer style={{ textAlign: 'center', padding: '2rem', color: '#94a3b8', fontSize: '0.8rem' }}>
        © 2024 Pratheek Enterprises • Authorized Retail Partner • Secured by Clerk
      </footer>
    </div>
  );
}
