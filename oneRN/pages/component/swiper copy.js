
// import React, {Component} from 'react';

// import {
//     TouchableOpacity,
//     StyleSheet,
//     Image,
//     ImageBackground,
//     Text,
//     View,
// } from 'react-native';

// import Swiper from 'react-native-swiper';
// // import Loading from './Loading';
// // import LinearGradient from "react-native-linear-gradient";
// import {Actions} from "react-native-router-flux";
// import {connect} from 'react-redux' 
// class SwiperCon extends Component { 
//     constructor(props) {
//         super(props)
//         this.state = {
//             refreshing: false,
//             hasMore: true,
//             showTimeList: [],
//             comeingNewList: [],
//             attentionList: [],
//             selectedTab: '正在热映'
//         }
//     }
//     render() {
//         const data = [
//             {
//                 columnName: '财神棋牌-真金棋牌-注册送18-秒出款',
//                 image_url: 'http://www.niudmw.com/uploads/allimg/180822/1-1PR215423E46.PNG'
//             },
//             {
//                 columnName: '白床上的花瓣美女人体[19P]',
//                 image_url: 'https://mmtp1.com/picdata-watermark/a1/526/52664-1.jpg'
//             },
//             {
//                 columnName: 'SSNI-131 梦乃爱佳粉丝感谢活动 爆乳av偶像×',
//                 image_url: 'http://img2.minqingguancha.com:8099/2019-6/SSNI-131_FHD_CH.jpg'
//             },
//         ];
//         return (
//             <Swiper style={styles.wrap}
//                     autoplay={true}
//                     autoplayTimeout={5}
//                     paginationStyle={{bottom: 10, right: 10, justifyContent: 'flex-end'}}
//                     dotStyle={{width: 6, height: 6}}
//                     activeDotStyle={{width: 6, height: 6}}>
//                 {
//                     data.map((d, i) => (
//                         <TouchableOpacity
//                             key={i}
//                             activeOpacity={.5}
//                             onPress={() => { Actions.VideoDetail()}}
//                             resizeMode="cover"
//                             style={styles.item}>

//                             <ImageBackground style={styles.bg} resizeMode="cover"
//                                              source={{uri: d.image_url}}>
//                                 {/* <LinearGradient colors={["rgba(255,255,255,0)", "#000000"]}
//                                                 style={styles.coverLinearGradient}>
//                                 </LinearGradient> */}
//                                 <View style={styles.iteminfo}>
//                                     <Text style={styles.title}>{d.columnName}</Text>
//                                 </View>

//                             </ImageBackground>
//                         </TouchableOpacity>
//                     ))
//                 }
//             </Swiper>
//         )
//     }
// };



// export default SwiperCon

// const styles = StyleSheet.create({
//     wrap: {
//         height: 180,
//         flex: 1,
//     },
//     item: {
//         height: 180,
//         overflow: 'hidden',
//         backgroundColor: '#000000',
//         shadowColor: 'red',
//         shadowOffset: {x: 1.5, y: 10},
//         shadowOpacity: 0.9,
//     },
//     bg: {
//         flex: 1,
//         padding: 0,
//         alignItems: 'center',
//         backgroundColor: '#000000',
//     },
//     iteminfo: {
//         flex: 1,
//         top: '60%',
//         // backgroundColor:'#eee',
//         width: '100%',
//         paddingTop: 10,
//         paddingLeft: 15,
//         zIndex: 105
//     },
//     title: {
//         marginTop: 20,
//         color: '#fff',
//         fontSize: 15,
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center'
//     },
//     coverLinearGradient: {
//         position: 'absolute',
//         bottom: 0,
//         zIndex: 100,
//         height: '35%',
//         width: '100%',
//         opacity: 0.9
//     },

// });
