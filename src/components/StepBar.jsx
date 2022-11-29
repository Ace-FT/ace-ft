import React, { useContext, useEffect } from "react";
import { AceContext } from "../context/context";

const StepBar = () => {
  const { isLoading, setIsLoading, step, setStep } = useContext(AceContext);


  const barSteps = document.getElementsByClassName('progress');
  const one = document.querySelector(".one");
  const two = document.querySelector(".two");
  const three = document.querySelector(".three");
  const four = document.querySelector(".four");
  const five = document.querySelector(".five");
  const six = document.querySelector(".six");
  const seven = document.querySelector(".seven");

  useEffect(() => {
    console.log("Step", step)
    if (step === 1) one.classList.add("inprogr")
    if (step === 2) two.classList.add("inprogr")
    if (step === 3) three.classList.add("inprogr")
    if (step === 4) four.classList.add("inprogr")
    if (step === 5) five.classList.add("inprogr")
    if (step === 6) six.classList.add("inprogr")
    if (step === 7) seven.classList.add("inprogr");
  }, [step])
  
  return (
    <>
      <ul id="stepbar" className="ml-m flex flex-col items-start mt-xs">
        <li className="mb-4 flex list-none items-center justify-center font-semibold">
          <p class="progress one">1</p>
          <p>Encrypting file</p>
        </li>
        <li className="my-4 flex list-none items-center justify-center font-semibold">
          <p class="progress two">2</p>
          <p>Uploading encrypted file</p>
        </li>
        <li className="my-4 flex list-none items-center justify-center font-semibold">
          <p class="progress three">3</p>
          <p>Creating and encrypting dataset</p>
        </li>
        <li className="my-4 flex list-none items-center justify-center font-semibold">
          <p class="progress four">4</p>
          <p>Uploading encrypted dataset</p>
        </li>
        <li className="my-4 flex list-none items-center justify-center font-semibold">
          <p class="progress five">5</p>
          <p>Deploying dataset</p>
        </li>
        <li className="my-4 flex list-none items-center justify-center font-semibold">
          <p class="progress six">6</p>
          <p>Pushing dataset secret</p>
        </li>
        <li className="my-4 flex list-none items-center justify-center font-semibold">
          <p class="progress seven">7</p>
          <p>File sent</p>
        </li>
      </ul>
    </>
  );
};

export default StepBar;
