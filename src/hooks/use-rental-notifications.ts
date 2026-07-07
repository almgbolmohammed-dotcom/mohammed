import { useEffect, useRef } from "react";
import type { Rental } from "@workspace/api-client-react";
import { useToast } from "@/hooks/use-toast";

const GRACE_MS = 3 * 60 * 60 * 1000;
const DAY_MS = 24 * 60 * 60 * 1000;
const STORAGE_KEY = "rental-notified-days";

function getNotifiedDays(): Record<string, number> {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "{}");
  } catch {
    return {};
  }
}

function setNotifiedDay(rentalId: number, day: number) {
  const data = getNotifiedDays();
  data[String(rentalId)] = day;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function calcCurrentDay(startedAt: string): number {
  const elapsedMs = Date.now() - new Date(startedAt).getTime();
  if (elapsedMs < GRACE_MS) return 0;
  return Math.floor((elapsedMs - GRACE_MS) / DAY_MS) + 1;
}

export function useRentalNotifications(rentals: Rental[] | undefined) {
  const { toast } = useToast();
  const toastRef = useRef(toast);
  toastRef.current = toast;

  useEffect(() => {
    if (!rentals?.length) return;

    const check = () => {
      const notified = getNotifiedDays();

      for (const rental of rentals) {
        if (rental.status !== "active") continue;
        const currentDay = calcCurrentDay(rental.startedAt);
        if (currentDay === 0) continue;

        const lastNotified = notified[String(rental.id)] ?? 0;
        if (currentDay > lastNotified) {
          for (let day = lastNotified + 1; day <= currentDay; day++) {
            const title = day === 1 ? "مرّ يوم كامل على التأجير" : `مرّت ${day} أيام على التأجير`;
            toastRef.current({
              title,
              description: `سيارة ${rental.carModel} (${rental.carPlate}) — اليوم ${day}`,
              duration: 8000,
            });
          }
          setNotifiedDay(rental.id, currentDay);
        }
      }
    };

    check();
    const interval = setInterval(check, 60 * 1000);
    return () => clearInterval(interval);
  }, [rentals]);
}
