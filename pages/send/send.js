// pages/reply/reply.js
Page({

  data: {

  },

  onLoad: function (options) {
    console.log("options",options)
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
          //set up trip query
          const page = this;
          const query = new wx.BaaS.Query();
          const msg = new wx.BaaS.TableObject("TOC_trip");
          query.compare("id","=",options.id);
          msg.setQuery(query)
          .find()
          .then(
            (res)=>{
              console.log("query results",res);
              //items are the trip entry -> trip name, trip id, owner ID, owner name?
              page.setData({
                items: res.data.objects,
              });
            }
          )
  },

  query(e){
  //set up query to get owner name
  console.log("bindsubmit",e);
  const page = this;
  const query = new wx.BaaS.Query();
  const userinfo = new wx.BaaS.TableObject("_userprofile");
  console.log("trip owner",)
  query.compare("id","=",this.data.items[0].tripOwner.id);
  userinfo.setQuery(query)
  .find()
  .then(
    (res)=>{
      const page = this;
      console.log("query username results",res);   
      page.setData({
        ownerName: res.data.objects[0].nickname,
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
        receiverID: this.data.items[0].tripOwner.id,
        receiverName: this.data.ownerName,
        tripID:this.data.items[0].id,
        tripName:this.data.items[0].title

     });
     newMsg.save().then(res => {
       console.log("set the data to ifanr",res)
     }, err => {
       console.log("not successful",err)
     });
     wx.navigateTo({
       url: `../details/details?id=${this.data.items[0].id}`,
     })
     },

//   onReady: function () {

//   },

//   /**
//    * Lifecycle function--Called when page show
//    */
//   onShow: function () {

//   },

//   /**
//    * Lifecycle function--Called when page hide
//    */
//   onHide: function () {

//   },

//   /**
//    * Lifecycle function--Called when page unload
//    */
//   onUnload: function () {

//   },

//   /**
//    * Page event handler function--Called when user drop down
//    */
//   onPullDownRefresh: function () {

//   },

//   /**
//    * Called when page reach bottom
//    */
//   onReachBottom: function () {

//   },

//   /**
//    * Called when user click on the top right corner to share
//    */
//   onShareAppMessage: function () {

//   }
})