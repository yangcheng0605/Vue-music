<template>
  <div id="listbox">
    <ul>
        <li v-for="(item,index) in singlist" :key="item.id" :class="{active:songslistIndex === index}" @click="getItem(item,index)">
          <span>{{index}}</span><span>{{item.title}}</span>
        </li>
    </ul>
  </div>
</template>
<script>
export default {
  data () {
    return {
      songslistIndex: 0
    }
  },
  computed: {
    singlist () {
      return this.$store.state.singerlist
    }
  },
  methods: {
    getItem (item, index) {
      this.songslistIndex = index
      console.log(item)
      if (item !== this.playItem) {
        this.$store.dispatch('getItem', item)
        .then(res => {
          this.$store.dispatch('getSongLrc', item)
        })
        .then(res => {
          this.$router.push('/play')
        })
      }
    }
  }
}
</script>
<style scoped>
#listbox{
  width: 100%;
  height: 100%;
}
#listbox ul{
  background: #000;
}
#listbox ul li{
  margin-top: 0;
  width: 100%;
  height: 4rem;
  color: #eee;
  background: #222;
  border-bottom: 1px solid #fff;
}
#listbox li span:nth-of-type(1){
  float: left;  
  padding:1rem 2rem 0;
}
#listbox li span:nth-of-type(2){
  line-height: 3rem;
  display: inline-block;
  width: 70%;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}

#singerMsg_hint span{
  float: right;
}
#listbox .active{
  background: #fff;
  color: #000;
}
</style>
