"use client";
import { useState } from "react";
import Button from "@/components/Button";
import { toast } from "sonner";

export default function ExpenseForm({ addExpense }) {
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!amount || !category) return;
    addExpense(amount, category, date, description);
    setAmount("");
    setCategory("");
    setDescription("");
    setDate(new Date().toISOString().split("T")[0]);
    toast.success("Pengeluaran berhasil ditambahkan!");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <input
        type="number"
        className="w-full p-2 border rounded"
        placeholder="Jumlah Pengeluaran"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <input
        type="text"
        className="w-full p-2 border rounded"
        placeholder="Kategori"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />
      <input
        type="date"
        className="w-full p-2 border rounded"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        disabled
      />
      <input
        type="text"
        className="w-full p-2 border rounded"
        placeholder="Deskripsi (opsional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <Button type="submit" className="bg-red-600 hover:bg-red-700">
        Tambah Pengeluaran
      </Button>
    </form>
  );
}
