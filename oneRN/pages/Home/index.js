/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Fragment,Component} from 'react';
import { SafeAreaView, StyleSheet, ScrollView, View, Dimensions,
Text,TextInput,StatusBar,Image,Platform,TouchableWithoutFeedback} from 'react-native';

import { Header, LearnMoreLinks, Colors, DebugInstructions, ReloadInstructions, } from 'react-native/Libraries/NewAppScreen';
//引入 icon
import Icon from 'react-native-vector-icons/Ionicons';
import AntIcon from 'react-native-vector-icons/AntDesign';
import MaterIcon from 'react-native-vector-icons/MaterialCommunityIcons';
// Design
//引入适配js 文件
import px2dp from "../../until/Dimensions";
//引入全局 img文件
import LocalImg from "../../until/images";
//引入 svg 图片文件
import DownSvg from "../../assets/downsvg";
import JxSvg from "../../assets/jxsvg";
//引入 swiper 滚动区域
import SwiperCon from "../component/swiper";
//列表区域
import HomeList from "../component/Homelist";
//获取手机信息
import DeviceInfo from 'react-native-device-info';
const device = {};
device.DeviceID = DeviceInfo.getUniqueID(); 
//tab 滑动
import ScrollableTabView, {DefaultTabBar,ScrollableTabBar} from 'react-native-scrollable-tab-view';
// export default HomePage = () => {
//引入第一个滑动
import HomeRecom from "./HomeRecom";
import HomeRecomLL from "./HomeLL";
import HomeZB from "./HomeZB";
export default class HomePage extends Component {
  constructor(props) {
    super(props);
    this.navigation = props.navigation;
  } 
  _renderHeader(){
    return(
      <View style={styles.header}> 
          {/* <Text>{device.DeviceID}</Text> */}
          <Image source={LocalImg['logo']} style={{width:px2dp(28), height:px2dp(25), resizeMode: "contain"}} />
          <View style={styles.searchBox}>
            <TouchableWithoutFeedback onPress={()=>{}}>
              <View style={[styles.searchBtn, {}]}>
                <TextInput style={styles.searInp} />
                <Icon name="md-search" size={px2dp(25)} color="#fff" style={styles.searIcon} />
              </View>
            </TouchableWithoutFeedback>
            <View style={ styles.searRight }> 
              <MaterIcon name="arrow-collapse-down" size={px2dp(20)} color={"#FFF"} style={{marginHorizontal:px2dp(20)}} /> 
              <JxSvg color={ "#fff" } />  
            </View>
          </View>
      </View>
    )
  }
  render() {
    return (
      <Fragment> 
        <SafeAreaView style={{flex:1}}>
          <ScrollableTabView
            style={{flex:1}}
            ref={'tabView'}
            renderTabBar={()=> <DefaultTabBar />}
            tabBarBackgroundColor='#fff'
            tabBarActiveTextColor='#fa76fd' 
            tabBarUnderlineStyle={{backgroundColor: '#fa76fd'}}//设置DefaultTabBar和ScrollableTabBarTab选中时下方横线的颜色
          > 
            <HomeRecom tabLabel="推荐" {...this.props} />

            <HomeRecomLL tabLabel="萝莉" {...this.props}></HomeRecomLL>
            
            <HomeZB tabLabel="主播" {...this.props}></HomeZB> 

          </ScrollableTabView>
        </SafeAreaView>
      </Fragment>
    );
  } 
};
const isIOS = Platform.OS == "ios"
const headH = px2dp(isIOS?110:90)
const styles = StyleSheet.create({
  scrollView: {
    backgroundColor:"#f5f5f5",
    // marginBottom:Dimensions.get('window').height*0.075,
    marginBottom:Dimensions.get('window').height*0.075,
  }, 
  header:{ 
    backgroundColor:'#323232',
    padding:px2dp(10),
    height:headH,  
    overflow:"hidden", 
  }, 
  searchBox:{
    flex:1,
    flexDirection: "row", 
    alignItems: "center",
    justifyContent: "space-between", 
  },
  searchBtn:{
    position: 'relative',  
    flex:1,
    flexDirection: "row",  
  }, 
  searIcon:{
    position:'absolute',
    right:0,
    paddingRight:px2dp(15), 
    paddingLeft:px2dp(5),
    paddingTop:px2dp(3),
    // backgroundColor:'#242424',
    // borderRadius:50,
  },
  searInp:{
    flex:1,
    color:"#fff",
    paddingLeft:px2dp(15),
    paddingRight:px2dp(45),
    backgroundColor:'#242424',
    borderRadius:50,
    // height:px2dp(30),
    lineHeight:px2dp(30),
    fontSize:px2dp(14),
  },
  searRight:{   
    flexDirection: "row", 
    alignItems: "center",
  },  
});


