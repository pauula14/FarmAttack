class Chat extends Phaser.Scene{

    constructor(){
        super("Chat");
    }
    


    preload() { 
        this.load.plugin('firebase', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexfirebaseplugin.min.js', true);

        this.load.scenePlugin({
            key: 'rexuiplugin',
            url: 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexuiplugin.min.js',
            sceneKey: 'rexUI'
        });      
    }
    create() {
    
        mainPanel = this.CreateMainPanel(this, {
            x: 400, y: 300,
            width: 640, height: 560,
            color: {
                background: 0x0E376F,
                track: 0x3A6BA5,
                thumb: 0xBFCDBB,
                inputBackground: 0x685784,
                inputBox: 0x182456
            },
            userName: userName
        })
            .layout();

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

    }

    update() { }
	}
RandomInt = Phaser.Math.Between;
RandomItem = Phaser.Utils.Array.GetRandom;
CANDIDATES = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

GetRandomWord = function (min, max, candidates) {
    if (candidates === undefined) {
        candidates = CANDIDATES;
    }
    count = (max === undefined) ? min : RandomInt(min, max);
    word = '';
    for (j = 0; j < count; j++) {
        word += RandomItem(candidates);
    }
    return word;
}

firebaseConfig = {
    apiKey: 'AIzaSyAN_ejscIWn3z6XpOhhl2Okh_MuEXq4nSQ',
    databaseURL: 'https://my-3x-test.firebaseio.com',
    projectId: 'my-3x-test',
};
