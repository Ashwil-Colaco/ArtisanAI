import Navbar from "./Components/navbar";
import MainPage from "./Components/mainpage";
import LoginPage from "./Components/LoginPage";
import SignUpPage from "./Components/signUpPage";
import AddProductPage from "./Components/AddProductPage"; 
import ProductsDashboard from "./Components/ProductsDashboard"; // ✅ new page
import DashBoard from "./Components/DashBoard";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

// ✅ Firebase imports
import { useEffect } from "react";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";

function AnimatedRoutes() {
  const location = useLocation();

  // Hide Navbar on login & signup pages
  const hideNavbar =
    location.pathname === "/login" || location.pathname === "/signup";

  // MainPage: subtle fade
  const mainPageVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  };

  // Auth pages + dashboard + add product: fade + slight upward slide
  const authPageVariants = {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -50 },
  };

  const fadeTransition = {
    duration: 0.8,
    ease: "easeInOut",
  };

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* Main Page */}
        <Route
          path="/"
          element={
            <motion.div
              variants={mainPageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={fadeTransition}
              className="min-h-screen bg-[#111111] absolute inset-0 w-full"
            >
              {!hideNavbar && <Navbar />}
              <MainPage />
            </motion.div>
          }
        />

        {/* Login Page */}
        <Route
          path="/login"
          element={
            <motion.div
              variants={authPageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={fadeTransition}
              className="min-h-screen bg-black absolute inset-0 w-full flex justify-center items-center"
            >
              <LoginPage />
            </motion.div>
          }
        />

        {/* Sign Up Page */}
        <Route
          path="/signup"
          element={
            <motion.div
              variants={authPageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={fadeTransition}
              className="min-h-screen bg-black absolute inset-0 w-full flex justify-center items-center"
            >
              <SignUpPage />
            </motion.div>
          }
        />

        {/* Products Dashboard */}
        <Route
          path="/products"
          element={
            <motion.div
              variants={authPageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={fadeTransition}
              className="min-h-screen bg-black absolute inset-0 w-full flex flex-col"
            >
              {!hideNavbar && <Navbar />}
              <ProductsDashboard />
            </motion.div>
          }
        />

        {/* Add Product Page */}
        <Route
          path="/addproduct"
          element={
            <motion.div
              variants={authPageVariants} 
              initial="initial"
              animate="animate"
              exit="exit"
              transition={fadeTransition}
              className="min-h-screen bg-black absolute inset-0 w-full flex justify-center items-center"
            >
              {!hideNavbar && <Navbar />}
              <AddProductPage />
            </motion.div>
          }
          />
          {/* Add dashboard */}
          <Route 
            path="/dashboard"
            element={
            <motion.div
              variants={authPageVariants} 
              initial="initial"
              animate="animate"
              exit="exit"
              transition={fadeTransition}
              className="min-h-screen bg-black absolute inset-0 w-full flex justify-center items-center">
              {!hideNavbar && <Navbar />}
              <DashBoard />
            </motion.div>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  // Firebase auth listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("User logged in:", user.email);
      } else {
        console.log("No user logged in");
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <Router>
      <AnimatedRoutes />
    </Router>
  );
}

export default App;
