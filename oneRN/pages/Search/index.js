/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Fragment,Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Image,
  StatusBar,
  Animated,
  FlatList,
  RefreshControl,
  ActivityIndicator
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors, 
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import Icon from 'react-native-vector-icons/AntDesign';
import px2dp from '../../until/Dimensions';
import ScrollableTabView, {DefaultTabBar,ScrollableTabBar} from 'react-native-scrollable-tab-view';
import SearHeader from "../component/searchHead";
//
import LocalImg from "../../until/images"
// export default HomePage = () => {  
const _list = [
  {
    title: '美仁枣300g',
    imageUrl: 'https://a.vpimg4.com/upload/merchandise/pdcvis/602520/2018/0611/93/7f380e8c-627e-4162-b68c-a16ad98f9609_5t.jpg',
    price: 38,
  }, {
    title: '2件起售】香蕉干90g',
    imageUrl: 'https://a.vpimg2.com/upload/merchandise/pdcvis/610789/2018/0420/114/54c7ae6a-1b94-44d9-bd38-0d46326aa683_t.jpg',
    price: 19,
  }, {
    title: '【2件起售】七彩葡萄干420g',
    imageUrl: 'https://a.vpimg3.com/upload/merchandise/pdcvis/602520/2018/0611/81/faf4abe6-e212-4347-9369-118028bec2fe_5t.jpg',
    price: 27,
  }, {
      title: '优你康罐装牛奶双味棒棒糖720g',
      imageUrl: 'https://a.vpimg3.com/upload/merchandise/pdcvis/605346/2018/0509/184/5a1c29d8-b127-40c5-b239-4b0c5b5b1e1b.jpg',
      price: 128,
  }
]; 

export default class SearchPage extends Component {
  constructor(props) {
    super(props);
    this.navigation = props.navigation;
    this.state = {
      isRefreshing:false,
      listLoading: false,
      showFoot: 0, // 控制foot， 0：隐藏footer  1：已加载完成,没有更多数据   2 ：显示加载中
    }
  }
  _onRefresh = () => { 
    this.setState({isRefreshing: true});
    setTimeout(() => {
      this.setState({isRefreshing: false}); 
    }, 2000)
  } 
  _renderFooter () {
    const _showFoot = this.state.showFoot;
    switch(_showFoot){
      case 1:
      case '1':
        return(
          <View style={{height:30,alignItems:'center',justifyContent:'flex-start',}}>
              <Text style={{color:'#999999',fontSize:14,marginTop:5,marginBottom:5,}}>
                  没有更多数据了
              </Text>
          </View>
        ) 
      break;  
      case 2:
      case '2':
        return(
          <View style={{height:30,alignItems:'center',justifyContent:'flex-start',}}>
              <ActivityIndicator animating={true} color='red' size="large" />
              <Text style={{color:'#999999',fontSize:14,marginTop:5,marginBottom:5,}}>
                正在加载更多数据...
              </Text>
          </View>
        ) 
      break;  
      default:
        return( 
          <View>
            <Text></Text>
          </View>
        )
      break;  
    } 
  } 
  _onEndReached(){ 
    //如果是正在加载中或没有更多数据了，则返回
    // alert(this.state.showFoot)
    if(this.state.showFoot != 0 ){
        return ;
    }  
    //底部显示正在加载更多数据
    this.setState({showFoot: 2}); 
    for (let index = 0; index < 9; index++) {
      _list.push({
        imageUrl:'http://img95.699pic.com/photo/50055/5642.jpg_wh300.jpg',
        title:'假如你还想着我'
      })  
    }
    setTimeout(() => {
      this.setState({showFoot: 0}); 
      // alert(this.state.showFoot)
    }, 2000)
  } 
  _renderItem(item){
    return(
      <View style={styles.listBox} onPress={ () => this.navigation.navigate("PlayPage") }>  
        <Image style={{ height:80,flex:1, }} source={{uri: item.item.imageUrl}} />
        <View style={styles.listRight}>
            <View style={styles.rightItem}>
              <Text style={styles.title} numberOfLines={2} ellipsizeMode={'tail'}>{item.item.title}</Text>
              <Text>01:20:30</Text>
            </View> 
            <View style={styles.rightItem}>
              <View style={styles.bfIcon}>
                <LocalImg.BfNumSvg color={"#999"} />
                <Text style={{paddingTop:px2dp(1.6),color:'#999'}}>6.3万</Text>
              </View> 
              <View style={styles.zanIcon}></View>
              <Text><Icon name="like2" size={px2dp(14)} />1002</Text>
            </View> 
        </View>
      </View>
  
    )
  } 
  render() { 
    return (
      // <Fragment>
        <SafeAreaView style={{flex:1}}>
          <SearHeader></SearHeader>
          <View style={{flex:1,}}>  
            <ScrollableTabView
              style={{flex:1}}
              renderTabBar={()=> <DefaultTabBar />}
              tabBarBackgroundColor='#fff'
              tabBarActiveTextColor='#fa76fd' 
              tabBarUnderlineStyle={{backgroundColor: '#fa76fd'}}//设置DefaultTabBar和ScrollableTabBarTab选中时下方横线的颜色
            >
              {/* <ScrollView tabLabel='热搜'> */}
                <FlatList
                  tabLabel='热搜'
                  data = {_list}
                  keyExtractor={this._keyExtractor}
                  renderItem = { (item) => this._renderItem(item) }
                  // onEndReachedThreshold={0.1} 
                  // onEndReached={this._onEndReached.bind(this)}
                  ListFooterComponent={this._renderFooter.bind(this)}
                  refreshControl={
                    <RefreshControl 
                      refreshing={this.state.isRefreshing}
                      colors={['#ff0000', '#00ff00', '#0000ff']}
                      progressBackgroundColor={"#ffffff"} 
                      onRefresh={ this._onRefresh }  
                    />
                  }
                ></FlatList>  
              {/* </ScrollView> */}
    
              <ScrollView tabLabel='日榜'>
              {/* this.navigation.navigate("PlayPage") alert(this.navigation.navigate)*/}
                <Text onPress={ () => this.navigation.navigate("PlayPage") }>周运动</Text>
              </ScrollView>
    
              <ScrollView tabLabel='周榜'>
                <Text>月运动</Text>
              </ScrollView>
    
              <ScrollView tabLabel='月榜'>
                <Text>年运动</Text>
              </ScrollView>
            </ScrollableTabView>
          </View> 
        </SafeAreaView> 
    );
  }  
};

const styles = StyleSheet.create({
  listBox:{
    flex:1,
    justifyContent:'center',
    flexDirection: 'row',
    paddingVertical:px2dp(10),
    paddingHorizontal:px2dp(5),
    borderBottomColor:"#CDCDCD",
    borderBottomWidth:px2dp(1)
  },
  listRight:{ flex:2,},
  rightItem:{  
    paddingVertical:px2dp(2),
    paddingLeft:px2dp(5),
    flexDirection: 'row', 
  },
  title:{
   fontSize:px2dp(14), 
   flex:1, 
  },
  bfIcon:{
    flex:1, 
    flexDirection:'row',
    paddingRight:px2dp(10)
  },
  zanIcon:{ paddingLeft:px2dp(10) },
  footer:{
    flexDirection:'row',
    height:24,
    justifyContent:'center',
    alignItems:'center',
    marginBottom:10,
  }, 
});


