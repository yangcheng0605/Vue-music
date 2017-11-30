<template>
  <div class="search">
    <div id="search_top"  @click="goback">
      <md-icon id="i">chevron_left</md-icon>
      <!-- <md-icon>search</md-icon> -->
    </div>
    
      <div id="search_box">
        <p :class="{hintStyle:hint}" id="search_hint">请输入要搜索的歌曲、歌手</p>
        <input type="search" v-model="songName" @input="bindsearch" @focus="hintF" @blur="hintB">
      </div>
      <div id="search_list">
        <ul>
          <li v-for="(item,index) in searchList" :key="(item.id)" v-show="songName !== ''" >
            <span>{{index}}.</span>
            <div id="songIF" @click="getItem(item)">
              <p>{{item.title.replace(/\<[^\>]+\>/g,"")}} <span class="iconfont icon-sq icon"></span></p>
              <p>{{item.author.replace(/<[^\>]+\>/g,"")}}</p>
            </div>
            <!-- <span  class="iconfont play icon-play" v-show='parseInt(item.resource_type) === 0' @click="play(item)"></span> -->
            <!-- <span class="spanBG" v-show='parseInt(item.resource_type) !== 0' @click="stop"></span> -->
            <span class="iconfont play " :class="{'icon-play':parseInt(item.resource_type) === 0,spanBG:parseInt(item.resource_type) !== 0}" @click="play_stop(item)"></span>
          </li>
          <p v-show="songName === ''" id='null'>
            未输入任何查找条件！
          </p>
        </ul>
      </div>
  </div>
</template>
<script>
import jsonp from 'jsonp'
export default {
  created () {
  },
  data () {
    return {
      songName: '',
      hint: false,
      searchList: [],
      isPlaying: false
    }
  },
  methods: {
    goback () {
      this.$router.go(-1)
    },
    hintF () {
      this.hint = true
    },
    hintB () {
      var arr = []
      if (this.songName === '') {
        this.hint = false
      } else {
        for (let i = 0; i < this.searchList.length; i++) {
          arr.push(this.searchList[i].song_id)
        }
        var obj = {arr: arr, search: this.searchList}
        this.$store.dispatch('getSearchId', obj)
      }
    },
    // 获取搜索列表
    bindsearch (e) {
      var key = e.target.value
      var searchAPI = `http://tingapi.ting.baidu.com/v1/restserver/ting?method=baidu.ting.search.common&format=json&query=${key}&page_no=1&page_size=20`
      jsonp(searchAPI, (err, data) => {
        if (!err) {
          console.log(data)
          this.searchList = data.song_list
        }
      })
    },
    // 获取选中的歌曲对象
    getItem (item) {
      var index = this.searchList.indexOf(item)
      this.searchList[index].resource_type = this.searchList[index].resource_type === 0 ? 1 : 0
      for (var i = 0; i < this.searchList.length; i++) {
        if (index === i) {
          continue
        }
        this.searchList[i].resource_type = 0
      }
      if (item !== this.playItem) {
        this.$store.dispatch('getItem', item)
        .then(res => {
          this.$store.dispatch('getSongLrc', item)
        })
      }
      this.$router.push('/play')
    },
    // 暂停播放
    play_stop (item) {
      console.log(item)
      var audio = document.querySelector('#audio')
      var index = this.searchList.indexOf(item)
      this.searchList[index].resource_type = this.searchList[index].resource_type === 0 ? 1 : 0
      for (var i = 0; i < this.searchList.length; i++) {
        if (index === i) {
          continue
        }
        this.searchList[i].resource_type = 0
      }
      if (this.playItem !== undefined) {
        if (item.song_id === this.playItem.song_id) {
          if (this.isPlaying) {
            audio.play()
            this.isPlaying = false
          } else {
            audio.pause()
            this.isPlaying = true
          }
        } else {
          this.searchList[index].resource_type = 1
          this.$store.dispatch('getItem', item)
        }
      }
    }
  },
  computed: {
    playItem () {
      return this.$store.state.playItem
    }
  }
}
</script>
<style scoped>
.search{
  width: 100%;
  height: 100%;
  background: url('./bg.png') 0 0 no-repeat;
  background-size: 100% 100%;
  color:rgba(255,255,255,.8);
  position: fixed;
}
#search_top{
  width: 25%;
  height: 10%;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
}
#i{
  width: 50%;
  padding-left: 1rem;
  position: relative;
  font-size: 40px;
  margin-right: 25rem;
}
#search_box{
  width: 60%;
  margin: 10% auto 0;
  border-bottom: 1px solid #eee;
  /* box-shadow: 10px 0 5px 10px #ccc; */
  margin-bottom: 1%;
}
#search_box #search_hint{
  font-size: 14px;
  position: relative;
  top: 2.1rem;
  left: 1.5rem;
  z-index: -1;
}
input[type='search']{
  width: 100%;
  height: 30px;
  background: transparent;
  border:none;
  outline: none;
  color: #ddd;
  font-size: 14px;
  text-indent: 1.5rem;
}
/* #search_box:hover{
} */
.hintStyle{
  animation: dh2 .5s forwards alternate
}
@keyframes dh2 {
  0%{
    font-size: 14px;
    transform: translateX(0px) translateY(0px)
  }
  100%{
    font-size: 12px;
    opacity: .5;
    transform: translateX(-10px) translateY(-20px)
  }
}
#search_list{
  width: 100%;
  height: 79%;
  background: rgba(255,255,255,.3);
  overflow: scroll;
  padding-bottom: 2rem;
}
#search_list li{
  height: 4rem;
  border-top: 1px solid teal;
  display: flex;
  flex-flow: row;
  align-items: flex-end;
  position: relative;
}
#search_list li:hover{
  border-left: 6px solid #fff;
  border-right: 6px solid #fff;
  /* box-shadow:inset 0 0 50px 5px teal */
}
#search_list li span:nth-of-type(1){
  margin: 1.5rem 1.5rem 0;
  font-size: 18px;
}
#search_list span:nth-of-type(1){
  position: absolute;
  top: 0;
}
#null{
  font-size:18px;
  text-align: center;
  margin-top: 7rem;
}
#songIF{
  width: 65%;
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  margin-left: 5rem;
  white-space: nowrap;
  overflow: hidden;
}
#songIF p:nth-of-type(1){
  font-size: 14px;
  position: relative;
}
#songIF p:nth-of-type(2){
  font-size: 12px;
}
#songIF p:nth-of-type(1) .icon{
  position: absolute;
  top:0rem;
  color:gold;
  margin: 0 0 0 1rem;
}
.play{
  width: 15%;
  height: 100%;
  color:greenyellow;
  position: relative;
  font-size: 18px;
  right: -2rem;
  padding-top: 1.5rem;
}
.spanBG{
  width: 10%;
  height: 100%;
  position: relative;
  right: -2rem;
  background:url('./play.gif') 0 1rem no-repeat;
  background-size: 50%,50%;
}
#search_right span{
  font-size: 20px;
  color: greenyellow;
}
</style>
