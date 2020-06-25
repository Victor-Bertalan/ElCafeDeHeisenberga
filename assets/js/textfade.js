
function textFade(x){
const text=document.querySelectorAll(".fancy");
for(let i=0;i<text.length;i++){
    strtext=text[i].textContent;
    console.log(strtext);
    const splittext=strtext.split(" ");
    console.log(splittext);
    text[i].textContent="";

    for (let j=0; j<splittext.length;j++){
    text[i].innerHTML+="<span>" + splittext[j]+" " +"</span>"; 
    }  

    let char=0;
    let timer=setInterval(onTick, x/3);

    function onTick(){
    const span=text[i].querySelectorAll('span')[char];
    span.classList.add('fade');
    char++;
    if(char === splittext.length)
    {
        clearInterval(timer);
        return;
    }
    }
    
}
}
