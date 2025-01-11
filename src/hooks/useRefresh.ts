import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function useRefresh(time: number) {
  const router = useRouter();
  useEffect(() => {
    const interval = setInterval(() => {
      router.refresh();
    }, time);

    return () => clearInterval(interval);
  }, []);
}
