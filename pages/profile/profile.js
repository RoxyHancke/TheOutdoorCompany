const app=getApp();
import moment from 'moment';
Page({
  data: {
    userInfo:[],
    items:{},
    trips:[],
    trip:{
      tripStartDate:"",
     },
    futureTrip:[],
    pastTrip:[],
    currentTime:""
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
          let newBio = "";
          if(originalShortBio[0]) {
            newBio = originalShortBio[0].toUpperCase() + originalShortBio.slice(1, originalShortBio.length);
          }
          const newUser = {
            ...res.data.objects[0],
            shortBio: newBio
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
// ******* Formatting Date
          const trips = res.data.objects;
          const remappedTrips = trips.map((trip) => {
           return {
               ...trip,
              tripStartDate: moment(trip.tripStartDate).format('YYYY/MM/DD'),
              //  console.log(tripStartDate);
           };
           });
            console.log("trip query results",res);
            page.setData({
              trips: remappedTrips,
            });
            //set up past trips and future trips filter;
            // res.data.objects = trips
            const pastTrips = [];
            const futureTrips = [];
            for (var i=0;i<res.data.objects.length; i++){
              const currentTime = moment().format('DD/MM/YYYY');
              console.log("currentTimme",currentTime);
              console.log("check trip data",res.data.objects);
              //beginningTime.isBefore(endTime)
              //date.now(trips[i].tripStartDate) < date.now(currentTime);
              console.log("trip time",new Date(res.data.objects[i].tripStartDate).getTime());
              console.log("current time",new Date().getTime());
              if(new Date(res.data.objects[i].tripStartDate).getTime() < new Date().getTime()){
                console.log("check trip data", res.data.objects[i])
                //  this.setData({
                //   pastTrip:[res.data.objects[i]]
                // })
                pastTrips.push(res.data.objects[i]);
                console.log("past trips");
              }
                else {
                  // this.setData({
                  //   futureTrip:[res.data.objects[i]]
                  // })
                  futureTrips.push(res.data.objects[i]);
                }
            }
            page.setData({
              pastTrip: pastTrips,
              futureTrip: futureTrips,
            });
            const futureTripNewTime = page.data.futureTrip.map((trip) => {
              return {
                  ...trip,
                 tripStartDate: moment(trip.tripStartDate).format('YYYY/MM/DD'),
              };
              });
              page.setData({
                futureTrip: futureTripNewTime,
              }); 
              const pastTripNewTime = page.data.pastTrip.map((trip) => {
                return {
                    ...trip,
                   tripStartDate: moment(trip.tripStartDate).format('YYYY/MM/DD'),
                };
                });
                page.setData({
                  pastTrip: pastTripNewTime,
                });           
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
  tellUsMore: function(e){
    wx.navigateTo({
      url: `/pages/moreabout/moreabout`,
    })
  },

  toTripDetails: function(e){
      console.log("tap",e)
      wx.navigateTo({
        url: `/pages/details/details?id=${e.currentTarget.id}`
        })

},

})