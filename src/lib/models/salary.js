export class SalaryModel {
    constructor(amount, description) {
        this.amount = Number(amount); // Pastikan selalu angka
        this.description = description || "Gaji bulan ini"; // Default jika kosong
        this.date = new Date(); // Atur ke tanggal sekarang
    }
}