import React, { Component } from "react";
import _ from 'lodash';
import { View, StyleSheet, Text } from "react-native";
import RowTab from '../Tables/RowTab';
import * as utils from '../../../common/utils';

class Tables extends Component {

    renderRiskSummary(riskSummary) {
        if (!riskSummary || riskSummary.length <= 0) { return <View></View>; }

        var deviceType = this.props.deviceType;

        return (
            <View style={styles.inputContainer}>
                <View style={styles.innerBlock}>
                    <View style={styles.riskText}><Text style={styles.txtStyle} >RISK</Text></View>
                    <View style={styles.impactText}><Text style={styles.txtStyle}>IMPACT</Text></View>
                </View>
                <View>
                    <RowTab head={""} value={"$ Value"} baseline={"% of Baseline"} idea={"# Ideas"} style={{ fontSize: 14, color: "#233238" }} />
                    <RowTab head={"Low"} value={_utils.formatAmount2(riskSummary.RiskValue[1], true, false)} baseline={_utils.getBaselinePercentageValue(riskSummary.RiskValue[1], dashboardSummary.TotalBaseline, false)} idea={_utils.formatCount(riskSummary.RiskCount[1])} style={styles.colorItem} />
                    <RowTab head={"Medium"} value={_utils.formatAmount2(riskSummary.RiskValue[2], true, false)} baseline={_utils.getBaselinePercentageValue(riskSummary.RiskValue[2], dashboardSummary.TotalBaseline, false)} idea={_utils.formatCount(riskSummary.RiskCount[2])} style={styles.colorItem} borderColor="#ddd" />
                    <RowTab head={"SUBTOTAL"} value={_utils.formatAmount2(riskSummary.RiskValue[1] + riskSummary.RiskValue[2], true, false)} baseline={_utils.getBaselinePercentageValue(riskSummary.RiskValue[1] + riskSummary.RiskValue[2], dashboardSummary.TotalBaseline, false)} idea={_utils.formatCount(riskSummary.RiskCount[1] + riskSummary.RiskCount[2])} style={styles.colorItem} headStyle={{ fontWeight: "bold" }} />
                    <RowTab head={"High"} value={_utils.formatAmount2(riskSummary.RiskValue[3], true, false)} baseline={_utils.getBaselinePercentageValue(riskSummary.RiskValue[3], dashboardSummary.TotalBaseline, false)} idea={_utils.formatCount(riskSummary.RiskCount[3])} borderStyle={{ borderBottomWidth: 0 }} style={{ fontSize: 14, color: "#233238" }} />
                </View>
            </View>
        )
    }

    render() {
        const fiscalTimings = _.uniqBy(_.map(this.props.fiscalTimings, 'year'));
        const dashboardSummary = this.props.phase2Summary
        const riskSummary = dashboardSummary.phase2.riskSummary;
        const _utils = utils;

        return (
          //  this.renderRiskSummary(this.props.riskSummary)
        );
    }

}



const styles = StyleSheet.create({
    Container: {
        flex: 1,
        width: "96%",
        margin: "2%",
        fontSize: 14,

    },
    inputContainer: {
        flex: 1,
        width: "100%",
        borderBottomWidth: 1,
        height: "90%",
        marginBottom: 10

        //flexDirection: "row",
        //   justifyContent: "space-between",
        //  alignItems: "center",
        //   height : "100%"
    },
    riskText: {
        width: "20%",
        alignItems: "center",
        borderBottomWidth: 1
    },
    impactText: {
        width: "70%",
        alignItems: "center",
        borderBottomWidth: 1
    },
    innerBlock: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 15,
        justifyContent: "space-between",
        backgroundColor: '#f6f7f7',
    },
    colorItem: {
        color: "#2e58d6",
        fontSize: 14,
        //  textAlign :"right"
    },
    txtStyle: {
        fontWeight: "bold",
        fontSize: 14,
        color: "#233238"
    }
});

export default Tables;