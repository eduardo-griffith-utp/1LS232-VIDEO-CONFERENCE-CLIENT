class NotesHelper {
    static async add(note) {
        return "12345"; 
    }

    static async edit(note) {
        return true;
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
