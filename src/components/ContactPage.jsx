import React, { useRef, useState } from "react";
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";
import Aurora from "../ReactBits/Aurora.jsx";
import BlurText from "../ReactBits/BlurText.jsx";
import ShinyText from "../ReactBits/ShinyText.jsx";
import emailjs from "@emailjs/browser";

const ContactPage = ({
  iconSize = "1.5em",
  iconColor = "white",
  linkColor = "inherit",
}) => {
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  //EmailJs
  const form = useRef();
  const sendEmail = (e) => {
    e.preventDefault();
    setIsSending(true); // disable the button

    emailjs
      .sendForm("service_j3uu3pc", "template_xyoj6ab", form.current, {
        publicKey: "TgJAk2TpmMyPK53XR",
      })
      .then(
        () => {
          setSuccessMessage("✅ Message sent successfully!");
          setErrorMessage("");
          setIsSending(false); // re-enable button
          e.target.reset();
          console.log("SUCCESS!");

          setTimeout(() => {
            setSuccessMessage("");
          }, 2000);
        },
        (error) => {
          setErrorMessage("❌ Oops! Something went wrong.");
          setSuccessMessage("");
          setIsSending(false); // re-enable button
          console.error(error);
          console.log("FAILED...", error.text);
          setTimeout(() => {
            setErrorMessage("");
          }, 3000);
        }
      );
  };

  const socialIconLinkStyle = {
    margin: "0 15px",
    color: linkColor,
    textDecoration: "none",
  };

  const socialIconStyle = {
    fontSize: iconSize,
    color: iconColor,
    transition: "color 0.3s ease",
  };

  const handleIconHover = (event, hoverColor) => {
    event.currentTarget.style.color = hoverColor;
  };

  const handleIconMouseOut = (event, originalColor) => {
    event.currentTarget.style.color = originalColor;
  };


  const inputGroupStyle = {
    marginBottom: "15px",
  };

  const labelStyle = {
    display: "block",
    marginBottom: "5px",
    fontSize:'1.1rem',
    letterSpacing:"2px",
    
  };

  const inputStyle = {
    width: "100%",
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    fontSize: "1em",
    boxSizing: "border-box",
  };

  const textareaStyle = {
    width: "100%",
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    fontSize: "1em",
    boxSizing: "border-box",
    minHeight: "100px",
  };

  const buttonStyle = {
    backgroundColor: "#ff0055",
    color: "white",
    padding: "1px 20px",
    borderRadius: "5px",
    fontSize: "1em",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  };

  const buttonHoverStyle = {
    backgroundColor: "#cc0044",
  };

  return (
    <>
      <div
        id="contact"
        className=" bg-black text-white flex flex-col items-center min-h-screen py-10 relative overflow-hidden" // Added relative and overflow-hidden for Aurora positioning
        style={{ padding: "50px" }}
      >
        <BlurText
          text="Let's Work Together"
          delay={150}
          animateBy="words"
          direction="top"
          className=" text-center text-6xl mb-8 font-extrabold font-serif "
        />
        <div
          className="container mx-auto max-w-4xl w-full flex flex-col md:flex-row items-center justify-center z-10" // Added z-10 to keep content above Aurora
          style={{ paddingTop: "4rem" }}
        >
          <div
            className="flex-1 md:pr-10 mb-8 md:mb-0"
            style={{ paddingRight: "40px" }}
          >
            {/* Added margin control for mobile */}
            <div className="text-[1.2rem] mb-[30px] text-center">
              <p>
                Every great collaboration starts with a simple hello. Drop me a
                line!
              </p>
              <div>
                You can contact me via the form or at
                <a href="">
                  <br />
                  "
                  <ShinyText
                    text="prabhatbhasme@gmail.com"
                    disabled={false}
                    speed={3}
                    className="custom-class"
                  />
                  "
                </a>
              </div>
            </div>
          </div>
          <div className="flex-1">
            <form ref={form} className="flex flex-col" onSubmit={sendEmail}>
              <div style={inputGroupStyle}>
                <label htmlFor="name" style={labelStyle}>
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="user_name"
                  style={inputStyle}
                  required
                />
              </div>
              <div style={inputGroupStyle}>
                <label htmlFor="email" style={labelStyle}>
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="user_email"
                  style={inputStyle}
                  required
                />
              </div>
              <div style={inputGroupStyle}>
                <label htmlFor="message" style={labelStyle}>
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  style={textareaStyle}
                ></textarea>
              </div>
              <button
                type="submit"
                value="Send"
                style={buttonStyle}
                onMouseOver={(e) =>
                  Object.assign(e.target.style, buttonHoverStyle)
                }
                onMouseOut={(e) => Object.assign(e.target.style, buttonStyle)}
              >
                {isSending ? "Sending..." : "Send"}
              </button>
            </form>
            {/* Show success or error message */}
            {successMessage && (
              <p className="mt-4 text-green-400">{successMessage}</p>
            )}
            {errorMessage && (
              <p className="mt-4 text-red-400">{errorMessage}</p>
            )}
          </div>
        </div>
        <footer
          className="text-white text-center mt-12 z-10 w-full"
          style={{ paddingTop: "4rem" }}
        >
          <div className="flex justify-center align-middle">
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              style={socialIconLinkStyle}
            >
              <FaFacebook
                style={socialIconStyle}
                onMouseOver={(e) => handleIconHover(e, "#1877F2")}
                onMouseOut={(e) => handleIconMouseOut(e, iconColor)}
              />
            </a>
            <a
              href="https://www.instagram.com/yourprofile"
              target="_blank"
              rel="noopener noreferrer"
              style={socialIconLinkStyle}
            >
              <FaInstagram
                style={socialIconStyle}
                onMouseOver={(e) => handleIconHover(e, "#E4405F")}
                onMouseOut={(e) => handleIconMouseOut(e, iconColor)}
              />
            </a>
            <a
              href="https://x.com/PrabhatBhasme"
              target="_blank"
              rel="noopener noreferrer"
              style={socialIconLinkStyle}
            >
              <FaTwitter
                style={socialIconStyle}
                onMouseOver={(e) => handleIconHover(e, "#1DA1F2")}
                onMouseOut={(e) => handleIconMouseOut(e, iconColor)}
              />
            </a>
            <a
              href="https://www.linkedin.com/in/prabhat-bhasme-834b5b228/"
              target="_blank"
              rel="noopener noreferrer"
              style={socialIconLinkStyle}
            >
              <FaLinkedin
                style={socialIconStyle}
                onMouseOver={(e) => handleIconHover(e, "#0077B5")}
                onMouseOut={(e) => handleIconMouseOut(e, iconColor)}
              />
            </a>
            {/* Add more social media icons as needed */}
          </div>
          <p className="text-gray-500 mt-6" style={{ marginTop: "25px" }}>
            {/* Added margin top */}
            &copy; 2025 by{" "}
            <span className="text-[#E4405F] font-semibold">Prabhat Bhasme</span>
            . All rights reserved.
          </p>
        </footer>
        {/*Aurora*/}
        <div className="absolute inset-x-0 bottom-0 w-full h-[30vh] sm:h-[40vh] md:h-[45vh] lg:h-[50vh] pointer-events-none z-0">
          <Aurora
            colorStops={["#C63C51", "#6D2323", "#FF3232"]}
            blend={0.22}
            amplitude={0.8}
            speed={0.3}
          />
        </div>
      </div>
    </>
  );
};

export default ContactPage;
