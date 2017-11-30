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
  // 获取搜索页面的歌曲ID，列表
  GET_SEARCH (state, obj) {
    state.searchID = []
    state.searchList = []
    state.searchSongID = obj.arr
    state.searchList = obj.search
    console.log(state.searchSongID)
    console.log(state.searchList)
  },
  // 获取歌手列表
  GET_SINGER (state, data) {
    state.singer = data.artist
  },
  // 获取歌手信息，歌曲列表
  GET_SINGER_MSG (state, obj) {
    state.singerlist = obj.songlist
    state.singerItem = obj.item
    console.log(state.singerItem)
  },
  // 获取歌手专辑
  GET_SPECIAL (state, data) {
    state.singerSpecial = data
  },
  // 获取歌手详细信息
  GET_Msg (state, data) {
    state.singMsg = data
    console.log(state.singMsg)
  },
  // 保存用户信息
  SAVE_MSG (state, data) {
    console.log(data)
    state.userMsg.push(data)
    state.login = data
  }
}

/* eslint-disable */
/**
 * 
 * 
 * 
 * HR常见面试题
 * 
 * 自我介绍
 * 最擅长的技术方向
 * 谈谈你之前做过的项目
 * 你对我公司了解多少
 * 谈谈你的优点，缺点
 * 你为什么离开上一家公司
 * 工作中免了的最大问题 如何解决
 * 你的职业目标
 * 
 * 
 *薪资谈判：
 试用期薪资80%-100%；
 试用期一般0-6
 五险一金
 HR问题说法：---------------------------------------------------------------------------
 自我介绍：
 做的项目 负责的位置 工作经验（体现数据  项目周期 成果）  总结  个性  符合

 项目中遇到的坑  

 优点 缺点

 3优 1缺 ——> 认识到什么缺点  决定怎样改变这个缺点

 爱好  团队游戏  不同位置的职责

未来的规划：在公司长期的工作 将来能独挡一面

入职需要：---------------------------------------------------------------------------
身份证：
离职证明：淘宝买章  直径40mm  公司  五角星  人事专用章
体检报告：
薪资证明：

试用期问题：---------------------------------------------------------------------------
 独立开发：技术支持 -> 育知;

 接手二手开发

 社保：
 大学贷款 ；
 老家买房上的社保公积金；

 公积金：
 不准备当时本地发展，准备来深圳发展，然后全部取出后 注销；
 */