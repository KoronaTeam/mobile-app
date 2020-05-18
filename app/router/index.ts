import Login from '../pages/Login.vue'
import TakePhoto from '../pages/TakePhoto.vue'
import NoAction from '../pages/NoAction.vue'

export const routes = {
  '/login': {
    component: Login,
  },
  '/takephoto': {
    component: TakePhoto,
  },
  '/noaction': {
    component: NoAction,
  },
};