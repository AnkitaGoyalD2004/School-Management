"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

const EventCalendar = () => {
  const [value, onChange] = useState<Value>(new Date());
  const [mounted, setMounted] = useState(false);

  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (value instanceof Date) {
      router.push(`?date=${value}`);
    }
  }, [value, router]);

  if (!mounted) {
    return <div className="h-64 bg-gray-100 animate-pulse rounded-lg"></div>;
  }

  return (
    <div suppressHydrationWarning>
      <Calendar 
        value={value} 
        onChange={onChange}
        locale="en-US"
        formatLongDate={(locale, date) => date.toLocaleDateString('en-US')}
      />
    </div>
  );
};

export default EventCalendar;