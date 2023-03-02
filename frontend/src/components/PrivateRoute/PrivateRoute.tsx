import Loading from "components/Loading";
import { useUserInfos } from "contexts/User/userContent";
import { backend } from "lib/backend";
import LandingPage from "pages/Landing/Landingpage";
import React, { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const PrivateRoute: FC<{ children: React.ReactElement }> = ({ children }) => {
  const navigate = useNavigate();
  const [tokenExists, setTokenExists] = useState(false);
  const { userName } = useUserInfos();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  async function checkUserToken() {
    
    // const response = await backend.checkToken();
    // if (response.statusCode == "400" || response.statusCode == "403") {
    //   navigate("/login");
    //   return;
    // }
    setIsLoading(false);
    setTokenExists(true);
  }
  useEffect(() => {
    checkUserToken();
  }, []);

  if (tokenExists && userName.userName) {
    return children;
  }
  return (
    <>
      {isLoading && <Loading />}
      {!isLoading && <LandingPage />}
    </>
  );
};

export default PrivateRoute;
