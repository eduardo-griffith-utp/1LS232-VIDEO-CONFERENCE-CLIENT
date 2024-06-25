const App = {
    mode: "light",
    view: "call",

    userName: null,
    room: null,
    roomName: null,

    video: true,
    audio: true,

    message: "",

    users: [],
    streamList: [],
    chats: [],
    files: [],
    notes: [],

    CallActions: new CallActions(),

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

        try {
            this.notes = await NotesHelper.getList(this.room);
            this.chats = await DatabaseHelper.getChats(this.room);
            this.files = await StorageHelper.getFiles(this.room);
        } catch (error) {
            console.error('Error getting room history:', error);
        }

        await AblyHelper.connect(this.room, (message) => {
            console.log('Received a message in realtime: ' + message.data)
            var json = JSON.parse(message.data);
            switch (json.action) {
                case "user":
                    if (
                        json.streamId != ApiRTCHelper.localStream.publishedInConversations.get(this.room) &&
                        !this.streamList.find(stream => stream.streamId == json.streamId)
                    ) {
                        this.streamList.push(json);
                    }
                    break;
                case "chat":
                    self.chats.push(json);
                    break;
                case "file":
                    self.chats.push(json);
                    self.files.push(json.file);
                    break
                case "add-note":
                    this.notes.push(json.note);
                    break;
                case "edit-note":
                    this.notes = this.notes.filter(x => {
                        if (x.id == json.note.id) {
                            x.content.message = json.note.content.message
                        }
                        return true;
                    });
                    break;
                case "delete-note":
                    this.notes = this.notes.filter(x => x.id != json.id);
                    break;
            }
        });

        await ApiRTCHelper.connect(
            this.room,
            async (stream) => {
                await AblyHelper.send({
                    action: "user",
                    user: this.userName,
                    streamId: ApiRTCHelper.localStream.publishedInConversations.get(this.room)
                });
            },
            (stream) => {
                this.streamList = this.streamList.filter(x => x.streamId != stream.streamId);
            }
        );
    },

    async sendMessage() {
        await this.sendChat({
            "action": "chat",
            "message": this.message,
        });
        this.message = '';
    },

    async sendChat(chat) {
        chat.sender = {
            "name": this.userName,
            "picture": "images/avatar.jpeg"
        }
        chat.room = this.room;
        await AblyHelper.send(chat);

        // Store chat in database
        await DatabaseHelper.saveChat(chat);
    },

    toggleAudio() {
        this.audio = !this.audio;
        ApiRTCHelper.toggleAudio();
    },

    toggleVideo() {
        this.video = !this.video;
        ApiRTCHelper.toggleVideo();
    },

    async download(filePath) {
        const downloadUrl = await StorageHelper.download(filePath);
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.target = "_blank";
        link.download = filePath.split('/').pop();
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    },

    async leaveConversation(prompt) {
        if (prompt) {
            const exit = confirm('¿Estás seguro que deseas salir de la sesión?');
            if (!exit) {
                return false;
            }
        }

        await this.CallActions.leaveConversation();
        this.files = [];
        this.chats = [];
        this.notes = [];
        this.room = null;
        this.userName = null;
    },

    upload(file){
        const path = `${App.room}/${file.name}`
        const result = StorageHelper.upload(file, path)
        if (result) {
            this.sendChat({
                "action": "file",
                "file": path
            });
        }
    },
    
    async goHome(){
        this.leaveConversation(true)
    },

    newNote() {
        let id = this.notes.filter(item => !item.hasOwnProperty('id')).length + 1;
        this.notes.unshift({
            content: {
                color:"#000",
                message: ""
            },
            room: this.room,
            sender: {
                "name": this.userName,
                "picture": "images/avatar.jpeg"
            },
            edit: true,
            _id: id
        });

        window.setTimeout(() => {
            document.querySelector('#note-' + id).focus();
        }, 200);
    },

    async addNote(note) 
    {
        this.notes = this.notes.filter(x => x._id != note._id);
        delete note._id;
        delete note.edit;
        const id = await NotesHelper.add(note);
        if (id) {
            note.id = id;

            await this.sendChat({
                "action": "add-note",
                "note": note
            });            
        }
    },

    async editNote(note) {
        const editRes = await NotesHelper.edit(note);

        if (editRes === true) {
            await this.sendChat({
                "action": "edit-note",
                "note": note
            })

            note.edit = false;
        }
    },

    async deleteNote(note) {
        if (note._id) {
            this.notes = this.notes.filter(x => x._id != note._id);
        } else {
            const deleteRes = await NotesHelper.delete(note.id);
            if (deleteRes === true) {
                await this.sendChat({
                    "action": "delete-note",
                    "id": note.id // id de la nota
                })
            }
        }
    }
},

  async deleteNoteById(noteId) {
        if (await NotesHelper.delete(noteId)) {
          return {
            "action": "delete-note",
            "id": noteId
          };
        } else {
          return null;
        }
      }
    };

document.addEventListener('alpine:init', () => {
    Alpine.data('App', () => (App))
});

window.ondragover = function (event) {
    event.preventDefault();
};

window.ondrop = async function (event) {
    event.preventDefault();
    const files = event.dataTransfer.files;
    for (const file of files) {
        App.upload(file);
    }
};

firebase.initializeApp(CONFIG.Firebase);
