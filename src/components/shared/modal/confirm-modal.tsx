import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type ConfirmDialogProps = {
  title: string;
  label: string;
  onClose: () => void;
  onConfirm: () => void;
  className?: string;
};

export function ConfirmDialog({
  title,
  label,
  onClose,
  onConfirm,
  className,
}: ConfirmDialogProps) {
  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className={cn("sm:max-w-md", className)}>
        <DialogHeader>
          <DialogTitle className="text-2xl">{title}</DialogTitle>
          <DialogDescription className="text-base">{label}</DialogDescription>
        </DialogHeader>

        <DialogFooter className="gap-2">
          <Button variant="outline" className="border-border font-medium shadow-none" onClick={onClose}>
            Cancelar
          </Button>
          <Button className="bg-primary" onClick={onConfirm}>
            Confirmar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
