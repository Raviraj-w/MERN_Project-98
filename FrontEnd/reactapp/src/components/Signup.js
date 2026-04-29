import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react'; // Import the icons

function Signup() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });
  
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // State to toggle visibility

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password.length < 6) {
      setMessage("Password must be at least 6 characters!");
      setIsError(true);
      return; 
    }

    const hasNumber = /\d/.test(formData.password);
    if (!hasNumber) {
      setMessage("Password must include at least one number!");
      setIsError(true);
      return; 
    }

    try {
      const response = await fetch('http://localhost:5001/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      if (response.ok) {
        setMessage("Account created successfully!");
        setIsError(false);
        setFormData({ firstName: '', lastName: '', email: '', password: '' });
      } else {
        setMessage(data.error || "Signup failed");
        setIsError(true);
      }
    } catch (err) {
      setMessage("Server connection failed!");
      setIsError(true);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Sign Up</h2>
      
      <input 
        type="text" 
        placeholder="First Name" 
        value={formData.firstName}
        onChange={(e) => setFormData({...formData, firstName: e.target.value})}
        required 
      />

      <input 
        type="text" 
        placeholder="Last Name" 
        value={formData.lastName}
        onChange={(e) => setFormData({...formData, lastName: e.target.value})}
        required 
      />

      <input 
        type="email" 
        placeholder="Email Address" 
        value={formData.email}
        onChange={(e) => setFormData({...formData, email: e.target.value})}
        required 
      />

      {/* Password Wrapper with Eye Icon */}
      <div style={{ position: 'relative', width: '100%', maxWidth: '320px', margin: '0 auto' }}>
        <input 
          type={showPassword ? "text" : "password"} 
          placeholder="Password" 
          value={formData.password}
          onChange={(e) => setFormData({...formData, password: e.target.value})}
          required 
          style={{ width: '100%', paddingRight: '45px' }} // Space for icon
        />
        <div 
          onClick={() => setShowPassword(!showPassword)}
          style={{
            position: 'absolute',
            right: '12px',
            top: '50%',
            transform: 'translateY(-50%)',
            cursor: 'pointer',
            color: '#94a3b8',
            display: 'flex',
            alignItems: 'center'
          }}
        >
          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </div>
      </div>
      
      <button type="submit">Register</button>

      {message && (
        <p className={`msg-text ${isError ? 'error-color' : 'success-color'}`}>
          {message}
        </p>
      )}
    </form>
  );
}

export default Signup;