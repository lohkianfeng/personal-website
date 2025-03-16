import { cn } from "@/lib/utils";
import { LoaderCircle, type LucideProps } from "lucide-react";

type Props = LucideProps & {
  size?: number;
  className?: string;
};

export const Loading = ({ size = 96, className, ...props }: Props) => {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <LoaderCircle size={size} className={cn("text-myPrimary-40 animate-spin", className)} {...props} />
    </div>
  );
};

export default Loading;
