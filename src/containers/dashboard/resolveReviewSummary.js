import _ from 'lodash';
import React, { PureComponent } from 'react';
import { View, Text } from 'react-native';
import Card from "../../../src/components/dashboard/Card/Card";
import commonCSS from "../../../src/css/commonCSS";

class ResolveReviewSummary extends PureComponent {

    checkListBox(title, issueCount, ideasAffectedCount, headerClass) {
        return (
            /*   <div className="box-a" style={this.props.deviceType === 1 ? { position: "relative", height: 200 } : { position: "relative" }}>
                  <div className={headerClass}></div>
                  <div className="dashboard-title ht60 mgT20 inline-block">
                      <Translation id={title} />
                  </div>
                  <div className="dashboard-number mgT6 inline-block">{issueCount}</div>
                  <div className="dashboard-detail-text ht30 inline-block"></div>
                  <div className="dashboard-detail-text ht60 mgT5 inline-block">
                      <Translation id='IdeasAffected' params={{ count: ideasAffectedCount }} />
                  </div>
                  <div className='inline-block pdL10 pdT7 mgT9' style={{ verticalAlign: 'top' }}>
                      <Link to={AppConfig.baseUrl + 'Ideas/ResolveReview'}
                          onClick={this.props._onResolveReviewClick((title === 'IssuesToResolve' ? 1 : 2))}
                          className='v-gray-blue-dark size-16 lh20 cursor-pointer'
                          style={{ borderBottom: 'solid 2px #5789fa', textDecoration: 'none' }}>
                          <Translation id={title === 'PendingSharesTransfers' ? 'ViewIdeas' : 'ViewIssues'} />
                      </Link>
                      <i className='ion-arrow-right-a pdL7 v-gray-blue-dark'></i>
                  </div>
              </div> */
            <Card colorStyle={headerClass} titleTxt={title} numTxt={issueCount} detailTxt1={""} detailTxt2={`Ideas Affected ${ideasAffectedCount}`} linkTxt={"View Detail"}/>
        )
    }

    render() {

        console.log("props Resolve ", this.props)

        const resoveReviewCount = { resolve: 0, review: 0, resolveIdeasAffectedCount: 0, reviewIdeasAffectedCount: 0 };
        const resolveReviewSummary = this.props.resolveReviewDetails;
        if (this.props.selectedPhase === 1) {
            resoveReviewCount.resolve = _.sumBy(_.filter(resolveReviewSummary, (item) => { return item.phase === 1 && item.key !== 'ExpectedMultiGroupIdeas' && item.isResolve === true }), 'count');
            resoveReviewCount.resolveIdeasAffectedCount = _.uniq(_.flatten((_.filter(resolveReviewSummary, (item) => { return item.phase === 1 && item.key !== 'ExpectedMultiGroupIdeas' && item.isResolve === true })).map(item => (item.ideaGroupList.map(obj => obj.IdeaId))))).length;
            resoveReviewCount.review = _.sumBy(_.filter(resolveReviewSummary, (item) => { return item.phase === 1 && item.key !== 'ExpectedMultiGroupIdeas' && item.isResolve === false }), 'count');
            resoveReviewCount.reviewIdeasAffectedCount = _.uniq(_.flatten((_.filter(resolveReviewSummary, (item) => { return item.phase === 1 && item.key !== 'ExpectedMultiGroupIdeas' && item.isResolve === false })).map(item => (item.ideaGroupList.map(obj => obj.IdeaId))))).length;
        } else if (this.props.selectedPhase === 2) {
            resoveReviewCount.resolve = _.sumBy(_.filter(resolveReviewSummary, (item) => { return (item.phase === 1 || item.phase === 2) && item.key !== 'ExpectedMultiGroupIdeas' && item.isResolve === true }), 'count');
            resoveReviewCount.resolveIdeasAffectedCount = _.uniq(_.flatten((_.filter(resolveReviewSummary, (item) => { return (item.phase === 1 || item.phase === 2) && item.key !== 'ExpectedMultiGroupIdeas' && item.isResolve === true })).map(item => (item.ideaGroupList.map(obj => obj.IdeaId))))).length;
            resoveReviewCount.review = _.sumBy(_.filter(resolveReviewSummary, (item) => { return (item.phase === 1 || item.phase === 2) && item.key !== 'ExpectedMultiGroupIdeas' && item.isResolve === false }), 'count');
            resoveReviewCount.reviewIdeasAffectedCount = _.uniq(_.flatten((_.filter(resolveReviewSummary, (item) => { return (item.phase === 1 || item.phase === 2) && item.key !== 'ExpectedMultiGroupIdeas' && item.isResolve === false })).map(item => (item.ideaGroupList.map(obj => obj.IdeaId))))).length;
        } else {
            resoveReviewCount.resolve = _.sumBy(_.filter(resolveReviewSummary, (item) => { return item.key !== 'ExpectedMultiGroupIdeas' && item.isResolve === true }), 'count');
            resoveReviewCount.resolveIdeasAffectedCount = _.uniq(_.flatten((_.filter(resolveReviewSummary, (item) => { return item.key !== 'ExpectedMultiGroupIdeas' && item.isResolve === true })).map(item => (item.ideaGroupList.map(obj => obj.IdeaId))))).length;
            resoveReviewCount.review = _.sumBy(_.filter(resolveReviewSummary, (item) => { return item.key !== 'ExpectedMultiGroupIdeas' && item.isResolve === false }), 'count');
            resoveReviewCount.reviewIdeasAffectedCount = _.uniq(_.flatten((_.filter(resolveReviewSummary, (item) => { return item.key !== 'ExpectedMultiGroupIdeas' && item.isResolve === false })).map(item => (item.ideaGroupList.map(obj => obj.IdeaId))))).length;
        }

        return (
            this.props.resolveReviewDetails.length > 0 &&   
            <View>
                {this.checkListBox('Issues To Resolve', resoveReviewCount.resolve, resoveReviewCount.resolveIdeasAffectedCount, commonCSS.danger)}
                {this.checkListBox('Issues To Review', resoveReviewCount.review, resoveReviewCount.reviewIdeasAffectedCount, commonCSS.warning)}
                
                {(this.props.selectedPhase === 2 || this.props.selectedPhase === 3) &&
                
                   /*  <div className="box-a" style={this.props.deviceType === 1 ? { position: "relative", height: 200 } : { position: "relative" }}>
                        <div className="confirm"></div>
                        <div className="dashboard-title ht60 mgT20 inline-block"><Translation id={'RiskRaters'} /></div>
                        <div className="dashboard-number mgT6 inline-block">{this.props.riskratersWithRisks ? this.props.riskratersWithRisks.NoOfIncompleteRiskRaters : 0}</div>
                        <div className="dashboard-detail-text ht30 inline-block"><Translation id={'RatersWithIncompleteRatings'} /></div>
                        <div className="dashboard-detail-text ht60 mgT5 inline-block">
                            <Translation id='RiskRatingsAffected' params={{ count: this.props.riskratersWithRisks ? this.props.riskratersWithRisks.NoOfUnassignedRatings : 0 }} />
                            <br />&nbsp;
                            <Translation id='IdeasAffected' params={{ count: (this.props.riskratersWithRisks && this.props.riskratersWithRisks.AffectedIdeasWithNoRatings) ? this.props.riskratersWithRisks.AffectedIdeasWithNoRatings.length : 0 }} />
                        </div>
                        <div style={{ position: "absolute", bottom: 20, left: 0, right: 0 }}>
                            <button className="view-ideas mgT11 inline-block v-btn v-btn-neutral-outline pdLR20"
                                onClick={this.props.toggleRiskRatersReportModal.bind(this)}
                            >
                                <Translation id={'Details'} />
                            </button>
                        </div>
                    </div> */
                    <Card colorStyle={commonCSS.confirm} titleTxt={"Risk Raters"} 
                    numTxt={this.props.riskratersWithRisks ? this.props.riskratersWithRisks.NoOfIncompleteRiskRaters : 0} 
                    detailTxt1={"Raters With Incomplete Ratings"} 
                    detailTxt2={`Risk Ratings: ${this.props.riskratersWithRisks ? this.props.riskratersWithRisks.NoOfUnassignedRatings : 0} ${"\n"} Ideas Affected: ${(this.props.riskratersWithRisks && this.props.riskratersWithRisks.AffectedIdeasWithNoRatings) ? this.props.riskratersWithRisks.AffectedIdeasWithNoRatings.length : 0 }`}
                    detailButtonTxt={"Details"}/>
                }
                {(this.props.selectedPhase === 2 || this.props.selectedPhase === 3) &&
                    /* <div className="box-a" style={this.props.deviceType === 1 ? { position: "relative", height: 200 } : { position: "relative" }}>
                        <div className="confirm"></div>
                        <div className="dashboard-title ht60 mgT20 inline-block"><Translation id={'MultiGroupIdeas'} /></div>
                        <div className="dashboard-number mgT6 inline-block">{this.props.selectedPhase === 2 ? this.props.pendingActionsCount ? this.props.pendingActionsCount : 0 : this.props.multiGroupIdeas}</div>
                        <div className="dashboard-detail-text ht30 inline-block"> <Translation id={this.props.selectedPhase === 3 ? 'MultiGroupIdeasBoxSubTitle' : 'PendingActions'} /></div>
                        <div className="dashboard-detail-text ht60 mgT5 inline-block">&nbsp;</div>
                        <div className='inline-block pdL10 pdT7 mgT9 col-phone-hidden' style={{ verticalAlign: 'top' }}>
                            {!this.props.isCompanyView && this.props.selectedPhase === 2 &&
                                <Link className='v-gray-blue-dark size-16 lh20 cursor-pointer'
                                    style={{ borderBottom: 'solid 2px #5789fa', textDecoration: 'none' }}
                                    to={AppConfig.baseUrl + 'Ideas/Comprehensive'}
                                    //onClick={this.props.toggleMultiGroupIdeasModal}
                                    onClick={this.toggleModal.bind(this)}
                                >
                                    <Translation id={'ViewIdeas'} />
                                </Link>
                            }
                            {!this.props.isCompanyView && this.props.selectedPhase === 2 &&
                                <i className='ion-arrow-right-a pdL7 v-gray-blue-dark'></i>
                            }
                            {this.props.isCompanyView && this.props.selectedPhase === 2 &&
                                <div style={{ position: "absolute", bottom: 20, left: 0, right: 0 }}>
                                    <button className="view-ideas mgT11 inline-block v-btn v-btn-neutral-outline pdLR20"
                                        onClick={this.props.toggleDashBoardDetailsModal.bind(this, 'MultiGroupIdeas', 'MultiGroupIdeas', '')}>
                                        <Translation id={'ViewByGroup'} />
                                    </button>
                                </div>
                            }
                            {this.props.selectedPhase === 3 &&
                                <div style={{ position: "absolute", bottom: 20, left: 0, right: 0 }}>
                                    <button className="view-ideas mgT11 inline-block v-btn v-btn-neutral-outline pdLR20"
                                        onClick={this.props.toggleDashBoardDetailsModal.bind(this, 'Phase3MultiGroupIdeas', 'MultiGroupIdeas', '')}>
                                        <Translation id={'Details'} />
                                    </button>
                                </div>
                            }
                        </div>
                    </div> */
            
                    <Card colorStyle={commonCSS.confirm} titleTxt= {"Multi-group Ideas"}//{"RiskRMultiGroupIdeaaters"} 
                    numTxt={this.props.selectedPhase === 2 ? this.props.pendingActionsCount ? this.props.pendingActionsCount : 0 : this.props.multiGroupIdeas} 
                    detailTxt1={this.props.selectedPhase === 3 ? 'Multi Group Ideas Box SubTitle' : 'Pending Actions'} 
                    detailTxt2={""}
                    //linkTxt={"View Detail"}
                    />
                
                }

            </View>
        )
    }
}


export default ResolveReviewSummary;