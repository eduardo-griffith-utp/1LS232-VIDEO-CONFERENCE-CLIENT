class NotesHelper {
    static async add(note) {
        return "12345"; 
    }

    static async edit(note) {
            const result = await DatabaseHelper.editNote(note);
            return result;
    }
    
    static async delete(noteId) {
        return true; 
    }

    static async getList(roomCode) {
        return [
            {
                "sender": {
                    "name": "XYZ",
                    "picture": "images/avatar.jpeg"

                },
                "content": {
                    "message": "XYZ",
                    "color": "#000"
                }
            }
        ]
    }

}
