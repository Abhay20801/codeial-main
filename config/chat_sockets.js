// This receives the connection and emit back acknowledgemt that connection established
// This is server side
module.exports.chatSockets = function(socketServer){
    let io = require('socket.io')(socketServer,{
        cors: {
            origin: "http://localhost:8000",
            methods: ["GET", "POST"]
          }
    });
    // socket is an object with lots of properties
     io.sockets.on('connection',function(socket){

        console.log('new connection received',socket.id);

        socket.on('disconnect',function(){
            console.log('socket disconnected');
        });


        // We sent the join_room event
        socket.on('join_room',function(data){
            console.log('Joining request received',data);

            // If data.chatroom which is codeial in our case exists then the user will entered
            // in that chatroom but if it does not exists it will create that chatroom
            socket.join(data.chatroom)

            // Notify other in the chat room about emit
            // user_joined is the event name
            io.in(data.chatroom).emit('user_joined', data);
        });
         
        socket.on('send_message',function(data){
            io.in(data.chatroom).emit('receive_message',data);
        });
     });




}