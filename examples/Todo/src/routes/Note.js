import { connect } from 'jeem-core'
import NoteApp from '../component/Note'

const mapStateToProps = state => ({
  notes: state.note.notes,
  isLoading: state.note.isLoading,
  openNoteId: state.note.openNoteId
})

const mapDisPatchToProps = dispatch => ({
  onAddNote: () => dispatch.note.createNoteAsync(),
  onChangeNote: (id, content) => dispatch.note.updateNote({ id, content }),
  onOpenNote: id => dispatch.note.openNote({ id }),
  onCloseNote: () => dispatch.note.closeNote()
})

const NoteAppContainer = connect(mapStateToProps, mapDisPatchToProps)(NoteApp)

export default NoteAppContainer