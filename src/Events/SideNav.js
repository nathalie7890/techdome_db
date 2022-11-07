import React from "react";
import { Link } from "react-router-dom";
import { AiOutlineHome } from "react-icons/ai";
import { FiUsers } from "react-icons/fi";
import { BsCalendar3 } from "react-icons/bs";
import { HiLocationMarker } from "react-icons/hi";

export default function SideNav({ editOpen }) {
  return (
    <div className={`w-full ${!editOpen.visible ? "p-4" : "p-2"} sticky top-0 right-0`}>
      {!editOpen.visible ? (
        <h1 className="flex justify-end w-full text-sm font-bold text-blue-300">
          Admin
        </h1>
      ) : null}
      <div>
        <div className="flex my-16">
          <div
            className={`flex flex-col items-center justify-center bg-blue-300 rounded-md ${
              !editOpen.visible ? "w-12 h-12" : "w-full h-12"
            }`}
          >
            <h1 className="text-2xl font-semibold text-white">JD</h1>
          </div>
          {!editOpen.visible ? (
            <div className="flex flex-col justify-end px-2 text-sm text-gray-400">
              <h1 className="font-semibold text-white">John Doe</h1>
              <p>johndoe@gmail.com</p>
            </div>
          ) : null}
        </div>
        <div className="flex flex-col space-y-4">
          <div
            className={`flex px-2 py-4 space-x-4 rounded-md text-white hover:bg-white/10 ${
              !editOpen.visible ? "justify-start" : "justify-center"
            }`}
          >
            <AiOutlineHome className="text-2xl text-white" />
            {!editOpen.visible ? (
              <h1 className="flex flex-col justify-end">Home</h1>
            ) : null}
          </div>
          <div
            className={`flex px-2 py-4 space-x-4 rounded-md text-white hover:bg-white/10 ${
              !editOpen.visible ? "justify-start" : "justify-center"
            }`}
          >
            <FiUsers className="text-2xl text-white" />
            {!editOpen.visible ? (
              <h1 className="flex flex-col justify-end">Contacts</h1>
            ) : null}
          </div>
          <div
            className={`flex px-2 py-4 space-x-4 rounded-md text-white hover:bg-white/10 ${
              !editOpen.visible ? "justify-start" : "justify-center"
            }`}
          >
            <BsCalendar3 className="text-2xl text-white" />
            {!editOpen.visible ? (
              <Link className="flex flex-col justify-end">Events</Link>
            ) : null}
          </div>
          <div
            className={`flex px-2 py-4 space-x-4 rounded-md text-white hover:bg-white/10 ${
              !editOpen.visible ? "justify-start" : "justify-center"
            }`}
          >
            <HiLocationMarker className="text-2xl text-white" />
            {!editOpen.visible ? (
              <Link className="flex flex-col justify-end">Events</Link>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
