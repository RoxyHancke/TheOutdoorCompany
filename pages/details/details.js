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
          participantInfo:"",
          participants:{},
          participantForOne:{},
          partId:"",
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
      const Attendees = new wx.BaaS.TableObject("TOC_participant");
      const UserProfile = new wx.BaaS.TableObject("_userProfile");
            Activities.get(options.id).then((res) => {
              const formattedActivity = {
                ...res.data,
                tripStartDate: moment(res.data.tripStartDate).format("YYYY/MM/DD")
              }
              this.setData({
                    activity: formattedActivity,
                    OwnerForTrip : res.data.tripOwner,
                    max_attendees:res.data.max_attendees,
                    // attendees:res.data.objects,
                    // trips :res.data.objects[0],
              });    
              // ******Burasi
              const partQuery = new wx.BaaS.Query()
                  console.log(Query);
                  partQuery.compare("tripId", "=", options.id);
                  Attendees.expand(["participantId"]).setQuery(partQuery)
                        .find()
                              .then((res) => {
                                // console.log("orders return", res);
                                this.setData({
                                  attendees: res.data.objects,
                                  // participant:this.data.participantId
                                  // participants:res.data.objects[0].participantId,
                                });
// *****
                                                        const pictures = [];
                                                        const partipicants = res.data.objects;
                                                        console.log('ppp',partipicants) 
                                                      //  const attendees_UserID = [];
                                                               for (let i = 0; i < partipicants.length; i++) {
                                                                   const participantForOneTrip = partipicants[i].participantId.avatar;
                                                                   pictures.push(participantForOneTrip);
                                                               };
                                                           // })
                                                               console.log('UUU',partipicants.length)     
                                                               this.setData({
                                                                   participants: pictures,
                                                                   attendees_number:partipicants.length,
                                                               }); 
                                                               const percentage=100*this.data.max_attendees/this.data.attendees_number;
console.log("percentage," ,percentage);

    // *******                            
                              console.log((res.data.objects));
                              // const participant= res.data.objects;
                              
                              
                              // const tripId=Owner.id;
                              // const ownerId=Owner ForTrip.id;
                              });
                              const AvatarData=this.attendees;
                              // const  avatar=this.AvatarData[0].participantid
                              // console.log("avatar",this.AvatarData);
              // *******
            
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
                                                  
                                                        
                                                              
    },
    
    // indicatorDots: true,
    // autoplay: true,
    // interval: 5000,
    // duration: 1000
    

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
                    title: "Register",
                    content: `Do you want to join this trip?`,
                    showCancel: true,
                    cancelText: "Cancel",
                    cancelColor: "#000000",
                    confirmText: "Register",
                    confirmColor: "#3CC51F",
                    success: (result) => {
                            if (result.confirm) {

                                 const UsergetInfo = new wx.BaaS.TableObject("TOC_userInfo");
                            if (result.confirm) {   
                                 const Participant = new wx.BaaS.TableObject("TOC_participant");
                                  console.log("haaluyarrrrrrr",userInfo.id);
                                  const Query = new wx.BaaS.Query()
                                  console.log(Query);
                                  Query.compare("tripId", "=", QpartTripId);
                                  Participant.setQuery(Query)
                                        .find()
                                              .then((res) => {
                                                // this.setData({
                                                //   tripParticipant:res.data.objects,
                                                // });
                                                const tripParticipant = res.data.objects;
                                                var k=0;
                                                console.log("allahim sana geliyorum",res.data.objects);
                                                for (let i = 0; i < tripParticipant.length; i++) {
                                                    console.log("ukuku",tripParticipant[i].participantId.id)
                                                   if (tripParticipant[i].participantId.id==userInfo.id) {
                                                     console.log("varim");
                                                     k="true";
                                                  }else{
                                                    console.log("yokum");
                                                    k="false";
                                                  };
                                                };
                                                  console.log("k",k)
                                                    if(k==="false") {
                                                      console.log("niye geldim")
                                                    const NewParticipant = new wx.BaaS.TableObject("TOC_participant");
                                                    //create a blank entry
                                                    const newParticipant = NewParticipant.create();
                                                    //set the record
                                                          newParticipant.set({
                                                                tripId:QpartTripId,
                                                              participantId:userInfo.id,
                                                          });
                                                          newParticipant.save().then(
                                                            (res)=>{
                                                              console.log("User profile updated",res);
                                                              (error)=>{
                                                                console.log("new review save", eroor)}
                                                              }
                                                              
                                                              )
                                                              wx.switchTab({
                                                                url: '../home/home',
                                                              })
                                                            }else{
                                                              wx.showModal({
                                                                title: 'Information',
                                                                content: 'You are alrady in :D',
                                                                showCancel: false,

                                                                confirmText: 'Cancel',

                                                                confirmColor: '#3CC51F',
                                                              });
                                                            }
                                                  // pictures.push(participantForOneTrip,userInfo.id));
                                            //       for (let i = 0; i < pictures.length; i++) {
                                            //         const participantForOneTrip = partipicants[i].participantId.avatar;
                                            //         pictures.push(participantForOneTrip);
                                            //     };
                                            // // })
                                            //     console.log('UUU',partipicants.length)     
                                            //     this.setData({
                                            //         participants: pictures,
                                            //         attendees_number:partipicants.length,
                                            //     }); 
                                                
                                              });
                                              // Try getparticipant 
   
                                                                }}
                                          
                                                          }
                                                        });

                                                        };
                                                        
                                                      },
                                                     
                                                    })
                                                                    // const partId= res.data.objects[0].id,;
                                                                    // const OwnerForTrip = Owner.tripOwner;
                                                                      // const tripId=Owner.id;
                                                                      // const ownerId=OwnerForTrip.id;
                                                                      // console.log("tripowner", OwnerForTrip.id);
                                                                      // console.log("tripID", tripId);
              
                                                                    // const participant = Participant.getWithoutData(partId);
                                                                    // participant.set("participantId",userInfo.id);
                                                                    // participant.update().then(
                                                                      
                                                                    //   (res)=>{
                                                                        
                                                                    //     console.log("User profile updated",res);
                                                                    //   },
                                                                    //     (error)=>{
                                                                    //       console.log("new review save", error);
                                                                    //     }
                                                                    //   );
                                           
                            
  // register: function(e){
  //             console.log("formsubmit",e);
  //             const page = this;
  //             //the detail is stored under detail.value
  //             //get the data table
  //             const Participant = new wx.BaaS.TableObject("TOC_participant");
  //             const participant = Participant.getWithoutData(this.data.id);
  //             participant.set("participant",this.data.interest1);
  
  //             participant.update().then(
  //               (res)=>{
  //                 console.log("User profile updated",res);
  //                 (error)=>{
  //                   console.log("new review save", error)}
  //                 }
  //                 );
  //               }

// Check
  // const participicantPic=this.data.participants;
                                // ****load picture
                                  // const pictures = [];
                                  // const participantForOne=[];
                                  // const partipicants = res.data.objects[0];
                                  //  const attendees_UserID = [];
                                          //  for (let i = 0; i < participicantPic.length; i++) {
                                          //      participantForOne[i]= participicantPic[i].value;
                                          //     //  console.log(this.participantForOne[i]);
                                          //      console.log(participicantPic.length);
                                                // console.log(Query);
                                                //                   Query.compare("userID", "=", OwnerForTrip.id);
                                                //                   UsergetInfo.setQuery(Query)
                                                //                         .find()
                                                //                               .then((res) => {
                                                //                                 // console.log("orders return", res);
                                                //                                 this.setData({
                                                //                                   usergetInfo: res.data,
                                                //                                   name:res.data.objects[0].nickName,
                                                //                                   image:res.data.objects[0].profilePicture,
                                                //                                 });
                                                                                
                                                //                               });
                                                                     //  pictures.push(...participantForOneTrip);
                                          //  };
                                  //      // })
                                  //          console.log('ppp',patrtipicants)     
                                  //          this.setData({

                                  //              partipicants: partipicants
                                  //          });

     
         
         
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
                                                      //              pictures.push(...participantForOneTrip);
                                                      //          };
                                                      //      // })
                                                      //          console.log('ppp',patrtipicants)     
                                                      //          this.setData({
                                
                                                      //              partipicants: partipicants
                                                      //          }); 