import EditAvatar from "components/EditAvatar";
import EditName from "components/EditName";
import * as F from "styles/font.styles";
import * as S from "./Registration.styles";
import { useEffect, useState } from "react";
import { backend } from "lib/backend";
import { Cookies } from "typescript-cookie";
import LandingPage from "pages/Landing/Landingpage";
import { useNavigate } from "react-router-dom";

/* Here I check if the user has already a token in its cookie to go to this page
otherzise I redirect him to the landingpage */

const Registration = () => {
  const navigate = useNavigate();
  const [token, setToken] = useState("");
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
    const token: any = Cookies.get("token");
    checkUserToken();
    setToken(token);
  }, []);
  return tokenExists ? (
    <S.Container>
      <F.H2>Create Your Profile</F.H2>
      <S.Form>
        <EditAvatar page="registration" />
        <EditName linkTo="/" page="registration" />
      </S.Form>
    </S.Container>
  ) : null;
};

export default Registration;
