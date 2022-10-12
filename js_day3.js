function params(total, termOFCredit){
	let totalHasil = total/termOFCredit;
	console.log("-----------------------------------")
	console.log("1. Total yang harus dibayar Rp.",total);
	console.log("2. Diangsur selama",termOFCredit,"Bulan");
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

	for(let i = 0; i < termOFCredit; i++){
		hasil[i] = {'Bulan' : i+1, 'Cicilan Rp.' : totalHasil}

		let month = i
		hasil[i].Nama_Bulan = namaBulan[month+3]
	}

	// untuk menggabungkan 2 array menjadi 1 array.
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

	// spread operator -> menyebarkan
	let [e,...f] = hasil

	console.log("- detail tagihan bulan pertama",e);

	// Destructuring -> memecah
	let [ ,...g] = hasil
	console.log("- Tagihan Selanjutnya :")
	console.log(g)
}

params(12000000,6)