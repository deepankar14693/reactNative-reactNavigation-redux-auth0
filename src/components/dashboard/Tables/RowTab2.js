import React, {Component} from "react";
import { View, TextInput, Button, StyleSheet, Text} from "react-native";

class RowTab2 extends Component {

    constructor(props){
        super(props)
    }

    render() {
        return (
            <View style={styles.inputContainer}>        
                    <View style={[styles.row1, this.props.borderStyle , {borderColor : this.props.borderColor}]}>
                        <Text style= {[ this.props.headStyle,{color : "#233238"}]}>{this.props.head}</Text>
                    </View>
                    <View style={[styles.row2,  this.props.borderStyle && this.props.borderStyle , {borderColor : this.props.borderColor}]}>
                        {/* <View style={styles.item}><Text style={ this.props.style }>{this.props.fy_18}</Text></View>
                        <View style={[styles.item, {borderColor : this.props.borderColor}]}><Text style={ this.props.style }>{this.props.fy_19}</Text></View>
                        <View style={styles.item}><Text style={this.props.style}>{this.props.fy_20}</Text></View>
                        <View style={styles.item}><Text style={this.props.style}>{this.props.fy_21}</Text></View>
                        <View style={styles.item}><Text style={this.props.style}>{this.props.fy_22}</Text></View> */}
                        {props.children}
                    </View>
            </View>
        ); 
    }

}



const styles = StyleSheet.create({
    inputContainer: {
      //   flex: 1,
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    row1: {
        width: "20%",
        borderBottomWidth : 1,
        alignItems: "flex-end",

    
    },
    row2: {
        width: "70%",
        flexDirection : "row",
       // justifyContent: "space-between",
        borderBottomWidth : 1,
        margin: 5,
        
    },
    item:{
      textAlign: "right",
    //  width: "33.33%",
      alignItems: "flex-end",
      color: 'blue',
      width: "20%",
    }

});

export default RowTab2;