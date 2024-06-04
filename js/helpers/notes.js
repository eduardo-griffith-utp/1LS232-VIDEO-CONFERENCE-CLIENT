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
        console.log("Obteniendo lista de notas para la sala:", roomCode);
        return this.notes.filter(note => note.roomCode === roomCode).map(note => ({
            sender: note.sender,
            content: note.content
        }));
    }
}

console.log(notesHelper.getList("12345")); 
console.log(notesHelper.delete(noteId)); 
console.log(notesHelper.getList("123"));
