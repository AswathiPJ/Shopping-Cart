var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  let products=[
    {
      name:"SAMSUNG Galaxy S21 FE 5G ",
      category:"mobile",
      description:"With the Samsung Galaxy S21 FE, you can experience seamless gaming and mesmerising photography. ",
      image:"https://rukminim1.flixcart.com/image/832/832/kz7bcsw0/screen-guard/front-and-back-screen-guard/o/p/j/rr44-twenteesky-original-imagb9dh2hm4fzhw.jpeg?q=70"
    },
    {
      name:"REDMI 9i Sport",
      category:"mobile",
      description:"Enjoy watching videos and plunge yourself into a world of entertainment with the Redmi 9i Sport’s 16.58-cm",
      image:"https://rukminim1.flixcart.com/image/832/832/ku04o7k0/mobile/m/w/p/9i-sport-mzb0a0yin-redmi-original-imag785ryfspqg3a.jpeg?q=70"
    },
    {
      name:"OPPO K10",
      category:"mobile",
      description:"Get the photographer in you to light with Oppo K10. Designed specifically for camera lovers this phone comes with a 50 MP triple camera setup",
      image:"https://rukminim1.flixcart.com/image/832/832/l2jcccw0/mobile/h/x/3/-original-imagduwqakhhkrse.jpeg?q=70"
    },
    {
      name:"realme C31",
      category:"mobile",
      description:"Craving for an entertainment buddy? Wait no more and enjoy the best company that is designed specially for tech-geeks.",
      image:"https://rukminim1.flixcart.com/image/832/832/l1dwknk0/mobile/p/r/0/-original-imagcyj2prahc4pk.jpeg?q=70"
    }

    

  ]
  res.render('index', { products,admin:false});
});

module.exports = router;
