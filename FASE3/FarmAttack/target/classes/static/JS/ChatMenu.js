class ChatMenu extends Phaser.Scene{

    constructor(){
        super("ChatMenu");
    }
    


    preload() { 
          
    }
    
    create() {
    
        /*

        // Control
        mainPanel
            .on('send-message', function (message) {
                room.broadcast.send(message)
            })
            .on('change-name', function (newUserName) {
                room.changeUserName(newUserName);
            })

        room
            .on('userlist.update', function (users) {
                mainPanel.setUserList(users);
            })
            .on('broadcast.receive', function (message) {
                mainPanel.appendMessage(message);
            })
            .on('userlist.changename', function () {
                mainPanel.setMessages(room.broadcast.getHistory())
            })
            .setUser(userID, userName)
            .joinRoom()
        */
    }

    update() {
    	alive();
     }
}
