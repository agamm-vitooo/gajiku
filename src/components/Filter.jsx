"use client";
import { useState } from "react";

export default function Filter({ onFilterChange, category }) {
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");

  const handleFilterChange = (field, value) => {
    const newFilter = { day, month, year, [field]: value };
    onFilterChange(newFilter);
    if (field === "day") setDay(value);
    if (field === "month") setMonth(value);
    if (field === "year") setYear(value);
  };

  return (
    <div className="bg-white p-3 shadow rounded w-full flex gap-2 items-center text-slate-600">
      {category === "expenses" && (
        <input
          type="number"
          value={day}
          onChange={(e) => handleFilterChange("day", e.target.value)}
          placeholder="Hari"
          className="w-16 p-2 border rounded text-center"
          min="1"
          max="31"
        />
      )}
      <select
        value={month}
        onChange={(e) => handleFilterChange("month", e.target.value)}
        className="p-2 border rounded"
      >
        <option value="">Bulan</option>
        {["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"].map((m, i) => (
          <option key={i} value={String(i + 1).padStart(2, "0")}>{m}</option>
        ))}
      </select>
      <select
        value={year}
        onChange={(e) => handleFilterChange("year", e.target.value)}
        className="p-2 border rounded"
      >
        <option value="">Tahun</option>
        {[...Array(10)].map((_, i) => {
          const yearValue = new Date().getFullYear() - i;
          return <option key={yearValue} value={yearValue}>{yearValue}</option>;
        })}
      </select>
    </div>
  );
}
