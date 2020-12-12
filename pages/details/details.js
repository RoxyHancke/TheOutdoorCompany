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
        
    onLoad: function(options) {
      const UsergetInfo = new wx.BaaS.TableObject("TOC_userInfo");
      const Activities = new wx.BaaS.TableObject("TOC_trip");
      const Attendees = new wx.BaaS.TableObject("TOC_participant");
      // const UserProfile = new wx.BaaS.TableObject("_userProfile");

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
        const partQuery = new wx.BaaS.Query()
        partQuery.compare("tripId", "=", options.id);
        Attendees.expand(["participantId"]).setQuery(partQuery).find().then((res) => {              
          this.setData({ attendees: res.data.objects });
          const pictures = [];
          const partipicants = res.data.objects;
          for (let i = 0; i < partipicants.length; i++) {
              const participantForOneTrip = partipicants[i].participantId.avatar;
              pictures.push(participantForOneTrip);
          };
          this.setData({ participants: pictures, attendees_number:partipicants.length }); 
        });
        
        const Owner = res.data;
        const OwnerForTrip = Owner.tripOwner;
        const tripId = Owner.id;
        const Query = new wx.BaaS.Query()
        
        wx.setStorageSync('partTripId', tripId);

        Query.compare("userID", "=", OwnerForTrip.id);
        UsergetInfo.setQuery(Query).find().then((res) => {
          this.setData({
            usergetInfo: res.data,
            name:res.data.objects[0].nickName,
            image:res.data.objects[0].profilePicture,
          });
        });
      })
    },
    
    changeIndicatorDots() {
      this.setData({ indicatorDots: !this.data.indicatorDots })
    },

    changeAutoplay() {
      this.setData({ autoplay: !this.data.autoplay })
    },

    intervalChange(e) {
      this.setData({ interval: e.detail.value })
    },

    durationChange(e) {
      this.setData({ duration: e.detail.value })
    },

    share: function () {
      console.log(share);
      wx.showShareMenu({ withShareTicket: true })
    },

  register: function () {
    const userInfo = wx.getStorageSync("userInfo");
    const QpartTripId = wx.getStorageSync("partTripId");

    if (userInfo.id) {
      this.setData({ userInfo: userInfo });
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
            wx.navigateTo({ url: '../qr/qr' })
            
            const Participant = new wx.BaaS.TableObject("TOC_participant");
            const Query = new wx.BaaS.Query()
            
            Query.compare("tripId", "=", QpartTripId);
            Participant.setQuery(Query).find().then((res) => {
              const tripParticipant = res.data.objects;
              let k = "false";
              for (let i = 0; i < tripParticipant.length; i++) {
                if (tripParticipant[i].participantId.id == userInfo.id) {
                  k = "true";
                } else {
                  k = "false";
                };
              };
              if ( k === "false" ) {
                const NewParticipant = new wx.BaaS.TableObject("TOC_participant");
                const newParticipant = NewParticipant.create();
                
                newParticipant.set({
                  tripId: QpartTripId,
                  participantId: userInfo.id,
                });
                
                newParticipant.save().then((res) => {})
                
                wx.showModal({
                  title: "Registered",
                  content: `You are succesfully registered`,
                  showCancel: false,
                  cancelText: "Ok",
                  cancelColor: "#000000",
                  confirmText: "Ok",
                  confirmColor: "#3CC51F",
                  success: (result) => {
                    wx.switchTab({ url: '../home/home' })
                  }
                })
              } else { 
                k == "true"
                wx.showModal({
                  title: 'Information!',
                  content: 'You are already in!',
                  showCancel: false,
                  confirmText: 'Cancel',
                  confirmColor: '#3CC51F',
                })
              }
            })
          }
        }
      })
    } else {
      wx.showModal({
        title: 'Information!',
        content: 'You must be first log in plaese!',
        showCancel: false,
        confirmText: 'Canel',
        confirmColor: '#3CC51F'
      })
    }
  },
    
    sendMsg: function (e) {
      console.log("message owner",e);
      console.log("trip",this.data.activity.id);
      wx.navigateTo({ url: `../send/send?id=${this.data.activity.id}`})
    }                                        
})