// pages/picker/picker.js
Page({

  data: {
    tripTypeOptions:['Short hiking','Long hiking','Camping','Glamping','Trail running','Mountaineering','Biking','Others'],
    provinceOptions:['Beijing','Chongqing','Shanghai','Tianjin','Anhui','Fujian','Gansu','Guangdong','Guizhou','Hainan','Hebei','Heilongjiang','Henan','Hubei','Hunan', 'Jiangsu','Jiangxi','Jilin','Liaoning','Qinghai','Shaanxi','Shandong','Shanxi','Sichuan','Yunnan','Zhejiang','Guangxi','Inner Mongolia','Ningxia','Xinjiang','Tibet','Hong Kong','Macau','International']
  },

  onLoad: function (options) {
    //current option is the index of the trip type
    //set up query
    console.log("options.id",this.data.provinceOptions[options.id])
    const trip = new wx.BaaS.TableObject("TOC_trip");
    const queryTrip = new wx.BaaS.Query();
    queryTrip.compare("tripDes","=",this.data.provinceOptions[options.id]);
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

  toTripDetails: function(e){
    console.log("HALALUYA",e.currentTarget.id)
      wx.navigateTo({
        // details?tripOwner=fii23fi09r29038r3r290,
        url: `/pages/details/details?id=${e.currentTarget.id}`,
      });
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