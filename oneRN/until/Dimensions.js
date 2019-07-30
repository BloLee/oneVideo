'use strict';
//这是一个 适应屏幕的js 设置大小
import {Dimensions} from 'react-native'

const deviceH = Dimensions.get('window').height
const deviceW = Dimensions.get('window').width

const basePx = 320

export default function px2dp(px) {
    return px *  deviceW / basePx
}
