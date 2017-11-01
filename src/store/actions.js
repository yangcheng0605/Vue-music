import http from 'axios'

export default {
  // 获取推荐列表信息
  getRecommend (store) {
    return http.get('/api/v1/restserver/ting?method=baidu.ting.song.getRecommandSongList&song_id=877578&num=20')
     .then(res => {
       console.log(res.data)
       store.commit('GET_RECOMMEND', res.data.result)
     })
  },
  // 获取推荐列表歌曲URL
  getRecommendShowLink (store) {
    var recommendid = store.state.recommendID
    for (let i = 0; i < recommendid.length; i++) {
      http.get('/api/v1/restserver/ting?method=baidu.ting.song.play&songid=' + recommendid[i])
      .then(res => {
        store.commit('GET_RECOMMEND_SHOWLINK', res.data)
      })
    }
  },
  // 获取新歌榜歌曲
  getNewsong (store) {
    return http.get('/api/v1/restserver/ting?method=baidu.ting.billboard.billList&type=1&size=30&offset=0')
     .then(res => {
       store.commit('GET_NEWSONG', res.data)
     })
  },
  // 获取当前播放歌曲信息
  getItem (store, item) {
    console.log(item.song_id)
    store.commit('GET_ITEM', item)
  },
  // 切换播放歌曲ID
  changeRight (store, item) {
    var index = store.state.recommend.list.indexOf(item)
    if (index <= store.state.recommend.list.length) {
      var item2 = store.state.recommend.list[index + 1]
    }
    console.log(item2)
    item.charge = 0
    item2.charge = 1
    store.commit('CHANGE_ID', item2)
  },
  changeLeft (store, item) {
    var index = store.state.recommend.list.indexOf(item)
    if (index > 0) {
      var item2 = store.state.recommend.list[index - 1]
    }
    console.log(item2)
    item.charge = 0
    item2.charge = 1
    store.commit('CHANGE_ID', item2)
  },
  // 获取当前歌曲的歌词
  getSongLrc (store) {
    var id = store.state.playID
    console.log(id)
    return http.get('/api/v1/restserver/ting?method=baidu.ting.song.lry&songid=' + id)
    .then(res => {
      var value = res.data.lrcContent
      /* eslint-disable */
      // 正则筛选出 时间 与 歌词
      var reg3 = /\[\w+:\w{0,}\]\n/g
      value = value.replace(reg3, '')
      var reg = /\d*:\d*\.\d*/g
      var reg2 = /\](\S*)[^\[]+/g
      var arr = value.match(reg)
      var arr2 = value.match(reg2)
      arr2 = arr2.toString().split(']')
      console.log(arr2)
      var obj = {arr:arr,arr2:arr2}
      store.commit('GET_SONG_LRC', obj)
    })
  },
}
