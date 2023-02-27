import { useUserInfos } from "contexts/User/userContent";
import { backend } from "lib/backend";
import LandingPage from "pages/Landing/Landingpage";
import React, { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const PrivateRoute: FC<{ children: React.ReactElement }> = ({ children }) => {
  const navigate = useNavigate();
  const [tokenExists, setTokenExists] = useState(false);

  async function checkUserToken() {
    const response = await backend.checkToken();
    if (response.statusCode == "400" || response.statusCode == "403") {
      navigate("/login");
      return;
    }
    setTokenExists(true);
  }
  useEffect(() => {
    checkUserToken();
  }, []);
  if (tokenExists) {
    return children;
  }
  return <LandingPage />;
};

export default PrivateRoute;
