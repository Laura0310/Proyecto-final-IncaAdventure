import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const Login = () => {
  const { user, loginWithRedirect } = useAuth0();
  
  return (
    <button className="btn border" onClick={() => loginWithRedirect()}>Sign in</button>
  )
}

export default Login