<template>
  <div>
    <div id="singer">
      <div id="singer_classify">
        <ul>
          <li  v-for="(item,index) in arr" :class="{active: cityIndex === index}" :key="item.id" @click="changeClassify(item,index)">{{item.name}}</li>
        </ul>
        <ul>
          <li v-for="(item,index) in arr2" :class="{active: sexIndex === index}" :key="item.id" @click="changeSex(item,index)">{{item.name}}</li>
        </ul>
      </div>
      <div id="singer_list">
        <div>
         <h3>歌手列表</h3>
        </div>
        <mt-index-list id="nl" v-for="(item,index) in sortsinger" :key="item.id" >
          <mt-index-section   :index='item.firstchar'>
            <p @click="getsingerMsg(item)"  id="content" :title='item.firstchar'><img :src="item.avatar_small" alt="">
            
            <span @click="getsingerMsg(item)" :title='item.firstchar'>{{item.name}}</span>
            </p>
          </mt-index-section>
         </mt-index-list>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      arr: [
        {name: '全部', classify: '全部'},
        {name: '大陆', classify: '中国'},
        {name: '香港', classify: '香港'},
        {name: '台湾', classify: '台湾'},
        {name: '日韩', classify: '韩国'},
        {name: '欧美', classify: 'else'}
      ],
      arr2: [
        {name: '全部', classify: '全部'},
        {name: '男', classify: '0'},
        {name: '女', classify: '1'},
        {name: '组合', classify: '2'}
      ],
      city: '全部',
      sex: '全部',
      cityIndex: 0,
      sexIndex: 0
    }
  },
  computed: {
    singer () {
      var singer = this.$store.state.singer
      return singer.sort((a, b) => {
        if (a['firstchar'] > b['firstchar']) {
          return 1
        } else {
          return -1
        }
      })
    },
    sortsinger () {
      let singer = []
      let singer2 = []
      if (this.city === '全部') {
        singer2 = this.singer
      } else if (this.city !== '全部' && this.city !== 'else') {
        singer2 = this.singer.filter(item => this.city === item.country)
      } else {
        singer2 = this.singer.filter(item => item.country !== '中国' && item.country !== '香港' && item.country !== '台湾' && item.country !== '韩国')
      }
      if (this.sex === '全部') {
        singer = singer2
      } else if (this.sex !== '全部') {
        singer = singer2.filter(item => this.sex === item.gender)
      }
      return singer
    }
  },
  methods: {
    getsingerMsg (item) {
      this.$store.dispatch('getsingerMsg', item)
      .then(res => {
        this.$router.push('/singlist')
      })
    },
    changeClassify (item, index) {
      this.cityIndex = index
      this.city = item.classify
    },
    changeSex (item, index) {
      this.sexIndex = index
      this.sex = item.classify
    }
  }
}
</script>
<style scoped>
#singer{
  width: 100%;
  height: 100%;
  margin-top:3.7rem;
}
#singer_classify{
  position: fixed;
  width: 100%;
  z-index: 1;
  background: rgba(255,255,255,.95);
  padding-bottom: 1rem;
  border-bottom: 1px solid brown;
}
#singer_classify ul{
  width: 100%;
  display: flex;
  flex-flow: row ;
  justify-content: space-around;
  align-items: flex-start;
  margin-top: .7rem;
}
#singer_classify ul:nth-of-type(1) li{
  margin-top: 0;
  width: 16.7%;
  height:3rem;
  line-height: 3rem;
  text-align: center;
  border-bottom: 3px solid #795548;
  border-radius: 20px 10px;
}
h3{
  font-weight:500;
  margin-bottom: .5rem;
}
#singer_classify ul:nth-of-type(2) li{
  margin-top: 0;
  width: 25%;
  height: 2.5rem;
  line-height: 2.5rem;
  text-align: center;
  border-bottom: 3px solid #795548;
  border-radius: 20px 5px;
}
#singer_classify ul:nth-of-type(2){
  width: 65%;
}
.active{
  background:#795548;
  color: #fff;
}
#singer_list{
  padding-top: 9rem;
  padding-bottom: 5rem;
  width: 100%;
  height: 100%;
  overflow-y: scroll !important;
}
#singer_list li{
  border-bottom: 1px solid #ddd;
}
#nl >>>.mint-indexsection-index{
  padding: 0;
  padding-left: 1rem;
}
#nl >>> .mint-indexlist-content{
  overflow-y: scroll;
  width: 100%;
  height: 100% !important;
}
#content{
  margin:0 2rem 0;
}
</style>
