import { LoaderIcon } from "lucide-react";

export default function Loading() {
  return (
    <div className="h-screen flex justify-center items-center">
      <LoaderIcon className="animate-spin" size={48} />
    </div>
  );
}
