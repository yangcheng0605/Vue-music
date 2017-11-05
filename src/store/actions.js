import http from 'axios'

export default {
  // 获取歌曲信息
  getRecommend (store, data) {
    return http.get('/api/v1/restserver/ting?from=qianqian&version=2.1.0&method=baidu.ting.plaza.getNewSongs&format=json&limit=50')
    .then(res => {
      store.commit('GET_RECOMMEND', res.data.song_list)
    })
  },
  // 获取列表歌曲URL
  // getRecommendShowLink (store) {
  //   var recommendid = store.state.recommendID
  //   for (let i = 0; i < recommendid.length; i++) {
  //     http.get('/api/v1/restserver/ting?method=baidu.ting.song.play&songid=' + recommendid[i])
  //     .then(res => {
  //       store.commit('GET_RECOMMEND_SHOWLINK', res.data)
  //     })
  //   }
  // },
  // 获取新歌榜歌曲
  // getNewsong (store) {
  //   return http.get('/api/v1/restserver/ting?method=baidu.ting.billboard.billList&type=1&size=30&offset=0')
  //    .then(res => {
  //      store.commit('GET_NEWSONG', res.data)
  //    })
  // },
  // 存储当前播放歌曲信息
  getItem (store, item) {
    console.log(item)
    var id = item.song_id
    var url = []
    var obj = {}
    http.get('/api/v1/restserver/ting?method=baidu.ting.song.play&songid=' + id)
    .then(res => {
      url = res.data.bitrate
      console.log(url)
      obj = {ID: id, URL: url, ITEM: item}
      store.commit('GET_ITEM', obj)
    })
  },
  // 切换下一首
  changeRight (store, item) {
    var index = store.state.recommend.indexOf(item)
    var url = []
    var obj = {}
    if (index <= store.state.recommend.length) {
      var item2 = store.state.recommend[index + 1]
      http.get('/api/v1/restserver/ting?method=baidu.ting.song.play&songid=' + item2.song_id)
      .then(res => {
        url = res.data.bitrate
        obj = {URL: url, ITEM: item2}
        store.commit('CHANGE_ID', obj)
      })
      item.charge = 0
      item2.charge = 1
    }
  },
  // 切换上一首
  changeLeft (store, item) {
    var index = store.state.recommend.indexOf(item)
    var url = []
    var obj = {}
    if (index > 0) {
      var item2 = store.state.recommend[index - 1]
      http.get('/api/v1/restserver/ting?method=baidu.ting.song.play&songid=' + item2.song_id)
        .then(res => {
          url = res.data.bitrate
          obj = { URL: url, ITEM: item2 }
          store.commit('CHANGE_ID', obj)
        })
      item.charge = 0
      item2.charge = 1
    }
  },
  // 获取当前歌曲的歌词
  getSongLrc (store, item) {
    /* eslint-disable */
    var id = item.song_id
    return http.get('/api/v1/restserver/ting?method=baidu.ting.song.lry&songid=' + id)
    .then(res => {
      var value, arr2
      console.log(res.data)
      // 正则筛选出 时间 与 歌词
      if(res.data.lrcContent === undefined){
        arr2 = '未找到歌词'
      } else {
        console.log('解析歌词中...')
        var reg3 = /\[\w+:\w{0,}\]\n/g
        value = res.data.lrcContent
        value = value.replace(reg3, '')
        var reg = /\d*:\d*\.\d*/g
        var reg2 = /\](\S*)[^\[]+/g
        var arr = value.match(reg)
        arr2 = value.match(reg2)
        if (arr2 !== undefined) {
          if (arr2 === null) {
            arr2 = '该歌曲还没找到歌词'
          }
          arr2 = arr2.toString().split(']')
        } else {
          arr2 = '未找到歌词'
        }
      }
      var obj = {arr:arr,arr2:arr2}
      store.commit('GET_SONG_LRC', obj)
    })
  },
  // 存储当前歌曲总时间
  totlaTm (store, time) {
    store.commit('TOTLA_TM', time)
  },
  // 存储当前歌曲的时间实时变化
  updateTime (store, updataTm) {
    store.commit('UPDATE_TIME', updataTm)
  },
  // 存储搜索歌曲的id
  getSearchId (store, obj) {
    store.commit('GET_SEARCH', obj)
  }
}
