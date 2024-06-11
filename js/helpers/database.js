
class DatabaseHelper {
    static async saveChat(chat) {
        return true;
    }

    static async getChats(roomCode) {
        const chats = [
            {
                action: "chat",
                message: "Hello World",
                sender: {
                    name: "John Doe",
                    picture: "images/avatar.jpeg"
                }
            },
            {
                action: "file",
                file: "12345/test.txt",
                sender: {
                    name: "John Doe",
                    picture: "images/avatar.jpeg"
                }   
            },
            {
                action: "chat",
                message: "How are you?",
                sender: {
                    name: "Jane Doe",
                    picture: "images/avatar2.jpeg"
                }
            }
        ];
        return chats;
    }

    static async addNote(note) {
        return new Promise((resolve, reject) => {
            const databaseRef = firebase.database().ref("notes");
            const newNoteRef = databaseRef.push();
            newNoteRef.set(note)
                .then(() => {
                    console.log(newNoteRef.key);
                    resolve(newNoteRef.key);
                })
                .catch(() => {
                    reject(error);
                });
            });
        };

    static async editNote(note) {
        return true; 
    }

    static async deleteNote(noteId) {
        return true;
    }

    static async getNotes(roomCode) {
        const notes = [
            {
                sender: {
                    name: "John Doe",
                    picture: "images/avatar.jpeg"
                },
                content: {
                    message: "This is a note",
                    color: "#000"
                }
            },
            {
                sender: {
                    name: "Jane Doe",
                    picture: "images/avatar2.jpeg"
                },
                content: {
                    message: "This is another note",
                    color: "#f00"
                }
            }
        ];
        return notes;
    }
}

