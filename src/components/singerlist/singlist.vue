<template>
  <div class="singlist">
    <div id="singerMsg" :style="{backgroundImage: 'url(' + singItem.avatar_big + ')', backgroundSize:'100% 130%',filter:'blur(4px)',zIndex:'-1'}">
      </div>
        <div id="singercenter">
          <div id="back">
            <div id="chevron_left" @click="goback">
              <md-icon id="i" >chevron_left</md-icon>
            </div>
            <div id="share">
              <md-icon id="i2">share</md-icon>
            </div>
            </div>
            <md-card>
                <img :src="singItem.avatar_big" alt="People">
                <md-ink-ripple />
              <div id="singerMsg_hint">
                  <md-ink-ripple />
                  <p>{{singItem.name}}</p>
                  <p>{{singItem.country}}</p> 
              </div>
            </md-card>
        </div>
    <div id="songslist" >
      <div>
        <ol>
          <li :class="{li:defaultIndex === 0}"><span>歌曲列表</span> </li>
          <li :class="{li:defaultIndex === 1}"><span>歌手专辑</span></li>
          <li :class="{li:defaultIndex === 2}"><span>歌手信息</span></li>
        </ol>
      </div>
      <mt-swipe :auto="0" :showIndicators="false" :defaultIndex='defaultIndex' @change="handleChange">
        <mt-swipe-item>
            <songList></songList>
        </mt-swipe-item>
        <mt-swipe-item>
            <special></special>
        </mt-swipe-item>
        <mt-swipe-item>
          <singMsg></singMsg>
        </mt-swipe-item>
      </mt-swipe>
    </div>
    </div>
  </div>
</template>
<script>
import songList from './songList/songList'
import special from './special/special'
import singMsg from './singeMsg/singMsg'
export default {
  created () {
    this.$store.dispatch('getSpecial', this.singItem)
    this.$store.dispatch('getMsg', this.singItem)
  },
  data () {
    return {
      songslistIndex: 0,
      defaultIndex: 0
    }
  },
  components: {
    songList,
    special,
    singMsg
  },
  computed: {
    singlist () {
      return this.$store.state.singerlist
    },
    singItem () {
      return this.$store.state.singerItem
    }
  },
  methods: {
    goback () {
      this.$router.go(-1)
    },
    getItem (item, index) {
      this.songslistIndex = index
      console.log(item)
      if (item !== this.playItem) {
        this.$store.dispatch('getItem', item)
        .then(res => {
          this.$store.dispatch('getSongLrc', item)
        })
      }
    },
    handleChange (index) {
      this.defaultIndex = index
    },
    test () {
      console.log('popup')
    }
  }
}
</script>
<style scoped>
.singlist{
  width: 100%;
  height: 100%;
  background: #000;
  position: relative;
}
#back{
  width:100%;
  position: absolute;
  top: 0;
  z-index: 2;
}
#chevron_left,#share{
  width: 25%;
}
#chevron_left{
  float: left;
}
#share{
  float: right;
}
#i,#i2{
  margin: 0;
  background: rgba(0,0,0,.5);
  border-radius: 50%;
  margin:1rem 2rem 0 1rem;
  width: 40px;
  height: 40px;
  color:#fff;
}
#i2{
  float: right;
  padding-left: .5rem;
}
#i{
  font-size: 40px;
}
#singerMsg{
  width: 100%;
  height: 22rem;
  overflow: hidden;
  background: #000;
}
#singercenter{
  width: 100%;
  height: 22rem;
  position: absolute;
  top: 0;
}
.md-theme-default.md-card{
  height: 100%;
  background: transparent;
}
.md-theme-brown.md-card{
  height: 100%;
  background: transparent;
}
#singercenter img{
  width:41%;
  margin:4rem 0 0 2rem;
}
#singerMsg_hint{
  width: 100%;
  position: absolute;
  bottom: 0;
  background: rgba(0,0,0,.6);
  color:#fff;
}
#singerMsg_hint p:nth-of-type(1){
  font-size: 18px;
  margin:1rem 0 0 2rem; 
  line-height: 2.5rem;
}
#singerMsg_hint p:nth-of-type(2){
  font-size: 14px;
  margin-left: 2rem;
}
#songslist{
  width: 100%;
  height: 70%;
  background: #000;
  margin-top: 10px;
}
#songslist ul{
  background: #000;
}
#songslist ul li{
  margin-top: 0;
  width: 100%;
  height: 4rem;
  color: #eee;
  background: #222;
  border-bottom: 1px solid #fff;
}
#songslist ol{
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-around;
  margin-bottom: 5px;
}
#songslist ol li{
  width: 33.3%;
  height: 3rem;
  line-height: 3rem;
  color:#fff;
  text-align: center;
}
#songslist ol li span{
  padding-right: 3rem;
  margin-left: 2.6rem;
  border-right: 1px solid #fff;
}
#songslist ol li:last-of-type span{
  border-right:none;
}
#songslist ul li span:nth-of-type(1){
  float: left;  
  padding:1rem 2rem 0;
}
#songslist li span:nth-of-type(2){
  line-height: 3rem;
  display: inline-block;
  width: 70%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
#singerMsg_hint span{
  float: right;
}
.mint-swipe-items-wrap > div{
  position: fixed;
  overflow: scroll;
  height: 53%;
}
.mint-swipe-item{
  background: #333;
}
#songslist .active{
  background: #fff;
  color: #000;
}
#songslist .li{
  background: #fff;
  color: #000;
  transform: translate(10px);
  transition: all .5s ;
}
</style>
