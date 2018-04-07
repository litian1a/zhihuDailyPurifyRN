import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    Image,
    TouchableNativeFeedback,
    View,
    TouchableOpacity,
    ScrollView,
    WebView
} from 'react-native';

import DataSourceRepository from "./DataSourceRepository";
import WebContainer from "./WebContainer";

const dataSource = new DataSourceRepository()

export default class StoryDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            story: this.props.navigation.state.params.story,
            detailData: null,
            height:500
        };

        dataSource.fetchStoryDetailData(this.state.story.id)
            .then((data) => {
                this.setState({story: this.state.story, detailData: data});

            });

    };

    render() {
        let story = this.state.story;

        return (
            <View style={styles.container}>
                {this.renderDetailHeader()}
                    <ScrollView >
                    {this._renderWebView()}
                    {this._renderPage(story.id, story.images[0], story.title)}

                    </ScrollView>

            </View>
        );
    };

    _renderWebView() {
        if (this.state.detailData === null) {
            return (<View style={{flex: 1}}>
                <Text>正在加载中</Text>
                </View>
            )
        }
        let html = '<!DOCTYPE html><html><head><link rel="stylesheet" type="text/css" href="'
            + this.state.detailData.css[0]
            + '" /></head><body>' + this.state.detailData.body
            + '</body></html>';
        return (

            <WebContainer html={html}/>
        )

    }


    _renderPage(id, image, title) {

        return (
            <TouchableOpacity key={id} style={{flex: 1, height: 200,
                position: 'absolute',
                left: 0,
                right: 0,
                bottom: 0,
                top:0}}>
                <Image
                    source={{uri: image}}
                    style={styles.headerItem}>
                    <View style={styles.headerTitleContainer}>
                        <Text style={styles.headerTitle}
                              numberOfLines={2}>
                            {title}
                        </Text>
                    </View>
                </Image>
            </TouchableOpacity>)
    }

    renderDetailHeader = () => {
        return (
            <View {...this.props}>

                <View style={styles.head}>
                    <TouchableNativeFeedback onPress={()=>{this.props.navigation.goBack(null)}}>
                        <View style={styles.actionItem}>
                            <Image
                                style={styles.backIcon}
                                source={{uri: 'ic_back_white'}}
                                resizeMode='contain'/>
                        </View>
                    </TouchableNativeFeedback>
                    <View style={{flex: 1}}/>
                    <TouchableNativeFeedback>
                        <View style={styles.actionItem}>
                            <Image
                                style={styles.actionIcon}
                                source={{uri: 'ic_share_white'}}
                                resizeMode='contain'/>
                        </View>
                    </TouchableNativeFeedback>
                    <TouchableNativeFeedback>
                        <View style={styles.actionItem}>
                            <Image
                                style={styles.actionIcon}
                                source={{uri: 'ic_collect_white'}}
                                resizeMode='contain'/>
                        </View>
                    </TouchableNativeFeedback>
                    <TouchableNativeFeedback>
                        <View style={styles.actionItem}>
                            <Image
                                style={styles.actionIconWithCount}
                                source={{uri: 'ic_comment_white'}}
                                resizeMode='contain'/>
                            <Text style={styles.count}>
                                {/*{(this.state.isLoading || !this.state.extra) ? '...' : this.state.extra.comments}*/}
                            </Text>
                        </View>
                    </TouchableNativeFeedback>
                    <TouchableNativeFeedback>
                        <View style={styles.actionItem}>
                            <Image
                                style={styles.actionIconWithCount}
                                source={{uri: 'ic_praise_white'}}
                                resizeMode='contain'/>
                            <Text style={styles.count}>
                                {/*{(this.state.isLoading || !this.state.extra) ? '...' : this.state.extra.popularity}*/}
                            </Text>
                        </View>
                    </TouchableNativeFeedback>
                </View>
            </View>   )

    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    head: {

        height: 56,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#00a2ed'
    },
    backIcon: {
        width: 32,
        height: 32,
        marginLeft: 8,
        marginRight: 8,
    },
    actionItem: {
        height: 56,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: 8,
        paddingRight: 8,

    },
    actionIcon: {
        width: 32,
        height: 32,
    },
    actionIconWithCount: {
        width: 32,
        height: 32,
        marginLeft: 5,
    },
    count: {
        fontSize: 16,
        color: 'white',
        marginRight: 5,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '500',
        color: 'white',
        marginBottom: 10,
    },
    headerItem: {
        flex: 1,
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