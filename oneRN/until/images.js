import VipSvg from "../assets/vipsvg";
import BfNumSvg from "../assets/bfnumsvg";
// import ZanSvg from "../assets/zansvg"
export default {
    icon:require('../assets/images/icon.png'), 
    logo:require('../assets/images/logo.png'), 
    play:require('../assets/images/icon_play.png'), 
    play:require('../assets/images/icon_play.png'), 
    pause:require('../assets/images/icon_zt.png'), 
    cortwrap:require("../assets/images/cortwrap.png"),
    VipSvg:VipSvg,
    BfNumSvg:BfNumSvg,
    // ZanSvg:ZanSvg,
    httpUrl:'http://www.yangdh.xyz',
    videoUrl:"/videogetprocess.ashx?sort=videoDetail",        //视频接口
    videoLike:'/VideoGetProcess.ashx?sort=guessYouLike',      //视频 推荐列表
    BitList:'/adGetProcess.ashx?sort=videoDetailAd',          //视频广告 
    swiper:'/VideoGetProcess.ashx?sort=flash',                //banner 
    HomeList:'/videogetprocess.ashx?sort=channel&label=0',    //首页列表
} 
  