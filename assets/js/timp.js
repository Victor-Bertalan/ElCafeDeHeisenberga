window.addEventListener("load", function(){


    setInterval(function myTimp(){
      var timp;
       var rez=returneaza_timp()+1000;
       console.log(rez);
       localStorage.setItem("time",rez);// actualizam mereu ce e in localStorage
       var z= parseInt(rez/1000/60);
       if(z>0) timp=z+"minute";
       z=(parseInt(rez/1000))%60;
       timp=timp+z+"secunde";
       document.querySelector(".f1").innerHTML=timp;
  },1000)
   });
  
   
   function returneaza_timp(){
       var s=parseInt(localStorage.getItem("time"));
       if(isNaN(s))
       return 0;
       return s;
  
   }