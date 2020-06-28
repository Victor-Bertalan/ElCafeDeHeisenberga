window.onload=function count(){
    
    var ct=0;
    var texte = document.querySelector("body");
    console.log(texte);

        ct += texte.innerText.split(" ").length;
   

 document.querySelector(".f2").innerHTML+="Numarul de cuvinte din pagina este " + ct;

}