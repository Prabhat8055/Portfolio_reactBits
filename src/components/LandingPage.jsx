import { motion } from "framer-motion";
import ScrollVelocity from "../ReactBits/ScrollVelocity.jsx";
import BlurText from "../ReactBits/BlurText.jsx";
import { lazy, Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import fallbackRender from "./ErrorBoundary.jsx";
// import ThreeJsCanvas from "./ThreeJsCanvas.jsx";
const ThreeJsCanvas = lazy(() => import("./ThreeJsCanvas.jsx"));
const LandingPage = () => {
  return (
    <>
      <section id="home" className="relative h-[90vh] overflow-hidden">
        <ErrorBoundary fallback={fallbackRender}>
          <Suspense fallback={<div>Loading...</div>}>
            <ThreeJsCanvas />
          </Suspense>
        </ErrorBoundary>
        <div className="absolute inset-0 flex flex-col justify-center text-center items-center pointer-events-none">
          <motion.span
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-center"
          >
            <BlurText
              text="Hi I'am Prabhat Bhasme "
              delay={150}
              animateBy="words"
              direction="top"
              className="text-4xl mb-8 font-extrabold font-serif"
            />
          </motion.span>

          <p>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              A passionate Frontend Developer 🚀
            </motion.span>
          </p>
        </div>
      </section>
      <div className="bg-black">
        <ScrollVelocity
          texts={["Frontend React.js ReactBits", "Style Text Velocity"]}
          velocity={100}
          className="text-[#ffffff] opacity-40 hover:opacity-80 transition-opacity duration-500 ease-in-out"
        />
      </div>
    </>
  );
};

export default LandingPage;
