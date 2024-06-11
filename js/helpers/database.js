import firebase from 'firebase/app';
import 'firebase/database';

class DatabaseHelper {
    static async saveChat(chat) {
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

