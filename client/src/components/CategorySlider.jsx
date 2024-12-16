// CategorySlider.js
import React from "react";

const categories = [
  {
    name: "All Topic",
    bgColor: "bg-black",
    textColor: "text-white",
    icon: "🏷️",
  },
  {
    name: "Restaurant",
    bgColor: "bg-black",
    textColor: "text-white",
    icon: "🍽️",
  },
  {
    name: "Street Food",
    bgColor: "bg-black",
    textColor: "text-white",
    icon: "🌭",
  },
  {
    name: "Food & Recipe",
    bgColor: "bg-black",
    textColor: "text-white",
    icon: "📚",
  },
  { name: "Company", bgColor: "bg-black", textColor: "text-white", icon: "🏢" },
];

const CategorySlider = () => {
  return (
    <div className="flex space-x-2 overflow-x-auto p-4 bg-white rounded-lg">
      {categories.map((category) => (
        <div
          key={category.name}
          className={`flex items-center space-x-2 whitespace-nowrap py-1 px-2 rounded-lg ${category.bgColor} ${category.textColor} cursor-pointer`}
        >
          <span className="text-lg">{category.icon}</span>
          <span>{category.name}</span>
        </div>
      ))}
      <div className="flex items-center justify-center py-2 px-4 rounded-full bg-black text-white cursor-pointer">
        <span>›</span>
      </div>
    </div>
  );
};

export default CategorySlider;
