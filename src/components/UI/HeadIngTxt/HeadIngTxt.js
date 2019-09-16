import React from "react";
import {Text, StyleSheet} from "react-native";
const HeadingTxt = props => (
   
    <Text style ={[styles.textHeading,  props.style]}>{props.children}</Text>
);

export default HeadingTxt;

const styles = StyleSheet.create({
    textHeading:{
     //   width : "100%",
      //  height: "10%"
    }
})