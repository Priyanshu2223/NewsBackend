import React, { useState } from 'react';
import { GoogleOAuthProvider, useGoogleLogin, googleLogout } from '@react-oauth/google';

const CLIENT_ID = '975196440628-cahare3o41dit7ggvf70a70uk7570mvn.apps.googleusercontent.com';

function GoogleAuth() {
  const [user, setUser] = useState(null);

  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      console.log('Login successful:', tokenResponse);
      setUser(tokenResponse);
    },
    onError: (error) => {
      console.error('Login failed:', error);
      alert('Login Failed');
    },
  });

  const handleLogout = () => {
    googleLogout();
    setUser(null);
    console.log('Logout successful');
  };

  const navigateToRegister = () => {
    // This is where you can define navigation logic
    // If using React Router, use `useNavigate` or a `<Link>` component.
    window.location.href = '/register'; // Simple navigation for demo purposes
  };

  return (
    <div>
      <h1>Google Login with React</h1>
      {user ? (
        <div>
          <h2>Welcome!</h2>
          <p>Access Token: {user.access_token}</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <>
          <button onClick={() => login()}>Login with Google</button>
          <button onClick={navigateToRegister}>Go to Registration</button>
        </>
      )}
    </div>
  );
}

function App() {
  return (
    <GoogleOAuthProvider clientId={CLIENT_ID}>
      <GoogleAuth />
    </GoogleOAuthProvider>
  );
}

export default App;
