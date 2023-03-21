import SocketContext from "contexts/Socket/context";
import useFetchUserByName from "hooks/useFetchUserByName";
import { api } from "lib/api";
import { backend } from "lib/backend";
import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { PrimaryButton } from "styles/buttons.styles";

const Style = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  margin: 32px auto;
`;

const Field = styled.div`
  label,
  input {
    font-size: 1.5em;
  }
  input {
    padding: 8px;
  }
`;

function FakeLogin() {
  //   const [input, setInput] = useState("");
  //   const [res, setRes] = useState("");
  //   const SocketDispatch = useContext(SocketContext).SocketDispatch;

  //   async function handleSubmit(event: any) {
  //     event.preventDefault();
  //     // const response = await api.post('/fake_login', {username: input});
  //     // setRes(
  //     try {
  //       const name = await backend.getUserByName(input);
  //       localStorage.setItem("name", name);
  //       SocketDispatch({ type: "update_name", payload: name });
  //     } catch {
  //       throw new Error(`User ${input} doesn't exist`);
  //     }
  //   }

  //   function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
  //     setInput(event.currentTarget.value);
  //   }

  return (
    <></>
    // <Style onSubmit={handleSubmit}>
    //   <Field>
    //     <label htmlFor="username">Username: </label>
    //     <input
    //       type="text"
    //       id="username"
    //       name="username"
    //       value={input}
    //       onChange={handleChange}
    //     />
    //   </Field>
    //   <PrimaryButton style={{ width: "max-content" }} onClick={handleSubmit}>
    //     Login
    //   </PrimaryButton>
    //   <p>{res}</p>
    // </Style>
  );
}

export default FakeLogin;
