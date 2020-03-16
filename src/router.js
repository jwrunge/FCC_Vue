import Vue from 'vue'
import Router from 'vue-router'

import Worship from './views/Worship.vue'
import Learn from './views/Learn.vue'
import About from './views/About.vue'
import Resources from './views/Resources.vue'
import Staff from './views/Staff.vue'
import Links from './views/Links.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/worship',
      name: 'worship',
      component: Worship
    },
    {
      path: '/learn',
      name: 'learn',
      component: Learn
    },
    {
      path: '/about',
      name: 'about',
      component: About
    },
    {
      path: '/resources',
      name: 'resources',
      component: Resources
    },
    {
      path: '/staff',
      name: 'staff',
      component: Staff
    },
    {
      path: '/links',
      name: 'links',
      component: Links
    }
  ]
})
