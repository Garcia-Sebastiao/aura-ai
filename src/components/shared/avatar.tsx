import { cn } from "@/lib/utils";
import { getInitials } from "@/utils/getInitials";
import {
  Avatar as CustomAvatar,
  AvatarFallback,
  AvatarImage,
} from "@radix-ui/react-avatar";

type AvatarProps = {
  src?: string;
  name: string;
  className?: string;
};

export function Avatar({ src, name, className }: AvatarProps) {
  return (
    <CustomAvatar className={cn("w-12 h-12 flex-none rounded-full bg-primary overflow-hidden", className)}>
      <AvatarImage src={src} className="w-full h-full object-cover" />
      {!src && <AvatarFallback className="font-semibold text-white">{getInitials(name ?? "")}</AvatarFallback>}
    </CustomAvatar>
  );
}
