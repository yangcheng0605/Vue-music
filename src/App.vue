<template>
  <div id="app">
    <top v-show="this.$route.path != '/play'"></top>
        <transition name="fade">
       <router-view id="router"/>
           </transition>

    <tabBar v-show="this.$route.path != '/play'"></tabBar>
    <!-- <button @click="getData">222</button> -->
    <!-- <img :src="this.value.songinfo.pic_small" alt="">-->
    <!-- <audio src="http://zhangmenshiting.baidu.com/data2/music/238982688/238982688.mp3?xcode=fccdd158ab7704580c0d8753917afb85" autoplay ></audio> -->
     <audio id="audio" :src="this.playSong" autoplay controls style="hight=50px"  @ended="changeRight()" ></audio>
  </div>
</template>

<script>
import tabBar from './components/tabBar/tabBar.vue'
import top from './components/top/top.vue'
export default {
  created () {
    this.$store.dispatch('getRecommend')
    .then(res => {
      this.$store.dispatch('getRecommendShowLink')
    })
    this.$store.dispatch('getNewsong')
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
      this.$store.dispatch('changeID', item)
    }
  },
  computed: {
    value () {
      return this.$store.state.song
    },
    playItem () {
      return this.$store.state.playItem
    },
    recommendURL () {
      return this.$store.state.recommendURL
    },
    playID () {
      return this.$store.state.playID
    },
    // 播放当前选区ID的歌曲
    playSong () {
      for (let j = 0; j < this.recommendURL.length; j++) {
        if (Number(this.playID) === Number(this.recommendURL[j].songinfo.song_id)) {
          return this.recommendURL[j].bitrate.show_link
        }
      }
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
#app {
  width: 100%;
  height: 100%;
  background: #fff;
}
#router{
  margin-top: 17%;
}
#audio{
  position: absolute;
  bottom: -5rem;
}
/* .fade-enter-active{
  animation: bounceInRight .5s;
}
.fade-leave-active{
  animation: bounceInleft .2s;
} */
</style>
