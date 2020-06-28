window.addEventListener("load", function(){
	//creez un obiect de tip XMLHttpRequest cu care pot transmite cereri catre server
	var ajaxRequest = new XMLHttpRequest();
	let container=document.getElementById("afisTemplate");


	//la schimbarea starii obiectului XMLHttpRequest (la schimbarea proprietatii readyState)
	/* stari posibile:
	0 - netrimis
	1 - conexiune deschisa
	2 - s-au transmis headerele
	3 - se downleadeaza datele (datele sunt impartite in pachete si el primeste cate un astfel de pachet)
	4 - a terminat
	*/
	ajaxRequest.onreadystatechange = function() {
			//daca am primit raspunsul (readyState==4) cu succes (codul status este 200)
			if (this.readyState == 4 && this.status == 200) {
					//in proprietatea responseText am contintul fiserului JSON
					//document.getElementById("afisJson").innerHTML=this.responseText;
					obJson = JSON.parse(this.responseText);
					afiseajaJsonTemplate(obJson);
			}
	};
	//deschid o conexiune cu o cerere de tip get catre server
	//json e pus in folderul static "resurse" deci calea e relativa la acel folder (fisierul e la calea absoluta /resurse/json/studenti.json)
	ajaxRequest.open("GET", "/json/produse.json", true);
	//trimit catre server cererea
	ajaxRequest.send();

	function sortCresc(prop)
	{
		return function(a,b)
		{
			if(a[prop]>b[prop])
				return 1;
			else	
				return -1;
		}
	}
	function sortDescresc(prop)
	{
		return function(a,b)
		{
			if(a[prop]>b[prop])
				return -1;
			else	
				return 1;
		}
	}
	
	function printProd(textTemplate){
		for(let i=0;i<obJson.produse.length;i++){
			if((printCaf && obJson.produse[i].tip=="cafea") || (printCeai && obJson.produse[i].tip=="ceai") || (printSuc && obJson.produse[i].tip=="suc"))
			textTemplate+=ejs.render("<button onclick='addCos("+i+")'><li>\
			<span class='s1'><%= produs.nume %></span>\
			<span class='s2'><%= produs.pret %>lei</p>\
			</button></li>", 
			{produs: obJson.produse[i]});
		} 
		return textTemplate;
	}
	

	function afiseajaJsonTemplate(obJson) { 
			//in acets div voi afisa template-urile   

			//in textTemplate creez continutul (ce va deveni innerHTML-ul) divului "afisTemplate"
			let textTemplate ="";
			//parcurg vetorul de studenti din obJson
			
			//adaug textul cu afisarea studentilor in container
			container.innerHTML=printProd(textTemplate);
	}
	
	let reset=document.getElementById("reset");
	reset.onclick = function reset(){
		let textTemplate ="";
			obJson.produse.sort(sortCresc("id"));
		container.innerHTML=printProd(textTemplate);
	}
	let crescPret=document.getElementById("crescPret");
	crescPret.onclick = function sortCrescPret(){
		let textTemplate ="";
			obJson.produse.sort(sortCresc("pret"));
		container.innerHTML=printProd(textTemplate);
	}
	let descrescPret=document.getElementById("descrescPret");
	descrescPret.onclick = function sortDescrescPret(){
		let textTemplate ="";
		obJson.produse.sort(sortDescresc("pret"));
		container.innerHTML=printProd(textTemplate);
	}
	let crescNume=document.getElementById("crescNume");
	crescNume.onclick = function sortCrescNume(){
		let textTemplate ="";
			obJson.produse.sort(sortCresc("nume"));
		container.innerHTML=printProd(textTemplate);
	}
	let descrescNume=document.getElementById("descrescNume");
	descrescNume.onclick = function sortDescrescNume(){
		let textTemplate ="";
		obJson.produse.sort(sortDescresc("nume"));
		container.innerHTML=printProd(textTemplate);
	}

	
	let cafBut= document.getElementById("cafele");
	let ceaiBut= document.getElementById("ceaiuri");
	let sucBut= document.getElementById("sucuri");
	printCaf=false;
	printCeai=false;
	printSuc=false;
	
	cafBut.onclick=function cafele(){
		printCaf=!printCaf;
		container.innerHTML=printProd("");
	}
	ceaiBut.onclick=function ceaiuri(){
		printCeai=!printCeai;
		container.innerHTML=printProd("");
	}
	sucBut.onclick=function sucuri(){
		printSuc=!printSuc;
		container.innerHTML=printProd("");
	}
	
});

total=0;

function addCos(i){
	cos = document.querySelector(".cos");
	console.log(obJson.produse[i]);
	let prod=document.createElement('li');
	console.log(1);
	prod.innerHTML ='<br>'+ obJson.produse[i].nume + " "+ obJson.produse[i].pret +" lei";
	total+=obJson.produse[i].pret;
	tot=document.getElementById('total');
	tot.innerHTML=total+'lei';
	console.log(prod);
	cos.appendChild(prod);
	prod.onclick=function myFunc(){
		let p=prod.innerHTML.split(" ");
		total-=p[p.length-2];
		tot.innerHTML=total+'lei';
		prod.remove();
		
	}
}

rescos = document.querySelector('.resetcos');
function resetCos(){
	cos = document.querySelector(".cos");
	cos.innerHTML="Cos de cumparaturi:";
	total=0;
	tot=document.getElementById('total');
	tot.innerHTML="";
}

