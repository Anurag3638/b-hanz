import React from "react";
import { useAuth } from "../context/auth";

const About = () => {
  const [auth, setAuth] = useAuth();
  return (
    <>
      <pre>{JSON.stringify(auth, null, 4)}</pre>
      <div>About</div>
    </>
  );
};

export default About;
