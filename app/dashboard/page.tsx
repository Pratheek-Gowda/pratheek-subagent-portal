"use client";

import React, { useState, useEffect } from "react";
import { UserButton, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  signInAnonymously, 
  onAuthStateChanged, 
  signInWithCustomToken 
} from "firebase/auth";
import { 
  getFirestore, 
  collection, 
  addDoc, 
  onSnapshot, 
  serverTimestamp,
  query
} from "firebase/firestore";

// --- Global Environment Variables (Provided by System) ---
const firebaseConfig = JSON.parse(typeof __firebase_config !== 'undefined' ? __firebase_config : '{}');
const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';

// --- Initialize Firebase ---
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

/**
 * Pratheek Enterprises - Subagent Management Portal
 * Path: app/dashboard/page.tsx
 * Version: 1.6 (Database + Role-Based UI)
 */
export default function DashboardPage() {
  const { isLoaded, isSignedIn, user } = useUser();
  const router = useRouter();
  
  // State Management
  const [activations, setActivations] = useState<any[]>([]);
  const [operator, setOperator] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState({ text: "", type: "" });

  // 1. Check Authentication & Initialize Data Sync
  useEffect(() => {
    if (!isLoaded) return;
    if (!isSignedIn) {
      router.push("/");
      return;
    }

    const startAuth = async () => {
      try {
        if (typeof __initial_auth_token !== 'undefined' && __initial_auth_token) {
          await signInWithCustomToken(auth, __initial_auth_token);
        } else {
          await signInAnonymously(auth);
        }
      } catch (err) {
        console.error("Auth failed", err);
      }
    };

    startAuth();

    // Data Listener
    const unsubscribeAuth = onAuthStateChanged(auth, (fbUser) => {
      if (fbUser) {
        const activationsRef = collection(db, 'artifacts', appId, 'public', 'data', 'activations');
        
        // Listen for live updates
        const unsubscribeData = onSnapshot(activationsRef, (snapshot) => {
          const docs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          setActivations(docs);
        }, (error) => {
          console.error("Database error:", error);
        });

        return () => unsubscribeData();
      }
    });

    return () => unsubscribeAuth();
  }, [isLoaded, isSignedIn, router]);

  // 2. Handle Form Submission
  const handleLogActivation = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!operator || !mobileNumber || !amount) {
      setStatusMessage({ text: "Please fill in all details", type: "error" });
      return;
    }

    setSubmitting(true);
    setStatusMessage({ text: "", type: "" });

    try {
      const activationsRef = collection(db, 'artifacts', appId, 'public', 'data', 'activations');
      await addDoc(activationsRef, {
        operator,
        mobileNumber,
        amount: parseFloat(amount),
        agentName: user?.fullName || user?.primaryEmailAddress?.emailAddress,
        agentEmail: user?.primaryEmailAddress?.emailAddress,
        status: "pending",
        createdAt: serverTimestamp()
      });

      setStatusMessage({ text: "Activation logged! Awaiting verification.", type: "success" });
      setOperator("");
      setMobileNumber("");
      setAmount("");
    } catch (err) {
      setStatusMessage({ text: "Error saving log. Please try again.", type: "error" });
    } finally {
      setSubmitting(false);
    }
  };

  if (!isLoaded || !isSignedIn) return null;

  // Role Logic
  const isAdmin = user?.primaryEmailAddress?.emailAddress === 'pratheek@myyahoo.com';

  // Statistics Calculation
  const airtelCount = activations.filter(a => a.operator?.toLowerCase() === 'airtel').length;
  const viCount = activations.filter(a => a.operator?.toLowerCase() === 'vi').length;
  const jioCount = activations.filter(a => a.operator?.toLowerCase() === 'jio').length;

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc', color: '#1e293b', fontFamily: 'system-ui, sans-serif' }}>
      
      {/* Navigation Header */}
      <nav style={{ 
        backgroundColor: '#1e3a8a', 
        padding: '0.75rem 2rem', 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        color: 'white',
        boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)',
        position: 'sticky',
        top: 0,
        zIndex: 10
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ backgroundColor: 'white', color: '#1e3a8a', width: '32px', height: '32px', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>P</div>
          <h1 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 'bold' }}>Pratheek Enterprises</h1>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          {isAdmin && <span style={{ backgroundColor: '#fbbf24', color: '#78350f', padding: '2px 8px', borderRadius: '4px', fontSize: '0.7rem', fontWeight: 'bold' }}>ADMIN</span>}
          <UserButton afterSignOutUrl="/" />
        </div>
      </nav>

      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
        
        {/* Master Admin Section */}
        {isAdmin && (
          <div style={{ marginBottom: '2.5rem', backgroundColor: '#ffffff', padding: '1.5rem', borderRadius: '16px', border: '2px solid #fbbf24', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
            <h2 style={{ margin: '0 0 1rem 0', color: '#92400e', fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>👑</span> Master Control Panel
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
              <div style={{ backgroundColor: '#fffbeb', padding: '1.25rem', borderRadius: '12px' }}>
                <p style={{ margin: 0, fontSize: '0.75rem', color: '#b45309', fontWeight: 'bold' }}>ESTIMATED REVENUE</p>
                <p style={{ margin: '5px 0 0 0', fontSize: '1.75rem', fontWeight: '800' }}>₹ {activations.reduce((acc, curr) => acc + (curr.amount || 0), 0).toFixed(2)}</p>
              </div>
              <div style={{ backgroundColor: '#fffbeb', padding: '1.25rem', borderRadius: '12px' }}>
                <p style={{ margin: 0, fontSize: '0.75rem', color: '#b45309', fontWeight: 'bold' }}>TOTAL SUBMISSIONS</p>
                <p style={{ margin: '5px 0 0 0', fontSize: '1.75rem', fontWeight: '800' }}>{activations.length}</p>
              </div>
            </div>
          </div>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
          
          {/* Performance Overview */}
          <section>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '1.2rem', color: '#334155' }}>Activation Performance</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ backgroundColor: 'white', padding: '1.25rem', borderRadius: '14px', borderLeft: '6px solid #ef4444', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 'bold', color: '#ef4444' }}>AIRTEL</span>
                <p style={{ fontSize: '2.25rem', fontWeight: '800', margin: '5px 0 0 0' }}>{airtelCount}</p>
              </div>
              <div style={{ backgroundColor: 'white', padding: '1.25rem', borderRadius: '14px', borderLeft: '6px solid #2563eb', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 'bold', color: '#2563eb' }}>Vi</span>
                <p style={{ fontSize: '2.25rem', fontWeight: '800', margin: '5px 0 0 0' }}>{viCount}</p>
              </div>
              <div style={{ backgroundColor: 'white', padding: '1.25rem', borderRadius: '14px', borderLeft: '6px solid #fbbf24', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 'bold', color: '#b45309' }}>JIO</span>
                <p style={{ fontSize: '2.25rem', fontWeight: '800', margin: '5px 0 0 0' }}>{jioCount}</p>
              </div>
            </div>
          </section>

          {/* Submission Form */}
          <section>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '1.2rem', color: '#334155' }}>Report New Activation</h3>
            <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '18px', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}>
              <form onSubmit={handleLogActivation} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                {statusMessage.text && (
                  <div style={{ 
                    padding: '0.75rem', 
                    borderRadius: '8px', 
                    fontSize: '0.875rem', 
                    textAlign: 'center',
                    backgroundColor: statusMessage.type === 'success' ? '#f0fdf4' : '#fef2f2',
                    color: statusMessage.type === 'success' ? '#166534' : '#991b1b',
                    border: statusMessage.type === 'success' ? '1px solid #bbf7d0' : '1px solid #fecaca'
                  }}>
                    {statusMessage.text}
                  </div>
                )}
                
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '6px', fontWeight: '600' }}>Network</label>
                  <select 
                    value={operator}
                    onChange={(e) => setOperator(e.target.value)}
                    style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '1rem' }}
                  >
                    <option value="">Select Operator...</option>
                    <option value="airtel">Airtel</option>
                    <option value="vi">Vi</option>
                    <option value="jio">Jio</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '6px', fontWeight: '600' }}>Customer Number</label>
                  <input 
                    type="tel" 
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value)}
                    placeholder="10-digit number" 
                    style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '1rem' }} 
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '6px', fontWeight: '600' }}>Plan Amount (₹)</label>
                  <input 
                    type="number" 
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="e.g. 299" 
                    style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '1rem' }} 
                  />
                </div>

                <button 
                  type="submit" 
                  disabled={submitting}
                  style={{ 
                    backgroundColor: '#1e3a8a', 
                    color: 'white', 
                    padding: '1rem', 
                    borderRadius: '10px', 
                    fontWeight: 'bold', 
                    border: 'none', 
                    cursor: submitting ? 'not-allowed' : 'pointer',
                    opacity: submitting ? 0.7 : 1,
                    boxShadow: '0 4px 6px -1px rgba(30, 58, 138, 0.3)'
                  }}
                >
                  {submitting ? "Processing..." : "Log Activation"}
                </button>
              </form>
            </div>
          </section>

        </div>
      </main>

      <footer style={{ padding: '2rem', textAlign: 'center', color: '#94a3b8', fontSize: '0.8rem', marginTop: '2rem' }}>
        © 2024 Pratheek Enterprises • Database Connected (v1.6)
      </footer>
    </div>
  );
}
