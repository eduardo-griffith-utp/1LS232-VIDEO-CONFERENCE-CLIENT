
class DatabaseHelper {
    static async saveChat(chat) {
        return true;
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
        return "12345"
    }

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

