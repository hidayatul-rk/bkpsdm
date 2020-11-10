// function panggilEksternal(){
// 	console.log("Pesan dari Eksternal")
// }
// panggilEksternal()

function panggilEksternal(){
	var namapertama = document.getElementById('namapertama')
	var namabelakang = document.getElementById('namabelakang')

	var forminput = document.getElementsByClassName('forminput')

	var tagname = document.getElementsByTagName("input")
						// selector lewat id
	var s1 = document.querySelector("#namapertama")
						// selector lewat class
	var s2 = document.querySelector(".forminput")
	var s3 = document.querySelector("input")

	var all = document.querySelectorAll("input")

	// console.log(forminput)
	// console.log(tagname)

	console.log(s1)
	console.log(s2)
	console.log(s3)
	console.log(all)
}