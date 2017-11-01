<template>
  <div id="music" >
    <!-- 二级路由 -->
    <div id="tab-Two">
      <ul id="tab-ul">
        <router-link to="/music/recommend" tag="li" :class="{hover:this.$route.path==='/music/recommend'}">推荐</router-link>
        <router-link to="/music/newsong" tag="li" :class="{hover:this.$route.path==='/music/newsong'}">新歌榜</router-link>
        <router-link to="/music/hotsong" tag="li" :class="{hover:this.$route.path==='/music/hotsong'}">热歌榜</router-link>
        <router-link to="/music/billboard" tag="li" :class="{hover:this.$route.path==='/music/billboard'}" @click="liBol='billboard'">Billboard</router-link>
        <router-link to="/music/hito" tag="li" :class="{hover:this.$route.path==='/music/hito'}">Hito中文</router-link>
      </ul>
    </div>
    <transition name="fade2">
      <router-view id="router2"></router-view>
    </transition>
  </div>
</template>
<script>
export default {
  // created () {
  //   console.log(this.liBol)
  // },
  data () {
    return {
    }
  },
  methods: {
    loadMore () {
      this.loading = true
      setTimeout(() => {
        let last = this.recommend[this.recommend.length - 1]
        for (let i = 1; i <= 5; i++) {
          this.recommend.push(last + i)
        }
        this.loading = false
      }, 2500)
    },
    getItem (index) {
      this.liIndex = index
      console.log(this.liIndex)
    }
  },
  computed: {
    recommend () {
      return this.$store.state.recommend.song_list
    }
  }
}
</script>
<style scoped>
#tab-ul{
  width: 100%;
  height: 3.3rem;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-around;
  align-items: flex-end;
  position: fixed;
  top:5rem;
  background: #fff;
  z-index: 6;
  padding-top: .3rem;
}
#tab-ul li{
  width: 25%;
  height: 100%;
  text-align: center;
  line-height: 3rem;
  font-size: 16px;
  transition: all .5s;
  font-weight:500;
}
.hover{
  transform: translateX(5px);
  border-bottom:4px solid  teal;
  color: #795548;
}
#router2{
  margin-top: 25%;
  transition: all 1s ease;
}
.fade2-enter-active{
  animation: swing 1s;
}
.fade2-leave-active{
  animation: slideOutRight 1s;
}
</style>
