
class DatabaseHelper {
    static async saveChat(chat) {
        return true;
        return new Promise((resolve, reject) => {
            const databaseRef = firebase.database().ref('chats');
            const newChatRef = databaseRef.push();
            newChatRef.set(chat)
                .then(() => {
                    console.log('Chat key:', newChatRef.key);
                    resolve(newChatRef.key);
                })
                .catch((error) => {
                    console.error('Error guardando chat:', error);
                    reject(error);
                });
        });
    }

    static getChats(roomCode) {
        return new Promise((resolve, reject) => {
            
            if (roomCode === undefined) {
                reject(new Error("roomCode is undefined"));
                return;
            }

            const databaseRef = firebase.database().ref('chats');

            databaseRef.orderByChild('room').equalTo(roomCode).once('value')
                .then((snapshot) => {
                    const chats = [];
                    snapshot.forEach((childSnapshot) => {
                        const chatData = childSnapshot.val();
                        const chatId = childSnapshot.key;
                        const chatWithId = { ...chatData, id: chatId };
                        chats.push(chatWithId);
                    });
                    resolve(chats);
                })
                .catch((error) => {
                    console.error("Error getting chats:", error);
                    reject(error); 
                });
        });
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
                .catch((error) => {
                    console.log(error);
                    reject(error);
                });
            });
        };

    static async editNote(note) {
        return true; 
    }

    static deleteNote(noteId) {
        return new Promise((resolve, reject) => {
            const noteRef = firebase.database().ref('notes').child(noteId);

            noteRef.remove()
                .then(() => {
                    resolve(true);
                })
                .catch((error) => {
                    reject(error);
                });
        });
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

