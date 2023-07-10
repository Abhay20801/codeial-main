// To create a connection btwn user and server
// User will now subscribe the observer
// User initiates the connection always and observer detects it
class ChatEngine{
    constructor(chatBoxId,userEmail){
        this.chatBox = $(`#${chatBoxId}`);
        this.userEmail = userEmail;

        // io has been given to us by socket.io file
        // Step1 = sending the connect request
        this.socket = io.connect('http://localhost:5000');

        // If there is user email then call connection handler
        if(this.userEmail){
            this.connectionHandler();
        }
    }

    // create a connection handler 
    connectionHandler(){
        let self = this;

        // When connection occurs
        this.socket.on('connect',function(){
            console.log('connection established from socket...');
            console.log('Socket ID:', self.socket.id);
            // Ask to join the room
            self.socket.emit('join_room',{
                user_email : self.userEmail,
                chatroom : 'codeial'
            });

            self.socket.on('user_joined',function(data){
                console.log('A user joined',data);
            });

   

        });

        // CHANGE :: send a message on clicking the send message button
        $('#send-message').click(function(){
            let msg = $('#chat-message-input').val();

            if (msg != ''){
                self.socket.emit('send_message', {
                    message: msg,
                    user_email: self.userEmail,
                    chatroom: 'codeial'
                });
            }
        });

        self.socket.on('receive_message',function(data){
            console.log('message received',data.message);

            let newMessage = $('<li>');

            let messageType = 'other-message';

            if(data.user_email == self.userEmail){
                messageType = 'self-message'; 
            }

            newMessage.append($('<span>',{
                'html':data.message
            }));

            newMessage.append($('<sub>',{
                'html':data.user_email
            }));

            newMessage.addClass(messageType);

            $('chat-messages-list').append(newMessage)

        })

        

    }
}