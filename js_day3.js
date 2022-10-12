const total = 12000000;
let angsuran = 6 ;

let totalHasil = total/angsuran;
console.log("-----------------------------------")
console.log("1. Total yang harus dibayar Rp.",total);
console.log("2. Diangsur selama",angsuran,"Bulan");
console.log("3. Cicilan per Bulan Rp.",totalHasil);
console.log("-----------------------------------")

const user = 
[
    {
        id: 1,
        nama : "Tegar",
		tabungan : "15000000"
    },
]

// object untuk menampung data output
let hasil = [
	{

	}
]

let namaBulan = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember']

for(let i = 0; i < angsuran; i++){
    hasil[i] = {'Bulan' : i+1, 'Cicilan Rp.' : totalHasil}

    let month = i
    hasil[i].Nama_Bulan = namaBulan[month+3]
}

// Metode ini berfungsi untuk menggabungkan 2 array menjadi 1 array.
const newArray = user.concat(hasil);

console.log(newArray)

// nyari kondisi yg sesuai di functionnya
let first = namaBulan.find(function (element) {
	return element===hasil[0].Nama_Bulan
});

let last = namaBulan.find(function (element) {
	return element===hasil[5].Nama_Bulan
});

console.log("- kamu perlu membayar tagihan dari Bulan",first,"-",last);

// spread operator
let b = hasil[0]
let c = hasil[1]
let [e,...f] = hasil

console.log("- detail tagihan bulan pertama",e);

// Object Destructuring
let [ ,...g] = hasil
console.log("- Tagihan Selanjutnya :")
console.log(g)