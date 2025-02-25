"use client";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { getSalaries, updateSalary, deleteSalary } from "@/lib/salaries";

export default function SalaryList({ filter }) {
  const [salaries, setSalaries] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editAmount, setEditAmount] = useState("");

  useEffect(() => {
    async function fetchSalaries() {
      const data = await getSalaries();
      const filteredData = data.filter(({ date }) => {
        if (!date || !date.seconds) return false;
        const salaryDate = new Date(date.seconds * 1000);
        return (!filter.month || salaryDate.getMonth() + 1 === Number(filter.month)) &&
               (!filter.year || salaryDate.getFullYear() === Number(filter.year));
      });

      setSalaries(filteredData);
    }

    fetchSalaries();
  }, [filter]);

  const handleEdit = (id, amount) => {
    setEditingId(id);
    setEditAmount(amount);
  };

  const handleSave = async (id) => {
    if (!editAmount) return;
    await updateSalary(id, { amount: Number(editAmount) });
    setSalaries(salaries.map(s => (s.id === id ? { ...s, amount: Number(editAmount) } : s)));
    setEditingId(null);
    toast.success("✅ Data gaji berhasil diperbarui!");
  };

  const handleDelete = async (id) => {
    toast.warning("⚠️ Yakin ingin menghapus?", {
      action: {
        label: "Hapus",
        onClick: async () => {
          await deleteSalary(id);
          setSalaries(salaries.filter(s => s.id !== id));
          toast.error("❌ Data gaji berhasil dihapus!");
        },
      },
    });
  };

  return (
    <div className="bg-white p-4 shadow rounded w-full">
      <h2 className="text-lg font-medium mb-2 text-blue-700">Daftar Pemasukan</h2>

      {salaries.length === 0 ? (
        <p className="text-gray-500">Data tidak ditemukan.</p>
      ) : (
        <ul className="space-y-2">
          {salaries.map(({ id, amount, date, description }) => (
            <li key={id} className="border p-3 rounded flex justify-between items-center">
              <div>
                {editingId === id ? (
                  <input
                    type="number"
                    value={editAmount}
                    onChange={(e) => setEditAmount(e.target.value)}
                    className="border rounded px-2 py-1"
                  />
                ) : (
                  <p className="text-lg font-semibold text-slate-600">Rp {amount.toLocaleString()}</p>
                )}
                <p className="text-slate-500">{description || "-"}</p>
                <p className="text-sm text-gray-500">
                  {date?.seconds ? new Date(date.seconds * 1000).toLocaleDateString() : "Tanggal tidak tersedia"}
                </p>
              </div>
              <div className="flex gap-2">
                {editingId === id ? (
                  <button
                    onClick={() => handleSave(id)}
                    className="text-sm bg-green-500 text-white px-3 py-1 rounded"
                  >
                    Simpan
                  </button>
                ) : (
                  <button
                    onClick={() => handleEdit(id, amount)}
                    className="text-sm bg-blue-500 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </button>
                )}
                <button
                  onClick={() => handleDelete(id)}
                  className="text-sm bg-red-500 text-white px-3 py-1 rounded"
                >
                  Hapus
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
