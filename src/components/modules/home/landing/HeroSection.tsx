"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import Image from "next/image";

const HeroSection = () => {
  return (
    <div className="relative h-[85vh]  ">
      <Image
        src="https://cdn.pixabay.com/photo/2024/08/14/14/41/home-based-learning-8968710_1280.png"
        alt=" Rental Platform Hero Section"
        fill
        className="object-cover object-center"
        priority
      />
      <div className="absolute inset-0 bg-[#0000007d] bg-blend-overlay "></div>
      <div className=" h-full flex justify-center items-center relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className=" text-center w-full "
        >
          <div className="max-w-4xl mx-auto px-16 sm:px-12">
            <h1 className="text-5xl font-extrabold text-white mb-4">
              Your Professional Training Starts Here Today
            </h1>
            <p className="text-xl text-white mb-8">
              Explore our comprehensive course library crafted to match your
              goals and learning style. Transform knowledge into success!
            </p>

            <div className="flex justify-center">
              <Input
                type="text"
                placeholder="Search by course"
                className="w-full max-w-lg rounded-none rounded-l-xl border-none bg-white h-12"
              />
              <Button className="bg-secondary-500 text-white rounded-none rounded-r-xl  border-none hover:bg-secondary-600 h-12 ">
                Find it
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HeroSection;
