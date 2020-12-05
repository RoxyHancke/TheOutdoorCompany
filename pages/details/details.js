// pages/details/details.js
const app = getApp();
const img = '../image/location.png'
import moment from 'moment';

Page({
  data: {
          userInfo:[{
            id:"",
            name:"",
            image:"",
        },
        ],
        activity: {},
        trips:{},
          comments:[{comment:""}],
          scrollInto: "",
          inputVal: "",
          latitude: 23.099994,
          longitude: 113.324520,
          indicatorDots: false,
          autoplay: false,
          interval: 5000,
          duration: 1000,

          usergetInfo: [{
            id:"",
            image:'',

          }],
          options_id:"",
          pictures: []
        },
        onShareAppMessage() {
          return {
            title: 'swiper',
            path: 'page/component/pages/swiper/swiper'
          }
        },
        
  onLoad: function (options) {
   
    const UsergetInfo = new wx.BaaS.TableObject("TOC_userInfo");
    const Activities = new wx.BaaS.TableObject("TOC_trip");
  
    // const comment_storyId="5fbd042933015444fc5031e8"
    console.log("detail page options", options);
    // console.log(this.data.options.id)
                // UsergetInfo.expand(['userID']).get(options.tripId).then((res) => {
                //   console.log("halaluya", res );
                //   this.setData({
                //     userInfo: res.data
                //   });    

                // });
              // UsergetInfo.expand(['userID']).get(options.tripId).then((res) => {
  
              //     this.setData({ 
              //       image:res.data.profilePicture,
              //       name:res.data.nickName,
              //     });
              // });

              Activities.expand(['tripOwner']).get(options.tripId).then((res) => {
                      console.log("halaluya", res );
                      this.setData({
                        activity: res.data
                      });
            });
                  const trips = res.data.objects;
                  const pictures = [];
                  for(let i = 0; i < trips.length; i++) {
                    const picturesForOneTrip = trips[i].picture;
                    pictures.push(...picturesForOneTrip);
                  }
            
                  console.log("hayirdir insallah ",res);
                  const remappedTrips = trips.map((trip) => {
                    return {
                      ...trip,
                      tripStartDate: moment(trip.tripStartDate).format('DD/MM/YYYY')
                    }
                  })
                  console.log('ppp', pictures);
                  this.setData({
                        activity: remappedTrips,
                        pictures: pictures
                  }); 
                  console.log(that.t_picture) 
                  console.log(res);
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
        }
  
})