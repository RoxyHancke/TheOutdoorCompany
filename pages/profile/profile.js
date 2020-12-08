const app=getApp();

Page({
  data: {
    userInfo:[],
    items:{},
    trips:[]
  },

  getUserInfo:function(userInfo){
    console.log('trigger getUserInfo', userInfo)
    const userProfile = new wx.BaaS.TableObject("TOC_userInfo");
    // set up the query
      let query = new wx.BaaS.Query();
      query.compare("userID","=",userInfo.id);
      userProfile.setQuery(query)
      .find()
      .then(
        (res)=>{
          console.log("user query results",res)
          const originalShortBio = res.data.objects[0].shortBio;
          const newUser = {
            ...res.data.objects[0],
            shortBio: originalShortBio[0].toUpperCase() + originalShortBio.slice(1, originalShortBio.length)
          };
          console.log(newUser);
          this.setData({
            items: newUser,
          })
        }
      )
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
    page.getUserInfo(res.data);
          //query to get each user's trip
          const trip = new wx.BaaS.TableObject("TOC_trip");
          const queryTrip = new wx.BaaS.Query();
          queryTrip.compare("tripOwner","=",res.data.id);
          console.log("user id",res.data.id);
          trip.setQuery(queryTrip)
          .find()
          .then(
          (res)=>{
            console.log("trip query results",res);
            page.setData({
              trips: res.data.objects,
            })
          }
         )
    }
  });
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
      //   url: '',
      // })
      let query = new wx.BaaS.Query();
      const page = this;
      query.compare("userID","=",this.data.userInfo.id);
      const userProfile = new wx.BaaS.TableObject("TOC_userInfo");
      userProfile.setQuery(query).find().then(res => {
       console.log("the user info has been copied to new table",res);
       page.getUserInfo(user);
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
                    }
                    )
       }
     }, err => {

      }, err => {
        console.log("error",error)});
        //check whether the user info has been migrated to TOC_userInfo or not; if not, will create a new entry/migrate data to TOC_userInfo

  }
  )},

  

  editProfile: function(e){
    wx.navigateTo({
      url: `/pages/editProfile/editProfile?id=${this.data.items.id}`,
    })
  },

  toTripDetails: function(e){
  
      wx.navigateTo({
        url: `/pages/details/details?tripId=${e.currentTarget.id}`,
  
  
        })

},

})