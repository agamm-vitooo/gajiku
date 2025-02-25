"use client";
import { useState, useEffect } from "react";
import SalaryForm from "@/components/SalaryForm";
import ExpenseForm from "@/components/ExpenseForm";
import SalaryList from "@/components/SalaryList";
import ExpensesList from "@/components/ExpensesList";
import Filter from "@/components/Filter";
import RekapData from "@/components/RekapData";
import { addExpense, getExpenses } from "@/lib/expenses";
import { addSalary, getSalaries } from "@/lib/salaries";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function Dashboard() {
  const [filter, setFilter] = useState({ month: "", year: "" });
  const [salaries, setSalaries] = useState([]);
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    async function fetchData() {
      setSalaries(await getSalaries());
      setExpenses(await getExpenses());
    }
    fetchData();
  }, []);

  return (
    <div className="max-w-screen-lg mx-auto p-6 h-screen overflow-y-auto">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Kolom Kiri - Form Input */}
        <div className="md:w-1/3 w-full space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-blue-700">Tambah Pemasukan</CardTitle>
            </CardHeader>
            <CardContent>
              <SalaryForm addSalary={addSalary} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-red-700">Tambah Pengeluaran</CardTitle>
            </CardHeader>
            <CardContent>
              <ExpenseForm addExpense={addExpense} />
            </CardContent>
          </Card>
        </div>

        {/* Kolom Kanan */}
        <div className="md:w-2/3 w-full space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-gray-700">Filter Data</CardTitle>
            </CardHeader>
            <CardContent>
              <Filter onFilterChange={setFilter} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-green-700">Riwayat Gaji</CardTitle>
            </CardHeader>
            <CardContent>
              <SalaryList filter={filter} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-red-700">Riwayat Pengeluaran</CardTitle>
            </CardHeader>
            <CardContent>
              <ExpensesList filter={filter} />
            </CardContent>
          </Card>

          {/* Rekap Data */}
          <RekapData salaries={salaries} expenses={expenses} filter={filter} />
        </div>
      </div>
    </div>
  );
}
