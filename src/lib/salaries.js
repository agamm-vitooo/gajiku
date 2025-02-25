import { db } from "@/lib/firebaseConfig";
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc, serverTimestamp } from "firebase/firestore";
import { SalaryModel } from "@/lib/models/salary";

const salariesCollection = collection(db, "salaries");

// Create (Tambah gaji)
export const addSalary = async(amount, description) => {
    try {
        const newSalary = new SalaryModel(amount, description);
        const docRef = await addDoc(salariesCollection, {
            ...newSalary,
            date: serverTimestamp(), // Gunakan timestamp otomatis dari Firestore
        });
        return docRef.id;
    } catch (error) {
        console.error("Error adding salary: ", error);
        throw error;
    }
};

// Read (Ambil semua data gaji)
export const getSalaries = async() => {
    try {
        const querySnapshot = await getDocs(salariesCollection);
        return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
        console.error("Error fetching salaries: ", error);
        throw error;
    }
};

// Update (Edit data gaji)
export const updateSalary = async(id, data) => {
    const docRef = doc(db, "salaries", id);
    try {
        await updateDoc(docRef, data);
        console.log("Salary updated successfully");
    } catch (error) {
        console.error("Error updating salary:", error);
        throw error;
    }
};

// Delete (Hapus gaji)
export const deleteSalary = async(id) => {
    try {
        const salaryDoc = doc(db, "salaries", id);
        await deleteDoc(salaryDoc);
    } catch (error) {
        console.error("Error deleting salary: ", error);
        throw error;
    }
};