var app = require("express")();
var http = require("http").Server(app);
var io = require("socket.io")(http);

var counter = 0; // initialise le compteur à 0

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

http.listen(3000, function () {
  console.log("listening on *:3000");
});

io.on('connect', function(socket){ // écoute une connexion web socket
    socket.on('increment', function(){ // écoute l'événement 'increment'
        counter++; // incrémente la variable
        console.log(counter);
        io.emit('count', counter); // émet un événement 'count'
    });
});

io.on('connect', function(socket){ // écoute une connexion web socket
    socket.on('decrement', function(){ // écoute l'événement 'decrement'
        counter--; // décrémente la variable
        console.log(counter);
        io.emit('count', counter); // émet un événement 'count'
    });
});
