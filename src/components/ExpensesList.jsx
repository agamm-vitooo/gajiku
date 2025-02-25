"use client";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { getExpenses, updateExpense, deleteExpense } from "@/lib/expenses";

export default function ExpensesList({ filter }) {
  const [expenses, setExpenses] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({ amount: "", category: "", description: "" });

  useEffect(() => {
    async function fetchExpenses() {
      const data = await getExpenses();

      const formattedData = data
        .map(expense => ({
          ...expense,
          date: expense.date?.seconds 
            ? new Date(expense.date.seconds * 1000).toISOString().split("T")[0]
            : "Invalid Date"
        }))
        .filter(expense => {
          if (!filter.month && !filter.year) return true;
          const expenseDate = new Date(expense.date);
          return (
            (filter.month ? String(expenseDate.getMonth() + 1).padStart(2, "0") === filter.month : true) &&
            (filter.year ? String(expenseDate.getFullYear()) === filter.year : true)
          );
        });

      setExpenses(formattedData);
    }

    fetchExpenses();
  }, [filter]);

  const handleEdit = (expense) => {
    setEditingId(expense.id);
    setEditData({
      amount: expense.amount,
      category: expense.category,
      description: expense.description,
    });
  };

  const handleSave = async (id) => {
    if (!editData.amount || !editData.category) return;
    await updateExpense(id, editData);
    setExpenses(expenses.map(exp => (exp.id === id ? { ...exp, ...editData } : exp)));
    setEditingId(null);
    toast.success("✅ Pengeluaran berhasil diperbarui!");
  };

  const handleDelete = async (id) => {
    toast.warning("⚠️ Yakin ingin menghapus?", {
      action: {
        label: "Hapus",
        onClick: async () => {
          await deleteExpense(id);
          setExpenses(expenses.filter(exp => exp.id !== id));
          toast.error("❌ Pengeluaran berhasil dihapus!");
        },
      },
    });
  };

  return (
    <div className="bg-white p-4 shadow rounded w-full mt-4">
      <h2 className="text-lg font-medium mb-2 text-red-700">Daftar Pengeluaran</h2>
      
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-200 mt-4">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">Tanggal</th>
              <th className="border p-2">Jumlah</th>
              <th className="border p-2">Kategori</th>
              <th className="border p-2">Deskripsi</th>
              <th className="border p-2">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {expenses.length > 0 ? (
              expenses.map((expense) => (
                <tr key={expense.id} className="text-center">
                  <td className="border p-2 whitespace-nowrap">{expense.date}</td>
                  
                  <td className="border p-2 text-red-600 whitespace-nowrap">
                    {editingId === expense.id ? (
                      <input
                        type="number"
                        value={editData.amount}
                        onChange={(e) => setEditData({ ...editData, amount: e.target.value })}
                        className="border rounded px-2 py-1 w-24"
                      />
                    ) : (
                      `Rp ${expense.amount}`
                    )}
                  </td>
                  
                  <td className="border p-2 whitespace-nowrap">
                    {editingId === expense.id ? (
                      <input
                        type="text"
                        value={editData.category}
                        onChange={(e) => setEditData({ ...editData, category: e.target.value })}
                        className="border rounded px-2 py-1 w-24"
                      />
                    ) : (
                      expense.category
                    )}
                  </td>
                  
                  <td className="border p-2 break-words">
                    {editingId === expense.id ? (
                      <input
                        type="text"
                        value={editData.description}
                        onChange={(e) => setEditData({ ...editData, description: e.target.value })}
                        className="border rounded px-2 py-1 w-full"
                      />
                    ) : (
                      expense.description || "-"
                    )}
                  </td>

                  <td className="border p-2 flex justify-center gap-2">
                    {editingId === expense.id ? (
                      <button
                        onClick={() => handleSave(expense.id)}
                        className="text-sm bg-green-500 text-white px-3 py-1 rounded"
                      >
                        Simpan
                      </button>
                    ) : (
                      <button
                        onClick={() => handleEdit(expense)}
                        className="text-sm bg-blue-500 text-white px-3 py-1 rounded"
                      >
                        Edit
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(expense.id)}
                      className="text-sm bg-red-500 text-white px-3 py-1 rounded"
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center p-4 text-gray-500">
                  Tidak ada pengeluaran yang sesuai filter.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
