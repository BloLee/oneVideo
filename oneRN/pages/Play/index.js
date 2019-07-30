import React, {Fragment,Component} from 'react';
import {StyleSheet, ScrollView, View,Text} from 'react-native';
import VideoUrl from "../../until/images";
import httpUntil from "../../until/httpUntil"
export default class PlayPage extends Component {
    render (){
        return (
            <Text>{VideoUrl.videoUrl}  这是播放页</Text>
        )
    }
    getPlay(){

    }
}