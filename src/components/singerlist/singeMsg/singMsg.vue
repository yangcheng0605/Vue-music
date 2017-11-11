<template>
  <div id="singMsgbox">
     <div id="smallbox">
       <h2>{{singMsg.name}}</h2>
       <span class="s2">{{singMsg.birth}}</span><span id="s1">收藏: <span>{{singMsg.listen_num}}</span> </span>
       <h4>{{singMsg.company}} </h4>
       <p>
         星座:<span class="s2">{{singMsg.constellation}}</span>
         <span>身高:<span class="s2">{{singMsg.stature}}/cm</span></span>
       </p>
       <p>歌曲:<span class="s2">{{singMsg.songs_total}}</span></p>
       <p>专辑:<span class="s2">{{singMsg.albums_total}}</span></p>
     </div>
     <div id="intro">
       <h3>歌手简介：</h3>
        
       <article  :class="{msg:msgBol}">{{singMsg.intro}} 
      </article>
      <strong class="s2" v-show="msgBol === true" @click="msgBol = false">详情>></strong>
      <strong class="s2" v-show="msgBol === false" @click="msgBol = true">收起>></strong>
     </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      msgBol: true
    }
  },
  computed: {
    singMsg () {
      return this.$store.state.singMsg
    }
  },
  methods: {
  }
}
</script>
<style scoped>
#singMsgbox{
  width: 100%;
  height: 100%;
}
#smallbox,article{
  width: 90%;
  color: #fff;
  margin: 5% auto;
  line-height: 2.5rem;
}
#smallbox #s1{
  margin-left: 35%;
}
#smallbox #s1 span,.s2{
  margin-left: 2%;
  color: gold;
  font-size: 16px;
}
#smallbox span {
  margin-left: 1%;
}
.msg{
  overflow: hidden;
  text-overflow: ellipsis;
  display:-webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 7
}
#intro {
  color: #fff;
}
#intro h3{
  margin-left: 1rem;
}
article{
  position: relative;
  line-height: 2rem;
  text-indent: 2rem;
}
strong{
  position: relative;
  top: -5%;
  left: 3%;
  cursor: pointer;
  text-decoration: underline;
  padding-bottom: 2rem;
}
</style>
