"use client";
import { useState } from "react";
import { addSalary } from "@/lib/salaries";
import Button from "@/components/Button";
import { toast } from "sonner"; 

export default function SalaryForm() {
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await addSalary(amount, description);
      toast.success("Pemasukan berhasil ditambahkan!");
      setAmount("");
      setDescription("");
    } catch (error) {
      toast.error("Terjadi kesalahan: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <input
        type="number"
        className="w-full p-2 border rounded text-slate-500"
        placeholder="Jumlah Pemasukan"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        required
      />
      <input
        type="text"
        className="w-full p-2 border rounded text-slate-500"
        placeholder="Deskripsi (Opsional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <Button type="submit" className="bg-blue-700 hover:bg-blue-800" disabled={loading}>
        {loading ? "Menambahkan..." : "Tambah Pemasukan"}
      </Button>
    </form>
  );
}
