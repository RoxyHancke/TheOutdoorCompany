// pages/create/create.js
Page({
  data: {
    tripTypeOptions:['Short hiking','Long hiking','Camping','Glamping','Trail running','Mountaineering','Biking','Others'],
    provinceOptions:['Beijing','Chongqing','Shanghai','Tianjin','Anhui','Fujian','Gansu','Guangdong','Guizhou','Hainan','Hebei','Heilongjiang','Henan','Hubei','Hunan', 'Jiangsu','Jiangxi','Jilin','Liaoning','Qinghai','Shaanxi','Shandong','Shanxi','Sichuan','Yunnan','Zhejiang','Guangxi','Inner Mongolia','Ningxia','Xinjiang','Tibet','Hong Kong','Macau','International'],
     tripDes:"",
     tripType:"",
     tripStartDate:"",
     tripEndDate:"",
     costEst:""
  },
  onShow: function () {
    const page = this
  wx.getStorage({
    key: 'userInfo',
    success(res){
      console.log("checkout user info",res.data);
      page.setData({
        userInfo: res.data
      });
    // page.getUserInfo(res.data)
    }
  })
  },

    userInfoHandler: function(data) {
    console.log(data)
    wx.BaaS.auth.loginWithWechat(data).then(user => {
      console.log("user info",user);
      this.setData({
        userInfo: user
      });
      wx.setStorageSync('userInfo', user);
      console.log("result", data);
      // wx.switchTab({
      //   url: '/pages/create/create',
      // })
      let query = new wx.BaaS.Query();
      const page = this;
      query.compare("userID","=",this.data.userInfo.id);
      const userProfile = new wx.BaaS.TableObject("TOC_userInfo");
      userProfile.setQuery(query).find().then(res => {
       console.log("the user info has been copied to new table",res);
       if(res.data.objects.length === 0) {
         console.log("create");
          //get the TOC_userInfo table
         const userProfile = new wx.BaaS.TableObject("TOC_userInfo");
          //create a blank entry
         const userProfileNew = userProfile.create();
          //set the record
              userProfileNew.set({
                userID:this.data.userInfo.id,
                profilePicture:this.data.userInfo.avatar,
                nickName: this.data.userInfo.nickname
                });
              userProfileNew.save().then(
                  (res)=>{
                    console.log("User profile updated",res);
                    (error)=>{
                      console.log("new review save", eroor)}
                    })
                  }
               }, err => {
         }, err => {
        console.log("error",error)});
        //check whether the user info has been migrated to TOC_userInfo or not; if not, will create a new entry/migrate data to TOC_userInfo
   }
  )},
 //create a trip here:

 //location data picker captured
 bindPickerChangeLocation:function(e){
   const page = this
  console.log('location picked', e),
  console.log('location picked city name',this.data.provinceOptions[e.detail.value])
  this.setData({
    tripDes: this.data.provinceOptions[e.detail.value]
  })
 },

 //trip type picker captured
 bindPickerChangeTripType:function(e){
  console.log('trip type picked', e)
  console.log('trip type picked type name',this.data.tripTypeOptions[e.detail.value])
    this.setData({
    tripType: this.data.tripTypeOptions[e.detail.value]
    })
 },

//starting date captured:
bindDateChangeStart: function(e) {
  console.log('pickerA selection change is sent, carrying the value ', e.detail.value)
  this.setData({
    tripStartDate: e.detail.value
  })
},
//ending date cpature:
bindDateChangeEnd: function(e) {
  console.log('pickerA selection change is sent, carrying the value ', e.detail.value)
  this.setData({
    tripEndDate: e.detail.value
  })
},
//upload the images:
chooseImage: function(e){
  const page = this
  wx.chooseImage({
    // chooseImage settings
    success: function(res) {
      let File = new wx.BaaS.File()
      let fileParams = {filePath: res.tempFilePaths[0]}
      let metaData = {categoryName: 'SDK'}
  
      File.upload(fileParams, metaData).then(res => {
    
        let photo = res.data.path;
        page.setData({
        imageURL: photo
        });
      }, error => {

      })
    
    }
  })
},

 //submit the form
 formSubmit: function(e){
  console.log("formsubmit",e);
  const page = this;
  //the detail is stored under detail.value
  //get the data table
   const allTrips = new wx.BaaS.TableObject("TOC_trip");
   // step 1: create a blank record
   const newTrip = allTrips.create();
   // step 2: set the information in the record
   this.setData({
    costEst: parseInt(e.detail.value.costEst, 10)
      });
   newTrip.set({
    tripOwner: this.data.userInfo.id,
    tripDes:this.data.tripDes,
    tripType: this.data.tripType,
    tripStartDate:this.data.tripStartDate,
    tripEndDate:this.data.tripEndDate,
    title:e.detail.value.title,
    tripDetail:e.detail.value.tripDetail,
    costEst:this.data.costEst,
    picture:[this.data.imageURL]
    });
    newTrip.save().then(res => {
      console.log("set the data to ifanr",res)
    }, err => {
      console.log("not successful",err)
    })
    },
    goBackToProfile:function(e){
      wx.switchTab({
        url: '/pages/home/home',
      })
    }
})