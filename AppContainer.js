import React, { Component } from 'react';
import { createDrawerNavigator, createStackNavigator, createAppContainer } from 'react-navigation';
import { Dimensions } from 'react-native';
import MenuDrawer from './src/components/MenuDrawer';
import Root from './src/components/root';
import Ideas from './src/components/Ideas';
import LoginScreen from './src/components/LoginScreen';
import { getPreparedDashboardData } from './src/store/dashboard/selectors/dashboardCommon';
import { getIdeaGroupDashboardData } from './src/actions/dashboardActions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

const WIDTH = Dimensions.get('window').width;

export const AppDrawer = createDrawerNavigator(
  {
    Home: Root,
    Ideas: Ideas
  },
  {
    drawerWidth: WIDTH * 0.80,
    drawerPosition: 'right',
    contentComponent: MenuDrawer
  })

export const AppStack = createStackNavigator({
  Login: {
    screen: LoginScreen,
    navigationOptions: {
      header: null,
      gestureEnabled: false
    }
  },
  Drawer: {
    screen: AppDrawer,
    navigationOptions: {
      header: null,
      gestureEnabled: false
    }
  },
  initialRouteName: 'Login'
})


const Container = createAppContainer(AppStack);

class AppContainer extends Component {
  render() {
    return (
      <Container screenProps={this.props} />
    )
  }
}

// const WIDTH = Dimensions.get('window').width;

// const DrawerApp = createDrawerNavigator(
//   {
//     Home: Root,
//     Ideas: Ideas
//   },
//   {
//     drawerWidth: WIDTH * 0.80,
//     drawerPosition: 'right',
//     // contentComponent: ({ navigation }) => {
//     //   return (<MenuDrawer navigation={navigation} />)
//     // }
//     contentComponent: MenuDrawer
//   })

// const AppContainer = createAppContainer(DrawerApp);

function mapStateToProps(state, props) {
  const getData = getPreparedDashboardData()
  return {
    data: state,
    ideaData: state.ideaData,
    organizationMasterData: state.organizationMasterData,
    dashboardSummaryData: getData(state, props).dashboardSummary,
    isLoading: state.ideaData.isLoading,
    isIdeaDataLoading: state.ideaData.isLoading,
    // isPlanningLoading: state.completionTracker.isLoading,
    //isTrackingLoading: state.completionTracker.isTrackingLoading,
    config: state.masterData.config,
    filter: state.ideaGroupFilter,
    dashboardPersists: state.dashboardPersists,
    masterData: state.masterData,
    organizationMasterData: state.organizationMasterData,
    masterDataGroups: state.masterData.groups,
    customFields: state.masterData.customFields,
    summaryText: state.summaryText,
    permissions: state.permissions,
    dashboardData: state.dashboardData,
    timings: state.masterData.fiscalTimings,
    timeStamps: state.timeStamps,
    riskRatersReport: state.riskRatersReport
  };
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ getIdeaGroupDashboardData }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
