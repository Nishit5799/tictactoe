"use client";
import React, { useState, useEffect } from "react";

import LandingPage from "@/components/landingpage/LandingPage";
import Loader from "@/components/landingpage/Loader";

const Page = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading process or any async operation
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 5000); // Adjust the timeout to match your needs

    return () => clearTimeout(timer); // Cleanup the timeout
  }, []);

  return <>{isLoading ? <Loader /> : <LandingPage />}</>;
};

export default Page;
