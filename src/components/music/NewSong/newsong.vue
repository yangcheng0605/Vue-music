<template>
  <div id="newsong">
    <div id="img">
      <md-card>
        <md-card-media-cover md-solid>
          <md-card-media md-ratio="1:1" md-with-hover>
            <img src="" alt="Skyscraper">
          </md-card-media>
          <md-card-area>
            <md-card-header>
              <md-ink-ripple />
              <div class="md-title">Title goes here</div>
              <div class="md-subhead">Subtitle here</div>
            </md-card-header>
          </md-card-area>
        </md-card-media-cover>
     </md-card>
    </div>
    <div id="list">
      <ul>
        <li></li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  computed: {
    playItem () {
      return this.$store.state.playItem
    },
    recommendURL () {
      return this.$store.state.recommendURL
    },
    playID () {
      return this.$store.state.playID
    },
    // 播放当前选区ID的歌曲
    playSong () {
      for (let j = 0; j < this.recommendURL.length; j++) {
        if (Number(this.playID) === Number(this.recommendURL[j].songinfo.song_id)) {
          return this.recommendURL[j].bitrate.show_link
        }
      }
    }
  },
  methods: {
    // 当播放完毕后 改变ID为下一首歌ID
    changeID () {
      var item = this.playItem
      this.$store.dispatch('changeID', item)
    }
  }
}
</script>
<style scoped>

</style>

