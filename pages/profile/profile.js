const app=getApp();

Page({
  data: {
    userInfo:[],
    items:{},
  },

  onShow: function () {
    const page = this
  wx.getStorage({
    key: 'userInfo',
    success(res){
      console.log("checkout user info",res.data);
      page.setData({
        userInfo: res.data
      });
    page.getUserInfo(res.data)
    }
  })
  },

  getUserInfo:function(userInfo){
    const userProfile = new wx.BaaS.TableObject("TOC_userInfo");
    // set up the query
      let query = new wx.BaaS.Query();
      query.compare("userID","=",userInfo.id);
      userProfile.setQuery(query)
      .find()
      .then(
        (res)=>{
          console.log("query results",res)
          this.setData({
            items: res.data.objects[0],
          })
        }
      )
  },

  editProfile: function(e){
    wx.navigateTo({
      url: `/pages/editProfile/editProfile?id=${this.data.items.id}`,
    })
  },

})  