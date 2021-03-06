// pages/home/home.js
const app = getApp();
import moment from 'moment';
Page({

  data: {
    userInfo:[{
      id:"",
      image:""
  },
  ],
    items:[],
    comments:[{comment:""}],
    scrollInto: "",
    inputVal: "",
    usergetInfo: [{
    id:"",
      image:'',

    }],
    trip:{
      tripStartDate:"",
     },
    options_id:"",
    tripTypeOptions:['Short hiking','Long hiking','Camping','Glamping','Trail running','Mountaineering','Biking','Others'],
    provinceOptions:['Beijing','Chongqing','Shanghai','Tianjin','Anhui','Fujian','Gansu','Guangdong','Guizhou','Hainan','Hebei','Heilongjiang','Henan','Hubei','Hunan', 'Jiangsu','Jiangxi','Jilin','Liaoning','Qinghai','Shaanxi','Shandong','Shanxi','Sichuan','Yunnan','Zhejiang','Guangxi','Inner Mongolia','Ningxia','Xinjiang','Tibet','Hong Kong','Macau','International']
  },


onLoad: function () {
  const Details = new wx.BaaS.TableObject("TOC_trip");
  // const UserInfos = new wx.BaaS.TableObject("TOC_userInfo");

            Details.find().then((res) => {
                // const formattedDetails = {
                //   ...res.data,
                //   tripStartDate: moment(res.data.tripStartDate).format("DD/MM/YYYY")
                // }
                const trips = res.data.objects;
                const remappedTrips = trips.map((trip) => {
                 return {
                     ...trip,
                    tripStartDate: moment(trip.tripStartDate).format('YYYY/MM/DD'),
                    //  console.log(tripStartDate);
                 };
                 });

              this.setData({

                // items:res.data.objects,
                  items:remappedTrips,

              });
              console.log("detail page result", res);
            }, (error) => {
              console.log("error", error);
            }
            );
  },

  toTripDetails: function(e){
    console.log("HALALUYA",e.currentTarget.id)
      wx.navigateTo({
        // details?tripOwner=fii23fi09r29038r3r290,
        url: `/pages/details/details?id=${e.currentTarget.id}`,
      });
    },
toNavigate: function () {
  wx.switchTab({
    url: 'pages/details/details',
  })
  },
  
tripTyperPicker:function(e){
  console.log("trip type filter",e)
  console.log("trip value",e.detail.value)
  wx.navigateTo({
      url:`/pages/picker/picker?id=${e.detail.value}`
  })
},

locationPicker: function(e){
  console.log("location picked",e)
  wx.navigateTo({
    url:`/pages/pickerLocation/pickerLocation?id=${e.detail.value}`
  })
}
}) 

