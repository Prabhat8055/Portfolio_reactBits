import React from "react";
import { motion } from "framer-motion";
import { FaGithub } from "react-icons/fa";
import SpotlightCard from "../ReactBits/SpotlightCard";
import BlurText from "../ReactBits/BlurText.jsx";
import Balatro from "../ReactBits/Balatro.jsx";

const projects = [
  {
    title: "Audio Surveillance System",
    description: "Detects emergency sounds like gunshots and sirens using AI.",
    github: "https://github.com/Prabhat8055/Emergency_Sound_classifiaction",
    live: "https://your-live-project.com",
    image: "project1.png",
  },
  {
    title: "Image Text Evaluation",
    description:
      "A Flask-based application for outdated documentation. It simplifies and modernizes the presentation of legacy documents. ",
    github: "https://github.com/Prabhat8055/ImageTextEval_Horizontal_Scroll",
    live: "",
    image: "project2.png",
  },
  {
    title: "Hand Written Word Conversion using CNN",
    description:
      "A deep learning-based application designed to convert handwritten text into digital format using CNN.",
    github:
      "https://github.com/Prabhat8055/GSAP_HandWritten_word_conversion_website",
    live: "",
    image: "project3.png",
  },
  {
    title: "React 3D Portfolio",
    description:
      "An interactive portfolio using Three.js and React Three Fiber.",
    github: "https://github.com/yourusername/react-3d-portfolio",
    live: "https://your-portfolio.com",
    image: "project4.png",
  },
];

const ProjectShowcase = () => {
  return (
    <div
      id="projects"
      className="min-h-screen flex items-center justify-center bg-[#000000]"
      style={{ padding: "20px" }}
    >
      <div className="w-full md:w-3/4">
        <div className="w-full flex justify-center" style={{ padding: "30px" }}>
          <BlurText
            text="Projects"
            delay={150}
            animateBy="words"
            direction="top"
            className=" text-center text-6xl mb-8 font-extrabold font-serif "
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              className="flex justify-center items-center bg-gray-800 rounded-2xl shadow-lg overflow-hidden "
              whileHover={{ scale: 1.005 }}
              transition={{ duration: 0.3 }}
            >
              <SpotlightCard
                className="p-5 h-[43vh] flex flex-col justify-between"
                spotlightColor="rgba(255, 0, 85, 0.2)"
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-30 object-cover mb-4"
                />
                <h2 className="text-xl font-semibold mb-2">{project.title}</h2>
                <p className="text-gray-400 mb-4 flex-grow">
                  {project.description}
                </p>
                <div className="flex gap-4">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <button variant="outline">
                      <FaGithub className="text-2xl cursor-pointer" />
                    </button>
                  </a>
                </div>
              </SpotlightCard>
            </motion.div>
          ))}
          <div className="md:col-span-2 w-full">
            <div className="absolute w-[90vw] md:w-[49.1vw] h-[40vh] md:h-[43vh] flex items-center justify-center flex-col backdrop-blur-[1px] responsive p-6 md:p-0 ">
              <h1 className="text-xl md:text-3xl font-bold text-center leading-relaxed">
                For more Projects Jump on my github
              </h1>
              <button className="mt-4 text-white font-bold py-2 px-4 rounded">
                <a
                  href="https://github.com/prabhat8055"
                  target="_blank"
                  className="text-white no-underline hover:underline"
                >
                  here
                </a>
              </button>
            </div>
            <Balatro
              isRotate={false}
              mouseInteraction={true}
              pixelFilter={600}
              color1="#ffff"
              color2="#ff0055"
              color3="#808080"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectShowcase;
