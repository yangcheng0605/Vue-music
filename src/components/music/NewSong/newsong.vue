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
  created () {
    this.$store.dispatch('getNewsong')
  },
  computed: {
  },
  methods: {
  }
}
</script>
<style scoped>

</style>

