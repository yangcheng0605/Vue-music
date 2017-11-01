<template>
  <div class="play1">
    <div id="play_top">
      <div @click="goback">
       <md-icon id="i" >chevron_left</md-icon>
      </div>
      <div id="top_center">
        <div style="marquee">
          <marquee  scrollamount='3' behavior='alternate'>
            <span>{{playItem.title}}</span>
            <p>{{playItem.author}}</p>
          </marquee>
        </div>
      </div>
      <div>
        <md-speed-dial id="box" md-open="hover" md-direction="bottom" class="md-fab-top-right" md-theme="s">
           <md-button class="md-fab" md-fab-trigger>
            <md-icon md-icon-morph>event</md-icon>
            <md-icon id="add">add</md-icon>
          </md-button>

          <md-button class="md-fab md-primary md-mini md-clean" @click="mute">
            <i class="material-icons" id="off">volume_off</i>
          </md-button>

          <md-button class="md-fab md-primary md-mini md-clean">
            <md-icon>share</md-icon>
          </md-button>
        </md-speed-dial>
      </div>
    </div>
    <div id="play_center">
      <mt-swipe :auto="0" :showIndicators='false'>
        <mt-swipe-item>
          <img :src="playItem.pic_big" alt="">
          <p>{{playItem.album_title}}</p>
          <p>{{playItem.author}}</p>
          <p id="Tvalue">0</p>
        </mt-swipe-item>
        <mt-swipe-item>
          <ul>
            <li v-for="(item, index) in songLrc" :key='(item.id)'>{{item}}</li>
          </ul>
        </mt-swipe-item>
      </mt-swipe>
    </div>
    <div id="play_bottom">
        <span class="iconfont  span_5" @click="stop"><img src="./play.png" alt=""></span>
      <div id="bottom_top">
        <button ><span class="iconfont icon-loop2"></span></button>
        <button @click="changeLeft()"s><span class="iconfont icon-Next"></span></button>
        <button @click="changeRight()"><span class="iconfont icon-play_next"></span></button>
        <button ><span class="iconfont icon-xihuan"></span></button>
      </div>
    </div>
    <!-- <div id="audioShow">
    </div> -->
  </div>
</template>
<script>
// var Tvalue = document.querySelector('Tvalue')
var audio = document.querySelector('#audio')
// window.onload = function win () {
audio.onloadedmetadata = function () {
  console.log(audio.duration)
  console.log(audio.currentTime)
  // var time = audio.duration
  // Tvalue.text = 'llll's
  // var time2 = Tvalue.value
  // console.log(time2)
  transTime(1)
}
audio.ontimeupdate = function () {
  console.log(audio.currentTime)
}
function transTime (time) {
  var duration = parseInt(time)
  var minute = parseInt(duration / 60)
  var sec = duration % 60 + ''
  var isM0 = ':'
  if (minute === 0) {
    minute = '00'
  } else if (minute < 10) {
    minute = '0' + minute
  }
  if (sec.length === 1) {
    sec = '0' + sec
  }
  return minute + isM0 + sec
}
// }
export default {
  created () {
    var audio = document.querySelector('#audio')
    console.log(audio)
  },
  computed: {
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
    },
    changeSong () {
      return this.$store.state.changeSong
    },
    songLrc () {
      return this.$store.state.songLrc
    },
    songTime () {
      return this.$store.state.songTime
    }
  },
  methods: {
    goback () {
      this.$router.go(-1)
    },
    // 暂停播放
    stop () {
      var audio = document.querySelector('#audio')
      console.log(audio)
      if (this.playState) {
        audio.pause()
        this.playState = false
      } else {
        audio.play()
        this.playState = true
      }
    },
    // 切换ID
    changeRight () {
      var item = this.playItem
      this.$store.dispatch('changeRight', item)
    },
    changeLeft () {
      console.log(111)
      var item = this.playItem
      this.$store.dispatch('changeLeft', item)
    },
    // 静音
    mute () {
      // audio.

    }
  }
}
</script>
<style scoped>
.play1{
  width: 100%;
  height: 100%;
  background: url('./timg.jpg') 0 0 no-repeat;
  background-size: 100% 100%;
  color:rgba(255,255,255,.8);
  position: fixed;
  top: -10%;
}
#add{
  font-size: 40px;
  margin-top:-.2rem;
  margin-left:.7rem;
}
#box{
  margin-top:-1rem;
  width: 60px;
  height: 70px;
  /* border-radius: 50%;  */
}
#play_top{
  width: 100%;
  height: 10%;
  background: rgba(255,255,255,.1);
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  border-radius: 0 0 10px 10px;
}
#play_top #i{
  margin: 0;
  margin:1rem 3.5rem 0 1rem;
  font-size: 40px;
  width: 50px;
  height: 50px;
  z-index: 12;
}
#play_top #top_center{
  margin-top: 1.5rem;
}
#top_center{
  width: 50%;
}
#play_center{
  width: 80%;
  height: 55%;
  margin: 10% 10%;
  font-size: 18px;
  line-height: 3rem;
}
#play_center ul{
  text-align: center;
}
#play_center img{
  width: 100%;
  height: 80%;
}
#play_center p{
  text-align: center;
}
#play_bottom{
  position: fixed;
  bottom: 1rem;
  width: 100%;
  height: 20%;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-around;
  align-items: flex-start;
  padding:0 2rem ;
}
#play_bottom button{
  width: 45px;
  height: 50px;
  margin-right: 1rem;
  background: none;
  color:#E4D070;
  border: none;
}
#play_bottom button:nth-of-type(2){
  margin-right: 11rem;
}
#play_bottom button span{
  display: block;
  font-size: 25px;
  color: #E6C383;
}
#bottom_top{
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-start;
  align-items: flex-start;
  position: absolute;
  bottom: 4rem;
  text-align: center;
  width: 100%;
  box-shadow: 0px 0px 30px 2px #E6C383;
  padding-left: 1.5rem;
}
#play_bottom .span_5{
  position: absolute;
  top: 1.5rem;
  color: #E6C383;
  z-index: 15;  
  border-radius: 50%;
  box-shadow: 0px 0px 30px 10px #E6C383;
}
#play_bottom .span_5 img{
  width: 80px;
  height: 80px;
}
.mint-swipe{
  width: 100%;
  height:100%;
}
#off{
  font-size: 30px;
  margin-top: 10%;
}
/* #audio{
  width: 100%;
  height: 50px;
  position: absolute;
  top: 50%;
}
#audioShow{
  width: 100%;
  height: 10%;
  background: #000;
  position: absolute;
  top: 65%;
} */


</style>
