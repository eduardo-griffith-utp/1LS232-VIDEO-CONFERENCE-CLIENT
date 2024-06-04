class NotesHelper {
    constructor() {

        this.notes = [];
        this.nextId = 1; 
    }

    add(note) {
        // Simulamos la creación de un ID único para cada nota
        const newNote = {
            id: this.nextId++,
            sender: note.sender,
            content: note.content
        };
        this.notes.push(newNote);
        console.log("Nota añadida:", newNote);
        return newNote.id.toString(); // Retornamos el ID como string
    }

    delete(noteId) {
        const initialLength = this.notes.length;
        this.notes = this.notes.filter(note => note.id !== parseInt(noteId));
        const finalLength = this.notes.length;
        console.log("Nota eliminada con ID:", noteId);
        return initialLength !== finalLength; // Retorna true si alguna nota fue eliminada
    }

    getList(roomCode) {
        console.log("Obteniendo lista de notas para la sala:", roomCode);
        return this.notes.filter(note => note.roomCode === roomCode).map(note => ({
            sender: note.sender,
            content: note.content
        }));
    }
}

// Ejemplo de uso:
const NotesHelper = new NotesHelper();
let noteId = notesenotesHelper.add({
    sender: {
        name: "John Doe",
        picture: "images/avatar.jpeg"
    },
    content: {
    message: "Hello World",
    color: "#000"
    },
    roomCode: "123" // Roomcode asociado a cada nota
});

console.log(notesHelper.getList("123")); // Obtener notas de la sala "123"
console.log(notesHelper.delete(noteId)); // Eliminar nota por ID
console.log(notesHelper.getList("123")); // Verificar notas restantes en la sala "123"