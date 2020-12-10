const app = getApp();
const img = '../image/location.png'
import moment from 'moment';
Page({
  data: {
          usergetInfo:[{
          name:"",
          image:""
          }],
          activity: {},
          trip:{
           tripStartDate:"",
          },
          owner:"",
          // attendees
          attendees:{},
          comments:[{comment:""}],
          scrollInto: "",
          inputVal: "",
          latitude: 23.099994,
          longitude: 113.324520,
          indicatorDots: false,
          autoplay: false,
          interval: 5000,
          duration: 1000,
          options_id:"",
          pictures: [],
          tripID:"",
          avatar:"",
          partTripId:"",
        },
   onShareAppMessage() {
          return {
            title: 'swiper',
            path: 'page/component/pages/swiper/swiper'
          }
        },
        
    onLoad: function(options)
    {
      const UsergetInfo = new wx.BaaS.TableObject("TOC_userInfo");
      const Activities = new wx.BaaS.TableObject("TOC_trip");
            Activities.get(options.id).then((res) => {
              const formattedActivity = {
                ...res.data,
                tripStartDate: moment(res.data.tripStartDate).format("YYYY/MM/DD")
              }
              this.setData({
                    activity: formattedActivity,
                    OwnerForTrip : res.data.tripOwner,
                    // attendees:res.data.objects,
                    // trips :res.data.objects[0],
              });     
                  // const OwnerForTrip = activity.tripOwner;
                  const Owner= res.data;
                  const OwnerForTrip = Owner.tripOwner;
                  const tripId=Owner.id;
                  const ownerId=OwnerForTrip.id;
                  console.log("tripowner", OwnerForTrip.id);
                  console.log("tripID", tripId);
                  wx.setStorageSync('partTripId', tripId);
                  // console.log(this.partTripId);
// ****
                  const Query = new wx.BaaS.Query()
                  console.log(Query);
                  Query.compare("userID", "=", OwnerForTrip.id);
                  UsergetInfo.setQuery(Query)
                        .find()
                              .then((res) => {
                                // console.log("orders return", res);
                                this.setData({
                                  usergetInfo: res.data,
                                  name:res.data.objects[0].nickName,
                                  image:res.data.objects[0].profilePicture,
                                });
                              });
                                                        // const that=this;
                                                    //  const trip = res.data.objects[0];
                                                          //  const remappedTrips = trips.map((trip) => {
                                                          //  return {
                                                          //      ...trip,
                                                      //  trip.StartDate= moment(trip.tripStartDate).format('DD/MM/YYYY');
                                                              //  console.log(tripStartDate);
                                                          //  };
                                                          //  });
           },
             (error) => {
                  console.log("error", error);
                });
         
         
                                                      //  UsergetInfo.get(this.OwnerForTrip).then((res) => {
                                                      //   this.setData({
                                                      //    usergetInfo: res.data
                                                      //   }); 
                                                      //   console.log(res);
                                                      //    name:usergetInfo.nickName;
                                                      //  }); 
                                                      //  const pictures = [];
                                                      // const partipicants = res.data.objects[0];
                                                      //  const attendees_UserID = [];
                                                      //          for (let i = 0; i < partipicant.length; i++) {
                                                      //              const participantForOneTrip = partipicants[i].participant;
                                                      //              patrtipicants.push(...participantForOneTrip);
                                                      //          };
                                                      //      // })
                                                      //          console.log('ppp',patrtipicants)     
                                                      //          this.setData({
                                
                                                      //              partipicants: partipicants
                                                      //          });
                                                  
                                                        
                                                              
    },
                  
    changeIndicatorDots() {
        this.setData({
            indicatorDots: !this.data.indicatorDots
        })
    },

    changeAutoplay() {
        this.setData({
            autoplay: !this.data.autoplay
        })
    },

    intervalChange(e) {
        this.setData({
            interval: e.detail.value
        })
    },

    durationChange(e) {
        this.setData({
            duration: e.detail.value
          })
        },
        /////////Register
register: function () {
          const userInfo = wx.getStorageSync("userInfo");
          const QpartTripId = wx.getStorageSync("partTripId");
          console.log("register baslasin",QpartTripId);
          if (userInfo) {
                this.setData({
                  userInfo: userInfo,
                });
                wx.showModal({
                    title: "Register?",
                    content: `Are you sure you want to register this trip? `,
                    showCancel: true,
                    cancelText: "Cancel",
                    cancelColor: "#000000",
                    confirmText: "Register",
                    confirmColor: "#3CC51F",
                    success: (result) => {
                            if (result.confirm) {
                                 const UsergetInfo = new wx.BaaS.TableObject("TOC_userInfo");
                                  console.log("haaluyarrrrrrr",userInfo.id);
                                  const Query = new wx.BaaS.Query()
                                  console.log(Query);
                                  Query.compare("userID", "=", userInfo.id);
                                  UsergetInfo.setQuery(Query)
                                        .find()
                                              .then((res) => {
                                                // console.log("orders return", res);
                                                this.setData({
                                                  avatar:res.data.objects[0].profilePicture,
                                                });
                                              });
// ******* participant update
                                                const Participant = new wx.BaaS.TableObject("TOC_participant");
                                                const partQuery = new wx.BaaS.Query();
                                                  // *deneme yeni
                                                  // const Movies = new wx.BaaS.TableObject("movies");
                                                  // const movie = Movies.getWithoutData(this.data.movie.id);
                                                  console.log(this.data.activity.id);
                                                  const participant = Participant.getWithoutData(this.data.userInfo.id);
                                                  console.log("RRRRR",participant.id);
                                                  // participant.set({
                                                  //   participantId: userInfo.id,
                                                  // });
                                                  // participant.update().then(
                                                  //   (res) => {
                                                  //     console.log("movie save res", res);
                                                  //     this.setData({
                                                  //       participant: res.data,
                                                  //     });
                                                  //     // STOP SHOWING LOADING
                                                  //     wx.hideLoading()
                                                  //   },
                                                  //   (err) => {
                                                  //     console.log("movie update err", err);
                                                  //     // STOP SHOWING LOADING
                                                  //     wx.hideLoading()
                                                  //   }
                                                  // );
// ****deneme yeni

                                                // console.log(partTripId);
                                                console.log("AAAAAAAAAAAAAA ",QpartTripId);
                                                // const QpartTripId=this.partTripId;
                                                // const parComId=t
                                                partQuery.compare("tripId", "=",QpartTripId);
                                                // console.log("id",this.activity.id)
                                                // Participant.setQuery(partQuery)
                                                //       .find()
                                                //             .then((res) => {
                                                //                   //create a blank entry
                                                //                   const participantNew = Participant.create();
                                                //                   // //set the record
                                                //                   console.log("adim adim",userInfo.id);
                                                //                   participantNew.set({
                                                //                           // tripId:res.data.activiy.id,
                                                //                           update:userInfo.id,
                                                                          
                                                //                           });
                                                //                           participantNew.save().then(
                                                //                             (res)=>{
                                                //                               console.log("User profile updated",res);
                                                //                               (error)=>{
                                                //                                 console.log("new review save", eroor)}
                                                //                               }
                                                //                               )
                                                //             });
                                              
                                                
                              };
                           
                    },
                });
          };
        }
})