//这是一个 单页面的 导航  类似vue
import { StackNavigator,createStackNavigator, createAppContainer,createBottomTabNavigator } from 'react-navigation'; 
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
    }
});
export default createAppContainer(RootNavigator);