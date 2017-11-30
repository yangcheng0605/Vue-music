<template>
  <div class="register">
    <div id="box">
      <img src="./1.jpg" alt="">
      <div id="top">
        <div id="chevron_left" @click="goback">
            <md-icon id="i" >chevron_left</md-icon>
        </div>
      </div>
      <div id="center">
        <div class="phone">
          <table>
            <thead>
              <tr><td><img src="./user.png" alt=""></td></tr>
            </thead>
            <tbody>
              <tr>
                <td><span :class="{action:this.hint}">请输入手机号</span><input class="num" type="number" v-model="numValue" @focus="hint = true" @blur="leaveP"></td>
              </tr>
              <tr>
                <td><span :class="{action:this.hint2}">请输入名称:</span><input class="name" type="text" v-model="userName" @focus="hint2 = true" @blur="leaveN"></td>
              </tr>
              <tr>
                <td><p class="registering" @click='saveMsg'>register</p></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      numValue: '',
      userName: '',
      hint: false,
      hint2: false
    }
  },
  methods: {
    goback () {
      this.$router.go(-1)
    },
    leaveP () {
      if (this.numValue === '') {
        this.hint = false
      } else this.hint = true
    },
    leaveN () {
      if (this.numValue === '') {
        this.hint2 = false
      } else this.hint2 = true
    },
    saveMsg () {
      if (this.numValue === '') {
        this.$msg('您还没填写手机号')
      } else if (this.userName === '') {
        this.$msg('您还没填写名称')
      } else {
        var rag = /^1[3578]\d{9}$/g
        if (!rag.test(this.numValue)) {
          this.$msg('手机号格式不正确！')
        } else {
          var obj = {numValue: this.numValue, userName: this.userName}
          this.$store.dispatch('saveMsg', obj)
          .then(res => {
            this.$msg({
              title: '提示',
              message: res.msg
            })
          })
          .then(res => {
            if (this.$store.state.userLogin === true) {
              this.$router.push('/head')
            }
          })
        }
      }
    }
  }
}
</script>
<style scoped>
.register{
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  color: #fff;
}
#box{
  width: 100%;
  height: 100%;
  background: rgba(255,255,255,.2);
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
}
#box>img{
  position: absolute;
  z-index: -1;
  width: 100%;
  height: 100%;
  filter:blur(3px)
}
#chevron_left{
  float: left;
}
#i{
  margin: 0;
  background: rgba(0,0,0,.1);
  border-radius: 50%;
  margin:1rem 2rem 0 1rem;
  width: 30px;
  height: 30px;
  color:#fff;
}
#top{
  width: 100%;
  height: 10%;
  margin-bottom: 10%;
}
#center{
  width: 80%;
  height: 63%;
  line-height: 4rem;
  margin-left: 10%;
  padding-left: 8%;
  background: rgba(0, 0, 0, .1);
  border-radius: 1rem;
}
#center .num,.name{
  width: 20rem;
  height: 2rem;
  border:none;
  text-indent: 1rem;
  background: rgba(0, 0, 0, .3);
  outline: none;
  border-radius: 5px;
  color:#fff;
}
#center .phone td>span{
  color: #eee;
  position: absolute;
  margin-left: 1rem;
}
#center .phone .action{
  animation: dh2 .5s forwards alternate;
}
.phone table thead {
  text-align:center;
}
.phone table thead img{
  width:100px;
  height:100px;
  margin:1.5rem 0;
}
input::-webkit-input-placeholder{
  color: #ddd;
}
#center .registering{
  border-radius: 2rem;
  margin-top: 2rem;
  text-align: center;
  width: 100%;
  height:3rem;
  line-height: 3rem;
  background: rgba(0, 0, 0, .3); 
}
@keyframes dh2 {
  0%{
    font-size: 14px;
    transform: translateX(0px) translateY(0px)
  }
  100%{
    font-size: 12px;
    opacity: .8;
    color:#fff;
    transform: translateX(-5px) translateY(-25px)
  }
}

</style>
