import React, {Component} from "react";
import { View, TextInput, Button, StyleSheet, Text} from "react-native";

class RowTab extends Component {

    constructor(props){
        super(props)

    }

    render() {
        return (
            <View style={styles.inputContainer}>        
                    <View style={[styles.rowBlock,  this.props.borderStyle && this.props.borderStyle , {borderColor : this.props.borderColor}]}>
                        <View style={[styles.item , {width: "30%"}]}><Text style={[styles.textStyle, this.props.style] }>{this.props.value}</Text></View>
                        <View style={[styles.item, { width: "42%", borderColor : this.props.borderColor}]}><Text style={ [styles.textStyle, this.props.style] }>{this.props.baseline}</Text></View>
                        <View style={[styles.item, {width: "28%"}]}><Text style={[styles.textStyle, this.props.style]}>{this.props.idea}</Text></View>
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
    rowBlock: {
        width: "100%",
        flexDirection : "row",
       // justifyContent: "space-between",
        borderBottomWidth : 1,
        margin: 5,   
    },
    item:{
      textAlign: "right",
      alignItems: "flex-end",
      color: 'blue',
    },
    textStyle:{
        paddingTop: 5,
        paddingBottom: 5,
    }
});

export default RowTab;