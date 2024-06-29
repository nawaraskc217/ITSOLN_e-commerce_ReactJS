import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";
import { db } from '../../firebaseConfig'; // Adjust path based on your project structure
import { addDoc, collection } from "firebase/firestore"; 

const Contact = () => {
  const location = useLocation();
  const [prevLocation, setPrevLocation] = useState("");
  useEffect(() => {
    if (location.state && location.state.data) {
      setPrevLocation(location.state.data);
    }
  }, [location]);

  const [clientName, setClientName] = useState("");
  const [email, setEmail] = useState("");
  const [messages, setMessages] = useState("");

  // Error Messages
  const [errClientName, setErrClientName] = useState("");
  const [errEmail, setErrEmail] = useState("");
  const [errMessages, setErrMessages] = useState("");

  // Success Message
  const [successMsg, setSuccessMsg] = useState("");

  const handleName = (e) => {
    setClientName(e.target.value);
    setErrClientName("");
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
    setErrEmail("");
  };

  const handleMessages = (e) => {
    setMessages(e.target.value);
    setErrMessages("");
  };

  // Email Validation Function
  const validateEmail = (email) => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  // Form Submission Handling
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate Form
    if (!clientName.trim()) {
      setErrClientName("Please enter your name");
      return;
    }

    if (!email.trim()) {
      setErrEmail("Please enter your email");
      return;
    } else if (!validateEmail(email)) {
      setErrEmail("Please enter a valid email");
      return;
    }

    if (!messages.trim()) {
      setErrMessages("Please enter your message");
      return;
    }

    try {
      // Save to Firestore
      const docRef = await addDoc(collection(db, "ContactMessagesDB"), {
        clientName,
        email,
        messages,
                timestamp: new Date()
      });

      // Reset Form and Display Success Message
      setClientName("");
      setEmail("");
      setMessages("");
      
      setSuccessMsg(`Thank you, ${clientName}! Your message has been received.`);
    } catch (error) {
      console.error("Error adding document: ", error);
      alert("Error adding document: " + error.message);
    }
  };

  return (
    <div className="max-w-container mx-auto px-4">
      <Breadcrumbs title="Contact" prevLocation={prevLocation} />
      {successMsg ? (
        <p className="pb-20 w-96 font-medium text-green-500">{successMsg}</p>
      ) : (
        <form className="pb-20">
          <h1 className="font-titleFont font-semibold text-3xl">
            Fill out the Form
          </h1>
          <div className="w-[500px] h-auto py-6 flex flex-col gap-6">
            <div>
              <p className="text-base font-titleFont font-semibold px-2">
                Name
              </p>
              <input
                onChange={handleName}
                value={clientName}
                className="w-full py-1 border-b-2 px-2 text-base font-medium placeholder:font-normal placeholder:text-sm outline-none focus-within:border-primeColor"
                type="text"
                placeholder="Enter your name"
              />
              {errClientName && (
                <p className="text-red-500 text-sm font-titleFont font-semibold mt-1 px-2 flex items-center gap-1">
                  <span className="text-sm italic font-bold">!</span>
                  {errClientName}
                </p>
              )}
            </div>
            <div>
              <p className="text-base font-titleFont font-semibold px-2">
                Email
              </p>
              <input
                onChange={handleEmail}
                value={email}
                className="w-full py-1 border-b-2 px-2 text-base font-medium placeholder:font-normal placeholder:text-sm outline-none focus-within:border-primeColor"
                type="email"
                placeholder="Enter your email"
              />
              {errEmail && (
                <p className="text-red-500 text-sm font-titleFont font-semibold mt-1 px-2 flex items-center gap-1">
                  <span className="text-sm italic font-bold">!</span>
                  {errEmail}
                </p>
              )}
            </div>
            <div>
              <p className="text-base font-titleFont font-semibold px-2">
                Messages
              </p>
              <textarea
                onChange={handleMessages}
                value={messages}
                cols="30"
                rows="3"
                className="w-full py-1 border-b-2 px-2 text-base font-medium placeholder:font-normal placeholder:text-sm outline-none focus-within:border-primeColor resize-none"
                placeholder="Enter your message"
              ></textarea>
              {errMessages && (
                <p className="text-red-500 text-sm font-titleFont font-semibold mt-1 px-2 flex items-center gap-1">
                  <span className="text-sm italic font-bold">!</span>
                  {errMessages}
                </p>
              )}
            </div>
            <button
              onClick={handleSubmit}
              className="w-44 bg-primeColor text-gray-200 h-10 font-titleFont text-base tracking-wide font-semibold hover:bg-black hover:text-white duration-200"
            >
              Submit
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default Contact;
