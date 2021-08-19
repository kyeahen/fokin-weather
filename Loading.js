import React from "react";
import { StyleSheet, Text, View, StatusBar } from "react-native";
//자바스크립트와 android,ios의 native 텍스트나 뷰를 이어주는 브릿지 같은 것
//ios,android 폰이 이 컴포넌트(js)를 swift, java로 이해하도록 만들기 위해 항상 브릿지가 존재함

export default function Loading() {
    return ( 
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" />
            <Text style={styles.text}>Getting the fucking weather</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-end",
        paddingHorizontal: 30,
        paddingVertical: 100,
        backgroundColor: "#FDF6AA"
    },
    text: {
        color: "#2c2c2c",
        fontSize: 30, //px를 붙이려면 string으로 작성
    }
})