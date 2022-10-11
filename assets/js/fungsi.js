var namaBuku = ['Buku Gambar A4','Buku Gambar A5','Buku Gambar A6','Buku Tulis SIDU','Buku Tulis Binder', 'Buku Cerita Rakyat', 'Buku Cerita Hewan'];
var hargaBuku = ['5000','5500','6000','7000','8000','20000','22000'];
var stockBuku = ['20']

function detailBuku() {
    var nama_Buku = document.getElementById('pilih_buku').value;
    var typeBuku = document.getElementById('typeBuku');
    typeBuku.innerHTML="<option>Type</option>"
    if (nama_Buku=='BG') {
        for (var i = 0; i < 3; i++) {
            result="<option value="+i+">"+namaBuku[i]+"</option>";
            typeBuku.innerHTML+=result;
        }
    }
    else if (nama_Buku=='BT') {
        for (var i = 3; i < 5; i++) {
            result="<option value="+i+">"+namaBuku[i]+"</option>";
            typeBuku.innerHTML+=result;
        }
    }
    else if (nama_Buku=='BC') {
        for (var i = 5; i < 7; i++) {
            result="<option value="+i+">"+namaBuku[i]+"</option>";
            typeBuku.innerHTML+=result;
        }
    }
}

function hargaa(){
    var harga2 = document.getElementById('typeBuku').value;
    tampil.value=hargaBuku[parseInt(harga2)];
}

function Total() {
    var harga2 = document.getElementById('typeBuku').value;
    var jumlah;
    jumlah=parseInt(document.getElementById('jumlah_buku').value);
    total= jumlah*parseInt(hargaBuku[parseInt(harga2)]);
    total2.value=total;
}

function totalDiskon() {
    var harga3 = document.getElementById('total2').value;
    var jumlahh;
    jumlahh=parseInt(document.getElementById('jumlahdiskon').value) / 100;
    totall= jumlahh*parseInt(harga3);
    total_Diskon.value=harga3-totall;
}

function totalPajak() {
    var harga4 = document.getElementById('total_Diskon').value;
    var jumlahhh;
    jumlahhh=parseInt(document.getElementById('tampilpajak').value) / 100;
    totalll= jumlahhh*parseInt(harga4);
    total_pajak.value=harga4-totalll;
}