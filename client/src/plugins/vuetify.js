import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import 'vuetify/src/stylus/app.styl'

Vue.use(Vuetify, {
  iconfont: 'md',
  theme: {
	primary: '#2f193a',
	secondary: '#444B8E',
	accent: '#221b56',
	error: '#9E3039',
	warning: '#e91e63',
	info: '#E8C547',
	success: '#4caf50'
  }
})