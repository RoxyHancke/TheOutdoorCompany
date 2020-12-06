// pages/editProfile/editProfile.js
Page({
  data: {
    id:"",
    tripTypeOptions:['Short hiking','Long hiking','Camping','Glamping','Trail running','Mountaineering','Biking','Others']
  },

  onLoad: function (options) {
    console.log("view options",options),
    this.setData({
      id:options.id
    })
  },

  bindPickerInterest1:function(e){
    const page = this
   console.log('interest 1 picked', e),
   console.log('interest picked name',this.data.tripTypeOptions[e.detail.value])
   this.setData({
     interest1: this.data.tripTypeOptions[e.detail.value]
   })
  },

  bindPickerInterest2:function(e){
    const page = this
   console.log('interest 2 picked', e),
   console.log('interest picked name',this.data.tripTypeOptions[e.detail.value])
   this.setData({
     interest2: this.data.tripTypeOptions[e.detail.value]
   })
  },

  bindPickerInterest3:function(e){
    const page = this
   console.log('interest 3 picked', e),
   console.log('interest picked nname',this.data.tripTypeOptions[e.detail.value])
   this.setData({
     interest3: this.data.tripTypeOptions[e.detail.value]
   })
  },

formSubmit: function(e){
  console.log("formsubmit",e);
  const page = this;
  //the detail is stored under detail.value
  //get the data table
  const UserProfile = new wx.BaaS.TableObject("TOC_userInfo");
  const userProfile = UserProfile.getWithoutData(this.data.id);
  userProfile.set("interest1",this.data.interest1);
  userProfile.set("interest2",this.data.interest2);
  userProfile.set("interest3",this.data.interest3);
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