"use client";
import { Button } from "@/components/ui/button";

import { Phone } from "lucide-react";

const ContactWidget = () => {
  return (
    <div className="bg-white  border border-primary-200 rounded-2xl p-7 h-fit min-w-[300px]">
      <div className="flex items-center gap-5 mb-4 border border-primary-200 p-4 rounded-xl">
        <div className="flex items-center p-4 bg-primary-900 rounded-full">
          <Phone className="text-primary-50" size={15} />
        </div>
        <div>
          <p>Contact Us to Enroll</p>
          <div className="text-lg font-bold text-primary-800">
            (424) 340-5574
          </div>
        </div>
      </div>
      <Button className="w-full ">Pre Regestered</Button>

      <hr className="my-4" />
      <div className="text-sm">
        <div className="text-primary-600 mb-1">
          Language: Bengali and English.
        </div>
        <div className="text-primary-600">
          Open by appointment on Monday - Sunday
        </div>
      </div>
    </div>
  );
};

export default ContactWidget;
