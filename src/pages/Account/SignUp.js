import React, { useState } from "react";
import { BsCheckCircleFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { logoLight } from "../../assets/images";
import { db } from '../../firebaseConfig'; // Adjust path based on your project structure
import { addDoc, collection } from "firebase/firestore"; 

const SignUp = () => {
  // Initial State
  const [clientName, setClientName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [zip, setZip] = useState("");
  const [checked, setChecked] = useState(false);

  // Error Messages
  const [errClientName, setErrClientName] = useState("");
  const [errEmail, setErrEmail] = useState("");
  const [errPhone, setErrPhone] = useState("");
  const [errPassword, setErrPassword] = useState("");
  const [errAddress, setErrAddress] = useState("");
  const [errCity, setErrCity] = useState("");
  const [errCountry, setErrCountry] = useState("");
  const [errZip, setErrZip] = useState("");

  // Success Message
  const [successMsg, setSuccessMsg] = useState("");

  // Handle Form Input Changes
  const handleName = (e) => {
    setClientName(e.target.value);
    setErrClientName("");
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
    setErrEmail("");
  };

  const handlePhone = (e) => {
    setPhone(e.target.value);
    setErrPhone("");
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
    setErrPassword("");
  };

  const handleAddress = (e) => {
    setAddress(e.target.value);
    setErrAddress("");
  };

  const handleCity = (e) => {
    setCity(e.target.value);
    setErrCity("");
  };

  const handleCountry = (e) => {
    setCountry(e.target.value);
    setErrCountry("");
  };

  const handleZip = (e) => {
    setZip(e.target.value);
    setErrZip("");
  };

  // Form Validation
  const validateForm = () => {
    let isValid = true;

    if (!clientName.trim()) {
      setErrClientName("Please enter your full name");
      isValid = false;
    }

    if (!EmailValidation(email)) {
      setErrEmail("Invalid email address");
      isValid = false;
    }

    if (!phone.trim()) {
      setErrPhone("Please enter your phone number");
      isValid = false;
    }

    if (!password.trim()) {
      setErrPassword("Please enter a password");
      isValid = false;
    }

    if (!address.trim()) {
      setErrAddress("Please enter your address");
      isValid = false;
    }

    if (!city.trim()) {
      setErrCity("Please enter your city");
      isValid = false;
    }

    if (!country.trim()) {
      setErrCountry("Please enter your country");
      isValid = false;
    }

    if (!zip.trim()) {
      setErrZip("Please enter your zip/postal code");
      isValid = false;
    }

    if (!checked) {
      alert("Please agree to the Terms of Service and Privacy Policy");
      isValid = false;
    }

    return isValid;
  };

  // Email Validation Function
  const EmailValidation = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  // Save Data to Firestore
  const saveDataToFirestore = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const docRef = await addDoc(collection(db, "SignUps"), {
        email,
        password,
        clientName,
        phone,
        address,
        city,
        country,
        zip,
        checked,
        timestamp: new Date()
      });

      setSuccessMsg("Account created successfully!");
      setClientName("");
      setEmail("");
      setPhone("");
      setPassword("");
      setAddress("");
      setCity("");
      setCountry("");
      setZip("");
      setChecked(false);
    } catch (error) {
      console.error("Error adding document: ", error);
      alert("Error adding document: " + error.message);
    }
  };

  return (
    <div className="w-full h-screen flex items-center justify-start">
      <div className="w-1/2 hidden lgl:inline-flex h-full text-white">
        <div className="w-[450px] h-full bg-primeColor px-10 flex flex-col gap-6 justify-center">
          <Link to="/">
            {/* <img src={logoLight} alt="logoImg" className="w-28" /> */}
          </Link>
          <div className="flex flex-col gap-1 -mt-1">
            <h1 className="font-titleFont text-xl font-medium">
              Get started for free
            </h1>
            <p className="text-base">Create your account to access more</p>
          </div>
          <div className="w-[300px] flex items-start gap-3">
            <span className="text-green-500 mt-1">
              <BsCheckCircleFill />
            </span>
            <p className="text-base text-gray-300">
              <span className="text-white font-semibold font-titleFont">
                Get started fast with ITSOLN
              </span>
              <br />
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ab omnis
              nisi dolor recusandae consectetur!
            </p>
          </div>
          <div className="w-[300px] flex items-start gap-3">
            <span className="text-green-500 mt-1">
              <BsCheckCircleFill />
            </span>
            <p className="text-base text-gray-300">
              <span className="text-white font-semibold font-titleFont">
                Access all ITSOLN services
              </span>
              <br />
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ab omnis
              nisi dolor recusandae consectetur!
            </p>
          </div>
          <div className="w-[300px] flex items-start gap-3">
            <span className="text-green-500 mt-1">
              <BsCheckCircleFill />
            </span>
            <p className="text-base text-gray-300">
              <span className="text-white font-semibold font-titleFont">
                Trusted by online Shoppers
              </span>
              <br />
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ab omnis
              nisi dolor recusandae consectetur!
            </p>
          </div>
          <div className="flex items-center justify-between mt-10">
            <p className="text-sm font-titleFont font-semibold text-gray-300 hover:text-white cursor-pointer duration-300">
              © ITSOLN
            </p>
            <p className="text-sm font-titleFont font-semibold text-gray-300 hover:text-white cursor-pointer duration-300">
              Terms
            </p>
            <p className="text-sm font-titleFont font-semibold text-gray-300 hover:text-white cursor-pointer duration-300">
              Privacy
            </p>
            <p className="text-sm font-titleFont font-semibold text-gray-300 hover:text-white cursor-pointer duration-300">
              Security
            </p>
          </div>
        </div>
      </div>
      <div className="w-full lgl:w-[500px] h-full flex flex-col justify-center">
        {successMsg ? (
          <div className="w-[500px]">
            <p className="w-full px-4 py-10 text-green-500 font-medium font-titleFont">
              {successMsg}
            </p>
            <Link to="/signin">
              <button
                className="w-full h-10 bg-primeColor rounded-md text-gray-200 text-base font-titleFont font-semibold 
            tracking-wide hover:bg-black hover:text-white duration-300"
              >
                Sign in
              </button>
            </Link>
          </div>
        ) : (
          <form className="w-full lgl:w-[500px] h-screen flex items-center justify-center">
            <div className="px-6 py-4 w-full h-[96%] flex flex-col justify-start overflow-y-scroll scrollbar-thin scrollbar-thumb-primeColor">
              <h1 className="font-titleFont underline underline-offset-4 decoration-[1px] font-semibold text-2xl mdl:text-3xl mb-4">
                Create your account
              </h1>
              <div className="flex flex-col gap-3">
                {/* client name */}
                <div className="flex flex-col gap-.5">
                  <p className="font-titleFont text-base font-semibold text-gray-600">
                    Full Name
                  </p>
                  <input
                    onChange={handleName}
                    value={clientName}
                    className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                    type="text"
                    placeholder="eg. John Doe"
                  />
                  {errClientName && (
                    <p className="text-sm text-red-500 font-titleFont font-semibold px-4">
                      <span className="material-icons">
                        <strong>{errClientName}</strong>
                      </span>
                    </p>
                  )}
                </div>
                {/* email */}
                <div className="flex flex-col gap-.5">
                  <p className="font-titleFont text-base font-semibold text-gray-600">
                    Email Address
                  </p>
                  <input
                    onChange={handleEmail}
                    value={email}
                    className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                    type="email"
                    placeholder="eg. john.doe@example.com"
                  />
                  {errEmail && (
                    <p className="text-sm text-red-500 font-titleFont font-semibold px-4">
                      <strong>{errEmail}</strong>
                    </p>
                  )}
                </div>
                {/* phone */}
                <div className="flex flex-col gap-.5">
                  <p className="font-titleFont text-base font-semibold text-gray-600">
                    Phone Number
                  </p>
                  <input
                    onChange={handlePhone}
                    value={phone}
                    className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                    type="tel"
                    placeholder="eg. +1234567890"
                  />
                  {errPhone && (
                    <p className="text-sm text-red-500 font-titleFont font-semibold px-4">
                      <strong>{errPhone}</strong>
                    </p>
                  )}
                </div>
                {/* password */}
                <div className="flex flex-col gap-.5">
                  <p className="font-titleFont text-base font-semibold text-gray-600">
                    Password
                  </p>
                  <input
                    onChange={handlePassword}
                    value={password}
                    className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                    type="password"
                    placeholder="eg. ********"
                  />
                  {errPassword && (
                    <p className="text-sm text-red-500 font-titleFont font-semibold px-4">
                      <strong>{errPassword}</strong>
                    </p>
                  )}
                </div>
                {/* address */}
                <div className="flex flex-col gap-.5">
                  <p className="font-titleFont text-base font-semibold text-gray-600">
                    Address
                  </p>
                  <input
                    onChange={handleAddress}
                    value={address}
                    className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                    type="text"
                    placeholder="eg. 123 Main St"
                  />
                  {errAddress && (
                    <p className="text-sm text-red-500 font-titleFont font-semibold px-4">
                      <strong>{errAddress}</strong>
                    </p>
                  )}
                </div>
                {/* city */}
                <div className="flex flex-col gap-.5">
                  <p className="font-titleFont text-base font-semibold text-gray-600">
                    City
                  </p>
                  <input
                    onChange={handleCity}
                    value={city}
                    className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                    type="text"
                    placeholder="eg. Anytown"
                  />
                  {errCity && (
                    <p className="text-sm text-red-500 font-titleFont font-semibold px-4">
                      <strong>{errCity}</strong>
                    </p>
                  )}
                </div>
                {/* country */}
                <div className="flex flex-col gap-.5">
                  <p className="font-titleFont text-base font-semibold text-gray-600">
                    Country
                  </p>
                  <input
                    onChange={handleCountry}
                    value={country}
                    className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                    type="text"
                    placeholder="eg. United States"
                  />
                  {errCountry && (
                    <p className="text-sm text-red-500 font-titleFont font-semibold px-4">
                      <strong>{errCountry}</strong>
                    </p>
                  )}
                </div>
                {/* zip */}
                <div className="flex flex-col gap-.5">
                  <p className="font-titleFont text-base font-semibold text-gray-600">
                    Zip/Postal Code
                  </p>
                  <input
                    onChange={handleZip}
                    value={zip}
                    className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                    type="text"
                    placeholder="eg. 12345"
                  />
                  {errZip && (
                    <p className="text-sm text-red-500 font-titleFont font-semibold px-4">
                      <strong>{errZip}</strong>
                    </p>
                  )}
                </div>
                {/* terms checkbox */}
                <div className="flex items-center gap-1">
                  <input
                    onChange={() => setChecked(!checked)}
                    checked={checked}
                    className="h-5 w-5"
                    type="checkbox"
                    id="termsCheckbox"
                  />
                  <label
                    htmlFor="termsCheckbox"
                    className="text-base text-gray-600 font-titleFont cursor-pointer"
                  >
                    I agree to the{" "}
                    <span className="text-primeColor underline">
                      Terms of Service
                    </span>{" "}
                    and{" "}
                    <span className="text-primeColor underline">Privacy Policy</span>
                  </label>
                </div>
              </div>
              {/* submit button */}
              <button
                onClick={saveDataToFirestore}
                className="w-full h-10 bg-primeColor rounded-md text-gray-200 text-base font-titleFont font-semibold tracking-wide hover:bg-black hover:text-white duration-300 mt-6"
              >
                Create Account
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default SignUp;
