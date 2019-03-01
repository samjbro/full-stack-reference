import Vue from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import {} from '@fortawesome/free-regular-svg-icons'
import { 
  faUser,
  faSpinner
} from '@fortawesome/free-solid-svg-icons'

library.add(
  faUser,
  faSpinner
)

Vue.component('fa-icon', FontAwesomeIcon)
