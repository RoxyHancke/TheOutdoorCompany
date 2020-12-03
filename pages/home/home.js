// pages/home/home.js
const app = getApp();
Page({

  data: {
    userInfo:[{
      id:"",
      image:"",
  },
  ],
    details:[{
       id:"", 
       t_title:"",
       t_des:"",
       t_start:"",
       t_end:"",
       t_detail:"",
       t_cost:"",
       t_type:"",
       t_picture:[]
    }],
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
    url: '/pages/details/details',
  })
  console.log("go to detail page",e);
},
toNavigate: function () {
  wx.switchTab({
    url: 'pages/details/details',
  })
  },


toStories: function (e) {
  wx.navigateTo({
    url: `/pages/details/details?id=${e.currentTarget.id}`,
  });
},




})
