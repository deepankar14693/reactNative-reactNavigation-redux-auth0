import React, { Component } from "react";
import _ from 'lodash';
import { View, StyleSheet, Text, ScrollView, Dimensions } from "react-native";
import RowTab from './RowTab';
import * as utils from '../../../common/utils';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';

var radio_props = [
    { label: 'P&L', value: '1' },
    { label: 'Cash Flow', value: '2' }
];

const WIDTH = Dimensions.get('window').width;
class Tables extends Component {

    constructor(props) {
        super(props);
    }

    OnPressRadioButtton = (value) => {
        this.props.onRadioChangeForPAndL(value)
    }

    getRiskSummary = (dashboardSummary) => {
        if (_.has(dashboardSummary, 'phase1') && dashboardSummary.phase1) {
            return dashboardSummary.phase1.riskSummary
        }
        if (_.has(dashboardSummary, 'phase2') && dashboardSummary.phase2) {
            return dashboardSummary.phase2.riskSummary
        }
        if (_.has(dashboardSummary, 'phase3') && dashboardSummary.phase3) {
            return dashboardSummary.phase3.riskSummary
        }
    }

    renderYearHeader(years) {
        if (years.length > 0) {
            var tdWidth = 100 / years.length;
            return (
                years.sort(this.compare).map(function (year, index) {
                    return (
                        <View key={'YearHeader' + index} style={[styles.item, { width: tdWidth + "%" }]}>
                            <Text style={[styles.txtStyle, { fontSize: 14, alignItems: 'flex-end' }]}>{`FY ${year}`}</Text>
                        </View>
                    )
                }
                ));
        }
    }

    getYearCellData(years, cellData, riskType, isCompanyView) {
        let pAndLType = this.props.selectedRadioForPAndL === '1' ? 'P&L' : 'CashFlow';
        var _this = this;
        if (years.length > 0) {
            var tdWidth = 100 / years.length;
            return (
                years.sort(this.compare).map(function (year, index) {

                    if (!isCompanyView && utils.formatAmount2(cellData[index], true, false) !== '-')
                        return (<View key={'YearData' + index} style={[styles.item, { width: tdWidth + "%" }]}>
                            <Text style={styles.colorItem}>{(utils.formatAmount2(cellData[index], true, false))}</Text>
                        </View>)

                    if (isCompanyView || utils.formatAmount2(cellData[index], true, false) === '-')
                        return (<View key={'YearData' + index} style={[styles.item, { width: tdWidth + "%" }]}>
                            <Text style={styles.colorItem}>{(utils.formatAmount2(cellData[index], true, false))}</Text>
                        </View>)

                    return (<View key={'YearData' + index} style={[styles.item, { width: tdWidth + "%" }]}>
                        <Text style={styles.colorItem}>-</Text>
                    </View>);

                }
                ));
        }
    };

    getYearCellDataTotal(years, data, riskType, isCompanyView) {
        let pAndLType = this.props.selectedRadioForPAndL === '1' ? 'P&L' : 'CashFlow';
        var _this = this;
        if (years.length > 0) {
            var tdWidth = 100 / years.length;
            return (
                years.sort(this.compare).map(function (year, index) {

                    if (!isCompanyView && utils.formatAmount2(_.sumBy([data[1][index], data[2][index]]), true, false) !== '-')
                        return (<View key={'YearData' + index} style={[styles.item, { width: tdWidth + "%" }]}>
                            <Text style={styles.colorItem}>{utils.formatAmount2(_.sumBy([data[1][index], data[2][index]]), true, false)}</Text>
                        </View>)

                    if (isCompanyView || utils.formatAmount2(_.sumBy([data[1][index], data[2][index]]), true, false) === '-')
                        return (<View key={'YearData' + index} style={[styles.item, { width: tdWidth + "%" }]}>
                            <Text style={styles.colorItem}>{(utils.formatAmount2(_.sumBy([data[1][index], data[2][index]]), true, false))}</Text>
                        </View>)

                    return (<View key={'YearData' + index} style={[styles.item, { width: tdWidth + "%" }]}>
                        <Text style={styles.colorItem}>-</Text>
                    </View>);

                }
                ));
        }
    };

    getDataByYear(years, riskSummary, riskName, isCompanyView) {
        return (
            <View style={styles.inputContainerRow}>
                <View style={riskName == "High" ? [styles.rowBlock, { borderBottomWidth: 0 }] : riskName == "Medium" ? [styles.rowBlock, { borderColor: "#ddd" }] :styles.rowBlock}>

                    {riskName == "" && years !== "" && this.renderYearHeader(years)}

                    {riskName == "" && years == "" &&
                        this.getYearCellData("", "", "", "")}

                    {riskName === "Low" &&
                        this.props.selectedRadioForPAndL == '1' && this.getYearCellData(years, riskSummary.PL[1], 'Low', isCompanyView)}

                    {riskName === "Low" &&
                        this.props.selectedRadioForPAndL == '2' && this.getYearCellData(years, riskSummary.CF[1], 'Low', isCompanyView)}

                    {riskName === "Medium" &&
                        this.props.selectedRadioForPAndL == '1' && this.getYearCellData(years, riskSummary.PL[2], 'Medium', isCompanyView)}

                    {riskName === "Medium" &&
                        this.props.selectedRadioForPAndL == '2' && this.getYearCellData(years, riskSummary.CF[2], 'Medium', isCompanyView)}

                    {riskName === "SubTotal" &&
                        this.props.selectedRadioForPAndL == '1' && this.getYearCellDataTotal(years, riskSummary.PL, 'SubTotal', isCompanyView)}

                    {riskName === "SubTotal" &&
                        this.props.selectedRadioForPAndL == '2' && this.getYearCellDataTotal(years, riskSummary.CF, 'SubTotal', isCompanyView)}

                    {riskName === "High" &&
                        this.props.selectedRadioForPAndL == '1' && this.getYearCellData(years, riskSummary.PL[3], 'High', isCompanyView)}

                    {riskName === "High" &&
                        this.props.selectedRadioForPAndL == '2' && this.getYearCellData(years, riskSummary.CF[3], 'High', isCompanyView)}

                </View>
            </View>
        )
    }

    render() {
        const fiscalTimings = _.uniqBy(_.map(this.props.fiscalTimings, 'year'));
        const dashboardSummary = this.props.phase2Summary
        // const riskSummary = dashboardSummary.phase2.riskSummary;
        const riskSummary = this.getRiskSummary(dashboardSummary);
        const isCompanyView = this.props.isCompanyView;
        const _utils = utils;

        return (

            <View style={styles.inputContainer}>
                <View style={styles.riskTypeStyle}>
                    <View style={styles.riskText}><Text style={[styles.txtStyle, styles.fontWeightText]}>Risk</Text></View>
                    <View style={[styles.inputContainerRow, { borderBottomWidth: 0, paddingTop: 5, paddingBottom: 5 }]} ><Text style={styles.txtStyle}>{''}</Text></View>
                    <View style={[styles.inputContainerRow, styles.borderBottomWidthStyle]} ><Text style={styles.txtStyle}>{''}</Text></View>
                    <View style={[styles.inputContainerRow, styles.borderBottomWidthStyle]} ><Text style={styles.txtStyle}>Low</Text></View>
                    <View style={[styles.inputContainerRow, styles.borderBottomWidthStyle]} ><Text style={styles.txtStyle}>Medium</Text></View>
                    <View style={[styles.inputContainerRow, styles.borderBottomWidthStyle]} ><Text style={[styles.txtStyle, styles.fontWeightText]}>SUBTOTAL</Text></View>
                    <View style={styles.inputContainerRow} ><Text style={styles.txtStyle}>High</Text></View>
                </View>
                <ScrollView
                    horizontal={true}
                >
                    <View style={styles.child1}>
                        <View style={styles.headBlock}><Text style={[styles.txtStyle, styles.fontWeightText]}>IMPACT</Text></View>
                        <View style={styles.bodyBlock}>
                            <RowTab head={""} value={""} baseline={""} idea={""} borderStyle={{ borderBottomWidth: 0, paddingTop: 5, paddingBottom: 5 }} />
                            <RowTab head={""} value={"$ Value"} baseline={"% of Baseline"} idea={"# Ideas"} style={{ fontSize: 14, color: "#233238" }} />
                            <RowTab head={"Low"} value={_utils.formatAmount2(riskSummary.RiskValue[1], true, false)} baseline={_utils.getBaselinePercentageValue(riskSummary.RiskValue[1], dashboardSummary.TotalBaseline, false)} idea={_utils.formatCount(riskSummary.RiskCount[1])} style={styles.colorItem} />
                            <RowTab head={"Medium"} value={_utils.formatAmount2(riskSummary.RiskValue[2], true, false)} baseline={_utils.getBaselinePercentageValue(riskSummary.RiskValue[2], dashboardSummary.TotalBaseline, false)} idea={_utils.formatCount(riskSummary.RiskCount[2])} style={styles.colorItem} borderColor="#ddd" />
                            <RowTab head={"SUBTOTAL"} value={_utils.formatAmount2(riskSummary.RiskValue[1] + riskSummary.RiskValue[2], true, false)} baseline={_utils.getBaselinePercentageValue(riskSummary.RiskValue[1] + riskSummary.RiskValue[2], dashboardSummary.TotalBaseline, false)} idea={_utils.formatCount(riskSummary.RiskCount[1] + riskSummary.RiskCount[2])} style={styles.colorItem} headStyle={{ fontWeight: "bold" }} />
                            <RowTab head={"High"} value={_utils.formatAmount2(riskSummary.RiskValue[3], true, false)} baseline={_utils.getBaselinePercentageValue(riskSummary.RiskValue[3], dashboardSummary.TotalBaseline, false)} idea={_utils.formatCount(riskSummary.RiskCount[3])} borderStyle={{ borderBottomWidth: 0 }} style={styles.colorItem} />
                        </View>
                    </View>

                    <View style={{ padding: 15 }}></View>

                    <View style={styles.child2}>
                        <View style={styles.headBlock}><Text style={[styles.txtStyle, styles.fontWeightText]}>{'P&L'}</Text></View>
                        <View style={styles.bodyBlock}>
                            <View style={[styles.inputContainerRow, {marginBottom: 0, paddingTop: 12, paddingBottom: 7, alignItems: "center", justifyContent: "center" }]}>
                                <RadioForm
                                    formHorizontal={true}
                                    animation={false}
                                >
                                    {radio_props.map((obj, i) => {

                                        return (
                                            <RadioButton labelHorizontal={true} key={i} >
                                                <RadioButtonInput
                                                    obj={obj}
                                                    index={i}
                                                    isSelected={this.props.selectedRadioForPAndL == (i + 1)}
                                                    onPress={this.OnPressRadioButtton}
                                                    borderWidth={1}
                                                    buttonInnerColor={'#666666'}
                                                    buttonOuterColor={'#666666'}
                                                    buttonSize={8}
                                                    buttonOuterSize={16}
                                                    buttonStyle={{ backgroundColor: "#dedede" }}
                                                    buttonWrapStyle={{ marginLeft: 10, }}
                                                />
                                                <RadioButtonLabel
                                                    obj={obj}
                                                    index={i}
                                                    labelHorizontal={true}
                                                    onPress={this.OnPressRadioButtton}
                                                    labelStyle={{ fontSize: 14, color: '#000' }}
                                                    labelWrapStyle={{}}
                                                />
                                            </RadioButton>
                                        )
                                    })}
                                </RadioForm>
                            </View>
                            {this.getDataByYear(fiscalTimings, "", "", "")}
                            {this.getDataByYear(fiscalTimings, riskSummary, "Low", isCompanyView)}
                            {this.getDataByYear(fiscalTimings, riskSummary, "Medium", isCompanyView)}
                            {this.getDataByYear(fiscalTimings, riskSummary, "SubTotal", isCompanyView)}
                            {this.getDataByYear(fiscalTimings, riskSummary, "High", isCompanyView)}
                        </View>
                    </View>
                    <View style={{ padding: 0 }}></View>
                </ScrollView>

            </View>

        );
    }

}



const styles = StyleSheet.create({

    riskTypeStyle: {
        width: WIDTH * 0.2,
        alignItems: "center",
        marginRight: 15
    },
    inputContainer: {
        flex: 1,
      //  width: WIDTH - 20,
        borderBottomWidth: 1,
        marginBottom: 10,
        flexDirection: "row",
        marginLeft: 10,
        marginRight: 10
    },
    riskText: {
        width: "100%",
        borderBottomWidth: 1,
        paddingTop: 3,
        paddingBottom: 3,
        backgroundColor: '#f6f7f7',
    },
    headBlock: {
        width: "100%",
        alignItems: "center",
        backgroundColor: '#f6f7f7',
        borderBottomWidth: 1,
        paddingTop: 3,
        paddingBottom: 3,
    },
    bodyBlock:{
        width: "100%",
    },
    colorItem: {
        color: "#2e58d6",
        fontSize: 14,
        paddingTop: 5,
        paddingBottom: 5,
    },
    txtStyle: {
        fontSize: 14,
        color: "#233238",
        paddingTop: 5,
        paddingBottom: 5,
    },
    inputContainerRow: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 5,
        marginBottom: 5,
    },
    item: {
        textAlign: "right",
        alignItems: "flex-end",
        color: 'blue',
        width: "20%",
       
    },
    rowBlock: {
        width: "100%",
        flexDirection: "row",
        // justifyContent: "space-between",
        borderBottomWidth: 1,
        // margin: 5,
    },
    child1: {
        flex: 1,
        width: WIDTH * 0.70,
    },
    child2: {
        flex: 1,
        width: WIDTH - 20,
        paddingRight: 5
    },
    borderBottomWidthStyle: {
        borderBottomWidth: 1
    },
    fontWeightText:{
        fontWeight: "bold"
    }
});

export default Tables;
