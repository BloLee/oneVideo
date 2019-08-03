import React, {Component} from 'react';
import {View, Dimensions, Image, Text, Slider, TouchableWithoutFeedback, TouchableOpacity, ScrollView, StyleSheet} from 'react-native';
import Video from 'react-native-video';
import Orientation from 'react-native-orientation';
import px2dp from '../../until/Dimensions';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import AntIcon from 'react-native-vector-icons/AntDesign';
import IconIon from 'react-native-vector-icons/Ionicons';
import FeatherIcon from 'react-native-vector-icons/Feather';
import LocalImg from "../../until/images"; 
import httpUntil from "../../until/httpUntil"
const screenWidth = Dimensions.get('window').width;
import DeviceInfo from 'react-native-device-info';
const device = {};
device.DeviceID = DeviceInfo.getUniqueID(); 
const list = [
    {
      title: '美仁枣300g',
      imageUrl: 'http://www.yangdh.xyz/videoimg/20190731/04013533.jpg',
      price: 38,
    }, {
      title: '2件起售】香蕉干90g',
      imageUrl: 'http://www.yangdh.xyz/videoimg/20190731/12082304.jpg',
      price: 19,
    }, {
      title: '【2件起售】七彩葡萄干420g',
      imageUrl: 'http://www.yangdh.xyz/videoimg/20190731/04013533.jpg',
      price: 27,
    }, {
        title: '优你康罐装牛奶双味棒棒糖720g',
        imageUrl: 'http://www.yangdh.xyz/videoimg/20190730/11500162.jpg',
        price: 128,
    },{
        title: '美仁枣300g',
        imageUrl: 'http://www.yangdh.xyz/videoimg/20190731/04013533.jpg',
        price: 38,
      }, {
        title: '2件起售】香蕉干90g',
        imageUrl: 'http://www.yangdh.xyz/videoimg/20190731/12082304.jpg',
        price: 19,
      }, {
        title: '【2件起售】七彩葡萄干420g',
        imageUrl: 'http://www.yangdh.xyz/videoimg/20190731/04013533.jpg',
        price: 27,
      }, {
          title: '优你康罐装牛奶双味棒棒糖720g',
          imageUrl: 'http://www.yangdh.xyz/videoimg/20190730/11500162.jpg',
          price: 128,
    }
    
]; 
function formatTime(second) {
    let h = 0, i = 0, s = parseInt(second);
    if (s > 60) {
      i = parseInt(s / 60);
      s = parseInt(s % 60);
    }
    // 补零
    let zero = function (v) {
      return (v >> 0) < 10 ? "0" + v : v;                        
    };
    return [zero(h), zero(i), zero(s)].join(":");
}
export default class PlayPage extends Component {
  
    static navigationOptions =  ({ navigation }) => {
        return {
        title: navigation.getParam('title'),
        };
    }; 
    constructor(props) {
        super(props);   
        const { params } = this.props.navigation.state; 
        this.state = {
            videoUrl: "https://liaoning.olevod.eu/20190728/Zck3dDFt/index.m3u8",    //视频地址
            videoCover: "http://124.129.157.208:8889/data/uploads/kecheng/2018/01/18/5a600b2c99836.png@0o_0l_220w.png", //视频占位图地址
            videoWidth: screenWidth,
            videoHeight: screenWidth, // 默认16：9的宽高比
            showVideoCover: true,    // 是否显示视频封面
            showVideoControl: false, // 是否显示视频控制组件
            isPlaying: false,        // 视频是否正在播放
            currentTime: 0,        // 视频当前播放的时间
            duration: 0,           // 视频的总时长
            isFullScreen: false,     // 当前是否全屏显示
            playFromBeginning: false, // 是否从头开始播放
            did:params?params.did:null,
            videInfo:null,  //视频数据
            bitList:[],   //广告位数据
            RecomList:[], //推荐列表
        };
    }
    //组件加载完成 
    componentDidMount(){
        this.getVideo(); 
        this.getBit();   
    }  
    //获取 视频数据
    getVideo (id) {  
        const _url = LocalImg.httpUrl + LocalImg.videoUrl + '&did=' + this.state.did +'&phoneimei=' + device.DeviceID;   
        httpUntil.get(_url)
        .then(result=> {
            if( result.success ){
                this.setState({
                    videInfo:result.data[0],
                    videoUrl: result.data[0].vurl,
                    videoCover:result.data[0].horimg,
                })
                this.getRecom(result.data[0].labelIds);
            }
            
        })
    }
    //获取 广告数据
    getBit(){
        const _url = LocalImg.httpUrl + LocalImg.BitList; 
        httpUntil.get(_url)
        .then(result=> {
            if( result.success ){
                this.setState({
                    bitList:result.data
                })
            } 
        })
    }
    //获取 推荐列表
    getRecom(labelIds){
        if( this.state.videInfo.labelIds || labelIds ){
            // num=10&labelids=3,6,11,26
            const _url = LocalImg.httpUrl + LocalImg.videoLike + '&num=10' +'&labelids=' + this.state.videInfo.labelIds+'&did='+ this.state.did;  
            httpUntil.get(_url)
            .then(result=> {
                if( result.success ){
                    this.setState({
                        RecomList:result.data
                    })
                }
                
            })
        }
        
    }
    //视频开始加载
    _onLoadStart = () => {}; 
    //视频缓冲中...
    _onBuffering = () => {}; 
    //视频加载完成
    _onLoaded = (data) => {
        this.setState({
            duration: data.duration,
        });
    };
    //视频进度更新
    _onProgressChanged = (data) => {
        if (this.state.isPlaying) {
            this.setState({
                currentTime: data.currentTime,
            })
        }
    };
    //视频播放结束
    _onPlayEnd = () => {
        this.setState({
            currentTime: 0,
            isPlaying: false,
            playFromBeginning: true
        });
    };
    //视频播放失败
    _onPlayError = () => {}; 
    ///-------控件点击事件-------
    /// 控制播放器工具栏的显示和隐藏
    hideControl() {
        if (this.state.showVideoControl) {
            this.setState({
                showVideoControl: false,
            })
        } else {
            this.setState(
                { showVideoControl: true, }, () => {
                    // 5秒后自动隐藏工具栏
                    setTimeout(
                        () => {
                        this.setState({
                            showVideoControl: false
                        })
                        }, 5000
                    )
                }
            )
        }
    } 
    /// 点击了播放器正中间的播放按钮
    onPressPlayButton() {
        let isPlay = !this.state.isPlaying;
        this.setState({
        isPlaying: isPlay,
        showVideoCover: false
        });
        if (this.state.playFromBeginning) {
            this.videoPlayer.seek(0);
            this.setState({
                playFromBeginning: false,
            })
        }
    } 
    /// 点击了工具栏上的播放按钮
    onControlPlayPress() {
        this.onPressPlayButton();
    } 
    /// 点击了工具栏上的全屏按钮
    onControlShrinkPress() {
        if (this.state.isFullScreen) {
            Orientation.lockToPortrait();
        } else {
            Orientation.lockToLandscape();
        }
    } 
    /// 进度条值改变
    onSliderValueChanged(currentTime) {
        this.videoPlayer.seek(currentTime);
        if (this.state.isPlaying) {
            this.setState({
                currentTime: currentTime
            })
        } else {
            this.setState({
                currentTime: currentTime,
                isPlaying: true,
                showVideoCover: false
            })
        }
    } 
    /// 屏幕旋转时宽高会发生变化，可以在onLayout的方法中做处理，比监听屏幕旋转更加及时获取宽高变化
    _onLayout = (event) => {
        //获取根View的宽高
        let {width, height} = event.nativeEvent.layout; 
        // 一般设备横屏下都是宽大于高，这里可以用这个来判断横竖屏
        let isLandscape = (width > height);
        if (isLandscape){
            this.setState({
                videoWidth: width,
                videoHeight: height,
                isFullScreen: true,
            })
        } else {
            this.setState({
                videoWidth: width,
                videoHeight: width * 4/3,
                isFullScreen: false,
            })
        }
        Orientation.unlockAllOrientations();
    }; 
    /// -------外部调用事件方法------- 
    ///播放视频，提供给外部调用
    playVideo() {
        this.setState({
            isPlaying: true,
            showVideoCover: false
        })
    }
    
    /// 暂停播放，提供给外部调用
    pauseVideo() {
        this.setState({
        isPlaying: false,
        })
    }
    //视频类型  --- 页面绑定
    _videoLabel(index){
        if( index == 0 ){
            return(
                <View style={{flex:1,flexDirection:'row',flexWrap:'wrap',paddingVertical:px2dp(10),paddingHorizontal:px2dp(3)}}>
                    {
                        this.state.videInfo.labelCons ? 
                        this.state.videInfo.labelCons.split(",").map( (item,i) => (
                            <Text style={{ paddingHorizontal:px2dp(15), paddingVertical:px2dp(5), backgroundColor:'#f5f5f5',
                            marginHorizontal:px2dp(2), borderRadius:px2dp(50),marginVertical:px2dp(3),fontSize:px2dp(12)}}>{item}</Text>    
                        ))
                        : null
                    }
                </View>
            )
        }
    }
    render() {
        return (
            <View style={styles.container}>  
                {
                    this.state.videInfo ? 
                    <View style={{flex:1}}>
                        <View style={{width: '100%', height:260, backgroundColor: '#000',position:'relative'}}>
                            <Video
                                source={{uri: this.state.videoUrl}} ////视频地址
                                ref={(ref) => this.videoPlayer = ref}
                                resizeMode={'cover'}
                                poster={this.state.videoCover}      //默认视频展示图片
                                audioOnly={true}
                                // rate={1}//播放速率
                                // paused={false}//暂停
                                // volume={1}//调节音量
                                // muted={true}//控制音频是否静音
                                // showVideoControl={true}
                                rate={1.0}
                                volume={1.0}
                                muted={false}
                                paused={!this.state.isPlaying}
                                resizeMode={'contain'}
                                playWhenInactive={false}
                                playInBackground={false}
                                ignoreSilentSwitch={'ignore'}
                                progressUpdateInterval={250.0}
                                onLoadStart={this._onLoadStart}
                                onLoad={this._onLoaded}
                                onProgress={this._onProgressChanged}
                                onEnd={this._onPlayEnd}
                                onError={this._onPlayError}
                                onBuffer={this._onBuffering}
                                style={{width: '100%', height: '100%',flex:1}}// 播放完成后的回调
                            />  
                            <TouchableWithoutFeedback onPress={() => { this.hideControl() }}>
                                <View style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    width: this.state.videoWidth,
                                    height: this.state.videoHeight,
                                    backgroundColor: this.state.isPlaying ? 'transparent' : 'rgba(0, 0, 0, 0.2)',
                                    alignItems:'center',
                                    justifyContent:'center'
                                }}>
                                {
                                    this.state.isPlaying ? null :
                                    <TouchableWithoutFeedback onPress={() => { this.onPressPlayButton() }}>
                                            <View style={{ width:px2dp(45),height:px2dp(45), backgroundColor:'#CF7DB8',borderRadius:50,alignItems:'center',justifyContent:'center' }}>
                                                <Icon name="control-play" size={px2dp(18)} color={"#fff"}></Icon>
                                            </View>
                                    </TouchableWithoutFeedback>
                                }
                                </View>
                            </TouchableWithoutFeedback>
                            {
                                this.state.showVideoControl ?
                                <View style={[styles.control, {width:this.state.videoWidth}]}>
                                    {/* 视频菜单栏  播放与暂停 */}
                                    <TouchableOpacity style={{ paddingLeft:px2dp(8), paddingRight:px2dp(5) }} activeOpacity={0.3} onPress={() => { this.onControlPlayPress() }}>
                                        {
                                            this.state.isPlaying ?  
                                            <IconIon name="md-pause" size={px2dp(14)} color={"#fff"} />
                                            : <IconIon name="md-play" size={px2dp(14)} color={"#fff"} /> 
                                        } 
                                    </TouchableOpacity>
                                    {/* 视频菜单栏  播放与暂停 --------- */}
                                    
                                    <Text style={styles.time}>{formatTime(this.state.currentTime)}</Text>
                                    <Slider
                                    style={{flex: 1}}
                                    maximumTrackTintColor={'#999999'}
                                    minimumTrackTintColor={'#00c06d'}
                                    //   thumbImage={require('../../assets/image/icon_control_slider.png')}
                                    value={this.state.currentTime}
                                    minimumValue={0}
                                    maximumValue={this.state.duration}
                                    onValueChange={(currentTime) => { this.onSliderValueChanged(currentTime) }}
                                    />
                                    <Text style={styles.time}>{formatTime(this.state.duration)}</Text>
                                    {/* 视频时长 进度条 ------ */}
                                    {/* 全屏按钮 */}
                                    <TouchableOpacity activeOpacity={0.3} style={{ paddingLeft:px2dp(5), paddingRight:px2dp(8) }} onPress={() => { this.onControlShrinkPress() }}> 
                                        {
                                            this.state.isFullScreen ? 
                                            <AntIcon name="scan1" size={px2dp(14)} color={"#fff"} />
                                            : <IconIon name="md-qr-scanner" size={px2dp(14)} color={"#fff"} />
                                        } 
                                    </TouchableOpacity>
                                    {/* 全屏按钮----- */}
                                </View> : null
                            } 
                            {/* 一些播放按钮 */} 
                        </View> 
                        {/* 滚动区域 ---- 推荐 */}
                        <ScrollView style={styles.container}>
                            {/* 视频详情 */}
                            <View style={{padding:px2dp(10),backgroundColor:'#fff'}}>
                                {/*标题*/}
                                <View>
                                    <Text style={{fontSize:px2dp(14), fontWeight: '500'}}>{this.state.videInfo.vtitle}</Text>
                                </View>
                                {/*播放量*/}
                                <View style={{flexDirection: 'row',width: '100%',marginTop: 10,marginBottom: 10,}}>
                                    <View style={{width: '50%', justifyContent: 'flex-start'}}>
                                        <Text style={{fontSize:px2dp(12), color: '#989898'}}>时长：{this.state.videInfo.time}</Text>
                                    </View>
                                    <View style={{  width: '50%', justifyContent: 'flex-end' }}>
                                        <Text style={{fontSize:px2dp(12), color: '#989898', textAlign: 'right'}}>播放量：{this.state.videInfo.looknum}</Text> 
                                    </View>
                                </View>  
                                {/* 点赞对比区域 */}
                                <View style={{}}>
                                    <AntIcon name="like2" size={px2dp(20)} color={'red'}></AntIcon>
                                </View>
                            </View>
                            {/* 视频详情 // ------------------ */}

                            {/* 广告位置 以及视频 类别 */} 
                            <View style={{backgroundColor:"#fff",marginVertical:px2dp(10)}}> 
                                {
                                    this.state.bitList.length > 0 ?
                                        <View>
                                            {
                                                this.state.bitList.map((item,i)=>( 
                                                    <View>
                                                        <Image source={{uri:item.imgUrl}} style={{width:'100%',height:px2dp(150)}} /> 
                                                        
                                                        {this._videoLabel(i)}
                                                    </View>
                                                ))
                                            }
                                    </View>
                                    : null
                                }  
                            </View>
                            {/* 广告位置 以及视频 类别------------- */}
 
                            {/* 推荐其他视频列表 */}
                            <View style={styles.listBoxItem}> 
                                <View style={styles.listTitle}>
                                    <Text style={{fontFamily: 'simple-line-icons',fontSize:px2dp(14),flex:1}}>猜你喜欢</Text> 
                                </View>
                                {
                                    this.state.RecomList.length > 0 ?
                                    <View style={styles.listItemBox2}>
                                        {
                                            // { this.props.navigation.navigate('PlayPage',{did:item.did,title:item.vtitle}) }
                                            this.state.RecomList.map((item,index) => (
                                                <TouchableOpacity style={styles.listItem2} activeOpacity={1} onPress={() => alert('点击跳转') } > 
                                                    <View style={{paddingRight:px2dp(5),position:'relative'}}>
                                                        <View style={{position:'relative'}}>
                                                            <Image style={{width:"100%", height:px2dp(140),borderRadius:px2dp(3)}} source={{uri: item.horimg}} />  
                                                        </View>
                                                        <View style={[styles.itemBomBox,{ }]}>
                                                            <Text style={{fontFamily: 'simple-line-icons',color:'#fff',flex:1, alignItems:'flex-end', fontSize:px2dp(12)}} 
                                                                    numberOfLines={3} ellipsizeMode={'tail'}>{item.vtitle}</Text>
                                                            <View style={styles.itemInfo}>  
                                                                <View style={{flex:1,fontFamily:'simple-line-icons',color:'#fff',textAlign:"left", flexDirection:'row',
                                                                    alignItems:'center',
                                                                    fontSize:px2dp(10)}}>
                                                                    <LocalImg.BfNumSvg color={"#fff"} />
                                                                    <Text style={{color:'#fff'}}>{item.looknum}</Text>
                                                                </View>  
                                                                <Text style={{flex:1,color:"#fff",textAlign:'right'}}>{item.time}</Text>  
                                                            </View>
                                                        </View>
                                                    </View>
                                                </TouchableOpacity> 
                                            ))
                                        }
                                    </View> : <View style={styles.listItemBox2}> 
                                        {/* this.props.navigation.navigate('PlayPage', ) */}
                                        {/* onPress={ () => { this.props.navigation.setParams({did:115,title:'测试添砖'}) } }   onPress={() => this.props.navigation.setParams({ did:115 })} */}
                                        <Text onPress={ () => { this.props.navigation.push('PlayPage',{did:115,title:'测试添砖'}) } }>用来测试跳转页面</Text>
                                     </View>
                                }
                                
                            </View>
                        </ScrollView>
                    </View>
                    : null
                }
            </View>
        )
    }  
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5', 
        width: '100%',
        height: '100%'
    },
    playButton: {
        width: 50,
        height: 50,
    },
    playControl: {
        width: 24,
        height: 24,
        marginLeft: 15,
    },
    shrinkControl: {
        width:px2dp(12),
        height:px2dp(12),
    },
    time: {
        fontSize: 12,
        color: 'white',
        marginLeft: 10,
        marginRight: 10
    },
    control: {
        flexDirection:'row',
        height:px2dp(44),
        alignItems:'center',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',   //
        position: 'absolute',
        bottom: 0,
        left: 0
    },

    //整体样式
    listBox:{   
        borderStartColor:'red', 
    },
    listBoxItem:{
        paddingHorizontal:px2dp(8),
        backgroundColor:"#fff",
        paddingBottom:px2dp(10),
        marginBottom:px2dp(10),
        overflow:"hidden",
    },
    //头部标题样式
    listTitle:{
        flex:1,
        flexDirection:'row', 
        alignItems:"center",
        marginTop:px2dp(10),
        marginBottom:px2dp(10),
        borderLeftWidth:px2dp(3),
        borderLeftColor:'#ff7fdf',
        paddingLeft:px2dp(8),
    },
    tit:{},
    more:{textAlignVertical: 'center'},

    listItem:{ overflow:"hidden"},

    itemBomBox:{
        position:'absolute',bottom:px2dp(0), zIndex:15,
        width:'100%', color:"#fff",fontSize:px2dp(12), paddingHorizontal:px2dp(5)
    },  
    itemInfo:{ 
        paddingTop:px2dp(1),
        paddingBottom:px2dp(4),
        flexDirection:'row', 
        alignItems:"center",
        // justifyContent:'flex-start',
    },
    //2个的分类
    listItemBox2:{  
        flex: 1,
        flexWrap: 'wrap',
        width: '100%',
        flexDirection: 'row', 
        alignItems: 'center',        
    },
    listItem2:{ position:'relative', width:"50%", marginBottom:px2dp(10) },
    vipSvg:{
        position:'absolute',
        top:px2dp(-7),
        right:px2dp(-17)
    }
});