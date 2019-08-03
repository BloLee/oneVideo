import {Easing,Animated} from "react-native";
//这是一个 单页面的 导航  类似vue
import { StackNavigator,createStackNavigator, createAppContainer,
createBottomTabNavigator,createDrawerNavigator } from 'react-navigation'; 
// import CardStackStyleInterpolator from 'react-navigation/src/views/CardStackStyleInterpolator';
import StackViewStyleInterpolator from "react-navigation-stack/src/views/StackView/StackViewStyleInterpolator";
//tab 切换  三个页面
import TabRootNavigator from "./TabRootNavigator"
//首页
import HomePage from "../pages/Home/index"
//发现
import FindPage from "../pages/Find/index"
//我的
import MyPage from "../pages/My/index"
//更多列表
import MorePage from "../pages/MoreList/index"
//视频播放
import PlayPage from "../pages/Play/index"
//创建导航组件  这是类似vue的单页面导航
const RootNavigator = createStackNavigator({
//这是 tab 切换的导航
// const RootNavigator = createBottomTabNavigator({
    TabRootNavigator:{
        screen:TabRootNavigator,
        navigationOptions:{ 
            header:null
        }
    },
    Home: {
        screen: HomePage,
        navigationOptions:{ 
            header:null
        }
    },
    Find:{
        screen: FindPage,
    },
    My:{
        screen:MyPage,
    },
    MorePage:{
        screen:MorePage
    },
    PlayPage:{
        screen:PlayPage
    }, 
},{
    headerMode: 'float',
    mode: 'card',  
    cardStyle:({backgroundColor:'#f5f5f5'}), 
    transitionConfig:(()=>({
        //因为ios 的导航动画默认是从左到右，所以，这里配置一下动画，使用react-navigation已经实现的从左到右的动画，
        //适配Android，不过，需要导入动画  
        screenInterpolator: StackViewStyleInterpolator.forHorizontal,
    }))
});
export default createAppContainer(RootNavigator);