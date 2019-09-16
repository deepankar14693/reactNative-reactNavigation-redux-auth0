import React, { Component } from 'react';
import { View, Text, Dimensions, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import PhaseDropdown from './PhaseDropdown';
import { Icon } from 'native-base';
import { DrawerItems } from 'react-navigation';
import _ from 'lodash';

// const WIDTH = Dimensions.get('window').width;
// const HEIGHT = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#a4bbf9'
  },
  link: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 6,
    paddingLeft: 14,
    margin: 20,
  },
  topLinks: {
    height: 160
  },
  bottomLinks: {
    backgroundColor: '#a4bbf9',
    paddingTop: 40,
    paddingBottom: 450,
    color: 'black',
    padding: 18,
  }
});

class MenuDrawer extends Component {

  constructor(props) {
    super(props);
  }

  getProjectDropdownOptions = (projects) => {
    if (projects && (!_.isEmpty(projects))) {
      return _.map(projects, (project, index) => ({ label: project.Name, value: project.ProjectId, index: index }))
    }
  }

  render() {
    const projectDropdownOptions = this.getProjectDropdownOptions(this.props.screenProps.organizationMasterData.projects);
    return (
      <SafeAreaView style={styles.container}>
        <View style={{ alignItems: 'flex-end' }}>
          <Icon name="close" style={{ color: 'black', margin: 20 }} onPress={this.props.navigation.closeDrawer} />
        </View>
        {projectDropdownOptions && projectDropdownOptions.length !== 0 &&
          <View style={styles.link}>
            <Text style={{ margin: 4, fontSize: 20, fontWeight: 'bold' }}>Select Project</Text>
            <PhaseDropdown projectDropdownOptions={projectDropdownOptions} />
          </View>
        }
        <ScrollView style={styles.bottomLinks}>
          <DrawerItems {...this.props} activeTintColor='#2196f3' activeBackgroundColor='rgba(0, 0, 0, .08)' inactiveTintColor='rgba(0, 0, 0, .87)' inactiveBackgroundColor='transparent' style={{ backgroundColor: '#000000' }} labelStyle={{ color: 'black', fontSize: 20, paddingTop: 10 }} />
        </ScrollView>
      </SafeAreaView>
    )
  }

}

export default MenuDrawer;
