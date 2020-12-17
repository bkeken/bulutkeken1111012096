var express = require('express');
var footer="Bulut KEKEN 2020"
const anaSayfa=function(req, res, next) {
  res.render('mekanlar-liste', 
  	{
      'baslik': 'Anasayfa',
      'footer':footer,
  	'sayfaBaslik':{
  		'siteAd':'Mekan32',
  		'aciklama':'Isparta civarındaki mekanları keşfedin'
  	},
    'mekanlar':[
    {
      'ad':'Starbucks',
      'adres':'GAÜN Çarşı içi',
      'puan':3,
      'imkanlar':['Dünya Kahveleri','Kekler','Pastalar'],
      'mesafe':'1km'
    },
      {
      'ad':'Gloria Jeans',
      'adres':'SDÜ Doğu Kampüsü',
      'puan':5,
      'imkanlar':['Kahve','Çay','Pasta'],
      'mesafe':'4km'
    },
    {
      'ad':'Osmanlı Cafe',
      'adres':'Gaün Karşısı',
      'puan':4,
      'imkanlar':['Osmanlı Kahveleri','Baklava','Pastalar'],
      'mesafe':'2km'
    },
    {
      'ad':'Kahve Dünyası',
      'adres':'SankoPark AVM',
      'puan':3,
      'imkanlar':['Dünya Kahveleri','Kekler','Pastalar'],
      'mesafe':'10km'
    },
    {
      'ad':'Bahane Kahve',
      'adres':'Karataş Merkez',
      'puan':5,
      'imkanlar':['Türk Kahvesi','Şerbetli Tatlılar','Pastalar'],
      'mesafe':'4km'
    }
    ]
  }

  	);
}

const mekanBilgisi=function(req, res, next) {
  res.render('mekan-detay', 
    { 
    'baslik': 'Mekan Bilgisi',
    'footer':footer,
    'sayfaBaslik':'Starbucks',
    'mekanBilgisi':{
      'ad':'Starbucks',
      'adres':'GAÜN Çarşı içi',
      'puan':3,
      'imkanlar':['Dünya Kahveleri','Kekler','Pastalar'],
      'koordinatlar':{
          'enlem':'37.781885',
          'boylam':'30.566034'
      },
      'saatler':[
        {
          'gunler':'Pazartesi-Cuma',
          'acilis':'7:00',
          'kapanis':'23:00',
          'kapali':false
        },
        {
          'gunler':'Cumartesi',
          'acilis':'9:00',
          'kapanis':'22:00',
          'kapali':false
        },
        {
          'gunler':'Pazar', 
          'kapali':true
        }
      ],
      'yorumlar':[
        {
          'yorumYapan':'Bulut KEKEN',
          'puan':5,
          'tarih':'02.12.2020',
          'yorumMetni':'Kalitesi Malumunuz.'
        },
        {
          'yorumYapan':'Bulut',
          'puan':4,
          'tarih':'30.11.2020',
          'yorumMetni':'Denemeye Değer.'
        }
        
      ]

    }
  }
  );
}

const yorumEkle=function(req, res, next) {
  res.render('yorum-ekle', { title: 'Yorum Ekle' });
}

module.exports={
anaSayfa,
mekanBilgisi,
yorumEkle
}