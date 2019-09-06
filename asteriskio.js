/* HTTP and Socket*/
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var clients = {};

app.get('/', function (req, res) {
    //res.send('server is running');

    res.sendFile(__dirname + '/index.html');
});

/*Log*/
const SimpleNodeLogger = require('simple-node-logger'),
        opts = {
            logFilePath: 'mylogfile.log',
            timestampFormat: 'YYYY-MM-DD HH:mm:ss.SSS'
        },
        log = SimpleNodeLogger.createSimpleLogger(opts);
/**/

/*Asterisk */
var ami = new require('asterisk-manager')('5038', '192.168.0.30', 'admin', '322432', true);
ami.keepConnected();

for (var i = 0; i < 60; i++)
    console.log(" ");
console.log(" Server Iniciado ");
var loop = false;


function objToString(obj) {
    var str = '';
    for (var p in obj) {
        if (obj.hasOwnProperty(p)) {
            str += p + ':' + obj[p] + '\n';
        }
    }
    return str;
}

io.on("connection", function (client) {
    
    client.on("join", function (name) {
        console.log("Joined: " + name);
        clients[client.id] = name;
        client.emit("update", "You have connected to the server.");
        client.broadcast.emit("update", name + " has joined the server.");

        /*teste*/
        function teste() {
            setInterval(function () {

                //client.emit("update", client.id);

            }, 3000);
        }
        teste();
        
        /*fim teste*/

        /*Gerar os ramais no cliente que se conectou*/
        ami.action({
            'action': 'SIPpeers'

        }, function (err, res) {
            // console.log(res);
        });
        ami.on('managerevent', function (evt) {
            //console.log(evt.event);
            if (evt.event == "PeerEntry") {
                io.to(client.id).emit("exten", evt);
                //  socket.to(sockets[data.user]).emit("personal", data);
            //    console.log(client.id);
            }

        });


    });

    client.on("send", function (msg) {
        console.log("Message: " + msg + clients[client.id]);
        client.broadcast.emit("chat", clients[client.id], msg);
        //console.log(clients);
        io.emit("logado", clients);

    });
	client.on("logar", (ramal) =>{
		ami.action({
    'action': 'originate',
	'Channel': 'sip/'+ramal, 
		'application': `AgentLogin([222])`,
	'Exten': '983863726',
	'callerid': 'nome',
	'Context': 'from-internal',
	'Priority': 1,
	  
	
	}, function (err, res) { 
		console.log(res);	
});

	})
    client.on("disconnect", function () {
        console.log("Disconnect");
        io.emit("update", clients[client.id] + " has left the server.");


        delete clients[client.id];
    });

    function myFunction() {
        setInterval(function () {

            ami.action({
                'action': 'command',
                'command': 'core show channels concise'

            }, function (err, res) {
                var str = objToString(res);
                var resultado = str.split("\n");

                resultado.splice(0, 4);
                resultado.pop();
                resultado.pop();
                var tamanhoArray = resultado.length;
                if (tamanhoArray > 0) {
                 //   console.log(tamanhoArray, resultado);
                 //
               //  console.log("");
                    io.emit("update", resultado);
//                    console.log(objToString(resultado).split("\n"));
                    //log.info(resultado);
                }




            });

        }, 1000);
    }
    if (!loop) {
        myFunction();
        loop = true;

    }
});
//any events
ami.on('managerevent', function(evt) {
	//console.log(evt.event);
	if(evt.event == 'DTMF'){
		console.log(evt)
	}
});
ami.on('DTMF', function(evt) {
// 	console.log("Dial:",evt);
});
   



/* logar no asterisk  
   
ami.action({
    'action': 'originate',
	'Channel': 'sip/222', 
	'application': 'AgentLogin',
	'Exten': '983863726',
	'callerid': 'nome',
	'Context': 'from-internal',
	'Priority': 1,
	  
	
}, function (err, res) { 
    console.log(res);
});*/
ami.on('dial', function(evt) {
//	console.table(evt);
});




http.listen(3003, function () {
    //console.log('listening on port 3003');
});

