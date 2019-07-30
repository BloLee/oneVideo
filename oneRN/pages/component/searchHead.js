//搜索的头部
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
//引入 icon
import Icon from 'react-native-vector-icons/Ionicons';
import AntIcon from 'react-native-vector-icons/AntDesign';
import MaterIcon from 'react-native-vector-icons/MaterialCommunityIcons';
//引入适配js 文件
import px2dp from "../../until/Dimensions";
//引入全局 img文件
import LocalImg from "../../until/images";
export default SearHeader = () => {
    return (
        <View style={styles.header}>  
          <View style={styles.searchBox}>
            <TouchableWithoutFeedback onPress={()=>{}}>
                <TextInput style={styles.searInp} placeholder="请输入关键字" placeholderTextColor="#999" /> 
                {/* <View style={[styles.searchBtn, {}]}></View> */}
            </TouchableWithoutFeedback>
            <Text style={ styles.searRight }>搜索</Text>
          </View>
      </View>
    );
};
const isIOS = Platform.OS == "ios"
const headH = px2dp(isIOS?70:50)
const styles = StyleSheet.create({
    header:{ 
        backgroundColor:'#242424',
        paddingHorizontal:px2dp(10),
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
        backgroundColor:'#fff',
        borderRadius:px2dp(5), 
        padding:0,
        paddingHorizontal:px2dp(10),
        // lineHeight:px2dp(60),
        height:px2dp(30),
        fontSize:px2dp(12),
        marginRight:px2dp(20),
    },
    searRight:{   
        flexDirection: "row", 
        alignItems: "center",
        color:"#fff",
        fontSize:px2dp(14),
    }, 
}); 