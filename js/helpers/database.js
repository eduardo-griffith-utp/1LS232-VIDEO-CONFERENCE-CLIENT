
class DatabaseHelper {
    static async saveChat(chat) {
        return new Promise((resolve, reject) => {
            const databaseRef = firebase.database().ref('chats');
            const newChatRef = databaseRef.push();
            newChatRef.set(chat)
                .then(() => {
                    console.log(newChatRef.key);
                    resolve(newChatRef.key);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }

    static async getChats(roomCode) {
        return new Promise((resolve, reject) => {
            if (!roomCode) {
                reject(new Error("roomCode is undefined"));
                return;
            }
    
            const databaseRef = firebase.database().ref('chats');
            databaseRef.orderByChild('room').equalTo(roomCode).once('value')
                .then((snapshot) => {
                    const chats = [];
                    snapshot.forEach((childSnapshot) => {
                        const chat = childSnapshot.val();
                        chat.id = childSnapshot.key; // Add the ID to the chat
                        chats.push(chat);
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
            const databaseRef = firebase.database().ref('notes');
            const newNoteRef = databaseRef.push();
            newNoteRef.set(note)
                .then(() => {
                    console.log(newNoteRef.key);
                    resolve(newNoteRef.key);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }

    static async editNote(updatedNote) {
        return new Promise((resolve, reject) => {
            const noteRef = firebase.database().ref('notes').child(updatedNote.id);
            noteRef.set(updatedNote)
                .then(() => {
                    resolve(true);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }

    static async deleteNote(noteId) {
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
        return new Promise((resolve, reject) => {
            if (!roomCode) {
                reject(new Error("roomCode is undefined"));
                return;
            }
    
            const databaseRef = firebase.database().ref('notes');
            databaseRef.orderByChild('room').equalTo(roomCode).once('value')
                .then((snapshot) => {
                    const notes = [];
                    snapshot.forEach((childSnapshot) => {
                        const note = childSnapshot.val();
                        note.id = childSnapshot.key; // Add the ID to the note
                        notes.push(note);
                    });
                    resolve(notes);
                })
                .catch((error) => {
                    console.error("Error getting notes:", error);
                    reject(error);
                });
        });
    }    
}