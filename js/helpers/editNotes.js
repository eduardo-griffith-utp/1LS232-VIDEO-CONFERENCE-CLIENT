import NotesHelper from '@/helpers/NotesHelper';

const state = {
  
  notes: []
};

const mutations = {
  // actualizar nota en el estado
  UPDATE_NOTE(state, updatedNote) {
    const index = state.notes.findIndex(note => note.id === updatedNote.id);
    if (index !== -1) {
      state.notes.splice(index, 1, updatedNote);
    }
  }
};

const actions = {
  async editNote({ commit }, note) {
    const result = await NotesHelper.edit(note);
    if (result) {
      // Actualiza el estado
      commit('UPDATE_NOTE', note);

      // Enviar mensaje en tiempo real
      const message = {
        action: "edit-note",
        note: note
      };
    }
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
