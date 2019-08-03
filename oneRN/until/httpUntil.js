import React,{Component} from 'react';
import {ToastAndroid} from 'react-native';  
//接口请求方法
export default class httpUntil extends Component{
    static get(url){
        return new Promise((resolve,reject) => {
            fetch(url)
            .then(response => response.json())
            .then(result => {
                resolve(result)
            })
            .catch(error => {
                // alert(JSON.stringify(error))
                // console.log(JSON.stringify(error))
                reject(error)
            })
        })
    }
    static post(url,data){
        return new Promise((resolve,reject) => {
            fetch(url,{
                method:'POST',
                header:{
                    "ACCEPT":'application/json',
                    "Content-Type":'application/json',
                },
                body:JSON.stringify(data)
            })
            .then(response => response.json())
            .then(result => {
                resolve(result)
            })
            .catch(error => {
                // alert(JSON.stringify(error))
                // console.log(JSON.stringify(error))
                reject(error)
            })
        })
    }
}