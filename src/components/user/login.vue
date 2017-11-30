<template>
  <div class="login">
    <div id="box">
      <img src="./1.jpg" alt="">
      <div id="top">
        <div id="chevron_left" @click="goback">
            <md-icon id="i" >chevron_left</md-icon>
        </div>
      </div>
      <div id="center">
        <div class="phone" v-if="loginWay === 'phone'">
          <table>
            <thead>
              <tr><td><img src="./user.png" alt=""></td></tr>
            </thead>
            <tbody>
              <tr>
                <td><span :class="{action:this.hint}">请输入手机号</span><input class="num" type="number" v-model="numValue" @focus="hintN" @blur="leaveN"></td>
              </tr>
              <tr>
                <td><span :class="{action:this.hint2}">请输入验证码</span><input class="yanzhengma" type="text" @focus="showYzm" @blur="leaveY" v-model="yzmValues"><span class="yzm" @click="showYzm">{{this.yzm}}</span></td> 
              </tr>
              <tr>
                <td><p class="loging" @click='phoneLogin'>login</p></td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="phone" v-if="loginWay === 'user'">
          <table>
            <thead>
              <tr><td><img src="./user.png" alt=""></td></tr>
            </thead>
            <tbody>
              <tr>
                <td><span :class="{action:this.hint}">请输入账号:</span><input class="num" type="text" v-model="userValue" @focus="hintN" @blur="leaveN"></td>
              </tr>
              <tr>
                <td><span :class="{action:this.hint3}">请输入密码:</span><input class="pwd" type="pwd"   v-model="pwdValues"></td> 
              </tr>
              <tr>
                <td><span :class="{action:this.hint2}">请输入验证码</span><input class="yanzhengma" type="text" @focus="showYzm" @blur="leaveY" v-model="yzmValues"><span class="yzm" @click="showYzm">{{this.yzm}}</span></td> 
              </tr>
              <tr>
                <td><p class="loging">login</p></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div id="bottom">
        <button :class="{active:loginWay === 'phone'}" @click="loginWay = 'phone'">手机快捷登录</button>
        <button :class="{active:loginWay === 'user'}" @click="loginWay = 'user'">账号面登录</button>
        <button :class="{active:loginWay === 'register'}" @click="gotoRJ">注册</button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  created () {
  },
  data () {
    return {
      yzm: '...',
      // 手机号
      numValue: '',
      // 验证码
      yzmValues: '',
      // 用户名
      userValue: '',
      // 用户密码
      pwdValues: '',
      // 登录方式
      loginWay: 'phone',
      // 控制条件
      hint: false,
      hint2: false,
      hint3: false
    }
  },
  methods: {
    goback () {
      this.$router.go(-1)
    },
    hintN () {
      this.hint = true
    },
    leaveN () {
      if (this.numValue === '') {
        this.hint = false
      } else this.hint = true
    },
    showYzm () {
      this.hint2 = true
      var arr = 'abcdefghigklmn0123456789'
      var arr2 = ''
      for (var i = 0; i < 4; i++) {
        var index = parseInt(Math.random() * arr.length)
        arr2 += arr[index]
      }
      this.yzm = arr2
      console.log(this.yzm)
    },
    leaveY () {
      if (this.yzmValues === '') {
        this.hint2 = false
      } else this.hint2 = true
    },
    gotoRJ () {
      this.$router.push('/register')
    },
    phoneLogin () {
      console.log(11111)
      for (var i = 0; i < this.userMsg.length; i++) {
        if (this.numValue === this.userMsg[i].phone) {
          if (this.yzmValues === this.yzm) {
            this.$msg('提示', '登录成功')
            this.$store.state.userLogin = true
          } else {
            this.$msg('提示', '验证码不匹配')
          }
        } else {
          this.$store.state.userLogin = false
          this.$msg('提示', '改手机号未注册')
        }
      }
      if (this.$store.state.userLogin === true) {
        this.$router.push('/head')
      }
    }
  },
  computed: {
    userMsg () {
      console.log(this.$store.state.userMsg)
      return this.$store.state.userMsg
    }
  }
}
</script>
<style scoped>
.login{
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
#center .num,.yanzhengma,.pwd{
  width: 20rem;
  height: 2rem;
  border:none;
  text-indent: 1rem;
  background: rgba(0, 0, 0, .3);
  outline: none;
  border-radius: 5px;
  color:#fff;
}
#center .yanzhengma{
  width: 14rem;
}
#center .phone td>span:not(.yzm){
  color: #fff;
  position: absolute;
  margin-left: 1rem;
  /* z-index:-1; */
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
#center .yzm{
  border: 1px solid #ccc;
  padding:.35rem 1rem;
  margin-left:.5rem;
  background: rgba(0, 0, 0, .3);
}
input::-webkit-input-placeholder{
  color: #ddd;
}
#center .loging{
  border-radius: 2rem;
  margin-top: 2rem;
  text-align: center;
  width: 100%;
  height:3rem;
  line-height: 3rem;
  background: rgba(0, 0, 0, .3); 
}
button{
  position: relative;
  top: -4.5rem;
  left: -2rem;
  background: transparent;
  border: 1px solid #ccc;
  color: #fff;
  padding: .5rem 1rem;
  background: rgba(0, 0, 0, .3)
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
#bottom{
  padding-left: 23%;
}
#bottom button.active{
    background: rgba(0, 0, 0, .7)
}
</style>
