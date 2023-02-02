import React, { ChangeEventHandler, useRef, useState } from "react";
import * as I from "../Input/Single.style";
import * as UI from "styles/buttons.styles";
import * as S from "./Submit2FA.style";
import { useNavigate } from "react-router-dom";

const Submit2FA = () => {
  const navigate = useNavigate();
  const [code, setCode] = useState({
    input1: "",
    input2: "",
    input3: "",
    input4: "",
    input5: "",
    input6: "",
  });

  const inputRefs: React.MutableRefObject<any>[] = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
  ];

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setCode((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleSpecialKey: React.KeyboardEventHandler<HTMLInputElement> = (
    e
  ) => {
    const index = parseInt(e.currentTarget.name.substring(5));

    if (
      (e.key === "Backspace" || e.key === "Delete") &&
      e.currentTarget.value === "" &&
      index > 1
    ) {
      console.log("inside");
      setTimeout(() => {
        inputRefs[index - 1].current.value = "";
        inputRefs[index - 2].current.focus();
      }, 100);
    } else if ((e.key === "Backspace" || e.key === "Delete") && index === 6) {
      inputRefs[5].current.value = "";
    }
    if (e.key === "ArrowLeft" && index > 1) {
      setTimeout(() => {
        inputRefs[index - 2].current.focus();
      }, 100);
    }
    if (e.key === "ArrowRight" && index < 6) {
      setTimeout(() => {
        inputRefs[index].current.focus();
      }, 100);
    }
  };

  const handleKeyPress: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if ((e.target as HTMLInputElement).value.length >= 1) e.preventDefault();
    const index = parseInt(e.currentTarget.name.substring(5));
    if (index < 6) {
      inputRefs[index].current.blur();
      setTimeout(() => {
        inputRefs[index].current.focus();
      }, 0); // SetTimeout to be sure the focus has time to be done
    }
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    navigate("/login");
  };

  return (
    <S.Container__Form onSubmit={handleSubmit}>
      <S.Container__Input>
        <I.Input
          name="input1"
          type="number"
          placeholder={"5"}
          required
          onChange={handleChange}
          onKeyDown={handleSpecialKey}
          onKeyPress={handleKeyPress}
          ref={inputRefs[0]}
        ></I.Input>
        <I.Input
          name="input2"
          type="number"
          placeholder={"5"}
          required
          onChange={handleChange}
          onKeyPress={handleKeyPress}
          onKeyDown={handleSpecialKey}
          ref={inputRefs[1]}
        ></I.Input>
        <I.Input
          name="input3"
          type="number"
          placeholder={"5"}
          required
          onChange={handleChange}
          onKeyPress={handleKeyPress}
          onKeyDown={handleSpecialKey}
          ref={inputRefs[2]}
        ></I.Input>
        <I.Input
          name="input4"
          type="number"
          placeholder={"5"}
          required
          onChange={handleChange}
          onKeyPress={handleKeyPress}
          onKeyDown={handleSpecialKey}
          ref={inputRefs[3]}
        ></I.Input>
        <I.Input
          name="input5"
          type="number"
          placeholder={"5"}
          required
          onChange={handleChange}
          onKeyPress={handleKeyPress}
          onKeyDown={handleSpecialKey}
          ref={inputRefs[4]}
        ></I.Input>
        <I.Input
          name="input6"
          type="number"
          placeholder={"5"}
          required
          onChange={handleChange}
          onKeyPress={handleKeyPress}
          onKeyDown={handleSpecialKey}
          ref={inputRefs[5]}
        ></I.Input>
      </S.Container__Input>
      <UI.SecondaryButton>Continue</UI.SecondaryButton>
    </S.Container__Form>
  );
};

export default Submit2FA;
