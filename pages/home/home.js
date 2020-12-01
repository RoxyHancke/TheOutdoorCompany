// pages/home/home.js
const app = getApp();
Page({

  data: {
    details: [{
      id:"",
      image:"",
    }],

    userinfos: [{
      id:"",
      display_name:"",
    }]

  },


onLoad: function () {
  const Details = new wx.BaaS.TableObject("");
  const UserInfos = new wx.BaaS.TableObject("");

  Details.expand(['userID']).find().then((res) => {
    console.log("detail page result", res);
    this.setData({
      stories:res.data.objects,
    });
  

  }, (error) => {
    console.log("error", error);
  }
  );
  

  },

toDetails: function (e) {
  console.log("go to profile page",e);
},
toNavigate: function () {
  wx.switchTab({
    url: 'pages/userinfo/userinfo',
  })
  },


toStories: function (e) {
  wx.navigateTo({
    url: `/pages/details/details?id=${e.currentTarget.id}`,
  });
},


})
