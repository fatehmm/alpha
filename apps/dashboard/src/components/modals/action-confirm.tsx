import { useActionConfirmStore } from "../../store/action-confirm";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

export function ActionConfirmModal() {
  const { isOpen, title, content, confirmText, onConfirm, resetForm } =
    useActionConfirmStore();

  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm();
    }
    resetForm();
  };

  const handleClose = () => {
    resetForm();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="m-0 h-auto w-full max-w-full overflow-hidden border-none select-text md:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-normal md:text-3xl">
            {title}
          </DialogTitle>
          <DialogDescription className="text-base">{content}</DialogDescription>
        </DialogHeader>

        <DialogFooter className="flex gap-3 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={handleClose}
            className="flex-1"
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant="destructive"
            onClick={handleConfirm}
            className="flex-1"
          >
            {confirmText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
