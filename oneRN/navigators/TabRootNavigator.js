import React, {PureComponent} from 'react'
import {Image,StyleSheet,Text,Dimensions} from 'react-native'
//这是一个 tab切换的 导航
import { StackNavigator,createStackNavigator, createAppContainer,createBottomTabNavigator } from 'react-navigation';
import StackViewStyleInterpolator from "react-navigation-stack/src/views/StackView/StackViewStyleInterpolator";
//首页
import HomePage from "../pages/Home/index";
//搜索
import SearchPage from "../pages/Search/index"
//我的
import MyPage from "../pages/My/index";
//导入适配js
import px2dp from "../until/Dimensions"
//导入 svg图片 
import SearchSvg from "../assets/searchsvg";
import Search1Svg from "../assets/searchsvg1"; 
import JxSvg from "../assets/jxsvg"
import MySvg from "../assets/mysvg"
// import ChanelSvg from "./TabBarIcon"
//创建导航组件  这是类似vue的单页面导航
// const RootNavigator = createStackNavigator({
//这是 tab 切换的导航
const TabRootNavigator = createBottomTabNavigator({
    search:{
        screen:SearchPage,
        navigationOptions: ({navigation, screeProps}) => ({ 
            headerStyle: styles.navigator,
            headerTitleStyle: styles.navigatorTitle,
            gesturesEnabled: true,
            tabBarVisible: true,
            tabBarLabel: '搜索', 
            tabBarIcon: (({tintColor, focused}) => {
                return ( 
                    <SearchSvg color={focused ? styles.inActiveTab.color : styles.tab.color}/>
                )
            }),
        })
    },
    home: {
        screen: HomePage,
        navigationOptions: ({navigation, screeProps}) => ({ 
            headerStyle: styles.navigator,
            headerTitleStyle: styles.navigatorTitle,
            gesturesEnabled: true,
            tabBarVisible: true,
            tabBarLabel: '精选', 
            tabBarIcon: (({tintColor, focused}) => {
                return ( 
                    <JxSvg color={focused ? styles.inActiveTab.color : styles.tab.color}/>
                )
            }),
        })
    }, 
    
    My:{
        screen:MyPage,
        navigationOptions: ({navigation, screeProps}) => ({ 
            headerStyle: styles.navigator,
            headerTitleStyle: styles.navigatorTitle,
            gesturesEnabled: true,
            tabBarVisible: true,
            tabBarLabel: '我的', 
            tabBarIcon: (({tintColor, focused}) => {
                return ( 
                    <MySvg color={focused ? styles.inActiveTab.color : styles.tab.color}/>
                )
            }),
        })
    },
},{  
    //这里设置的是一般情况下Tabbar共同的属性
    tabBarPosition: 'bottom', // 设置tabbar的位置，iOS默认在底部，安卓默认在顶部。（属性值：'top'，'bottom')
    swipeEnabled: true, // 是否允许在标签之间进行滑动。
    animationEnabled: true, // 是否在更改标签时显示动画。
    lazy: true, // 是否根据需要懒惰呈现标签，而不是提前制作，意思是在app打开的时候将底部标签栏全部加载，默认false,推荐改成true哦。
    initialRouteName: 'home', // 设置默认的页面组件
    backBehavior: 'none', // 按 back 键是否跳转到第一个Tab(首页)， none 为不跳转
    tabBarOptions: {
        activeTintColor: '#fd7aff', // label和icon的前景色 活跃状态下（选中）。
        inactiveTintColor: '#323232', // label和icon的前景色 不活跃状态下(未选中)。
        labelStyle: {
            fontSize:px2dp(12), 
        }, 
        // initHeight: {
        //     height: 250
        // },
        style :{
            borderTopColor:'#f5f5f5',
            borderTopWidth:1,
            backgroundColor:'white',
            height:Dimensions.get('window').height*0.075,
        } 
    }
});
export default createAppContainer(TabRootNavigator);
const styles = StyleSheet.create({
    navigatorTitle: {
        fontSize:px2dp(12),
        color: 'white', 
    },
    navigator: {
        // backgroundColor: '#f15cff',
    },
    tabbarImage: {
        width: 25,
        height: 25,
        marginBottom: -3,
    },
    tab: {
        color: '#323232'
    },
    inActiveTab: {
        color: '#fd7aff'
    }
})