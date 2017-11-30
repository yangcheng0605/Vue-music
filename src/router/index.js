import Vue from 'vue'
import Router from 'vue-router'

// main 页面
const head = resolve => require(['@/components/head/head'], resolve)
// singer 页面
const singer = resolve => require(['@/components/singer/singer'], resolve)
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
// 搜索 页面
const search = resolve => require(['@/components/search/search'], resolve)
// 歌手详情页面
const singlist = resolve => require(['@/components/singerlist/singlist'], resolve)
// 用户登录页面
const login = resolve => require(['@/components/user/login.vue'], resolve)
// 用户注册页面
const register = resolve => require(['@/components/user/register.vue'], resolve)

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/music/recommend'
    },
    {
      path: '/head',
      component: head
    },
    {
      path: '/singer',
      component: singer
    },
    {
      path: '/music',
      component: music,
      /* 二级路由 */
      children: [
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
    },
    {
      path: '/search',
      component: search
    },
    {
      path: '/singlist',
      component: singlist
    },
    {
      path: '/login',
      component: login
    },
    {
      path: '/register',
      component: register
    }
  ]
})
