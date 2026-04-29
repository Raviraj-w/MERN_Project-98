import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react'; // Import icons

function Signin() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [message, setMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false); // State for eye toggle

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('http://localhost:5001/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message); 
      } else {
        setMessage(data.error);   
      }
    } catch (err) {
      setMessage("Server is not responding. Check your backend!");
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: 'auto', padding: '20px' }}>
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '10px' }}>
          <input 
            type="email" 
            placeholder="Email Address" 
            style={{ width: '100%', padding: '14px', boxSizing: 'border-box' }}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })} 
            required 
          />
        </div>

        {/* Password Section with Eye Icon */}
        <div style={{ marginBottom: '10px', position: 'relative' }}>
          <input 
            type={showPassword ? "text" : "password"} 
            placeholder="Password" 
            style={{ width: '100%', padding: '14px', paddingRight: '40px', boxSizing: 'border-box' }}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })} 
            required 
          />
          <div 
            onClick={() => setShowPassword(!showPassword)}
            style={{
              position: 'absolute',
              right: '10px',
              top: '50%',
              transform: 'translateY(-50%)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              color: '#666'
            }}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </div>
        </div>

        <button type="submit" style={{ width: '100%', padding: '10px', cursor: 'pointer' }}>
          Login
        </button>
      </form>

      {message && (
        <p style={{ 
          marginTop: '15px', 
          color: message.includes('Welcome') ? 'green' : 'red',
          fontWeight: 'bold' 
        }}>
          {message}
        </p>
      )}
    </div>
  );
}

export default Signin;