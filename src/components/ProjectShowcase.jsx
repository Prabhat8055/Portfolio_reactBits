import BlurText from "../ReactBits/BlurText.jsx";
import ChromaGrid from "../ReactBits/ChromaGrid.jsx";

const items = [
  {
    image: "project1.png",
    title: "Audio Surveillance System",
    subtitle: "Detects emergency sounds like gunshots and sirens using AI.",
    handle: "@Prabhat8055",
    borderColor: "#3B82F6",
    gradient: "linear-gradient(145deg, #3B82F6, #000)",
    url: "https://github.com/Prabhat8055/Emergency_Sound_classifiaction",
  },
  {
    image: "project2.png",
    title: "Image Text Evaluation",
    subtitle:
      "A Flask-based application for outdated documentation. It simplifies and modernizes the presentation of legacy documents.",
    handle: "@Prabhat8055",
    borderColor: "#FACC15", // Yellow border
    gradient: "linear-gradient(180deg, #FACC15, #000)", // Yellow to black
    url: "https://github.com/Prabhat8055/ImageTextEval_Horizontal_Scroll",
  },
  {
    image: "project3.png",
    title: "Hand Written Word Conversion using CNN",
    subtitle:
      "A deep learning-based application designed to convert handwritten text into digital format using CNN.",
    handle: "@Prabhat8055",
    borderColor: "#000", // Black border
    gradient: "linear-gradient(180deg, #000, #000)", // Full black
    url: "https://github.com/Prabhat8055/GSAP_HandWritten_word_conversion_website",
  },
  {
    image: "project4.png",
    title: "Blog Website",
    subtitle: "It uses React and Appwrite for frontend and backend",
    handle: "@Prabhat8055",
    borderColor: "#6B7280", // Gray border
    gradient: "linear-gradient(180deg, #6B7280, #000)", // Gray to black
    url: "https://github.com/Prabhat8055/BlogWebsite-AppwriteReact",
  },
];

const ProjectShowcase = () => {
  return (
    <div
      id="projects"
      className="min-h-screen flex items-center justify-center bg-[#000000]"
      style={{ padding: "20px" }}
    >
      <div>
        <div className="w-full flex justify-center">
          <BlurText
            text="Projects"
            delay={150}
            animateBy="words"
            direction="top"
            className=" text-center text-6xl mb-8 font-extrabold font-serif "
          />
        </div>

        <ChromaGrid
          items={items}
          radius={300}
          damping={0.45}
          fadeOut={0.6}
          ease="power3.out"
        />
      </div>
    </div>
  );
};

export default ProjectShowcase;
