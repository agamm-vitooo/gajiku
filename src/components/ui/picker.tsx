"use client";

import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";

export default function DatePicker({ onDateChange }) {
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    if (onDateChange) {
      onDateChange(date); // Pastikan hanya dipanggil jika ada
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">
          {selectedDate ? format(selectedDate, "dd/MM/yyyy") : "Pilih Tanggal"}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start">
        <Calendar mode="single" selected={selectedDate} onSelect={handleDateChange} />
      </PopoverContent>
    </Popover>
  );
}
