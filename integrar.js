var myVar = setInterval(verificarLigacao, 1500);
console.log("Script Abrir cliente");
var verificarCPF = "000.000.000-00";
 var x = document.createElement("IFRAME");
 
function verificarLigacao() {
	  var valorDaDiv = $("#issabel-callcenter-estado-agente-texto").text();   
		console.log("Esperando ligação");
		if(valorDaDiv == "Connected to call"){
			
		var conteudo = $(".ui-layout-center").text();    
		var cpf = conteudo.match(/[0-9]{3}[.][0-9]{3}[.][0-9]{3}[-][0-9]{2}/)
		
			if(verificarCPF != String(cpf)){
				
			  verificarCPF = cpf;
			  
			var valorDoRamal = $("#issabel-callcenter-titulo-consola").text();   
			var ramal = parseInt(valorDoRamal.match(/[0-9]{3}/));
	
	
		    x.setAttribute("src", "http://cdccred.panoramaemprestimos.com.br/html.do?action=interacao&ramal="+String(ramal)+"&chave="+String(cpf)+"&telefone=&buscar=1");
			document.body.appendChild(x);
	

			//window.open("http://subDominio.panoramaemprestimos.com.br/html.do?action=interacao&ramal="+String(ramal)+"&chave="+String(cpf)+"&telefone=&buscar=1");
			console.log("CPF:" +String(cpf) + " Ramal:" +String(ramal));
			}
		}
	
}



    
