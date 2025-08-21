"use client";
import { faqs } from "@/lib/frequentData";
import { Minus, Plus } from "lucide-react";
import { useState } from "react";

const FrequentQuestion = () => {
  const [currentId, setCurrentId] = useState(null);

  const handleVisibility = (itemId) => {
    if (itemId === currentId) {
      setCurrentId(null);
    } else {
      setCurrentId(itemId);
    }
  };

  return (
    <div className="my-24">
      <h1 className="text-4xl md:text-5xl  mb-16 text-center font-bold text-primary-800">
        Frequently Asked <br className="md:hidden block" /> Questions
      </h1>

      <section className="customWidth xl:w-[40%] lg:w-[50%] md:w-[60%] mx-auto">
        {faqs?.map((item) => (
          <div
            onClick={() => handleVisibility(item?.id)}
            key={item?.id}
            className="border-b "
          >
            <div className="pt-2 cursor-pointer flex justify-between ">
              <h1 className="pb-8 font-bold text-xl text-primary-800">
                {item?.question}
              </h1>
              {item?.id === currentId ? <Minus /> : <Plus />}
            </div>

            <div
              className={`grid transition-[grid-template-rows] duration-300 ${
                item?.id === currentId ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              }`}
            >
              <div className="overflow-hidden">
                <p className="smallDesc text-left pb-5">{item?.answer}</p>
              </div>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default FrequentQuestion;
