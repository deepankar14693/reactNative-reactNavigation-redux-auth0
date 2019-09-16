import React from 'react';
import {View, Text } from 'react-native';
import { withTranslation } from 'react-i18next';

class Translation extends React.PureComponent {
  render() {
    const { t } = this.props;
    if (this.props.params)
      return <Text>{t(this.props.id, this.props.params)}</Text>
    else if (this.props.count || this.props.count >= 0)
      return <Text>{t(this.props.id, { count: this.props.count })}</Text>
    return <Text>{t(this.props.id)}</Text>
  }
}

export default withTranslation(['translation'])(Translation);
