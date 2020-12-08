// pages/home/home.js
const app = getApp();
Page({

  data: {
    userInfo:[{
      id:"",
      image:""
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
    tripTypeOptions:['Short hiking','Long hiking','Camping','Glamping','Trail running','Mountaineering','Biking','Others']
  },


onLoad: function () {
  const Details = new wx.BaaS.TableObject("TOC_trip");
  // const UserInfos = new wx.BaaS.TableObject("TOC_userInfo");

  Details.find().then((res) => {
    this.setData({
      items:res.data.objects,
    });
   moment(This.data.objects.tripStartDate).format('DD/MM/YYYY')
    console.log("detail page result", res);

  }, (error) => {
    console.log("error", error);
  }
  );
  

  },

toTripDetails: function(e){

  console.log("to trip details",e)

    wx.navigateTo({
      url: `/pages/details/details?tripId=${e.currentTarget.id}`,


      })
    },
tripTyperPicker:function(e){
  console.log("trip type filter",e)
  console.log("trip value",e.detail.value)
  wx.navigateTo({
      url:`/pages/picker/picker?id=${e.detail.value}`
  })
}
})
