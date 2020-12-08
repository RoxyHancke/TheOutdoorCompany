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
           t_tripStartDate:"",
          },
          owner:"",
          attendees:[{
            at_name:"",
            at_picture:"",
          }],
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
          tripID:""
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
             this.setData({
                  activity: res.data,
                  OwnerForTrip : res.data.tripOwner,
                  attendees:res.data.objects,
                  // trips :res.data.objects[0],
             });     
                  // const OwnerForTrip = activity.tripOwner;
                  const Owner= res.data;
                  const OwnerForTrip = Owner.tripOwner;
                  const ownerId=OwnerForTrip.id;
                  console.log("tripowner", OwnerForTrip.id);
                  console.log("ownerID", ownerId);
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
              // console.log("aaaaah", OwnerForTrip,res),
              //
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
        const partipicants = res.data.objects[0];
         const attendees_UserID = [];
        //          for (let i = 0; i < partipicant.length; i++) {
        //              const participantForOneTrip = partipicants[i].participant;
        //              patrtipicants.push(...participantForOneTrip);
        //          };
        //      // })
        //          console.log('ppp',patrtipicants)     
        //          this.setData({
        //             //  activity: remappedTrips,
        //              partipicants: partipicants
        //          });
     
          
                
    },
                  
           
        
           // console.log("hohohoho",this.owner);
          
             
                        // let query = new wx.BaaS.Query();
                        // query.compare("userId", "=", options.id);
                         // // grab the information from movie_reviews table
                         // UsergetInfo.setQuery(query)
                         //   .find()
                         //   .then((res) => {
                         //     // console.log("result from movie reviews query find", res);
                         //     this.setData({
                         //       items: res.data.objects,
                         //     });
                         //     });
         
   
    


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
          wx.showModal({
            title: "Register?",
            content: `Are you sure you want to register this trip? `,
            showCancel: true,
            cancelText: "Cancel",
            cancelColor: "#000000",
            confirmText: "Register",
            confirmColor: "#3CC51F",
            success: (result) => {
              // if (result.confirm) {
              //   const Movies = new wx.BaaS.TableObject("movies");
      
              //   const newMovie = Movies.create();
      
              //   newMovie.set({
              //     title: val,
              //   });
      
              //   newMovie.save().then((res) => {
              //     const newItems = this.data.items;
      
              //     newItems.push(res.data);
      
              //     this.setData({
              //       items: newItems,
              //     });
              //   });
              // }
            },
            fail: () => {},
            complete: () => {},
          });
  
        },
})