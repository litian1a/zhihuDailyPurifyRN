/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View
} from 'react-native';
import SplashScreen from './js/SplashScreen'
import MainScreen from './js/MainScreen'
import StoryDetail from './js/StoryDetail'
import {StackNavigator} from 'react-navigation'

export default class zhihuDailyPurifyRN extends Component {
    constructor(props) {
        super(props);
        this.state = {
            jumpHome: false
        };
    }
    componentDidMount(){
     setTimeout(()=>{this.setState({jumpHome:true})},3000);
    }
    render() {
        if (this.state.jumpHome) return (<MainScreen {...this.props}/>);
        return (
            <View style={styles.container}>

                <SplashScreen/>

            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});
const navigator = StackNavigator(
    {
        Home: { screen: zhihuDailyPurifyRN },
        StoryDetail: { screen: StoryDetail },
    },
    {
        initialRouteName: 'Home',
        headerMode: 'none',
        // mode: 'modal'
    }
);
AppRegistry.registerComponent('zhihuDailyPurifyRN', () => navigator);
