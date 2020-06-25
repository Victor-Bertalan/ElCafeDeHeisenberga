function collapse(){
    sectiuni=document.querySelectorAll("section");
    
    for(let i=0;i<sectiuni.length;i++){
        sectiuni[i].classList.add("collapsed");
        var div = document.createElement('div');
        div.className = 'over';
        div.innerHTML="Expandeaza";
        sectiuni[i].appendChild(div);
        sectiuni[i].onclick = function myScript(){
          this.classList.remove("collapsed");
          let div=this.querySelector('div.over');
          div.remove();
        };
    }
    }
    
    