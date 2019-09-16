import React, { Component } from 'react';
import {View} from 'react-native';
import { Container, Header, Left, Icon, Content, Body, Title, Right, Subtitle, Text } from 'native-base';

class Ideas extends Component {
  render() {

    const projectName = this.props.screenProps.masterData.config['ClientSetting_ProjectName'] ? this.props.screenProps.masterData.config['ClientSetting_ProjectName'].Value : '';
    const projectSecondaryName = this.props.screenProps.masterData.config['ClientSetting_ProjectSecondaryName'] ? this.props.screenProps.masterData.config['ClientSetting_ProjectSecondaryName'].Value : '';

    return (
      <Container>
        <Header>
          <Left>
          <Icon name='arrow-back' style={{ color: 'white' }} onPress={() => this.props.navigation.goBack()} />
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
          {/* <IdeaList /> */}
          <Text>Idea Screen</Text>
        </Content>
      </Container>
    )
  }
}



export default Ideas;
