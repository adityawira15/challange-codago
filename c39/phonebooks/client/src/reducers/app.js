const initialState = {
    formAdd: false,
    formEdit: false,
    rData: false,
    dataEdit: []
}

export default (state=initialState, action) => {
  switch (action.type) {
    case 'ButtonToggle':
    state.formAdd = !state.formAdd
    state.formEdit = false
    
        console.log(state)
        return state
      case 'ButtonUpdate':
        state.formEdit = true
        state.formAdd = false
        state.dataEdit = action.dataedit
        return state
      case 'ButtonAdd':
        state.formAdd = false
        return state
      case 'ButtonSave':
        state.formEdit = false
        return state
      case 'RenderData':
        state.rData = !state.rData
        return state
      default:
        return state
    }
  }
  