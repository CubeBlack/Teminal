page = {};
page.loaded = function(){
	console.log("page.load");
	
	//------------ configuracao
	term = new Terminal();
	//term.setServer("http://knightslayer/server/server-terminal.php");
	//term.server = "http://knightslayer/server/server-terminal.php";
	//------------------
	term.setWorker("terminal_v1.1worker.js");
	
	page.statusLbl = document.getElementById("statusLbl");
	page.comandInp = document.getElementById("comandInp");
	page.content = document.getElementById("content");

	//mensagem de boas vindas do servidor
	//term.com("",page.receved);
	page.clear();
	
}
page.inputEnter = function (event){
	var keynum;
	if(window.event) { //IE
		keynum = event.keyCode
	} else if(event.which) { // Netscape/Firefox/Opera AQUI ESTAVA O PEQUENINO ERRO ao invés de "e." é "event."
		keynum = event.which
	}
	if( keynum == 13 ) {
		this.com();
    }
	//console.log(keynum);
}
page.com = function(){
	msg = page.comandInp.value;
	this.setContent(msg,"sended");
	term.com(msg,page.receved);
	this.setContent(term.ultimoRequerimentoDoServidor);
	page.comandInp.value = "";
}
//chamado no script "terminal"
page.receved = function(msg){
	page.setContent(msg,"receved");
}
//tipo:log/sended/receved
page.setContent = function(nStr,tipo = "log"){
	this.content.innerHTML += "<p id = \""  + tipo + "\">" + nStr + "</p>";
	this.content.scrollTop = this.content.scrollHeight;
}
page.openServer = function(url){
	term.com(".setServer("+url+")",page.receved);
	term.com(".on",page.receved);
	term.com("",page.receved);
	term.setBase("","");
}
page.clear = function(){
	this.content.innerHTML = "<h1>" + term.id + "</h1>";
}
page.confCheck = false;
page.config = function(){
		//console.log("pop");
	page.confCheck = !page.confCheck;
	if(page.confCheck){
		document.getElementById("menu-closed").style.display = "none"
		document.getElementById("menu-content").style.display = "block";
	}
	else{
		document.getElementById("menu-closed").style.display = "block";
		document.getElementById("menu-content").style.display = "none";
	}
}
console.log("pageTerminal.js");