import { db } from './firebaseConfig';
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc, query, where } from "firebase/firestore";

class DatabaseHelper {
    static async saveChat(chat) {
        try {
            const docRef = await addDoc(collection(db, "chats"), chat);
            console.log("Chat saved with ID: ", docRef.id);
            return true;
        } catch (e) {
            console.error("Error adding chat: ", e);
            return false;
        }
    }

    static async getChats(roomCode) {
        try {
            const q = query(collection(db, "chats"), where("roomCode", "==", roomCode));
            const querySnapshot = await getDocs(q);
            let chats = [];
            querySnapshot.forEach((doc) => {
                chats.push(doc.data());
            });
            return chats;
        } catch (e) {
            console.error("Error getting chats: ", e);
            return [];
        }
    }

    static async addNote(note) {
        try {
            const docRef = await addDoc(collection(db, "notes"), note);
            console.log("Note added with ID: ", docRef.id);
            return docRef.id;
        } catch (e) {
            console.error("Error adding note: ", e);
            return null;
        }
    }

    static async editNote(note) {
        try {
            const noteRef = doc(db, "notes", note.id);
            await updateDoc(noteRef, note);
            console.log("Note edited with ID: ", note.id);
            return true;
        } catch (e) {
            console.error("Error editing note: ", e);
            return false;
        }
    }

    static async deleteNote(noteId) {
        try {
            await deleteDoc(doc(db, "notes", noteId));
            console.log("Note deleted with ID: ", noteId);
            return true;
        } catch (e) {
            console.error("Error deleting note: ", e);
            return false;
        }
    }

    static async getNotes(roomCode) {
        try {
            const q = query(collection(db, "notes"), where("roomCode", "==", roomCode));
            const querySnapshot = await getDocs(q);
            let notes = [];
            querySnapshot.forEach((doc) => {
                notes.push(doc.data());
            });
            return notes;
        } catch (e) {
            console.error("Error getting notes: ", e);
            return [];
        }
    }
}

export default DatabaseHelper;