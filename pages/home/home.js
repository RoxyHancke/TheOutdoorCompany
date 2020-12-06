// pages/home/home.js
const app = getApp();
Page({

  data: {
    userInfo:[{
      id:"",
      image:"",
  },
  ],
    items:[],
    comments:[{comment:""}],
    scrollInto: "",
    inputVal: "",
    usergetInfo: [{
      id:"",
      image:'',

    }],
    options_id:"",
  },


onLoad: function () {
  const Details = new wx.BaaS.TableObject("TOC_trip");
  // const UserInfos = new wx.BaaS.TableObject("TOC_userInfo");

  Details.find().then((res) => {
    this.setData({
      details:res.data.objects,
    });
   moment(This.data.objects.tripStartDate).format('DD/MM/YYYY')
    console.log("detail page result", res);

  }, (error) => {
    console.log("error", error);
  }
  );
  

  },

toTripDetails: function(e){
  
    wx.navigateTo({
      url: `/pages/details/details?tripId=${e.currentTarget.id}`,
    });

},

    
                



})
