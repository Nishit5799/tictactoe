"use client";
import Loader from "@/components/landingpage/Loader";
import { useEffect, useState } from "react";

export default function Loading() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Set a timer to hide the loader after 10 seconds
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 10000); // 10 seconds

    // Clear the timer if the component unmounts
    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) {
    return null; // Hide the loader after 10 seconds
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gray-900">
      <Loader />
    </div>
  );
}
