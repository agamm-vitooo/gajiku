"use client";
import { useEffect, useState } from "react";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function RekapData({ salaries, expenses, filter }) {
  const [totalSalary, setTotalSalary] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const saldo = totalSalary - totalExpense;

  useEffect(() => {
    // Hitung total gaji berdasarkan filter
    const filteredSalaries = salaries.filter(salary => {
      const date = new Date(salary.date.seconds * 1000);
      return (
        (filter.month ? String(date.getMonth() + 1).padStart(2, "0") === filter.month : true) &&
        (filter.year ? String(date.getFullYear()) === filter.year : true)
      );
    });

    // Hitung total pengeluaran berdasarkan filter
    const filteredExpenses = expenses.filter(expense => {
      const date = new Date(expense.date.seconds * 1000);
      return (
        (filter.month ? String(date.getMonth() + 1).padStart(2, "0") === filter.month : true) &&
        (filter.year ? String(date.getFullYear()) === filter.year : true)
      );
    });

    setTotalSalary(filteredSalaries.reduce((acc, cur) => acc + cur.amount, 0));
    setTotalExpense(filteredExpenses.reduce((acc, cur) => acc + cur.amount, 0));
  }, [salaries, expenses, filter]);

  // Fungsi untuk ekspor PDF
  const exportToPDF = () => {
    const doc = new jsPDF();

    doc.text("Laporan Keuangan", 14, 10);
    doc.text(`Periode: ${filter.month || "Semua Bulan"} - ${filter.year || "Semua Tahun"}`, 14, 20);

    autoTable(doc, {
      startY: 30,
      head: [["Kategori", "Total (Rp)"]],
      body: [
        ["Total Gaji", `Rp ${totalSalary.toLocaleString()}`],
        ["Total Pengeluaran", `Rp ${totalExpense.toLocaleString()}`],
        ["Saldo", `Rp ${saldo.toLocaleString()}`],
      ],
    });

    doc.save("rekap_keuangan.pdf");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-gray-700">Rekap Data</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4 text-lg">
          <div className="text-green-700">Total Gaji: <b>Rp {totalSalary.toLocaleString()}</b></div>
          <div className="text-red-700">Total Pengeluaran: <b>Rp {totalExpense.toLocaleString()}</b></div>
          <div className="col-span-2 text-blue-700">Saldo: <b>Rp {saldo.toLocaleString()}</b></div>
        </div>
        <Button onClick={exportToPDF} className="mt-4 w-full bg-blue-500 hover:bg-blue-600">
          Download PDF
        </Button>
      </CardContent>
    </Card>
  );
}
