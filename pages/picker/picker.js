// pages/picker/picker.js
Page({

  data: {
    tripTypeOptions:['Short hiking','Long hiking','Camping','Glamping','Trail running','Mountaineering','Biking','Others']
  },

  onLoad: function (options) {
    //current option is the index of the trip type
    //set up query
    console.log("options.id",this.data.tripTypeOptions[options.id])
    const trip = new wx.BaaS.TableObject("TOC_trip");
    const queryTrip = new wx.BaaS.Query();
    queryTrip.compare("tripType","=",this.data.tripTypeOptions[options.id]);
    trip.setQuery(queryTrip)
    .find()
    .then(
    (res)=>{
      const page = this;
      console.log("trip query results",res);
      this.setData({
        trips: res.data.objects,
      })
    }
   )
    


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