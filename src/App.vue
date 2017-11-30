<template>
  <div class="app">
    <top v-show="this.$route.path != '/play' && this.$route.path != '/search' && this.$route.path != '/singlist' && this.$route.path != '/login' && this.$route.path != '/register'"></top>
        <transition name="fade">
       <router-view id="router"/>
        </transition>

    <tabBar v-show="this.$route.path != '/play' && this.$route.path != '/search' && this.$route.path != '/singlist' && this.$route.path != '/login' && this.$route.path != '/register'"></tabBar>
     <audio id="audio" :src="this.playSong" autoplay style="hight=50px" @timeupdate= 'updateTime' @loadedmetadata="totlaTm" @ended="changeRight()" ></audio>
  </div>
</template>

<script>
import tabBar from './components/tabBar/tabBar.vue'
import top from './components/top/top.vue'
export default {
  created () {
    this.$store.dispatch('getRecommend')
    this.$store.dispatch('getSinger')
  },
  components: {
    top,
    tabBar
  },
  data () {
    return {
    }
  },
  methods: {
    changeRight () {
      var item = this.playItem
      this.$store.dispatch('changeRight', item)
      .then(res => {
        this.$store.dispatch('getSongLrc')
      })
    },
    totlaTm () {
      var audio = document.querySelector('#audio')
      this.$store.dispatch('totlaTm', audio.duration)
    },
    updateTime () {
      var audio = document.querySelector('#audio')
      this.$store.dispatch('updateTime', audio.currentTime)
    }
  },
  computed: {
    playItem () {
      return this.$store.state.playItem
    },
    playID () {
      return this.$store.state.playID
    },
    // 播放当前选中ID的歌曲
    playSong () {
      return this.$store.state.playURL.show_link
    }
  }
}
</script>
<style>
*{
  margin: 0;
  padding: 0; 
  box-sizing: border-box;
}
ul,li,ol{
  list-style: none;
}
a{
  text-decoration: none;
}
.app {
  width: 100%;
  height: 100%;
  background: #fff;
}
#audio{
  position: absolute;
  bottom: -5rem;
}
</style>
