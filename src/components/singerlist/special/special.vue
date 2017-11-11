<template>
  <div id="specialbox">
      <ul>
          <li v-for="(item,index) in special" :key="item.id" :class="{active:songslistIndex === index}" @click="choose(item,index)" v-show="special !== ''" :style="{backgroundImage: 'url(' + item.pic_small + ')', backgroundSize:'100% 100%'}">
            <p>{{item.title}}</p>
          </li>
          <li id="li2" v-show="special === ''" >
            <span>抱歉！未找到专辑...</span>
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
    special () {
      return this.$store.state.singerSpecial.albumlist
    }
  },
  methods: {
    choose (item, index) {
      console.log(item, index)
    }
  }
}
</script>
<style scoped>
#specialbox{
  width: 100%;
  height: 100%;
  background: #333;
}

#specialbox ul{
  width: 100%;
  height: 100%;
  color: #fff;
  overflow: scroll;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-around;
}
#specialbox ul li {
  width: 30%;
  height: 30%;
  margin-top: 0;
  background: #fff;
  margin-bottom: 2rem;
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-end;
}
#specialbox ul li p{
  background:rgba(0,0,0,.5);
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
  -webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
  -webkit-line-clamp: 2; /** 显示的行数 **/
}
#specialbox ul #li2{
  width: 100%;
  height: 100%;
  font-size: 18px;
  background: #333;
  color: #fff;
}
#specialbox ul #li2 span{
  position: absolute;
  top: 40%;
  left: 30%;
}
#specialbox .active{
  background: #000;
  color: #fff;
}
</style>
