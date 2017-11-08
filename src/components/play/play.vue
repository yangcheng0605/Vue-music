<template>
  <div class="play1" >
    <div id="bg">
      <img :src="playItem.pic_s500" alt="">
    </div>
    <div id="play_top">
      <div @click="goback">
       <md-icon id="i" >chevron_left</md-icon>
      </div>
      <div id="top_center">
        <div style="marquee">
          <marquee  scrollamount='2' behavior='alternate'>
            <span>{{playItem.title}}</span>
            <p>{{playItem.author}}</p>
          </marquee>
        </div>
      </div>
      <div>
        <md-speed-dial id="box1" md-open="hover" md-direction="bottom" class="md-fab-top-right" md-theme="s">
           <md-button class="md-fab" md-fab-trigger>
            <md-icon md-icon-morph>event</md-icon>
            <md-icon id="add">add</md-icon>
          </md-button>

          <md-button class="md-fab md-primary md-mini md-clean" @click="mute">
            <i class="material-icons" id="off">volume_off</i>
          </md-button>

          <md-button class="md-fab md-primary md-mini md-clean">
            <a :href='playSong.show_link' id="down" @click="downHint"><md-icon>file_download</md-icon></a>
          </md-button>

           <md-button class="md-fab md-primary md-mini md-clean">
            <md-icon>share</md-icon>
          </md-button>
        </md-speed-dial>
      </div>
    </div>
    <!-- <img src="./needle-ip6.png" alt="" id="needle" > -->
    <div id="play_center">
      <mt-swipe :auto="0" :showIndicators='false'>
        <mt-swipe-item>
            <img :src="playItem.pic_big" alt="" v-show="playItem.pic_big!==undefined" :class="{roll:rollBol}">
          <p>{{playItem.title}}</p>
          <p id='lrc'>{{showLrc}}</p>
          <!-- <p>{{playItem.author}}</p> -->
        </mt-swipe-item>
        <mt-swipe-item>
          <div id="box" >
               <p v-for="(item,index) in songLrc" :key="item.id" :style="{top: up + 'px'}" v-show="item.length>0">{{item}}</p>
          </div>
        </mt-swipe-item>
      </mt-swipe>
    </div>
    <div id="play_bottom">
        <span class="iconfont  span_5" @click="stop"><img src="./play.png" alt=""></span>
      <div id="bottom_top">
        <button @click='loop()'><span class="iconfont icon-loop2"></span></button>
        <button @click="changeLeft()"><span class="iconfont icon-Next"></span></button>
        <button @click="changeRight()"><span class="iconfont icon-play_next"></span></button>
        <button ><span class="iconfont icon-xihuan"></span></button>
      </div>
    </div>
    <div id="audioShow">
        <p id="start">{{this.updateTime.updateTime}}</p>
      <input type="range" id="range" :max='this.totalTm.toTm' :value='this.updateTime.upTime' @change='drag()'>
        <p id="end">{{this.totalTm.totalTm}}</p>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      up: 20,
      rollBol: true
    }
  },
  computed: {
    /* eslint-disable */
    // 当前播放的歌曲
    playItem () {
      if(this.$store.state.playItem === undefined){
        this.$router.push('/music/recommend')
      } else {
        var value = this.$store.state.playItem
        if (value.title.versions === '') {
          return this.$store.state.playItem
          } else if (value.title.versions === undefined) {
          value.title = value.title.replace(/\<[^\>]+\>/g,"")
          value.author = value.author.replace(/\<[^\>]+\>/g,"")
          return value
        }
      }
    },
    // 当前播放的歌曲ID
    playID () {
      return this.$store.state.playID
    },
    // 截取的歌词
    songLrc () {
      return this.$store.state.songLrc
    },
    // 截取的歌曲时间
    songTime () {
      return this.$store.state.songTime
    },
    // 当前歌曲的播放链接
    playSong () {
      return this.$store.state.playURL
    },
    // 渲染的歌词
    showLrc () {
      if (this.$store.state.songTime !== undefined) {
        for (let i = 0; i < this.$store.state.songTime.length; i++) {
          if (this.updateTime.upTime === parseInt(this.songTime[i])) {
            this.up = this.up - 7
            this.$store.state.Lrc_show = this.songLrc[i + 1]
            break
          } else {
            this.up = this.up
          }
        }
        return this.$store.state.Lrc_show
      } else {
        return '未找到歌词'
      }
    },
    // 歌曲总时间
    totalTm () {
      /* eslint-disable */
      var toTm = this.$store.state.totalTm
      var totalTm = this.$store.state.totalTm
      var hour = Math.floor(totalTm / 3600)
      var other = totalTm % 3600
      var minute = Math.floor(other / 60)
      var second = (other % 60).toFixed(2)
      totalTm = (minute < 10 ? '0' + minute : minute) + ':' + (second < 10 ? '0' + second : second)
      var obj2 = {toTm: toTm, totalTm: totalTm}
      return obj2
    },
    // 歌曲实时时间
    updateTime () {
      /* eslint-disable */
      var upTime =parseInt(this.$store.state.updateTime)
      var updateTime = this.$store.state.updateTime
      var hour = Math.floor(updateTime / 3600)
      var other = updateTime % 3600
      var minute = Math.floor(other / 60)
      var second = parseInt(other % 60)
      updateTime = (minute < 10 ? '0' + minute : minute) + ':' + (second < 10 ? '0' + second : second)
      // console.log(upTime,this.songTime)
      var obj = {upTime: upTime,updateTime:updateTime}
      return obj
    }
  },
  methods: {
    goback () {
      this.$router.go(-1)
    },
    // 暂停播放
    stop () {
      var audio = document.querySelector('#audio')
      console.log('停止播放')
      if (this.playState) {
        audio.play()
        this.rollBol = true
        this.playState = false
      } else {
        audio.pause()
        this.playState = true
        this.rollBol = false
      }
    },
    // 切换ID
    changeRight () {
      this.rollBol = true
      this.up = 5
      this.$store.dispatch('changeRight', this.playItem)
      this.$store.dispatch('getSongLrc', this.playItem)
    },
    changeLeft () {
      this.rollBol = true
      this.up = 5
      this.$store.dispatch('changeLeft', this.playItem)
      this.$store.dispatch('getSongLrc', this.playItem)
    },
    // 静音
    mute () {
      audio.muted = !audio.muted
      this.$tos({
        message: '操作成功',
        duration: 2000,
        position: 'top'
      })
    },
    // 拖动歌曲播放相应时间歌曲
    drag () {
      var audio = document.querySelector('#audio')
      var range = document.querySelector('#range')
      var time = parseInt(range.value)
      audio.currentTime = time
      audio.play()
    },
    // 循环重新播放
    loop () {
      var audio = document.querySelector('#audio')
      audio.currentTime = 0
      this.$tos({
        message: '重新播放',
        duration: 2000,
        position: 'bottom'
      })
      audio.play()
    },
    // 下载提示
    downHint () {
      this.$idc.open({
        text: '下载中...',
        spinnerType: 'fading-circle'
      })
      setTimeout(() => {
        this.$idc.close();
      }, 2000);
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
}
#bg{
  /* width: 100%;
  height: 100%;
  z-index: -100; */
}
#bg img{
  width: 150%;
  height: 100%;
  position: absolute;
  z-index: -1;
  filter: blur(4px);
  max-width: 150%;
}
#add{
  font-size: 40px;
  margin-top:-.2rem;
  margin-left:.7rem;
}
#box1{
  margin-top:-1rem;
  width: 60px;
  height: 70px;
  color: #fff;
  font-size: 16px
}
#box{
  margin-top:-1rem;
  width: 60px;
  height: 70px;
  color: #fff;
  font-size: 18px;
  background: rgba(0,0,0,.1)
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
  margin:1rem 2rem 0 1rem;
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
  width: 100%;
  height: 55%;
  margin: 10% 0;
  font-size: 16px;
  line-height: 3rem;
}
#play_center #box{
  width: 100%;
  height: 100%;
  text-align: center;
  overflow: scroll;
}
#play_center #box p{
  position: relative;
}
#needle{
  width: 20%;
  position: absolute;
  top: 6rem;
  right: 1.3rem;
  transform: rotateZ(90deg);
}
#play_center img:nth-of-type(1){
  width: 50%;
  margin: 12% 0 14% 25%;
  border-radius: 50%;
  box-shadow: 0 0 20px 6px #fff;
}
.roll{
  animation: roll 40s infinite linear
}
#play_center p{
  text-align: center;
}
#play_center p:nth-of-type(1){
  font-size: 18px;
  color:#fff;
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
  color:#E6C383;
  border: none;
  
}
#play_bottom button:nth-of-type(2){
  margin-right: 11.5rem;
}
#play_bottom button span{
  width:4rem;
  height: 4rem;
  line-height: 4rem;
  display: block;
  font-size: 25px;
  font-weight: bold;
  color: #E6C383;
  box-shadow: 0 0 10px 1px #333,inset 0 0 10px 2px #ccc;
  border-radius: 50%;
}
#play_bottom button span::before{
  border-radius: 50%;
}
#bottom_top{
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-start;
  align-items: flex-end;
  position: absolute;
  bottom: 2rem;
  text-align: center;
  width: 100%;
  /* box-shadow: 0px 0px 30px 2px #E6C383; */
  padding-left: 1.5rem;
}
#play_bottom .span_5{
  position: absolute;
  top: 2rem;
  z-index: 15;  
  border-radius: 50%;
  box-shadow:inset 0 0 20px 5px #ccc;
}
#play_bottom .span_5 img{
  width: 70px;
  height: 70px;
}
.mint-swipe{
  width: 100%;
  height:100%;
}
#off{
  font-size: 30px;
  margin-top: 10%;
}
#audioShow{
  width: 100%;
  height: 5%;
  position: absolute;
  top: 70%; 
  left:2.5%;
}
#end{
  position: absolute;
  top:0;
  right: 10%;
}
input[type="range"]{
  box-shadow:  0 0 30px  5px #E6C383;
  width: 95%;
  height:10px;
  appearance: none;
  border-radius: 10px;
  background: rgba(0,0,0,.8);
}
input[type="range"]::-webkit-slider-tack{
  box-shadow: 0 1px 1px #000, inset 0 .125em .125em #E6C383;
}
input[type='range']::-webkit-slider-thumb{
  appearance: none;
  width:25px;
  height:25px;
  border-radius: 10px;
  margin-top: -2px; /*使滑块超出轨道部分的偏移量相等*/
  background: #fff; 
  border-radius: 50%; /*外观设置为圆形*/
  border: solid 0.125em rgba(230, 195, 131, 0.5); /*设置边框*/
  box-shadow: 0 .125em .125em #3b4547; /*添加底部阴影*/
}
#lrc{
  animation: dh 4s infinite alternate;
  font-size: 18px;
}
@keyframes dh {
  0%{
    opacity: .9;
    color: #764D48;
  }
  100%{
    opacity: 1;
    color: #E6C383
  }
}
@keyframes roll {
  0%{
    transform: rotateZ(0deg)
  }
  100%{
    transform: rotateZ(360deg)
  }
}

#down{
  color:#fff;
}
#down:hover{
  color:#E6C383;
  box-shadow: 0 0 20px 2px #E6C383;
}
</style>
