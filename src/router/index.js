import Vue from 'vue'
import Router from 'vue-router'

// main 页面
const head = resolve => require(['@/components/head/head'], resolve)
// mv 页面
const movies = resolve => require(['@/components/movies/movies'], resolve)
// music 页面
const music = resolve => require(['@/components/music/music'], resolve)
// music 二级路由
const newsong = resolve => require(['@/components/music/NewSong/newsong'], resolve)
const billboard = resolve => require(['@/components/music/Billboard/billboard'], resolve)
const hito = resolve => require(['@/components/music/Hito/hito'], resolve)
const hotsong = resolve => require(['@/components/music/HotSong/hotsong'], resolve)
const recommend = resolve => require(['@/components/music/Recommend/recommend'], resolve)
// 讨论 页面
const talk = resolve => require(['@/components/talk/talk'], resolve)
// play 播放页面
const play = resolve => require(['@/components/play/play'], resolve)

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '',
      redirect: '/music/recommend'
    },
    {
      path: '/head',
      component: head
    },
    {
      path: '/movies',
      component: movies
    },
    {
      path: '/music',
      component: music,
      /* 二级路由 */
      children: [
        {
          path: '',
          component: recommend
        },
        {
          path: 'newsong',
          component: newsong
        },
        {
          path: 'billboard',
          component: billboard
        },
        {
          path: 'hito',
          component: hito
        },
        {
          path: 'hotsong',
          component: hotsong
        },
        {
          path: 'recommend',
          component: recommend
        }
      ]
    },
    {
      path: '/talk',
      component: talk
    },
    {
      path: '/play',
      component: play
    }
  ]
})
