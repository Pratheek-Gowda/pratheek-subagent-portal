export default function HomePage() {
  return (
    <div>
      <h1>Subagent Portal</h1>
      <p>Welcome to the Pratheek Enterprises Management System.</p>
      
      <div style={{ padding: '20px', backgroundColor: '#f0f0f0', borderRadius: '8px', marginTop: '20px' }}>
        <h3>Your Status</h3>
        <p>You are successfully logged in as an authorized agent.</p>
        <button style={{ padding: '10px', backgroundColor: '#0070f3', color: 'white', border: 'none', borderRadius: '5px' }}>
          View My Wallet (Coming Soon)
        </button>
      </div>
    </div>
  )
}
