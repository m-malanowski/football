import  {createStore} from 'vuex'
import crud from './modules/crud.js'

export const store = createStore({
  modules: {
    crud
  }
})

