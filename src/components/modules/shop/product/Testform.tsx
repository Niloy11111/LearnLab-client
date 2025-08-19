"use client";
import UserRoleEditModal from "@/components/modules/user/UserRoleEditModal";
import { Button } from "@/components/ui/button";
import Modal from "@/components/ui/core/modal/Modal";
import Header from "@/components/ui/form/Header";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { updateUserStatus } from "@/services/User";
import { IUser } from "@/types";

import { Check, Download, SquarePen, Trash, Trash2 } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";

const UsersPage = ({ users }: { users: IUser[] }) => {
  const [userId, setUserId] = useState("");

  const [openDelete, setOpenDelete] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null);

  const handleOpenDelete = (userId: string) => {
    setOpenDelete(true);
    setUserId(userId);
  };

  const handleDeleteOrder = async (status: string) => {
    const toastId = toast.loading("Deleting... ");
    setOpenDelete(false);
    const payload = {
      isDeleted: status,
    };
    try {
      const res = await updateUserStatus(payload, userId);
      if (res.success) {
        toast.success("User Deleted", { id: toastId });
      } else {
        // console.log("delete", res);
        toast.error(res.error.data.message, { id: toastId });
      }
    } catch (err) {
      toast.error(`Something went wrong ${err}`, { id: toastId });
    }
  };

  const handleButtonClick = (user: IUser) => {
    setIsModalOpen(true);
    setSelectedUser(user);
  };

  return (
    <div className="dashboard-container">
      <Header title={"Manage Users"} subtitle="Manage all users" />

      <div className="w-full space-y-6">
        <div className="mt-8 bg-white rounded-xl shadow-md overflow-hidden p-6">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h2 className="text-2xl font-bold mb-1">Users Overview</h2>
              <p className="text-sm text-gray-500">
                Manage and view all users.
              </p>
            </div>
            <div>
              <button
                className={`bg-white border border-gray-300 text-gray-700 py-2
              px-4 rounded-md flex items-center justify-center hover:bg-primary-700 hover:text-primary-50`}
              >
                <Download className="w-5 h-5 mr-2" />
                <span>Download All</span>
              </button>
            </div>
          </div>
          <hr className=" border-t border-input" />

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>User Role</TableHead>
                  <TableHead>Monthly Rent</TableHead>
                  <TableHead>Current Month Status</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Action</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users?.map((user) => (
                  <TableRow key={user?._id || ""} className="h-24">
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <Image
                          src={user?.photo || ""}
                          alt={user?.name}
                          width={40}
                          height={40}
                          className="rounded-full"
                        />
                        <div>
                          <div className="font-semibold">{user?.name}</div>
                          <div className="text-sm text-gray-500">
                            {user?.email}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <h1 className="max-w-[90px] border text-center py-1 border-input rounded">
                        {user?.role?.toUpperCase()}
                      </h1>
                    </TableCell>
                    <TableCell>
                      <h1 className="  ">
                        $500
                        {/* {user?.rent?.toFixed(2)} */}
                      </h1>
                    </TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${"bg-green-100 text-green-800 border-green-300"}`}
                      >
                        <Check className="w-4 h-4 inline-block mr-1" />
                        660f1b4c7a0b2e5f8
                      </span>
                    </TableCell>
                    <TableCell>{user?.phoneNumber}</TableCell>
                    <TableCell>
                      <button
                        onClick={() => handleButtonClick(user)}
                        className={`cursor-pointer border border-gray-300 text-gray-700 py-2 px-4 rounded-md flex 
                      items-center justify-center font-semibold hover:bg-primary-700 hover:text-primary-50`}
                      >
                        <SquarePen className="w-4 h-4 mr-2" />
                        Edit Role
                      </button>
                      <UserRoleEditModal
                        isOpen={isModalOpen}
                        onClose={() => setIsModalOpen(false)}
                        selectedUser={selectedUser as IUser}
                      />
                    </TableCell>
                    <TableCell>
                      <button
                        onClick={() => handleOpenDelete(user?._id || "")}
                        className={`cursor-pointer border border-gray-300 text-gray-700 py-2 px-4 rounded-md flex 
                      items-center justify-center font-semibold hover:bg-primary-700 hover:text-primary-50`}
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete User
                      </button>

                      <div>
                        <Modal
                          open={openDelete}
                          onClose={() => setOpenDelete(false)}
                        >
                          <div className="text-center ">
                            <Trash size={46} className="mx-auto text-red-500" />
                            <div className="mx-auto my-4 w-[400px]">
                              <h3 className="text-lg font-black text-gray-800">
                                Confirm Delete
                              </h3>
                              <p className="text-sm text-gray-500">
                                Are you sure you want to delete this
                              </p>
                            </div>
                            <div className="flex justify-center gap-4 ">
                              <Button
                                onClick={() => handleDeleteOrder("true")}
                                variant="secondary"
                                className="   bg-gray-100 py-2 rounded  px-7  "
                              >
                                Delete
                              </Button>
                              <Button
                                variant="secondary"
                                className="bg-gray-100    py-2 rounded  px-7  "
                                onClick={() => setOpenDelete(false)}
                              >
                                Cancel
                              </Button>
                            </div>
                          </div>
                        </Modal>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsersPage;
