import _ from 'lodash';
import React, { PureComponent } from 'react';
import { View } from 'react-native';
import DashboardSummary from './dashboardSummary';
import AppConfig from '../../appConfig';

/* import { Radio, RadioGroup } from 'react-radio-group';
import ReactTooltip from 'react-tooltip';
import { logUIActions } from '../../actions/axiosActions';
import { ideaFilters, phaseOptions } from '../../common/constants';
import { isLessThanGroupAccess } from '../../common/permissionMaster';
import { Components, Events, Names, Path } from '../../common/uiActions';
import * as utils from '../../common/utils';
import ConfirmBox from '../../components/common/confirmBox';
import Loader from '../../components/common/loader';
import Notifications from '../../components/common/notifications';
import ShowLoadingNotificationMVC from '../../components/common/showLoadingNotificationMVC';
import Tooltip from '../../components/common/tooltip';
import Translation from '../../components/common/translation';
import DebouncedContainer from '../../components/dashboard/phase1/scrReport';
import i18n from '../../i18n';
import DashBoardSummaryDetailsModal from './dashBoardDetailModal';
import Implementation from './implementationContainer';
import QualityChecklist from './qualityChecklist';
 */

var valueImpactClicked;
class Dashboard extends PureComponent {

  constructor(props) {
    super(props);

    this.state={
      selectedRadioForPAndL: '1',
    }

    this.onRadioChangeForPAndL = this.onRadioChangeForPAndL.bind(this);

    /* this.state = {
      issueType: props.state.dashboardPersists.selectedDashboardSubmenu,
      // selectedResolveReviewTab: 1,
      showDetailModal: false,
      title: '',
      title2: null,
      groupTitle: '',
      clickedDetailedBox: '',
      showGroupSummary: false,
      deatiledGroupId: '',
      deatiledGroupName: '',
      detailsData2: [],
      selectedRadioForOneTime: '1',
      selectedRadioForPAndL: '1',
      showInactiveIdeas: true,
      showPAndLLink: false,
      varianceTitle: '',
      showConfirmModal: false, 
    } */
    //this._onClickResolveReviewByGroup = this._onClickResolveReviewByGroup.bind(this);
  /*   this.onDashboardFilterPhase1 = this.onDashboardFilterPhase1.bind(this);
    this.onDashboardFilterPhase2 = this.onDashboardFilterPhase2.bind(this);
    this.onDashboardFilterCategoryAndFTE = this.onDashboardFilterCategoryAndFTE.bind(this);
    this.toggleDashBoardDetailsModal = this.toggleDashBoardDetailsModal.bind(this);
    this.toggleBackDashBoardDetailsModal = this.toggleBackDashBoardDetailsModal.bind(this);
    this.onDashboardFilter = this.onDashboardFilter.bind(this);
    this.onGroupLinkClick = this.onGroupLinkClick.bind(this);
    this.changeModalTitle = this.changeModalTitle.bind(this);
    this._onPhaseChange = this._onPhaseChange.bind(this);
    this.onRadioChangeForOneTime = this.onRadioChangeForOneTime.bind(this);
    this.toggleRiskRatersReportModal = this.toggleRiskRatersReportModal.bind(this);
    this.exportRiskRaters = this.exportRiskRaters.bind(this);
    this.onOnTimeAndPAndLDetailClick = this.onOnTimeAndPAndLDetailClick.bind(this);
    this.groupFTEDetails = this.groupFTEDetails.bind(this);
    this.exportFTE = this.exportFTE.bind(this);
    this.exportMultiGroupIdeas = this.exportMultiGroupIdeas.bind(this);
    this.toggleVarianceLinkClick = this.toggleVarianceLinkClick.bind(this);
    this.getIdeasWithVariance = this.getIdeasWithVariance.bind(this);
    this.exportIdeasWithVariance = this.exportIdeasWithVariance.bind(this);
    this.renderDashboardLinkTooltrips = this.renderDashboardLinkTooltrips.bind(this); */
  }

  onRadioChangeForPAndL(value, event) {
    this.setState({ selectedRadioForPAndL: value });
    /* let component = (this.props.state.selectedPhase == 2 ? 'SCR2/' : 'SCR3/') + Components.Filter;
    let name = '';
    if (value == "1") {
        name = 'P&L/P&L';
    } else {
        name = 'P&L/Cash Flow';
    }
    logUIActions(Path.DashboardSummary, component, name, Events.Selected); */
}

  render() {
    const data = this.props;
    return (
      <View style={{ flex: 1 }}>
        {(this.props.state.selectedPhase < 4 &&  this.props.state.screenProps.dashboardSummaryData.dashboardSummary && this.props.state.screenProps.dashboardSummaryData.dashboardSummary.groupSummaryList.length > 0) &&
        <View>
          <DashboardSummary
             filteredGroupId={AppConfig.groupId}
             dashboardData={this.props.state.screenProps.dashboardData}
            dashboardSummary={this.props.state.screenProps.dashboardSummaryData.dashboardSummary}
            // resolveReview={resolveReview}
             isCompanyView={false} 
             deviceType={"mobile"}
            selectedPhase={2}
            // _onResolveReviewClick={this.props.state._onResolveReviewClick}
            // clickedDetailedBox={this.state.clickedDetailedBox}
            // onDashboardFilter={(this.props.state.selectedPhase === 1 ? this.onDashboardFilterPhase1 : this.onDashboardFilterPhase2)}
            // toggleDashBoardDetailsModal={this.toggleDashBoardDetailsModal}
             fiscalTimings={this.props.state.screenProps.masterData.fiscalTimings}
            // selectedRadioForValues={this.props.state.selectedRadioForValues}
            // selectedRadioForRecomm={this.props.state.selectedRadioForRecomm}
            // selectedRadioForDecision={this.props.state.selectedRadioForDecision}
            // selectedRadioForOneTime={this.state.selectedRadioForOneTime}
            selectedRadioForPAndL={this.state.selectedRadioForPAndL}
            // onRadioChangeForOneTime={this.onRadioChangeForOneTime}
            onRadioChangeForPAndL={this.onRadioChangeForPAndL}
            // toggleTransferModal={this.props.state.toggleTransferModal}
            // toggleMultiGroupIdeasModal={this.props.state.toggleMultiGroupIdeasModal}
            // toggleRiskRatersReportModal={this.toggleRiskRatersReportModal}
            // exportRiskRaters={this.exportRiskRaters}
            // onOnTimeAndPAndLDetailClick={this.onOnTimeAndPAndLDetailClick}
            // showPAndLLink={this.state.showPAndLLink}
            // dashboardFilter={this.props.state.dashboardFilter}
            // renderDashboardLinkTooltrips={this.renderDashboardLinkTooltrips}
          />
        </View>
        }
      </View>
    )
  }
}

export default Dashboard;
