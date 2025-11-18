import React, { useState, useRef, useEffect } from "react";
import s from "./otp.module.css";

const Otp = ({ len }) => {
  const inputRef = useRef([]);
  const handleChange = (val, idx) => {
    if (val === "") {
      console.log("here 1");
      const prev = idx === 0 ? 0 : idx - 1;
      inputRef.current[prev]?.focus();
    } else {
      console.log("here 2");
      const next = idx === len ? idx : idx + 1;
      inputRef.current[next]?.focus();
    }
    console.log(inputRef);
    console.log(val);
  };
  const handlePaste = (pasted, idx) => {
    const digits = pasted.replace(/\D/g, "");
    const trimmed = digits.slice(0, len-idx);
    const sz = trimmed.length;
    for(let i=0; i<sz; i+=1){
        inputRef.current[idx+i].value = trimmed[i];
        inputRef.current[idx+i].blur();
    }
    const next = idx + sz;
    if (next < len) {
    inputRef.current[next].value = "";   // important — clear it
    inputRef.current[next].focus();
  }
  }
  return (
    <div className={s.container}>
      <h2>OTP daal bkl</h2>
      <div className={s.inputDiv}>
        {Array.from({ length: len }).map((x, i) => {
          return (
            <input
              key={i}
              id={i}
              ref={(ref) => (inputRef.current[i] = ref)}
              name={`otp-${i}`}
              type="text"
              inputMode="numeric"
              maxLength={1}
              placeholder="-"
              className={s.inputField}
              onChange={(e) => handleChange(e.target.value, i)}
              onPaste={(e) => {
                e.preventDefault();
                const pastedText = e.clipboardData.getData("text");
                console.log("Pasted:", pastedText);
                handlePaste(pastedText, i)
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Otp;
