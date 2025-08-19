import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { roles } from "@/constants/roles";
import { updateUserStatus } from "@/services/User";
import { IUser } from "@/types";

import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

const UserRoleEditModal = ({
  isOpen,
  onClose,
  selectedUser,
}: {
  isOpen: boolean;
  onClose: () => void;
  selectedUser: IUser;
}) => {
  const form = useForm();

  // const { data: users } = useAllUsers();

  const {
    formState: { isSubmitting },
  } = form || {};

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    onClose();
    const toastId = toast.loading("Role updating... ");

    const payload = {
      updatedRole: data?.updatedRole?.toLowerCase(),
    };

    try {
      const res = await updateUserStatus(payload, selectedUser?._id as string);
      // console.log("res", res);

      if (res.success) {
        toast.success("Role Updated", { id: toastId });
      } else {
        toast.error(`Something went wrong`, { id: toastId });
      }
    } catch (err) {
      toast.error(`Something went wrong ${err}`, { id: toastId });
    }
  };

  // console.log("after users", users);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] border-input">
        <DialogHeader>
          <DialogTitle>Edit User Role</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="updatedRole"
              render={({ field }) => (
                <FormItem>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full rounded-[8px]">
                        <SelectValue placeholder="Select User Role" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="border-input">
                      {roles.map((role) => (
                        <SelectItem key={role?._id} value={role?.name}>
                          {role?.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full rounded-sm">
              {isSubmitting ? "Editing...." : "Edit"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default UserRoleEditModal;
