//import { getDashboardData } from '../actions/dashboardActions';
//import signalr from 'react-native-signalr';
//import { getChachedState } from '../store/ideas2/selectors/ideaGroup';
import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
// import { getIdeaGroupDashboardData, getDashboardOtherDataList } from '../actions/dashboardActions';
// import { getPreparedDashboardData } from '../store/dashboard/selectors/dashboardCommon';
import Dashboard from '../containers/dashboard/index';
import { Container, Header, Left, Icon, Content, Body, Title, Right, Subtitle } from 'native-base';

/* const groupId = "d7fedc8a-ba7f-8c92-1b47-2f3cc5081ddc";
const isGroupChange = false;
const organizationId = "AD663F6D-2BD6-C538-AA56-ED3F4E9E915E";
const projectId = "3f3bfed1-aa59-40a5-83c7-720707742df6";
const userId = "cf1388b4-fe3f-46eb-8d7b-9c86133e597d"; */

class App extends Component {

  constructor(props) {
    super(props);

  }

  // componentDidMount() {
  //   this.props.screenProps.getIdeaGroupDashboardData;
  //   this.props.screenProps.getDashboardOtherDataList;
  // }


  render() {
    // console.log("props ", this.props);

    const projectName = this.props.screenProps.masterData.config['ClientSetting_ProjectName'] ? this.props.screenProps.masterData.config['ClientSetting_ProjectName'].Value : '';
    const projectSecondaryName = this.props.screenProps.masterData.config['ClientSetting_ProjectSecondaryName'] ? this.props.screenProps.masterData.config['ClientSetting_ProjectSecondaryName'].Value : '';

    //this.props.dashboardSummaryData.dashboardSummary.groupSummaryList[0].phase1.focusAreaSummary // riskSummary    

    /* return (
      <View style={{ flex: 1 }}>
        <View>
          <Header headerText={'VICI CENTRAL'} />
          <IdeaList />
          <Dashboard {...this.props} showView={true}/>
        </View>
      </View>
    ) */

    

    return (
      <Container>
        <Header>
        <Left>
          <Icon name='arrow-back' style={{ color: 'white' }} onPress={() => this.props.navigation.navigate('Login')} />
          </Left>
          <Body>
          <View style={{ width: 190, padding: 10 }}>
              <Title style={{ color: '#97bcfd', fontWeight: '600' }}>{projectName}</Title>
              <Subtitle style={{ color: '#c7dbfe', textAlign:'left' }}>{projectSecondaryName}</Subtitle>
            </View>
          </Body>
          <Right>
            <Icon name="menu" style={{ color: 'white' }} onPress={() => this.props.navigation.openDrawer()} />
          </Right>
        </Header>
        <Content>
          {/* <View style={{ flex: 1 }}>
            <IdeaList salaryRange={this.props.masterData.salaryRange} />
          </View> */}
          <View style={styles.container}>
            <Dashboard {...this.props} showView={true} />
          </View>
        </Content>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  titles: {
  }
})

export default App;
