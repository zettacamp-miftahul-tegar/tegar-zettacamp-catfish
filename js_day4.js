const songList = 
	[
		{   
            title : "Terlukis Indah",
			artis : "Ziva Magnolya",
            duration : "5",
            genre : "pop",
		},
        {   
            title : "Tentang Dirimu Indah",
			artis : "Raisa",
            duration : "4",
            genre : "pop",
		},
        {   
            title : "Jengah",
			artis : "Pas Band",
            duration : "6",
            genre : "rock",
		},
        {   
            title : "Kuat Kita Bersinar",
			artis : "Superman Is Dead",
            duration : "5",
            genre : "rock",
		},
        {   
            title : "Bing Slamet",
			artis : "Nurlela",
            duration : "6",
            genre : "Jazz",
		},
        {   
            title : "Arti Kehidupan",
			artis : "Raisa",
            duration : "7",
            genre : "Jazz",
		},
        {   
            title : "Aku ingin",
			artis : "Raisa",
            duration : "7",
            genre : "Jazz",
		},
        {   
            title : "Januari",
			artis : "Glenn Fredly",
            duration : "4",
            genre : "Jazz",
		},
        {   
            title : "Hits Spotify Indonesia 2022",
			artis : "Ziva Magnolya",
            duration : "90",
            genre : "Pop",
		},
        {   
            title : "Album Country",
			artis : "Iwan Fals",
            duration : "62",
            genre : "Rock",
		},
	]

function params(){
    let first = namaBulan.find(function (element) {
		return element===hasil[raisa].songList
	});
    console.log(first);
}