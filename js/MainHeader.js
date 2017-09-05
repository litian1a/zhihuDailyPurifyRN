import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    Image,
    TouchableOpacity
} from 'react-native';

import ViewPager from 'react-native-viewpager';
import Swiper from 'react-native-swiper';

const deviceWidth = Dimensions.get('window').width;


export default class MainHeader extends Component {

    constructor(props) {
        super(props);

        this.state = {
            data: this.props.headData
        }
    }

    render() {
        return (
            <View style={styles.container}>
            <Swiper style={styles.wrapper} autoplay={true} autoplayTimeout={5}>
                {this.renderPage()}
            </Swiper>
                {/*<Text style={{margin:10}}>今日要闻</Text>*/}
            </View>

        );
    }

    renderPage(){
        let data = this.state.data;
        let pageItem = [];
        for (let story of data) {
            pageItem.push(
                <TouchableOpacity  key={story.id.toString()} style={{width: deviceWidth, height: 200}}>
                    <Image
                        source={{uri: story.image}}
                        style={styles.headerItem}>
                    <View style={styles.headerTitleContainer}>
                        <Text style={styles.headerTitle}
                              numberOfLines={2}>
                            {story.title}
                        </Text>
                    </View>
                    </Image>
                </TouchableOpacity>
            )
        }
        return pageItem
    }
}


const styles = StyleSheet.create({
    container: {
        width: deviceWidth,
        height: 200,
        flexDirection:'column'
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '500',
        color: 'white',
        marginBottom: 10,
    },
    headerItem: {
        width: deviceWidth,
        height: 200,
        flexDirection: 'row',
    },
    headerTitleContainer: {
        flex: 1,
        alignSelf: 'flex-end',
        padding: 10,
        backgroundColor: 'rgba(0,0,0,0.2)',
    },
});