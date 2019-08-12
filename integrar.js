var myVar = setInterval(verificarLigacao, 2000);
console.log("|--------------------------------------|");
console.log("|---------------CDC Cred---------------|")
console.log("|-Script Integrar Issabel ao Panorama!-|");
console.log("|----------Versão do script 1.3--------|");
console.log("|--------------------------------------|");
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
		x.setAttribute("Style", "opacity: 0.5;");
		document.body.appendChild(x);	
		
		console.log("CPF:" +String(cpf) + " Ramal:" +String(ramal));
		}
	}
}



    
    
