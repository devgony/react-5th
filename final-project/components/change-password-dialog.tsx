import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { passwordSchema, PasswordType } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Input from "./input";
import { changePassword } from "@/app/users/[username]/edit/actions";
import { useState } from "react";

interface Props {
  userId: number;
}
export function ChangePasswordDialog({ userId }: Props) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<PasswordType>({
    resolver: zodResolver(passwordSchema),
  });

  const action = async () => {
    await handleSubmit(async (data: PasswordType) => {
      const formData = new FormData();
      formData.append("password", data.password);
      formData.append("confirm", data.confirm);

      const errors = await changePassword(formData, userId);
      if (errors) {
        console.log(errors);
        return;
      }

      onOpenChange(false);
    })();
  };

  const [open, onOpenChange] = useState(false);
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button variant="secondary">Change Password</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Change Password</DialogTitle>
          <DialogDescription>
            should be more than 6 characters
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-[1fr,3fr] items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Password
            </Label>
            <Input
              type="password"
              {...register("password")}
              placeholder="Enter your password"
              required
              errors={[errors.password?.message ?? ""]}
            />
            <Label htmlFor="username" className="text-right">
              Confirm
            </Label>
            <Input
              type="password"
              {...register("confirm")}
              placeholder="Confirm your password"
              required
              errors={[errors.confirm?.message ?? ""]}
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={action}>
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
