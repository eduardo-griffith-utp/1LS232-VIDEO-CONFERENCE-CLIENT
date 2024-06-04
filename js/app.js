
document.addEventListener('alpine:init', () => {
    Alpine.data('App', () => ({
        userName: null,
        room: null,
        roomName: null,
        channel: null,
        video: true,
        audio: true,
        mode: "light",
        streamList: [],
        chats: [],
        view: "call",
        files: [],
        notes: [],
        message: "",
        toggleMode() {
            if (this.mode == "light") {
                this.mode = "dark";
            } else {
                this.mode = "light";
            }
        },
        async accessRoom() {
            let self = this;
            this.room = this.roomName;
            this.roomName = null;

            await AblyHelper.connect(this.room, (message) => {
                console.log('Received a message in realtime: ' + message.data)
                var json = JSON.parse(message.data);
                switch (json.action) {
                    case "chat":
                        self.chats.push(json);
                        break;
                    case "file":
                        self.chats.push(json)
                        self.files.push(json.file)
                        break
                }
            });


            await ApiRTCHelper.connect(
                this.room,
                (streamInfo) => {
                    this.streamList.push({
                        user: this.userName,
                        streamInfo
                    });
                },
                (stream) => {
                    this.streamList = this.streamList.filter(x => x.streamInfo.streamId != stream.streamId);
                }
            );
        },
        async sendMessage() {
            console.log("publishing: " + this.message + " ...");
            AblyHelper.send({
                "action": "chat",
                "message": this.message,
                "sender": {
                    "name": this.userName,
                    "picture": "images/avatar.jpeg"
                }
            });

            this.message = '';
        },
        toggleAudio() {
            ApiRTCHelper.toggleAudio();
        },
        toggleVideo() {
            ApiRTCHelper.toggleVideo();
        }
    }))

    window.ondragover = function (event) {
        event.preventDefault();
    };

    window.ondrop = function (event) {
        event.preventDefault();
        const files = event.dataTransfer.files;
        console.log(files);
    };
});