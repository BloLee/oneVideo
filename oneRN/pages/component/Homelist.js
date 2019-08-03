// 首页列表
import React, {Component} from 'react';
import {
    TouchableOpacity,
    StyleSheet,
    Image, 
    Text,
    View,
    Dimensions, 
} from 'react-native';
import px2dp from '../../until/Dimensions';
import Icon from 'react-native-vector-icons/Feather';
//引入全局 img文件
import LocalImg from "../../until/images"; 
//
import httpUntil from "../../until/httpUntil"
export default class HomeList extends Component {
    constructor(props){
        super(props)
        this.state = {
            list:[]
        }
    }
    _renderList(index,list){   
        switch(index){
            case 0:
            case "0":
                return(  
                    <View style={styles.listItem}>
                        {
                            list.map((item,index) => ( 
                                <TouchableOpacity activeOpacity={1} onPress={() => { this.props.navigation.navigate('PlayPage',{did:item.did,title:item.vtitle}) }}>
                                    <View style={{position:'relative'}}>
                                        <Image style={{width:"100%", height:px2dp(140),borderRadius:px2dp(3)}} source={{uri: item.horimg}} />
                                        <Text style={{position:'absolute',bottom:px2dp(5),color:"#fff",right:px2dp(8),fontSize:px2dp(12)}}>{item.time}</Text>
                                    </View>
                                    <View style={styles.itemInfo}> 
                                        <Text style={{fontFamily: 'simple-line-icons',color:'rgb(40,40,40)',flex:1,fontSize:px2dp(12)}} numberOfLines={1}
                                         ellipsizeMode={'tail'}>{item.vtitle}</Text>
                                        <Text style={{fontFamily: 'simple-line-icons',color:'rgb(40,40,40)',fontSize:px2dp(12),paddingLeft:px2dp(10)}}>播放 {item.looknum}</Text>
                                    </View>
                                </TouchableOpacity> 
                            ))
                        } 
                    </View>
                )
            break; 
            default:
                return(
                    <View style={styles.listItemBox2}>
                        {/* <Text onPress={() => alert(this.props.navigation) }> this.props.preFn({did:item.did});</Text> */}
                        {
                            list.map((item,index) => (
                                <TouchableOpacity style={styles.listItem2} activeOpacity={1} onPress={() => { this.props.navigation.navigate('PlayPage',{did:item.did,title:item.vtitle}) }}> 
                                    <View style={{paddingRight:px2dp(5),position:'relative'}}>
                                        <View style={{position:'relative'}}>
                                            <Image style={{width:"100%", height:px2dp(140),borderRadius:px2dp(3)}} source={{uri: item.horimg}} /> 
                                                {this._renderVip(item.isvip)}
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
                    </View>
                )
            break;
        }
        
    }
    _renderVip(isvip){
        if( isvip == 1 || isvip == '1' ){
            return(
                <View style={styles.vipSvg} ><LocalImg.VipSvg /></View>
            )
        }
    }
    render(){
        
        return(
            <View>
            {
                this.state.list.length>0 ? 
                <View style={styles.listBox}> 
                {
                    this.state.list.map((d,i) => ( 
                        <View style={styles.listBoxItem}> 
                            <View style={styles.listTitle}>
                                <Text style={{fontFamily: 'simple-line-icons',fontSize:px2dp(14),flex:1}}>{d.blocktitle}</Text>
                                <TouchableOpacity activeOpacity={1} onPress={ () => this.navigation.navigate("PlayPage") }>
                                    <Text style={[styles.more,{fontSize:px2dp(12),color:"#666"}]}>更多
                                        <Icon name='chevron-right' size={18} color={"#666"} />
                                    </Text> 
                                </TouchableOpacity>
                            </View>
                            {this._renderList(i,d.data)} 
                        </View>
                    ))
                } 
                </View> : <Text>暂无数据</Text>
            }
             
            </View>
        )
    } 
    // 请求网络数据
    componentDidMount(){   
        this.getSwiper();//内部调用网络请求的具体操作
    }
    getSwiper(){ 
        const _url = LocalImg.httpUrl + LocalImg.HomeList;
        httpUntil.get(_url)
        .then(result=> {
            if( result.success ){
                this.setState({
                    list:result.data
                })
            }  
        })
    }
}
const styles = StyleSheet.create({
    //整体样式
    listBox:{   
        borderStartColor:'red', 
    },
    listBoxItem:{
        paddingHorizontal:px2dp(8),
        backgroundColor:"#fff",
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
})