import getInfosFromDB from "contexts/User/GetuserFromDB";
import { useUserInfos } from "contexts/User/userContent";
import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

type ChildrenProps = {
  children: React.ReactNode;
};

const PrivateRoute = ({ children }: ChildrenProps) => {
  const navigate = useNavigate();
  const { userName } = useUserInfos();
  // useEffect (() => async {
  // 	const user = await getInfosFromDB();
  // 	setUserInfos(user),
  // })
  return !userName ? children : navigate("/login");
};

export default PrivateRoute;
