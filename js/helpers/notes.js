class NotesHelper {
    constructor() {
        this.notes = [];
        this.nextId = 1;
    }

    add(note) {
        return "12345"; 
    }

    delete(noteId) {
        return true; 
    }

    getList(roomCode) {
        return
        [
            "sender",{
                "name": "XYZ",
                "picture": "images/avatar.jpeg"

            },
              "content",{
                "message": "XYZ",
                "color": "#000"
              }
        ]
    }
}
