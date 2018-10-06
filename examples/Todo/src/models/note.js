import { createFakeApi } from '../service/note'

const note = {
  namespace: 'note',
  state: {
    notes: {
      '0': {
        id: '0',
        content: 'init'
      }
    },
    isLoading: false,
    openNoteId: null
  },
  reducers: {
    createNote(state, payload) {
      if (typeof payload === 'undefined') {
        return {
          ...state,
          isLoading: true
        }
      }
      const newNote = {
        id: payload.id,
        content: ''
      }
      return {
        ...state,
        isLoading: false,
        openNoteId: payload.id,
        notes: {
          ...state.notes,
          [payload.id]: newNote
        }
      }
    },
    updateNote(state, payload) {
      const { id, content } = payload
      const editedNote = {
        ...state.notes[id],
        content
      }
      return {
        ...state,
        notes: {
          ...state.notes, 
          [id]: editedNote
        }
      }
    },
    openNote(state, payload) {
      return {
        ...state,
        openNoteId: payload.id
      }
    },
    closeNote(state, payload) {
      return {
        ...state,
        openNoteId: null
      }
    }
  },
  effects: {
    async createNoteAsync (payload) {
      console.log('createNoteAsync')
      dispatch.note.createNote()
      // dispatch.note.createNote()
      const newNote = await createFakeApi().createNote()
      // console.log(newNote)
      // dispatch.note.createNote({ id: newNote.id })
      dispatch.note.createNote(newNote)
    }
  }
}

export default note