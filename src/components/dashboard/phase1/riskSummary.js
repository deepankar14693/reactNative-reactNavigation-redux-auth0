import _ from 'lodash';
import React, { PureComponent } from 'react';
import AppConfig from '../../../appConfig';
import { formatAmount2, formatCount } from '../../../common/utils';
import { View, Text } from 'react-native';
import Tables from '../Tables/Tables'

class RiskSummary extends PureComponent {

    render(){
        return(
            <View>
               <Tables {...this.props}/>
            </View>
        )
    }
}

export default RiskSummary;