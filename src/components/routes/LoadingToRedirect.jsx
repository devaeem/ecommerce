import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const loadingtoRedirect = () => {
  const [count, setCount] = useState(3);
  const navigate = useNavigate();

  useEffect(() => {
    const Interval = setInterval(() => {
      setCount((currentCount) => --currentCount);
    }, 1000);
    count === 0 && navigate(-1);
    return () => clearInterval(Interval);
  }, [count]);
  return (
    <div>
      <h1> No Permission , redirect in {count} </h1>
    </div>
  );
};

export default loadingtoRedirect;