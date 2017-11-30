import http from 'axios'

export default {
  // 获取歌曲信息
  getRecommend (store, data) {
    return http.get('/api/v1/restserver/ting?from=qianqian&version=2.1.0&method=baidu.ting.plaza.getNewSongs&format=json&limit=50')
    .then(res => {
      store.commit('GET_RECOMMEND', res.data.song_list)
    })
  },
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
  },
  // 获取歌手列表
  getSinger (store) {
    return http.get('/api/v1/restserver/ting?from=qianqian&version=2.1.0&method=baidu.ting.artist.get72HotArtist&format=jsonℴ=1&offset=0&limit=50')
    .then(res => {
      console.log(res.data)
      store.commit('GET_SINGER', res.data)
    })
  },
  // 获取选中歌手的歌曲列表
  getsingerMsg(store, item) {
    return http.get('/api/v1/restserver/ting?from=qianqian&version=2.1.0&method=baidu.ting.artist.getSongList&format=jsonℴ=2&tinguid=' + item.ting_uid +'&offset=0&limits=30')
    .then(res => {
      var obj = { songlist: res.data.songlist, item: item}
      store.commit('GET_SINGER_MSG', obj)
    })
  },
  // 获取歌手专辑
  getSpecial (store, item) {
    return http.get('/api/v1/restserver/ting?from=android&version=5.6.5.0&method=baidu.ting.artist.getAlbumList&format=json&order=1&tinguid=' + item.ting_uid +'&offset=0&limits=30')
    .then(res => {
      var data = res.data
      store.commit('GET_SPECIAL', data)
    })
  },
  // 获取歌手详情
  getMsg(store, item) {
    return http.get('/api/v1/restserver/ting?method=baidu.ting.artist.getInfo&tinguid=' + item.ting_uid)
      .then(res => {
        var data = res.data
        store.commit('GET_Msg', data)
    })
  },
  // 用户注册
  saveMsg (store, obj) {
    var phone = obj.numValue
    var name = obj.userName
    // 判断用户是否注册过
    return http.get('http://localhost:8081/user?phone=' + Number(phone))
    .then(res => {
      if (res.data.length > 0) {
        return {msg: '该手机号已经注册,过返回上一页登录'}
      } else {  // 没有就添加
        let newobj = {
          phone: phone,
          name: name,
          Vip: false,
          favorite:[],
          user2:[],
          headImg:'http://d.lanrentuku.com/down/png/1004/zoom_eyed_creatures/monkeys_audio.png',
        }
        return http.get('http://localhost:8081/user?phone=')
          .then(res => {
            return http.post('http://localhost:8081/user?', newobj)
            .then(res => {
              // 注册成功->保存
              console.log(res.data)
              store.commit('SAVE_MSG', res.data)
              store.state.userLogin = true
              return {msg: '注册成功'}
          })
        })
      }
    })
  }
}
