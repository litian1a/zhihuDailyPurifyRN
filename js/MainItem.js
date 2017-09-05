import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View, Image, TouchableNativeFeedback
} from 'react-native';

export default class MainItem extends Component {
    render() {
        let story = this.props.story;

        let image = null;
        if (story.type === 'date') {

            return (<Text style={{flex: 1, margin: 10}}>{story.date.mdw()}</Text>)
        }
        if (story.images && story.images[0]) {
            image = <Image
                source={{uri: story.images[0]}}
                style={styles.cellImage}/>
        }
        return (
            <TouchableNativeFeedback onPress={()=>{this.props.itemClick(story)}}>
                <View style={styles.item}>
                    <Text style={styles.title}>{story.title} </Text>
                    {image}
                </View>
            </TouchableNativeFeedback>
        );
    }
}

const styles = StyleSheet.create({
    title: {
        flex: 1,
        alignItems: 'center'
    },
    item: {
        flex: 1,
        margin: 5,
        padding: 10,
        flexDirection: 'row',
        borderColor: '#dddddd',
        borderStyle: null,
        borderWidth: 0.5,
        borderRadius: 2,
        alignItems: 'center'
    },
    cellImage: {
        backgroundColor: '#dddddd',
        height: 60,
        marginLeft: 10,
        width: 80,
    },


});