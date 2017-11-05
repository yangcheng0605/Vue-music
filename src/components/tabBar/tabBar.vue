<template>
<!-- tabBar -->
  <div class="tabBar">
    <md-bottom-bar  md-shift>
      <md-ink-ripple />
      <md-bottom-bar-item @click="gotoH('purple')" md-icon="person" class="md-body">Mine</md-bottom-bar-item>
      <md-bottom-bar-item @click="gotoR('teal')" md-icon="music_note" md-active>Music</md-bottom-bar-item>
      <md-bottom-bar-item @click="gotoM('brown')" md-icon="equalizer">Singer</md-bottom-bar-item>
      <md-bottom-bar-item @click="gotoT('cyan')" md-icon="forum">talk</md-bottom-bar-item>
    </md-bottom-bar>
  </div>
</template>
<script>
export default {
  created () {
  },
  data () {
    return {
    }
  },
  methods: {
    /* 点击改变主题颜色 */
    gotoH (theme) {
      this.$material.setCurrentTheme(theme)
      this.$router.push('/head')
    },
    gotoR (theme) {
      this.$material.setCurrentTheme(theme)
      this.$router.push('/music/recommend')
    },
    gotoM (theme) {
      this.$material.setCurrentTheme(theme)
      this.$router.push('/singer')
    },
    gotoT (theme) {
      this.$material.setCurrentTheme(theme)
      this.$router.push('/talk')
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.tabBar{
  position: fixed;
  bottom: 0;
  width: 100%;
  font-size: 10px;
}
.spanCl{
  color:#fff;
  text-decoration: none;
}
.md-bottom-bar{
  height: 48px;
}
.md-bottom-bar-item{
  font-size: 12px;
  padding-top: 5px;
}
</style>
