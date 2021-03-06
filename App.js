import React from 'react';
import { StatusBar, Platform, View } from 'react-native';
import {AppLoading, Font, Asset, Constants} from 'expo';

import fonts from 'app/src/fonts'
import images from 'app/src/images'

import Navigation from 'app/src/navigation/AppNavigator';

export default class App extends React.Component {

  static navigationOptions = {
    title: 'REGISTRATION',
    headerTitleStyle :{textAlign: 'center',alignSelf:'center'},
    headerStyle:{
      backgroundColor:'#111',
    },
  };

  static defaultProps = {
    skipLoadingScreen: false
  };

  state = {
    isLoadingComplete: false
  };

  loadResourcesAsync = async () => {
    await Asset.loadAsync(Object.keys(images).map(key => images[key]));
    await Font.loadAsync(fonts);
    return true;
  };

  render() {
    const { isLoadingComplete } = this.state;
    const { skipLoadingScreen } = this.props;

    if(!isLoadingComplete && !skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this.loadResourcesAsync}
          onError={error => console.warn(error)}
          onFinish={() => this.setState({ isLoadingComplete: true })}
        />
      );
    }
    return(
      <View style={{ flex: 1 }}>
        {Platform.OS === 'ios' && <StatusBar backgroundColor="#111" barStyle="light-content" />}
        <Navigation />
      </View>
    );
  }
}
