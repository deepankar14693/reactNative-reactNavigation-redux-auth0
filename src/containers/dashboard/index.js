import React, { PureComponent } from 'react';
import Dashboard from './dashboard';

class Index extends PureComponent {

    render() {
      
        return (
            <Dashboard state={this.props} showView={this.props.showView} />
        )
    }
}

export default Index;