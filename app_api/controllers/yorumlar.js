var mongoose=require('mongoose')
var Mekan=mongoose.model('mekan')
const cevapOlustur=function(res,status,content){
res
  .status(status)
  .json(content)
}
var yorumOlustur = function(req, res, gelenMekan){
  if(!gelenMekan){
    cevapOlustur(res, 404, {"mesaj": "MekanID Bulunamadı"});
  }else {
    gelenMekan.yorumlar.push({
      yorumYapan : req.body.yorumYapan,
      puan : req.body.puan,
      yorumMetni : req.body.yorumMetni,
      tarih : Date.now()
    });
    gelenMekan.save(function(hata,mekan){
      var yorum;
      if(hata){
        cevapOlustur(res,400, hata);
      }else {
        ortalamaPuanGuncelle(mekan._id);
        yorum = mekan.yorumlar[mekan.yorumlar.length - 1];
        cevapOlustur(res, 201,yorum);
      }
    });
  }
};

var ortalamaPuanGuncelle = function(mekanid){
  Mekan
  .findById(mekanid)
  .select('puan yorumlar')
  .exec(
    function(hata, mekan){
      if (!hata) {
        sonPuanHesapla(mekan);
      }
    });
};

var sonPuanHesapla = function(gelenMekan){
  var i, yorumSayisi, ortalamaPuan, toplamPuan;
  if (gelenMekan.yorumlar && gelenMekan.yorumlar.length > 0){
    yorumSayisi = gelenMekan.yorumlar.lenght;
    toplamPuan = 0;
    for (i = 0; i < yorumSayisi; i++){
      toplamPuan = toplamPuan+gelenMekan.yorumlar[i].puan;
    }
    ortalamaPuan = Math.round(toplamPuan / yorumSayisi);
    gelenMekan.puan = ortalamaPuan;
    gelenMekan.save(function(hata){
      if(hata){
        console.log(hata);
      }
    });
  }
};

const yorumEkle=function(req, res) {
  var mekanid = req.params.mekanid;
  if(mekanid){
    Mekan
    .findById(mekanid)
    .select('yorumlar')
    .exec(
      function(hata, gelenMekan){
        if (hata){
          cevapOlustur(res, 400, hata);
        } else {
          yorumOlustur(req, res, gelenMekan);
        }
      }
    );
  }else {
    cevapOlustur(res, 400, {"mesaj":" Bulunamadı. MekanID Gerekli"});
  }
}

const yorumGetir=function(req, res) {
 if (req.params && req.params.mekanid && req.params.yorumid){
   Mekan.findById(req.params.mekanid)
   .select('ad yorumlar')
   .exec(
     function(hata,mekan){
       var cevap, yorum;
       if (!mekan){
         cevapOlustur(res,404, {"mesaj":"Yorum Getir Kısmında mekanid Bulunamadı"});
         return;
       }else if (hata){cevapOlustur(res,400, hata);
         return;
       }

       
       
      
       if (mekan.yorumlar && mekan.yorumlar.length > 0){
         yorum = mekan.yorumlar.id(req.params.yorumid);
         if (!yorum){
           cevapOlustur(res, 404, {"mesaj":"YorumID Bulunamadı"});
         }
         else {
           cevap = {mekan : {
             ad : mekan.ad,
             id : req.params.mekanid
           },
           yorum : yorum};
         cevapOlustur(res,200,cevap);
       }
      }else{cevapOlustur(res,404,{"mesaj":"Hiç Yorum Yok"});
      }});
 } else {cevapOlustur(res,404,{"mesaj":"Bulunamadı"});
 }}

const yorumGuncelle=function(req, res) {
 if (!req.params.mekanid || !req.params.yorumid){
   cevapOlustur(res, 404, {"mesaj":"Bulunamadı. MekanID ve YorumID Zorunludur."});
   return;
 }
 Mekan
 .findById(req.params.mekanid)
 .select('yorumlar')
 .exec(
   function(hata,gelenMekan){
     var yorum;
     if (!gelenMekan){
       cevapOlustur(res, 404, {"mesaj":"MekanID Bulunamadı."});
       return;
     }
     if (gelenMekan.yorumlar && gelenMekan.yorumlar.length > 0){
       yorum = gelenMekan.yorumlar.id(req.params.yorumid);
       if (!yorum){
         cevapOlustur(res, 404, {"mesaj":"YorumID Bulunamadı."});
       }else {
         yorum.yorumYapan = req.body.yorumYapan;
         yorum.puan = req.body.puan;
         yorum.yorumMetni = req.body.yorumMetni;
         gelenMekan.save(function(hata,mekan){
           if (hata){
             cevapOlustur(res, 404, hata);
           }else {
             ortalamaPuanGuncelle(mekan._id);
             cevapOlustur(res, 200, yorum);
           }
         });
       }
     }else{
       cevapOlustur(res, 404, {"mesaj":"Güncellenecek Yorum Yok"});
     }
   });
}

const yorumSil=function(req, res) {
  if (!req.params.mekanid || !req.params.yorumid){
    cevapOlustur(res, 404, {"mesaj":"Bulunamadı. MekanID ve YorumID Gerekli."});
    return;
  }
  Mekan
  .findById(req.params.mekanid)
  .select('yorumlar')
  .exec(
    function(hata,gelenMekan){
      if(!gelenMekan){
        cevapOlustur(res, 404, {"mesaj":"MekanID Bulunamadı."});
        return;
      }else if(hata){
        cevapOlustur(res, 400, hata);
        return;
      }
      if(gelenMekan.yorumlar && gelenMekan.yorumlar.length > 0){
        if (!gelenMekan.yorumlar.id(req.params.yorumid)){
          cevapOlustur(res, 404, {"mesaj":"YorumID Bulunamadı."});
        }else {
          gelenMekan.yorumlar.id(req.params.yorumid).remove();
          gelenMekan.save(function(hata,mekan){
            if(hata){
              cevapOlustur(res,404, hata);
            }else {
              ortalamaPuanGuncelle(mekan._id);
              cevapOlustur(res, 204, null);
            }
          });
        }
      }else {
        cevapOlustur(res, 404, {"mesaj":"Silinecek Yorum Bulunamadı."});
      }
    }
  );
}
module.exports={yorumEkle,
  yorumGetir,
  yorumGuncelle,
  yorumSil
  
  }