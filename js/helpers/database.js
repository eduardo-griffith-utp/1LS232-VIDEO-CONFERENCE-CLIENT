
class DatabaseHelper {
    static async saveChat(chat) {
        return true;
    }

    static async getChats(roomCode) {
        return [];
    }

    static async addNote(note) {
        return true;
    }

    static async editNote(note) {
        return true; 
    }

    static async deleteNote(noteId) {
        return "testId";
    }

    static async getNotes(roomCode) {
        return [];
    }
}

export default DatabaseHelper;