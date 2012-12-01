var facts=[
["China","Beijing",false],
["India","New Delhi",false],
["European","Brussels",false],
["United States","Washington DC",false],
["Indonesia","Jakarta",false],
["Brazil","Brazilia",false],
["Russia","Moscow",false],
["Japan","Tokyo",false],
["Mexiko","Mexiko City",false],
["Germany","Berlin",false],
["Turkey","Ankara",false],
["France","Paris",false],
["United Kingdom","London",false],
["Italy","Rome",false],
["South Africa","Pretoria",false],
["South Korean","Seoul",false],
["Argentina","Buenos",false],
["Canada","Ottawa",false],
["Saudi Arabia","Riyadh",false],
["Australia","Canberra",false],
]

var thinglem;
var nq = Number(localStorage.getItem("showCount"));
if (!nq) {
	nq = Number(document.getElementById("c01").value);
};
var elementinmotion;
var makingmove = false;
var inbetween = 300;
var coll = 20;
var row1 = 200;
var rowsize = 50;
var slots = new Array(nq);

function init(){
	setupgame();
}

function setupgame(){
	var i,c,s,mx=coll,my=row1,d,uniqueid;
	for (var i=0; i < facts.length; i++) {
	  facts[i][2] = false;
	};
	for (var i=0; i < nq; i++) {
	  slots[i]=-100;
	};
	for (var i=0; i < nq; i++) {
	  do{
	  	c = Math.floor(Math.random()*facts.length);
	  }while(facts[c][2]==true)
	  facts[c][2]=true;
	  uniqueid = "c"+String(c);
	  d=document.createElement('country');
	  d.innerHTML=("<div class='thing' id='"+uniqueid+"'>placeholder</div>");
	  document.body.appendChild(d);
	  thinglem = document.getElementById(uniqueid);
	  thinglem.textContent=facts[c][0];
	  thinglem.style.top=String(my)+"px";
	  thinglem.style.left=String(mx)+"px";
	  thinglem.addEventListener("click",pickelement,false);
	  uniqueid = "p"+String(c);
	  d=document.createElement("cap");
	  d.innerHTML=("<div class='thing' id='"+uniqueid+"'>placeholder</div>");
	  document.body.appendChild(d);
	  thinglem = document.getElementById(uniqueid);
	  thinglem.textContent = facts[c][1];
	  do{
	  	s = Math.floor(Math.random()*nq);
	  }while(slots[s]>=0)
	  slots[s]=c;
	  thinglem.style.top=String(row1+s*rowsize)+"px";
	  thinglem.style.left=String(coll+inbetween)+"px";
	  thinglem.addEventListener('click',pickelement,false);
	  my += rowsize;
	};
	document.f.score.value="0";
	return false;
}

function pickelement(ev){
	var thihx;
	var thisxn;
	if(makingmove){
		if (elementinmotion == this) {
			return;
		};
		thisx = this.style.left;
		thisx = thisx.substring(0,thisx.length-2);
		thisxn = Number(thisx)+110;
		elementinmotion.style.left=String(thisxn)+"px";
		elementinmotion.style.top=this.style.top;
		makingmove = false;
		if (this.id.substring(1)==elementinmotion.id.substring(1)) {
			elementinmotion.style.backgroundColor="gold";
			this.style.backgroundColor="gold";
			document.f.out.value = "RIGHT";
			document.f.out.style.backgroundColor = "white";
			this.removeEventListener("click",pickelement,false);
			elementinmotion.removeEventListener("click",pickelement,false);
			document.f.score.value = String(1+Number(document.f.score.value));
		}else{
			document.f.out.value = "WRONG";
			document.f.out.style.backgroundColor = "red";
		};
	}else{
		makingmove = true;
		elementinmotion = this;
	}
}

function reput(){
	nq = document.getElementById("c01").value;
	localStorage.setItem("showCount",nq);
}
