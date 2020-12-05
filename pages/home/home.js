// pages/home/home.js
const app = getApp();
Page({

  data: {
    userInfo:[{
      id:"",
      image:"",
  },
  ],
    details:[],
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
    console.log("detail page result", res);

  }, (error) => {
    console.log("error", error);
  }
  );
  

  },

toTripDetails: function (e) {
  wx.navigateTo({
    url: `/pages/details/details?tripid=${e.currentTarget.id}`,
  })
  console.log("go to detail page",e);
},
toNavigate: function () {
  wx.switchTab({
    url: 'pages/details/details',
  })
  },




})
