const songList = 
	[
		{   
            title : "Terlukis Indah",
			artis : "Ziva Magnolya",
            duration : "00:05:32",
            genre : "Pop",
		},
        {   
            title : "Tentang Dirimu Indah",
			artis : "Raisa",
            duration : "00:04:12",
            genre : "Pop",
		},
        {   
            title : "Jengah Melati Coffee",
			artis : "Pas Band",
            duration : "00:06:05",
            genre : "Rock",
		},
        {   
            title : "Hits Spotify Indonesia 2022",
			artis : "Ziva Magnolya",
            duration : "00:30:30",
            genre : "Pop",
		},
        {   
            title : "Kuat Kita Bersinar",
			artis : "Superman Is Dead",
            duration : "00:05:20",
            genre : "Rock",
		},
        {   
            title : "Bing Slamet",
			artis : "Nurlela",
            duration : "00:06:09",
            genre : "Jazz",
		},
        {   
            title : "Arti Kehidupan",
			artis : "Raisa",
            duration : "00:07:09",
            genre : "Jazz",
		},
        {   
            title : "Aku ingin mencintainya",
			artis : "Raisa",
            duration : "00:07:10",
            genre : "Jazz",
		},
        {   
            title : "Januari",
			artis : "Glenn Fredly",
            duration : "00:04:55",
            genre : "Jazz",
		},
        {   
            title : "Album Country",
			artis : "Iwan Fals",
            duration : "00:32:22",
            genre : "Rock",
		},
	];

// artis
function listArtist (songList, artis) {
    let artist = songList.filter(data => data.artis == artis)
    console.log(artist)
}
console.log("---------- Daftar Artis ----------")
listArtist(songList, 'Iwan Fals')

// genre
function listGenre (songList, genre) {
    let genree = songList.filter(data => data.genre == genre)
    console.log(genree)
}
console.log("---------- Daftar Genre ----------")
listGenre(songList, 'Jazz')

// duration under 1 hours
function listDuration(){
    let laguAwal = 0;
    let durasiAwal = 0;
    for (let i = 0; i < songList.length; i++) {
        let awal = songList[i].duration.split(':');
        // console.log(awal)
        let jam = parseInt(awal[0]) * 3600
        let menit = parseInt(awal[1]) * 60
        let detik = parseInt(awal[2]) * 1

        durasiAwal = durasiAwal + (jam + menit + detik);
        
        if (durasiAwal < 3600) {
            laguAwal++
        }
    }
    for (let i = 0; i < laguAwal; i++) {
        console.log(songList[i]);
        // if(i === laguAwal-1) {
        //     laguAwal -= songList.length+1
        // i=0
    }
}
console.log("---------- Daftar Musik selama 1 Jam ----------")
listDuration()