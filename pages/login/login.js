// pages/login/login.js
const app = getApp()

Page({
  data: {
    currentUser: null,
  },

  onLoad: function (options) {
    const currentUser = wx.getStorageSync('currentUser');

    if (currentUser) {
      this.setData({
        currentUser: currentUser,
      })
    }
  },


  userInfoHandler: function (data) {
    wx.BaaS.auth.loginWithWechat(data).then(user => {
      this.setData({
        currentUser: user,
      })
      console.log('user', user);
      wx.switchTab({
        url: '/pages/home/home',
      })
    }, err => {
      console.log("it's an error!!", err);
  })
}
  }  
)