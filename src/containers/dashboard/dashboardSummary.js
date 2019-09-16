import _ from 'lodash';
import React, { PureComponent } from 'react';
import { View, StyleSheet } from 'react-native';
import Phase1RiskSummary from '../../components/dashboard/phase1/riskSummary';
import Phase2RiskSummary from '../../components/dashboard/phase2/riskSummary';
import ResolveReviewSummary from './resolveReviewSummary';

class DashboardSummary extends PureComponent {

    constructor(props) {
        super(props);
        console.log("props DashboardSummary ", this.props)
        // this.onIncomingShareClick = this.onIncomingShareClick.bind(this);
    }

    getRiskSummary() {
        let riskSummary = [];
        if (this.props.dashboardSummary && this.props.dashboardSummary.groupSummaryList.length > 0) {
            switch (this.props.selectedPhase) {
                case 1:
                    if (this.props.isCompanyView) {
                        riskSummary = this.props.dashboardSummary.phase1.riskSummary;
                    } else {
                        riskSummary = this.props.dashboardSummary.groupSummaryList[0].phase1.riskSummary;
                    }
                    return riskSummary;
                case 2:
                    if (this.props.isCompanyView) {
                        riskSummary = this.props.dashboardSummary;
                    } else {
                        riskSummary = this.props.dashboardSummary.groupSummaryList[0];
                    }
                    return riskSummary;
                case 3:
                    if (this.props.isCompanyView) {
                        riskSummary = this.props.dashboardSummary;
                    } else {
                        riskSummary = this.props.dashboardSummary.groupSummaryList[0];
                    }
                    return riskSummary;
                default: return riskSummary;
            }
        }
    }

    getPendingActionsCount() {
        let pendingActionsCount = 0;
        if (this.props.dashboardSummary && this.props.dashboardSummary.groupSummaryList.length > 0) {
            if (this.props.isCompanyView) {
                pendingActionsCount = _.sum(_.map(this.props.dashboardSummary.groupSummaryList, function (item) { return item.pendingMultiGroupIdeaList.length }));
            } else {
                pendingActionsCount = this.props.dashboardSummary.groupSummaryList[0].pendingMultiGroupIdeaList.length;
            }
        }
        return pendingActionsCount;
    }

    render() {
        const riskSummary = this.getRiskSummary();
        const pendingActionsCount = this.getPendingActionsCount();
        const emptyRiskRaters = { NoOfIncompleteRiskRaters: 0, NoOfUnassignedRatings: 0, AffectedIdeasWithNoRatings: [] }
        return (
            <View style={styles.Container}>
                <View>
                    {this.props.dashboardSummary && this.props.dashboardSummary.groupSummaryList.length > 0 && 
                        <View>
                            {this.props.selectedPhase === 1 &&
                                <View>
                                    <Phase1RiskSummary deviceType={"mobile"}
                                        //riskSummary={this.props.dashboardSummary.phase1.riskSummary}
                                        riskSummary={riskSummary}
                                        onDashboardFilter={this.props.onDashboardFilter}
                                        isCompanyView={this.props.isCompanyView}
                                        selectedPhase={this.props.selectedPhase}
                                    //  renderDashboardLinkTooltrips={this.props.renderDashboardLinkTooltrips}
                                    //  toggleDashBoardDetailsModal={this.props.toggleDashBoardDetailsModal} 
                                    />

                                    {/*     {this.checkListBox('CategoriesWithoutAnyImpact', this.props.dashboardData.data ? this.props.dashboardData.data.CategoriesWithoutAnyImpact : [], 'confirm')}
                                    {this.checkListBox('FunctionalTitlesWithoutAnyImpact', this.props.dashboardData.data ? this.props.dashboardData.data.FunctionalTitlesWithoutAnyImpact : [], 'confirm')}
                                    {this.checkListBox('PendingSharesTransfers', this.props.dashboardData.data ? this.props.dashboardData.data.PendingSharesTransfers : [], 'confirm')} */}
                                </View>
                            }
                            {(this.props.selectedPhase === 2 || this.props.selectedPhase === 3) &&
                                <View>
                                    <Phase2RiskSummary
                                        deviceType={"mobile"}
                                        phase2Summary={riskSummary}
                                        // //riskSummary={this.props.dashboardData.data.Summary}
                                        // onDashboardFilter={this.props.onDashboardFilter}
                                        // proformaDetails={this.props.dashboardData.proformaDetails}
                                        isCompanyView={this.props.isCompanyView}
                                        // selectedPhase={this.props.selectedPhase}
                                        // toggleDashBoardDetailsModal={this.props.toggleDashBoardDetailsModal}
                                        fiscalTimings={this.props.fiscalTimings}
                                    // onOnTimeAndPAndLDetailClick={this.props.onOnTimeAndPAndLDetailClick.bind(this)}
                                    // selectedRadioForOneTime={this.props.selectedRadioForOneTime}
                                       selectedRadioForPAndL= {this.props.selectedRadioForPAndL}
                                    // onRadioChangeForOneTime={this.props.onRadioChangeForOneTime}
                                       onRadioChangeForPAndL={this.props.onRadioChangeForPAndL}
                                    // showPAndLLink={this.props.showPAndLLink}
                                    // selectedRadioForValues={this.props.selectedRadioForValues}
                                    // selectedRadioForRecomm={this.props.selectedRadioForRecomm}
                                    // selectedRadioForDecision={this.props.selectedRadioForDecision}
                                    // renderDashboardLinkTooltrips={this.props.renderDashboardLinkTooltrips}
                                    />

                                </View>
                            }
                            {this.props.selectedPhase < 4 &&
                                <View>
                                    <ResolveReviewSummary
                                        resolveReviewDetails={this.props.dashboardSummary ? this.props.dashboardSummary.resolveReview : []}
                                        // _onResolveReviewClick={this.props._onResolveReviewClick}
                                        selectedPhase={this.props.selectedPhase}
                                        // selectedRadioForValues={this.props.selectedRadioForValues}
                                        // selectedRadioForRecomm={this.props.selectedRadioForRecomm}
                                        // selectedRadioForDecision={this.props.selectedRadioForDecision}
                                        // filteredGroupId={this.props.filteredGroupId}
                                        // toggleMultiGroupIdeasModal={this.props.toggleMultiGroupIdeasModal}
                                        // toggleDashBoardDetailsModal={this.props.toggleDashBoardDetailsModal}
                                        isCompanyView={this.props.isCompanyView}
                                        // toggleRiskRatersReportModal={this.props.toggleRiskRatersReportModal}
                                        riskratersWithRisks= {this.props.dashboardData.data ? this.props.dashboardData.data.RatersWithIncompleteRatings : emptyRiskRaters}
                                        pendingActionsCount={pendingActionsCount}
                                    // multiGroupIdeas={this.props.dashboardData.data && this.props.dashboardData.data.MultiGroupIdeas ? this.props.dashboardData.data.MultiGroupIdeas : 0}
                                    />
                                </View>
                            }
                        </View>
                    }
                </View>
            </View>
        )
    }
}

export default DashboardSummary;

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        width: "96%",
        margin: "2%",
        fontSize: 14,

    },
})