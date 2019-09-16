import _ from 'lodash';
import React, { PureComponent } from 'react';
import { View, Text } from 'react-native';
import Tables from '../Tables/Tables'
import { throwStatement } from '@babel/types';

class Summary extends PureComponent {
    render() {
        console.log("props Risk ", this.props)
/* 
        const fiscalTimings = _.uniqBy(_.map(this.props.fiscalTimings, 'year'));

        {this.renderTableHeader(fiscalTimings, this.props.phase2Summary, this.props.isCompanyView)}
        {
            this.renderTableBody(fiscalTimings, this.props.phase2Summary, this.props.isCompanyView)
        } 

 <tr className="risk-title-row-1">
                    <th className="wd-6pc upcase" style={{ textAlign: "center" }}><Translation id={'Risk'} /></th>
                    <th className="wd-3pc" style={{ border: "none" }}></th>
                    <th className="wd-28pc upcase" colSpan="3" style={{ textAlign: "center" }}><Translation id={'Impact'} /></th>
                    <th className="wd-3pc" style={{ border: "none" }}></th>
                    </tr> */
        return (
            
            <View>
                 <Tables {...this.props} /> 
            </View>
        )
    }
}


export default Summary;