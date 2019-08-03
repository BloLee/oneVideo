import React, {Component} from 'react';
import {
    TouchableOpacity,
    StyleSheet,
    Image,
    ImageBackground,
    Text,
    View,
    Dimensions, 
} from 'react-native';
//
import {Actions} from "react-native-router-flux";
import Swiper from 'react-native-swiper';
//引入 计算适配
import px2dp from "../../until/Dimensions";
//
import LocalImg from "../../until/images";
import httpUntil from "../../until/httpUntil"
export default class SwiperCon extends Component {
    constructor(props){
        super(props)
        this.state = {
            List:[]
        }
    }
    // 请求网络数据
    componentDidMount(){   
        this.getSwiper();//内部调用网络请求的具体操作
    } 
    getSwiper(){
        const _url = LocalImg.httpUrl + LocalImg.swiper + '&num=3'
        httpUntil.get(_url)
        .then(result=> {
            if( result.success ){
                this.setState({
                    List:result.data
                })
            }  
        })
        // fetch("http://www.yangdh.xyz/VideoGetProcess.ashx?sort=flash&num=3")
        // .then( response => response.json() )
        // .then( result => {
        //     if( result.success ){
        //         this.setState({
        //             List:result.data
        //         })
        //     }  
        // }) 
    }
    render (){
        const data = [
            {
                columnName: '少女问龙，为什么他不来救我。龙说，他死啦，被我吃掉了。少女恨死了龙，第二天，她在龙最爱吃的饼干里，塞了两粒花生。龙就过敏死了，真是一条愚蠢的龙，',
                image_url: 'https://pic4.zhimg.com/v2-3be05963f5f3753a8cb75b6692154d4a_1200x500.jpg'
            },
            {
                columnName: '再次相见只是陌生人',
                image_url: 'http://static.runoob.com/images/demo/demo1.jpg'
            },
            {
                columnName: '你在人潮里不知所措，我却跟在你身后，伸手怕犯错，缩手怕错过.',
                image_url: 'http://static.runoob.com/images/demo/demo3.jpg'
            },
        ];
        return (
            <Swiper style={styles.wrap}
                autoplay={true}
                autoplayTimeout={5}
                paginationStyle={{bottom: 10, right:10, justifyContent: 'flex-end'}}
                dotStyle={{width:px2dp(8), height:px2dp(8), backgroundColor:'#FFF', borderRadius:50,}}
                activeDotStyle={{width:px2dp(8), height:px2dp(8),borderRadius:50,}}>
                    {
                        // onPress={() => { Actions.VideoDetail()}}
                        this.state.List.map((d, i) => (
                            <TouchableOpacity
                                key={i}
                                activeOpacity={.9} 
                                resizeMode="cover"
                                style={styles.item}>
                                    <ImageBackground style={styles.bg} resizeMode="cover"
                                        source={{uri: d.horimg}}>
                                        <View style={styles.iteminfo}>
                                            <Text style={styles.title} numberOfLines={1} ellipsizeMode={'tail'}>{d.vtitle}</Text>
                                        </View>
                                    </ImageBackground>
                            </TouchableOpacity>
                        ))   
                    }
            </Swiper>
        ) 
    }
}
const {width} = Dimensions.get('window');  //解构赋值 获取屏幕宽度

const styles = StyleSheet.create({
    wrap: {
        height:px2dp(145),
        flex: 1,
    },
    item: {
        position:"relative",
        height:px2dp(145),
        overflow: 'hidden',
        backgroundColor: '#000000',
        shadowColor: 'red',
        shadowOffset: {x: 1.5, y: 10},
        shadowOpacity: 0.9,
    },
    bg:{
        flex: 1,
        padding: 0,
        alignItems: 'center',
        backgroundColor: '#000000',
    },
    iteminfo: {
        flex: 1, 
        position:"absolute", 
        width: '100%',
        bottom:0, 
        paddingLeft:px2dp(8),
        zIndex: 105, 
    },
    title: { 
        color: '#fff',
        fontSize:px2dp(12),
        flex: 1, 
        paddingRight:px2dp(50),
        height:px2dp(30),
        lineHeight:px2dp(30),
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap:'nowrap',
    },
    coverLinearGradient: {
        position: 'absolute',
        bottom: 0,
        zIndex: 100,
        height: '35%',
        width: '100%',
        opacity: 0.9
    },

});
