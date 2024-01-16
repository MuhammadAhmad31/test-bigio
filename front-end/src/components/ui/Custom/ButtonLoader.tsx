import { ReloadIcon } from "../Icons/ReloadIcon";
import { Button } from "../button";

interface ButtonLoaderProps {
  loading: boolean;
  children: React.ReactNode;
  className?: string;
}

export function ButtonLoader({
  loading,
  children,
  className,
}: ButtonLoaderProps) {
  return (
    <Button className={`${className}}`} type="submit" disabled={loading}>
      {loading && (
        <ReloadIcon
          className={`mr-2 h-5 w-5 ${loading ? "animate-spin" : ""}`}
        />
      )}
      {children}
    </Button>
  );
}
