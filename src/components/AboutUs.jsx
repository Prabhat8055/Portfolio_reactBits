import React, { useState } from "react";
import { motion } from "framer-motion";
import Waves from "../ReactBits/Waves.jsx";
import { Switch } from "@headlessui/react";
import BlurText from "../ReactBits/BlurText.jsx";

const AboutUs = () => {
  const [showParticles, setShowParticles] = useState(true);

  const portfolio = () => {
    window.open(
      "https://drive.google.com/file/d/1AP3QrEunVjbtRYyvN8m61InSrD1dA50g/view?usp=drive_link"
    );
  };

  return (
    <div
      id="about"
      style={{ padding: "30px", textAlign: "center" }}
      className="h-[110vh] bg-black text-white overflow-hidden flex flex-col items-center  justify-center px-8 text-center"
    >
      <div className="flex flex-col md:flex-row items-center justify-between max-w-6xl w-full py-16 px-4 md:px-8 z-10 gap-10">
        <div className="w-[50vw] md:w-[35%] mb-10 md:mb-0">
          <img
            src="gibili.png"
            alt="Prabhat"
            className="w-full rounded-[2rem] shadow-xl object-cover transition-transform duration-500 brightness-90 opacity-95 hover:rotate-y-180 ease-in"
          />
        </div>
        <div className="md:w-[50%] flex flex-col gap-6 text-lg text-center ">
          <BlurText
            text="Who am I ?"
            delay={150}
            animateBy="words"
            direction="top"
            className=" text-center text-5xl mb-8 font-extrabold font-serif"
          />
          <p className="leading-relaxed text-justify  text-gray-400 ">
            Full-stack dev. Half-stack sleep. Professional Googler with a degree
            in Stack Overflow. I build, break, and occasionally ship on
            time.Late nights, countless bugs, endless curiosity. I don’t stop
            until it works — and then I optimize it.
          </p>
          <button
            onClick={portfolio}
            className="bg-[#ff0055] text-white px-5 py-[1px] rounded-md text-base cursor-pointer transition-colors duration-300 hover:bg-[#cc0044]"
          >
            Resume
          </button>
        </div>
      </div>

      {/* Switch to turn off and on bacground particles */}

      <div className="absolute bottom-[-100vh] right-4 flex items-center z-50">
        <label className="text-gray-300" style={{ padding: "10px" }}>
          Waves
        </label>
        <Switch
          checked={showParticles}
          onChange={() => setShowParticles((prev) => !prev)}
          className={`${
            showParticles ? "bg-[#ff0055]" : "bg-gray-700"
          } relative inline-flex items-center h-6 rounded-full w-11 transition`}
        >
          <span className="sr-only">Enable Particles</span>
          <span
            className={`${
              showParticles ? "translate-x-6" : "translate-x-1"
            } inline-block w-4 h-4 transform bg-white rounded-full transition`}
          />
        </Switch>
      </div>

      {showParticles && (
        <motion.div
          style={{ width: "100%", height: "100%", position: "absolute" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="relative overflow-hidden" // Add relative and overflow-hidden
        >
          <Waves
            lineColor="#551B23  "
            waveSpeedX={0.02}
            waveSpeedY={0.01}
            waveAmpX={40}
            waveAmpY={20}
            friction={0.9}
            tension={0.01}
            maxCursorMove={120}
            xGap={12}
            yGap={36}
          />
          {/* vigenette effect  */}
          <div className="absolute top-0 left-0 w-full h-full pointer-events-none bg-[radial-gradient(ellipse_at_center,_rgba(0,0,0,0)_40%,_rgba(0,0,0,0.8)_70%,_rgba(0,0,0,1)_100%)]"></div>
        </motion.div>
      )}
    </div>
  );
};

export default AboutUs;
