import React, {Component} from 'react';
import {View, Dimensions, Image, Text, Slider, TouchableWithoutFeedback, TouchableOpacity, Button, StyleSheet} from 'react-native';
import Video from 'react-native-video';
import Orientation from 'react-native-orientation';
import px2dp from '../../until/Dimensions';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import AntIcon from 'react-native-vector-icons/AntDesign';
import IconIon from 'react-native-vector-icons/Ionicons';
import LocalImg from "../../until/images"; 
const screenWidth = Dimensions.get('window').width;

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

export default class VideoPage extends Component {
  
  static navigationOptions = {
    headerTitle: '测试视频播放'
  };
  
  constructor(props) {
    super(props);
    this.state = {
      videoUrl: "https://liaoning.olevod.eu/20190728/Zck3dDFt/index.m3u8",
      videoCover: "http://124.129.157.208:8889/data/uploads/kecheng/2018/01/18/5a600b2c99836.png@0o_0l_220w.png",
      videoWidth: screenWidth,
      videoHeight: screenWidth, // 默认16：9的宽高比
      showVideoCover: true,    // 是否显示视频封面
      showVideoControl: false, // 是否显示视频控制组件
      isPlaying: false,        // 视频是否正在播放
      currentTime: 0,        // 视频当前播放的时间
      duration: 0,           // 视频的总时长
      isFullScreen: false,     // 当前是否全屏显示
      playFromBeginning: false, // 是否从头开始播放
    };
  }
  
  render() {
    return (
      <View style={styles.container} onLayout={this._onLayout}>
        <View style={{ width: this.state.videoWidth, height: this.state.videoHeight, backgroundColor:'#000000' }}>
          <Video
            ref={(ref) => this.videoPlayer = ref}
            source={{uri: this.state.videoUrl}}
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
            style={{width: this.state.videoWidth, height: this.state.videoHeight}}
          />
          {
            this.state.showVideoCover ?
              <Image
                style={{
                  position:'absolute',
                  top: 0,
                  left: 0,
                  width: this.state.videoWidth,
                  height: this.state.videoHeight
                }}
                resizeMode={'cover'}
                source={{uri: this.state.videoCover}}
              /> : null
          }
          <TouchableWithoutFeedback onPress={() => { this.hideControl() }}>
            <View
              style={{
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
                <TouchableOpacity style={{ paddingLeft:px2dp(8), paddingRight:px2dp(5) }} activeOpacity={0.3} onPress={() => { this.onControlPlayPress() }}>
                    {
                        this.state.isPlaying ? 
                        // <Image style={{width:px2dp(10),height:px2dp(10)}} source={LocalImg['play']} /> 
                        // <Icon name="control-pause" size={px2dp(12)} color={"#fff"} />
                        // : <Icon name="control-play" size={px2dp(12)} color={"#fff"} />
                        <IconIon name="md-pause" size={px2dp(14)} color={"#fff"} />
                        : <IconIon name="md-play" size={px2dp(14)} color={"#fff"} /> 
                    } 
                </TouchableOpacity>
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
                <TouchableOpacity activeOpacity={0.3} style={{ paddingLeft:px2dp(5), paddingRight:px2dp(8) }} onPress={() => { this.onControlShrinkPress() }}> 
                    {
                        this.state.isFullScreen ? 
                        <AntIcon name="scan1" size={px2dp(14)} color={"#fff"} />
                        : <IconIon name="md-qr-scanner" size={px2dp(14)} color={"#fff"} />
                    }
                  {/* <Image
                    style={styles.shrinkControl}
                    source={this.state.isFullScreen ? LocalImg['cortwrap'] : LocalImg['cortwrap']}
                  /> */}
                </TouchableOpacity>
              </View> : null
          }
        </View>
        {/* <View style={{flex: 1, alignItems:'center', justifyContent:'center'}}>
          <Button title={'开始播放'} onPress={() => {this.playVideo()}}/>
          <Button title={'暂停播放'} onPress={() => {this.pauseVideo()}}/>
          <Button title={'切换视频'} onPress={() => {this.switchVideo("http://124.129.157.208:8810/SD/zhishidian/grade_8_1/wuli_shu/01.mp4", 0)}}/>
        </View> */}
      </View>
    
    )
  }
  
  /// -------Video组件回调事件-------
  
  _onLoadStart = () => {
    console.log('视频开始加载');
  };
  
  _onBuffering = () => {
    console.log('视频缓冲中...')
  };
  
  _onLoaded = (data) => {
    console.log('视频加载完成');
    this.setState({
      duration: data.duration,
    });
  };
  
  _onProgressChanged = (data) => {
    console.log('视频进度更新');
    if (this.state.isPlaying) {
      this.setState({
        currentTime: data.currentTime,
      })
    }
  };
  
  _onPlayEnd = () => {
    console.log('视频播放结束');
    this.setState({
      currentTime: 0,
      isPlaying: false,
      playFromBeginning: true
    });
  };
  
  _onPlayError = () => {
    console.log('视频播放失败');
  };
  
  ///-------控件点击事件-------
  
  /// 控制播放器工具栏的显示和隐藏
  hideControl() {
    if (this.state.showVideoControl) {
      this.setState({
        showVideoControl: false,
      })
    } else {
      this.setState(
        {
          showVideoControl: true,
        },
        // 5秒后自动隐藏工具栏
        () => {
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
  
  /// 切换视频并可以指定视频开始播放的时间，提供给外部调用
  switchVideo(videoURL, seekTime) {
    this.setState({
      videoUrl: videoURL,
      currentTime: seekTime,
      isPlaying: true,
      showVideoCover: false
    });
    this.videoPlayer.seek(seekTime);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
    minHeight:px2dp(140),
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
});