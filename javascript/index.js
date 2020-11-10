// var nama = "Hidayatul"
// var nim = 123123
// var statusMenikah = true
// var statusAnak = false
// var dataKeluarga = ["yanto","riftan", "ipul"]
// var noRek = "123456789"

// if (nim === 4040) {
// 	console.log("Jawabannya 123123")
// }else if (nim === 2020) {
// 	console.log("Jawabannya 2020")
// }else if (statusMenikah === true) {
// 	console.log("Jawabannya true")
// }else{
// 	console.log("Jawaban Lainnya")
// }

// var dataKeluarga = ("yanto", "uul", "riftan", "ipul")
// var dataDiri = {tinggi: 182, berat: 70, kota: "karawang"}

// if (dataDiri.tinggi >= 182) {
// 	console.log("Pertama")
// }else{
// 	console.log("Lainnya")
// }


// var Jawaban = dataDiri.tinggi > 192 ? "kesatu" : "kedua"
// console.log(Jawaban)

// var tanya = true
// var jawab = (tanya === false ? "kesatu" : "kedua")

// console.log(jawab)

// var hp = "Iphone"

// switch (hp){
// 	case "vivo":
// 		console.log("HP Lo VIVO ya")
// 		break;
// 	case "oppo":
// 		console.log("HP Lo OPPO ya")
// 		break;
// 	case "Iphone":
// 		console.log("HP ku iphone, hp mu apa ya...??")
// 		break;
// 	default:
// 		console.log("tidak Punya HP ??")
// }


// var harga = 1000
// var hp = "xiaomi"
// console.log(hp)

// switch(true){
// 	case harga <900:
// 	hp = "VIVO"
// 	break;
// 	case harga <800:
// 	hp = "iphone"
// 	break;
// 	default:
// 	hp = "OPPO"
// }
// console.log(hp)


// for(var i = 1; i<10; i++){
// 	console.log(i)
// 	if(i === 5){
// 		break;
// 	}
// }

// var j = 1;
// do{
// 	console.log("Kincir", j)
// 	j++
// }while(j<=10)


// function panggilProgram(n1, n2){
// 	console.log(n1)
// 	console.log(n2)

// 	var a = 999999
// 	var b = 111111
// 	console.log(a+b)
// }

// 	var nama = "Jawaban"
// 	var nim	= 212121

// panggilProgram(nama,nim)



//unshift menyisipkan

// var dataMahasiswa = ["yanto","tri", "ipul","adrian"]
// 	console.log(dataMahasiswa)

// // menambahkan diawal
// dataMahasiswa.unshift("ikbal","adi") 

// // menambahkan diakhir
// dataMahasiswa.push("Hidayatul", "budi")
// 	console.log(dataMahasiswa)


// // menghapus data pertama
// dataMahasiswa.shift()
// 	console.log(dataMahasiswa)


// // menghapus data diakhir
// dataMahasiswa.pop()
// 	console.log(dataMahasiswa)



// // MENYISIPKAN MENGGUNAKAN SPLICE

// var dataMahasiswa = ["yanto","tri", "ipul","adrian"]
// 	console.log(dataMahasiswa)

// 	// menyisipkan data, tanpa menghapus
// 	dataMahasiswa.splice(2,0,"ikbal")
// 		console.log(dataMahasiswa)

// 	// menyisipkan data, dan menghapus data
// 	dataMahasiswa.splice(3,1, "hasan")
// 		console.log(dataMahasiswa)

// 	// 
// 	dataMahasiswa.splice(3,2,"ayu")
// 		console.log(dataMahasiswa)

// 	// 
// 	dataMahasiswa.splice(1,1)
// 		console.log(dataMahasiswa)


// var FISIKA = 9.8
// var KIMIA = 9.3
// var BAHASA = 9.5
// var EKONOMI = 9.7

// // fungsi pembulatan kebawah
// console.log(Math.floor(FISIKA))
// console.log(Math.floor(KIMIA))
// console.log(Math.floor(BAHASA))
// console.log(Math.floor(EKONOMI))

// // fungsi pembulatan keata
// console.log(Math.ceil(FISIKA))
// console.log(Math.ceil(KIMIA))
// console.log(Math.ceil(BAHASA))
// console.log(Math.ceil(EKONOMI))

// // fungsi pembulatan 0,5 keatas dan 0,4 kebawah
// console.log(Math.round(FISIKA))
// console.log(Math.round(KIMIA))
// console.log(Math.round(BAHASA))
// console.log(Math.round(EKONOMI))



// // fungsi absolut (dari minus jadi plus)
// function abs(n){
// 	return Math.abs(n)
// }

// // fungsi nilai pangkat
// function panggilPow(a, pangkat){
// 	return Math.pow(a, pangkat)
// }

// // fungsi akar
// function panggilSQRT(akar){
// 	return Math.sqrt(akar)
// }

// // fungsi log
// function panggilLog(n){
// 	return Math.log(n)
// }

// // mencari nilai minimal

// function panggilMin(n1, n2, n3){
// 	return Math.min(n1, n2, n3)
// }


// // mencari nilai max
// function panggilMax (n1, n2, n3){
// 	return Math.max (n1, n2, n3)
// }



// // mencari nilai min array
// function panggilMinArray(n){
// 	return Math.min.apply(Math. n)
// }

// console.log(abs(-1000))
// console.log(panggilPow(3,3))
// console.log(panggilSQRT(64))
// console.log(panggilLog(3))
// console.log(panggilMin(23, 4, 85))
// console.log(panggilMax(23, 4, 85))

// nku = [8,9,8,2,1,2]
// console.log(panggilMinArray(nku))



// // membuat lowercase(huruf Kecil) dan Uppercase(huruh besar)
// var kalimat = ("Saya Mau Makan SIANG")

// // Membuat huruf kecil semua
// console.log(kalimat.toLowerCase())

// // Membuat huruf Besar semua
// console.log(kalimat.toUpperCase())

// // Mencari kode ascii
// console.log(kalimat.charAt())

// // index pertama, jumlah kalimat
// console.log(kalimat.substr(1,6))
// console.log(kalimat.substr(-4,2))



// var namaLengkap = "Hidayatul Rahman_"

// 	console.log(namaLengkap)
// 	console.log(namaLengkap.trim())

// var n1 = "abcd"
// var n2 = "efgh"
// var n3 = "ijkl"
// // pengambungan kalimat
// var kumpulanNama = n1.concat(n2,n3)
// 	console.log(kumpulanNama)

// // mencari kalimat 
// var kalimat = "Hidayatul sedang belajar JS"

// var hasil = kalimat.includes('Hidayatul')
// 	console.log(hasil)

// var ulang = "abc"
// var hasil2 = ulang.repeat(3)
// 	console.log(hasil2)


var dataMakanan = ["Bakso", "Soto", "Mie"]
// menghitung jumlah array
	console.log(dataMakanan.length)
// Mencari posisi index
	console.log(dataMakanan.indexOf("Mie"))