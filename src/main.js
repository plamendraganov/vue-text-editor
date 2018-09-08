import Vue from 'vue'
import App from './App.vue'

Vue.directive('colorized', {
  bind(el, binding){
    if(binding.arg === 'previous'){
      el.style.color=binding.value;
    }else{
      el.style.color='blue'
    }
  }
})

new Vue({
  el: '#app',
  render: h => h(App)
})
