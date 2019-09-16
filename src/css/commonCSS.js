import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    textBlock: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
    danger:{
        backgroundColor: "#ff5e59",
    },
    warning:{
        backgroundColor: "#ffac35",
    },
    confirm:{
        backgroundColor: "#5789FA",
    }
  });

export default styles;