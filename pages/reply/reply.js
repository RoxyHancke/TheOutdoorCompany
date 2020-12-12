// pages/reply/reply.js
Page({

  /**
   * Page initial data
   */
  data: {

  },

  onLoad: function (options) {
            wx.getStorage({
              key: 'userInfo',
              success(res){
                console.log("checkout user info",res.data);
                console.log("checkout user info id",res.data.id);
                page.setData({
                  userInfo: res.data
                });
              }
              });
          //set up msg query
          const page = this;
          const query = new wx.BaaS.Query();
          const msg = new wx.BaaS.TableObject("TOC_message");
          query.compare("id","=",options.id);
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
  },

  query(e){
  //set up query to get userName 
  console.log("bindsubmit",e);
  const page = this;
  const query = new wx.BaaS.Query();
  const userinfo = new wx.BaaS.TableObject("_userprofile");
  query.compare("id","=",this.data.items[0].senderID.id);
  userinfo.setQuery(query)
  .find()
  .then(
    (res)=>{
      const page = this;
      const query2 = new wx.BaaS.Query();
      const trip = new wx.BaaS.TableObject("TOC_trip");
      query2.compare("id","=",this.data.items[0].tripID.id);
      trip.setQuery(query2)
      .find()
      .then(
        (res)=>{
          console.log("query tripname results",res);   
          page.setData({
             tripName: res.data.objects[0].title,
            })
        }
      );
      console.log("query username results",res);   
      page.setData({
         receiverName: res.data.objects[0].nickname,
        })
    }
  );

  },

  formSubmit: function(e){
   console.log("formsubmit",e);
   const page = this;
   //the detail is stored under detail.value
   //get the data table
    const msg = new wx.BaaS.TableObject("TOC_message");
    // step 1: create a blank record
    const newMsg = msg.create();
    // step 2: set the information in the record
     newMsg.set({
        context:e.detail.value.reply,
        senderID: this.data.userInfo.id,
        senderName: this.data.userInfo.nickname,
        receiverID: this.data.items[0].senderID.id,
        receiverName: this.data.receiverName,
        tripID:this.data.items[0].tripID.id,
        tripName:this.data.tripName

     });
     newMsg.save().then(res => {
       console.log("set the data to ifanr",res)
     }, err => {
       console.log("not successful",err)
     });
     wx.switchTab({
       url: '../profile/profile',
     })
     },

  onReady: function () {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function () {

  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function () {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function () {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function () {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function () {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function () {

  }
})