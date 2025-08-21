"use client";

import { Button } from "@/components/ui/button";
import { selectCurrentUser } from "@/redux/features/authSlice";
import { useAppSelector } from "@/redux/hook";
import {
  BookKey,
  BookOpen,
  Cake,
  Globe,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const AdminPage = () => {
  const user = useAppSelector(selectCurrentUser);

  return (
    <section className="flex gap-5 pt-4 pl-4 text-sm">
      <div className="w-6/10 ">
        <div className="pb-5 bg-white rounded ">
          <Image
            src="https://hype.my/wp-content/uploads/2024/07/4-10.jpg"
            width={500}
            alt="cover"
            height={200}
            className="w-full h-[350px] rounded"
          />
          <div className="ml-5 mt-[-85px] flex items-center gap-3">
            <Image
              src={user?.photo}
              width={160}
              alt="profile"
              height={160}
              className=" rounded-full"
            />
            <div className="mt-[70px]">
              <h1 className="font-bold text-xl ">{user?.name}</h1>
              <span className="smallDesc">@instagram</span>
            </div>
          </div>

          <section className="mt-5 ml-4">
            <div className="flex  items-center gap-2">
              <Globe className="w-[20px] text-primary-600" />{" "}
              <p className="smallDesc text-[12px]">
                <span className="text-black font-semibold">Language:</span>{" "}
                English / Bangla / Hindi
              </p>
            </div>
            <div className="flex  items-center gap-2">
              <Mail className="w-[20px] text-primary-600" />{" "}
              <p className="smallDesc text-[12px]">
                <span className="text-black font-semibold"> Email:</span>{" "}
                {user?.email}
              </p>
            </div>
            <div className="flex  items-center gap-2">
              <Phone className="w-[20px] text-primary-600" />{" "}
              <p className="smallDesc text-[12px]">
                <span className="text-black font-semibold">Phone: </span>
                {user?.phoneNumber}
              </p>
            </div>

            <div className="flex gap-4 mt-5">
              <Link href="/admin/settings">
                <Button
                  type="button"
                  className="bg-secondary-500 text-white hover:bg-secondary-600"
                >
                  {" "}
                  Go Settings
                </Button>
              </Link>
              <Button
                type="button"
                className="bg-secondary-500 text-white hover:bg-secondary-600"
              >
                {" "}
                Your Activites{" "}
              </Button>
            </div>
          </section>
        </div>

        <div className="py-2 px-3 mt-5 bg-white  b1 rounded">
          <div className="flex justify-between border-b pb-5 border-gray-300">
            <h1 className="font-bold">Personal Informtion</h1>
            <Link href="/admin/settings">
              <p className="underline">Edit Profile</p>
            </Link>
          </div>

          <p className="smallDesc text-left my-3">
            It is a long established fact that a reader will be distracted by
            the readable content of a page when looking at its layout.
          </p>

          <div className="flex items-center gap-2">
            <BookKey className="w-[20px] text-primary-600" />{" "}
            <p className="smallDesc mt-1 text-[12px]">
              <span className="font-bold text-black">UserId: </span>
              <span className="font-semibold rounded-sm bg-green-100 text-green-800 border-green-300  px-2 py-1">
                {user?._id}
              </span>
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Cake className="w-[20px] text-primary-600" />{" "}
            <p className="smallDesc mt-1 text-[12px]">
              <span className="font-bold text-black">Role: </span>
              {user?.role}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Cake className="w-[20px] text-primary-600" />{" "}
            <p className="smallDesc mt-1 text-[12px]">
              <span className="font-bold text-black">Birth Date: </span>
              06 June 1989
            </p>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-[20px] text-primary-600" />{" "}
            <p className="smallDesc mt-1 text-[12px]">
              <span className="font-bold text-black">Location: </span>
              Dhaka, Bangladesh
            </p>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-[20px] text-primary-600" />{" "}
            <p className="smallDesc mt-1 text-[12px]">
              <span className="font-bold text-black">Education: </span>
              National University
            </p>
          </div>
          <div className="flex items-center gap-2">
            <BookOpen className="w-[20px] text-primary-600" />{" "}
            <p className="smallDesc mt-1 text-[12px]">
              <span className="font-bold text-black">Religion: </span>
              Islam
            </p>
          </div>
        </div>
      </div>

      <div className="w-4/10">
        <div className="bg-white shadow-xl py-3 px-5 rounded">
          {user?.name} best performance from last year
        </div>
      </div>
    </section>
  );
};

export default AdminPage;
