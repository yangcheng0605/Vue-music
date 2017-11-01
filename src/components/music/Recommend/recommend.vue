<template>
  <div id="recommend">
    <!-- 轮播图 -->
    <div id="head_top">
      <md-boards  :md-controls="true" :md-duration='3000' :md-swipeable='true' :md-infinite='true' :md-auto='true'>
        <md-board id="slide1">
          <md-card-media>
            <md-ink-ripple />
              <img src="./lunbo1.jpg" alt="">
          </md-card-media>
        </md-board>
        <md-board id="slide2">
          <md-card-media>
            <md-ink-ripple />
              <img src="./lunbo2.jpg" alt="">
          </md-card-media>
        </md-board>
        <md-board id="slide5" >
              <md-ink-ripple />
              <img src="./lunbo3.jpg" alt="">
        </md-board>
      </md-boards>
    </div>
    <!-- 推荐歌单 -->
    <div id="head_list"  class="has-ripple blue">
        <!-- v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10" -->
      <ul>
        <h3>今日推荐</h3>
        <li v-for="(item, index) in recommend" :key="item.id" @click="getItem(item)">
          <div id="list-left">
              <img :src="item.pic_small" alt="">
          </div>
          <div id="list-center">
            <span id="songName">{{item.title}}</span><span class="iconfont icon-sq"></span>
            <p>{{item.author}}</p>
          </div>
          <div id="list-right">
            <span class="iconfont" :class="{'icon-play':item.charge===0,spanBG:item.charge===1}"></span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      liIndex: 0,
      show: false,
      playState: false
    }
  },
  methods: {
    getItem (item) {
      var index = this.recommend.indexOf(item)
      this.recommend[index].charge = this.recommend[index].charge === 0 ? 1 : 0
      for (var i = 0; i < this.recommend.length; i++) {
        if (index === i) {
          continue
        }
        this.recommend[i].charge = 0
      }
      if (this.recommend[index].charge === 1) {
        this.show = true
      } else {
        this.show = false
      }
      this.$store.dispatch('getItem', item)
      .then(res => {
        this.$store.dispatch('getSongLrc')
      })
      .then(res => {
        this.$router.push('/play')
      })
    }
  },
  computed: {
    recommend () {
      return this.$store.state.recommend.list
    },
    recommendID () {
      return this.$store.state.recommendID
    },
    playItem () {
      return this.$store.state.playItem
    }
  }
}
</script>
<style scoped>
#head_top{
  margin-top: 25%;
}
#head_list{
  padding-bottom: 4.5rem;
}
#head_list span{
  color: teal;
}
#head_list ul li{
  width: 100%;
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: top;
  border-top: 1px solid #ddd;
  padding-top: 2%;
}
#head_list h3{
  text-indent: 1rem;
  margin-bottom: 1rem;
}
#list-left{
  width: 40%;;
  margin-left: 5%;
}
#list-center{
  width: 60%;
  line-height: 2rem;
  margin-top: 1rem;
  margin-right: 10%;
  font-size: 13px;
}
#list-right {
  margin-top: 1rem;
  margin-right: 2rem;
}
#list-right span{
  display: inline-block;
  width: 20px;
  height: 20px;
  font-size: 20px;
  color: teal;
}
.iconfont{
  z-index: 12;
}
.spanBG{
  background:url('./play.gif') 0 0 no-repeat;
  background-size: 100%,100%;
}
.songName{
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
