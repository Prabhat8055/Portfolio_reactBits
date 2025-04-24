import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect, lazy, Suspense } from "react";
// import PreLoader from "./components/PreLoader.jsx";
import MyCustomLoader from "./components/MyCustomLoader.jsx";

const Navbar = lazy(() => import("./components/Navbar"));
const LandingPage = lazy(() => import("./components/LandingPage"));
const AboutUs = lazy(() => import("./components/AboutUs"));
const ProjectShowcase = lazy(() => import("./components/ProjectShowcase"));
const ContactPage = lazy(() => import("./components/ContactPage"));
// const Squares = lazy(() => import("./components/Squares.jsx"));
const ComingSoon = lazy(() => import("./components/ComingSoon.jsx"));

function App() {
  //preloader
  const [screenLoading, setScreenLoading] = useState(false);
  useEffect(() => {
    const handleLoad = () => {
      // Add a slight delay if you want a smoother UX
      setTimeout(() => {
        setScreenLoading(false);
      }, 1000); // optional delay
    };

    // If everything is already loaded, skip waiting
    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
    }

    // Cleanup
    return () => {
      window.removeEventListener("load", handleLoad);
    };
  }, []);

  return (
    <BrowserRouter>
      {screenLoading ? (
        <MyCustomLoader />
      ) : (
        <div className="min-h-screen bg-black text-white font-mono">
          <Suspense fallback={<MyCustomLoader />}>
            <Navbar />
            <Routes>
              <Route
                path="/"
                element={
                  <>
                    <LandingPage />
                    <AboutUs />
                    <ProjectShowcase />
                    <ContactPage />
                  </>
                }
              />
              <Route path="/myjourny" element={<ComingSoon />} />
            </Routes>
          </Suspense>
        </div>
      )}
    </BrowserRouter>
  );
}

export default App;
