// pages/msg/msg.js
Page({

  data: {
    items:[]

  },


  onLoad: function (options) {
    console.log("view user id", options);
    const page = this;
    wx.getStorage({
      key: 'userInfo',
      success(res){
        console.log("checkout user info",res.data);
        console.log("checkout user info id",res.data.id);
        page.setData({
          userInfo: res.data
        });
      //set up msg query
      const query = new wx.BaaS.Query();
      const msg = new wx.BaaS.TableObject("TOC_message");
      query.compare("receiverID","=",res.data.id);
      msg.setQuery(query)
      .find()
      .then(
        (res)=>{
          console.log("query results",res);
          //change userid -> user name and tripid -> trip name 
          //current array is called res.data    
          page.setData({
            items: res.data.objects,
          })
        }
      )
      //set up 
       },
    })
  },
  
  goReply:function(e){
    console.log("reply",e);
    const page = this;
    wx.navigateTo({
      url: `/pages/reply/reply?id=${e.currentTarget.id}`,
    })
  },

  onReady: function () {

  },

  onShow: function () {

  },

  onHide: function () {

  },

  
  onUnload: function () {

  },

 
  onPullDownRefresh: function () {

  },

 
  onReachBottom: function () {

  },

 
  onShareAppMessage: function () {

  }
})