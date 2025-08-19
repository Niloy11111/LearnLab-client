import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const DiscountModal = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="text-sm px-5 " size="sm">
          Add Flash Sale
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>This Features Coming Soon</DialogTitle>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default DiscountModal;
