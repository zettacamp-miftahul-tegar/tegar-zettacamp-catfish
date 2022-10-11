function bookpurchasing(title, author, deskripsi, harga, diskon, pajak, jual, stock, jumlah){

	const title1 = title;
	const autthor1 = author;
	const deskripsi1 = deskripsi;
	let harga1 = harga;
	
	// diskon/
	const diskon1 = diskon;
	let amoundiskon = harga1 * diskon1
	
	// after dicount
	const after_diskon = harga1 - amoundiskon;
	
	// Amount of tax
	const pajak1 = pajak;
	
	// Price after tax
	const after_pajak = harga1*pajak1 /100
	
	const jual1 = jual;
	let jumlah1 = jumlah;
	
	console.log("title :",title1)
	console.log("autho :", autthor1)
	console.log("deskripsi :",deskripsi1)
	console.log("harga :","Rp.", harga1)
	console.log("diskon :",diskon1,"%")
	console.log("pajak :",pajak1,"%")
	console.log("total diskon :"+" Rp.", amoundiskon);
	console.log("Total :"+"Rp.",after_diskon)
	console.log("total pajak :", after_pajak)
	console.log("jual :", jual1 )
	
	console.log("-----------------------")
	console.log("TOTAL STOCK : 5 Buku",);

	for (let i = 1; i <= jumlah; i++) {
		jumstock = harga * i;
		console.log("-----------------------")
		console.log("barang yang dibeli",);
		console.log("-----------------------")
	
		stock = stock-1;
		// jumlah1 -=1
		// console.log("jumlah:", jumlah1)
		console.log("total price:",jumstock)
		console.log("stock Update:",stock)
		if(stock > 0){
			console.log("--Buku Masih Ada--")
		} else{
			console.log("--Buku Sudah Habis--");
		break;
		}
	}	
}
bookpurchasing("Day 2", "Tegar", "JS Day 2", 20000, 0.1, 50, true,5,5);