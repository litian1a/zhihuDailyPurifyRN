import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    Image,
    Dimensions,
    Animated,
    View
} from 'react-native';

const WINDOW_WIDTH = Dimensions.get('window').width;


export default  class  SplashScreen extends Component{
    constructor(props){
        super(props);
        this.state={
            ani:new Animated.Value(1),
        };
    }
    componentDidMount(){
        Animated.timing(
            this.state.ani,
            {
                toValue: 1.2,
                duration: 5000,
            }
        ).start();
    }
    render() {
        return (
            <View style={styles.container}>
                <Animated.Image style={{
                    flex: 1,
                    width: WINDOW_WIDTH,
                    height: 1,
                    transform: [{scale: this.state.ani},]
                }} source={ {uri:'splash'}}/>
                <Image style={styles.splash_logo} source={{uri:'splash_logo'}}/>
            </View>
        );
    }


}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    },

    splash_logo:{
        resizeMode: 'contain',
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 30,
        height: 54
    }

});
