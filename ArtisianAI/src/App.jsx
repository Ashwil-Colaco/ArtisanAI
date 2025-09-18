import Navbar from "./Components/navbar";
import MainPage from "./Components/mainpage";
import LoginPage from "./Components/loginPage";
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

function AnimatedRoutes() {
  const location = useLocation();

  // MainPage: subtle fade
  const mainPageVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  };

  // LoginPage: fade + slight upward slide
  const loginPageVariants = {
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
              <Navbar />
              <MainPage />
            </motion.div>
          } 
        />
        <Route 
          path="/login" 
          element={
            <motion.div
              variants={loginPageVariants}
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
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <Router>
      <AnimatedRoutes />
    </Router>
  );
}

export default App;
