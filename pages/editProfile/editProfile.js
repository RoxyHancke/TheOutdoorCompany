// pages/editProfile/editProfile.js
Page({
  data: {
    id:"",
  },

  onLoad: function (options) {
    console.log("view options",options),
    this.setData({
      id:options.id
    })
  },

formSubmit: function(e){
  console.log("formsubmit",e);
  const page = this;
  //the detail is stored under detail.value
  //get the data table
  const UserProfile = new wx.BaaS.TableObject("TOC_userInfo");
  const userProfile = UserProfile.getWithoutData(this.data.id);
  userProfile.set("interest1",e.detail.value.interest1);
  userProfile.set("interest2",e.detail.value.interest2);
  userProfile.set("interest3",e.detail.value.interest3);
  userProfile.set("shortBio",e.detail.value.shortBio);
  userProfile.update().then(
    (res)=>{
      console.log("User profile updated",res);
      (error)=>{
        console.log("new review save", error)}
      }
      );
      wx.switchTab({
        url: '/pages/profile/profile',
      })
    }
})