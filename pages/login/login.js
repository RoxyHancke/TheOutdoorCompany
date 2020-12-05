// pages/login/login.js
const app = getApp()

Page({
  data: {
    userInfo:[],
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
      wx.switchTab({
        url: '/pages/home/home',
      })
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
                    }
                    )
       }
     }, err => {

      }, err => {
        console.log("error",error)});
        //check whether the user info has been migrated to TOC_userInfo or not; if not, will create a new entry/migrate data to TOC_userInfo
   
  
  })},
})