import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// ✅ Firebase imports
import { auth, db } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

export default function SignUpPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      setError('All fields are required.');
      return;
    }

    // You can add your sign-up logic here
    // If sign-up is successful, navigate to login page or another page
    // navigate('/login');
  };

  // ✅ Signup handler
  const handleSignup = async (e) => {
    e.preventDefault();
    const name = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;

    try {
      // Create user in Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Store extra info in Firestore
      await setDoc(doc(db, "users", user.uid), {
        name,
        email,
      });

      alert("Signup successful!");
      navigate("/login");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-[#111111] text-white px-4">
      <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-lg p-10 max-w-md w-full">
        <h1 className="text-3xl font-bold mb-6 text-center">Sign Up</h1>

        
        {/* ✅ Added onSubmit */}
        <form onSubmit={handleSignup} className="flex flex-col space-y-4">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/70 focus:outline-none focus:border-blue-500 focus:bg-white/10 transition required"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/70 focus:outline-none focus:border-blue-500 focus:bg-white/10 transition required"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/70 focus:outline-none focus:border-blue-500 focus:bg-white/10 transition required"
          />
          
          {error && <p className="text-red-500 text-center">{error}</p>}  {/* Error message */}

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 transition-colors duration-300 text-white rounded-lg py-3 font-semibold"
          >
            Sign Up
          </button>
        </form>

        <p className="text-white/70 text-sm mt-4 text-center">
          Already have an account?{' '}
          <span
            className="text-blue-500 cursor-pointer hover:underline"
            onClick={() => navigate('/login')}
          >
            Login
          </span>
        </p>

        {/* Back to MainPage */}
        <button
          onClick={() => navigate('/')}
          className="mt-4 w-full text-center text-white/70 hover:text-white transition cursor-pointer"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
}
