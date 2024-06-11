
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

    static getNotes(roomCode) {
        return new Promise((resolve, reject) => {
            if (!roomCode || typeof roomCode !== 'string') {
                return reject(new Error("roomCode is undefined or not a string"));
            }

            const databaseRef = firebase.database().ref('notes');

            databaseRef.orderByChild('room').equalTo(roomCode).once('value')
                .then(snapshot => {
                    const notes = [];
                    snapshot.forEach(childSnapshot => {
                        const noteData = childSnapshot.val();
                        const note = {
                            sender: noteData.sender,
                            content: noteData.content   
                        };
                        notes.push(note);
                    });
                    resolve(notes);
                })
                .catch(error => {
                    console.error("Error getting notes:", error);
                    reject(error);
                });
        });
    }
}

