// src/components/FloatingText.js

import React, { useState, useEffect } from "react";
import "../FloatingText.css"; // For custom styles if needed

const texts = [
  { text: "Super-Powered Recipe", style: "text-primary" },
  { text: "Cooking Inspiration", style: "text-secondary bg-" },
  { text: "Weeknight Dinner idea", style: "text-terra " },
  { text: "Breakfast Idea", style: "text-ascent-1" },
  { text: "helpful cooking tips", style: "text-hdColor" },
];

const FloatingText = () => {
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(true);
      setTimeout(() => {
        setIndex((prevIndex) => (prevIndex + 1) % texts.length);
        setFade(false);
      }, 1000); // This timeout should match the fade-out duration
    }, 3000); // Change text every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-32 mb-24">
      <div className=" mb-6">
        <p className="text-5xl text-center text-black font-semibold ">
          Get Your Next{" "}
        </p>
      </div>
      <div
        className={`absolute inset-0 flex items-center justify-center mt-24 duration-1000 ${
          fade ? "opacity-0" : "opacity-100"
        }`}
      >
        <p
          className={`text-6xl font-bold rounded-lg float ${texts[index].style}`}
        >
          {texts[index].text}
        </p>
      </div>
    </div>
  );
};

export default FloatingText;
