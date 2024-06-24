class NotesHelper {
    static async add(note) {
        return await DatabaseHelper.addNote(note);
    }
    
    static async delete(noteId) {
        return await DatabaseHelper.deleteNote(noteId);
    }
  
    static async getList(roomCode) {
        return await DatabaseHelper.getNotes(roomCode);
    }
  
    static async edit(note) {
      return await DatabaseHelper.editNote(note);
    }

}
