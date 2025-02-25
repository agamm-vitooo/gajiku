import { db } from "@/lib/firebaseConfig";
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from "firebase/firestore";

const expensesCollection = collection(db, "expenses");

// Create (Tambah pengeluaran)
export const addExpense = async(amount, category, date, description) => {
    try {
        const newExpense = {
            amount: parseFloat(amount),
            category,
            date: new Date(date),
            description: description || "",
        };

        const docRef = await addDoc(expensesCollection, newExpense);
        return docRef.id;
    } catch (error) {
        console.error("Error adding expense:", error);
    }
};

// Read (Ambil semua data pengeluaran)
export const getExpenses = async() => {
    try {
        const querySnapshot = await getDocs(expensesCollection);
        return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
        console.error("Error fetching expenses:", error);
        throw error;
    }
};

// Update (Edit data pengeluaran)
export const updateExpense = async(id, updatedData) => {
    try {
        const expenseDoc = doc(db, "expenses", id);
        await updateDoc(expenseDoc, updatedData);
    } catch (error) {
        console.error("Error updating expense:", error);
        throw error;
    }
};

// Delete (Hapus pengeluaran)
export const deleteExpense = async(id) => {
    try {
        const expenseDoc = doc(db, "expenses", id);
        await deleteDoc(expenseDoc);
    } catch (error) {
        console.error("Error deleting expense:", error);
        throw error;
    }
};