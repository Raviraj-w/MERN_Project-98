import Signup from './components/Signup';
import Signin from './components/Signin';
import { useState } from 'react';
import './App.css';
function App() {
  const [isLogin, setIsLogin] = useState(true);

 return (
  /* This 'auth-container' matches the name in your CSS */
  <div className="auth-container">
    
    <h2>{isLogin ? "Welcome Back" : "Create Account"}</h2>
    
    <p style={{ color: '#636e72', marginBottom: '20px' }}>
      {isLogin ? "Please sign in to continue" : "Start your journey with us"}
    </p>

    {/* This is where your Signin.js or Signup.js appears */}
    <div className="input-group">
      {isLogin ? <Signin /> : <Signup />}
    </div>

    {/* This is the text at the bottom to switch between pages */}
    <div className="toggle-text">
      {isLogin ? "New here? " : "Already have an account? "}
      <span className="toggle-link" onClick={() => setIsLogin(!isLogin)}>
        {isLogin ? "Create Account" : "Sign In"}
      </span>
    </div>

  </div>
);
 
}

export default App;