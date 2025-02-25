"use client";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

// Import ikon secara dinamis agar hanya dirender di client
const FaMoneyBillWave = dynamic(() => import("react-icons/fa").then((mod) => mod.FaMoneyBillWave), { ssr: false });

export default function Navbar() {
  const [showIcon, setShowIcon] = useState(false);

  useEffect(() => {
    setShowIcon(true);
  }, []);

  return (
    <nav className="bg-white fixed top-0 left-0 w-full z-50 shadow">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link href="/" className="text-xl font-bold text-blue-700 flex items-center gap-2">
            {showIcon ? <FaMoneyBillWave /> : <span>💰</span>}
            <span>Gajiku</span>
          </Link>

          <div className="flex gap-6">
            {/* Link Keuangan */}
            <Link href="/dashboard" className="text-lg font-medium text-gray-700 hover:text-blue-700">
              Keuangan
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
