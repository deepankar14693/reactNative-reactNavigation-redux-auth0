import React from "react";
import {View, StyleSheet} from "react-native";

const ColorHead = props => (
    <View style ={[styles.colorHead,  props.colorStyle]}></View>
);

export default ColorHead;

const styles = StyleSheet.create({
    colorHead:{
       width: "100%",
       height: 8,
       borderTopEndRadius: 6,
       borderTopLeftRadius :6
    }
})