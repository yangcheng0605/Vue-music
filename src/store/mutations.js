export default {
  // 推荐歌单ID
  GET_RECOMMEND (state, data) {
    // 控制recommend长度
    state.recommend = data
    for (var i = 0; i < data.length; i++) {
      state.recommendID.push(data[i].song_id)
    }
  },
  // 新歌榜
  // GET_NEWSONG (state, data) {
  //   state.newSong = data
  // },
  // 推荐歌单的url
  // GET_RECOMMEND_SHOWLINK (state, data) {
  //   if (state.recommendURL.length > 75) {
  //     state.recommendURL = []
  //   }
  //   state.recommendURL.push(data)
  // },
  // 获取当前播放ID 对象
  GET_ITEM (state, item) {
    state.playID = item.ID
    state.playItem = item.ITEM
    state.playURL = item.URL
  },
  // 切换歌曲 ID  对象
  CHANGE_ID (state, item2) {
    state.playID = item2.song_id
    state.playItem = item2.ITEM
    state.playURL = item2.URL
  },
  // 获取歌词
  GET_SONG_LRC (state, obj) {
    var minute, second
    var time = obj.arr
    if (time !== undefined) {
      for (let i = 0; i < time.length; i++) {
        time[i] = parseInt(time[i].replace(/[:.]/g, ''))
        minute = parseInt(time[i] / 10000)
        second = time[i] % 10000 / 100
        time[i] = parseInt((minute * 60 + second))
      }
    }
    state.songLrc = obj.arr2
    state.songTime = time
    console.log(state.songTime, state.songLrc)
  },
  // 获取当前歌曲总时间
  TOTLA_TM (state, time) {
    state.totalTm = time
  },
  // 获取当前歌曲实时
  UPDATE_TIME (state, updataTm) {
    state.updateTime = updataTm.toFixed(2)
  },
  GET_SEARCH (state, obj) {
    state.searchID = []
    state.searchList = []
    state.searchSongID = obj.arr
    state.searchList = obj.search
    console.log(state.searchSongID)
    console.log(state.searchList)
  }
}
