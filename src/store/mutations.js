export default {
  GET_RECOMMEND (state, data) {
    state.recommend = data
    for (var i = 0; i < data.list.length; i++) {
      state.recommendID.push(data.list[i].song_id)
    }
    console.log(state.recommendID)
  },
  GET_NEWSONG (state, data) {
    state.newSong = data
  },
  GET_RECOMMEND_SHOWLINK (state, data) {
    state.recommendURL.push(data)
  },
  GET_ITEM (state, item) {
    var id = item.song_id
    state.playID = id
    state.playItem = item
  },
  CHANGE_ID (state, item2) {
    state.playID = item2.song_id
    state.playItem = item2
  },
  GET_SONG_LRC (state, obj) {
    state.songLrc = obj.arr2
    state.songTime = obj.arr
    console.log(state.songLrc, state.songTime)
  },
  CHANGE_SONG (state) {
    state.changeSong = false
  }
}
