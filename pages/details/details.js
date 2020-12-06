const app = getApp();
const img = '../image/location.png'
import moment from 'moment';

Page({
    data: {
        userInfo: [{
            id: "",
            name: "",
            image: "",
        }],
        activity: {
          tripDes:""
        },
        trips: {},
        comments: [{
            comment: ""
        }],
        scrollInto: "",
        inputVal: "",
        latitude: 23.099994,
        longitude: 113.324520,
        indicatorDots: false,
        autoplay: false,
        interval: 5000,
        duration: 1000,

        usergetInfo: [{
            id: "",
            image: '',

        }],
        options_id: "",
        pictures: []
    },
    onShareAppMessage() {
        return {
            title: 'swiper',
            path: 'page/component/pages/swiper/swiper'
        }
    },

    onLoad: function(options) {
        const Activities = new wx.BaaS.TableObject("TOC_trip");
        Activities.get(options.tripId).then((res) => {
            console.log("halaluya", res);
            this.setData({
                activity: res.data
            });
          }),
            console.log(res);
             const trips = res.data.objects;
            // const pictures = [];
            // for (let i = 0; i < trips.length; i++) {
            //     const picturesForOneTrip = trips[i].picture;
            //     pictures.push(...picturesForOneTrip);
            // }

            // const remappedTrips = trips.map((trip) => {
            //     return {
            //         ...trip,
            //         tripStartDate: moment(trip.tripStartDate).format('DD/MM/YYYY')
            //     }
            // })
            // console.log('ppp', pictures);
            // this.setData({
            //     activity: remappedTrips,
            //     pictures: pictures
            // });
      

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