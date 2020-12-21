var mongoose=require('mongoose')
var Mekan=mongoose.model('mekan')
const cevapOlustur=function(res,status,content){
	res
	.status(status)
	.json(content)
}

const mekanlariListele=function(req, res) {
	cevapOlustur(res,200,{"Durum":"BAŞARILI"});
}

const mekanEkle=function(req, res) {
	cevapOlustur(res,200,{"Durum":"BAŞARILI"});
}

const mekanGetir=function(req, res) 
{
	if(req.params&&req.params.mekanid)
	{
		Mekan.findById(req.params.mekanid)
		.exec(function(hata,mekan)
		{
		if(!mekan)
		{
	cevapOlustur(res,404,{"Durum":"MekanID Bulunamadı"});
	return;
		}
		else if(hata)
		{
			cevapOlustur(res,404,hata);
		}
		cevapOlustur(res,200,mekan)
		}
		)
	}
	else
		cevapOlustur(res,404,{"Durum":"MekanID Giriniz!"})
}

const mekanGuncelle=function(req, res) {
	cevapOlustur(res,200,{"Durum":"BAŞARILI"});
}

const mekanSil=function(req, res) {
	cevapOlustur(res,200,{"Durum":"BAŞARILI"});
}

module.exports={mekanlariListele,
	mekanEkle,
	mekanGetir,
	mekanGuncelle,
	mekanSil
	
}