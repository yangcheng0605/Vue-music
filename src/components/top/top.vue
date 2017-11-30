<template>
  <div id="top">
    <md-toolbar id="top_top">
      <md-button class="md-icon-button" @click="toggleLeftSidenav">
        <md-icon >menu</md-icon>
      </md-button>
      <h3 id="h3"> <span>V</span> ue音乐</h3>
      <marquee style="display:inline-block;width:50%">
        <span id="playhint" v-show="this.playsong.song_id !== undefined" @click="goplay">正在播放：{{playsong.title}}…</span>
      </marquee>
      <router-link to="/search">
        <p class="iconfont icon-search searchIcon"></p>
      </router-link>
    </md-toolbar>
    
    <md-sidenav id="zi" :class="{zi2:zBol,zi3:!zBol}" class="md-left" ref="leftSidenav" @open="open('Left')" @close="close('Left')">
      <md-toolbar class="md-large">
        <div class="md-toolbar-container">
          <h3 class="md-title">个人信息</h3>
        </div>
        <md-avatar class="md-large md-d1" >
          <div id="userIcon" v-if="this.userLogin === false">
            <p class="loging">未登录账号</p>
            <p><span @click="gotoLogin"> 登录</span> <span @click="gotoRegister">注册</span></p>
          </div>
          <div id="userIcon" v-if="this.userLogin === true">
            <img :src="userMsg[0].headimg" alt="People">
            <p class="md-body-2">{{userMsg[0].name}}<span class="iconfont icon-vip"></span></p>
          </div>
        </md-avatar>
      </md-toolbar>
      <div id="center" >
        <md-list >
      <md-list-item :class="{'md-primary':listBol === 'files'}" @click="listBol ='files' ">
        <md-ink-ripple />
        <md-icon>insert_drive_file</md-icon> <span>My files</span>
      </md-list-item>

      <md-list-item :class="{'md-primary':listBol === 'people'}" @click="listBol ='people' ">
        <md-ink-ripple />
        <md-icon>people</md-icon> <span>Shared with me</span>
      </md-list-item>

      <md-list-item :class="{'md-primary':listBol === 'time'}" @click="listBol ='time' ">
        <md-ink-ripple />
        <md-icon>access_time</md-icon> <span>Recent</span>
      </md-list-item>

      <md-list-item :class="{'md-primary':listBol === 'start'}" @click="listBol ='start' ">
        <md-ink-ripple />
        <md-icon>start</md-icon> <span>Starred</span>
      </md-list-item>

      <md-list-item :class="{'md-primary':listBol === 'delete'}" @click="listBol ='delete' ">
        <md-ink-ripple />
        <md-icon>delete</md-icon> <span>Trash</span>
      </md-list-item>
    </md-list>
      </div>
      <div id="bottom">
        <md-speed-dial md-open="hover" md-direction="right" class="md-fab-bottom-left" >
          <md-button class="md-fab md-primary" md-fab-trigger>
            <md-icon >add</md-icon>
            <md-icon>add</md-icon>
          </md-button>

          <md-button class="md-fab md-primary md-mini md-clean">
            <md-icon>note_add</md-icon>
          </md-button>

          <md-button class="md-fab md-primary md-mini md-clean">
            <md-icon>share</md-icon>
          </md-button>
       </md-speed-dial>
      </div>
    </md-sidenav>
  </div>
</template>
<script>
export default {
  data () {
    return {
      zBol: false,
      listBol: 'files'
    }
  },
  methods: {
    toggleLeftSidenav () {
      this.$refs.leftSidenav.toggle()
    },
    open (ref) {
      console.log('Opened: ' + ref)
      this.zBol = true
      console.log(this.userMsg)
      if (this.user === false) {
        this.$msg('您还未登陆账号!', '请点左上方登陆按钮进行登录')
      }
    },
    close (ref) {
      console.log('关闭d: ' + ref)
      this.zBol = false
    },
    goplay () {
      this.$router.push('/play')
    },
    gotoLogin () {
      this.$router.push('/login')
    },
    gotoRegister () {
      this.$router.push('/register')
    }
  },
  computed: {
    playsong () {
      return this.$store.state.playItem
    },
    userLogin () {
      return this.$store.state.userLogin
    },
    user () {
      return this.$store.state.userLogin
    },
    userMsg () {
      return this.$store.state.userMsg
    }
  }
}
</script>
<style scoped>
.md-title{
  border-bottom: 1px solid #ccc;
}
.md-large{
  width: 100%;
  margin: 0;
}
.md-d1{
  height: 50%;
}
#h3{
  font-weight: 400;
  margin-left: 1rem;
  margin-right: 1rem;
}
#h3 span {
  position: absolute;
  top: 1rem;
  left:4.2rem;
  font-size: 25px;
  margin-left: 1rem;
}
.md-large img{
  width: 25%;
  display: inline-block;
  margin-right: 20%;
}
#userIcon{
  position: relative;
  top:.2em;
  left: 2em;
}
.icon-vip{
  color: gold;
  margin-left: 3%;
}
#bottom{
  position: absolute;
  bottom:0;
}
#top_top{
  width: 100%;
  position: fixed;
  top:0;
  z-index: 10;
}
#zi{
  width: 100%;
  height: 100%;
  position: fixed;
  top:0;
}
#i{
  /* margin-left: 17rem; */
  font-size: 27px;
  color: #fff;
}
#playhint{
  color: #fff;
}
.searchIcon{
  color:#fff;
  font-size: 22px;
  width: 12%;
  height: 80%;
  position: absolute;
  top: 0;
  right: 1rem;
  padding-top:1rem;
  padding-left: 1rem;
}
.loging{
  font-size: 16px;
  color:#aaa;
  text-decoration: underline;
  padding-left: 2.5rem;
}
.md-toolbar{
  min-height:45px;
}
#userIcon p:nth-of-type(2){
  margin-top: 10px;
  font-size: 16px;
  color: #fff;
}
#userIcon span{
  border: 1px  solid  #ccc;
  padding: 0 1rem;
}
#userIcon span:nth-of-type(2){
  margin-left:1.5rem;
}
#userIcon span:hover{
  background: rgba(0,0,0,.5);
}
.zi2{
  z-index: 10;
}
.zi3{
  z-index: -1;
}
</style>


