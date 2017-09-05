import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    FlatList,
    Image,
    View,
    TouchableNativeFeedback
} from 'react-native';
import DataSourceRepository from "./DataSourceRepository";
const repository= new DataSourceRepository();
export default class NavigationView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            itemData:null
        };
        repository.fetchDrawerData()
            .then((responseJson)=>{
                    this.setState({itemData:responseJson.others})
            })

    }

    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    ListHeaderComponent={this.renderHeader}
                    renderItem={({item}) =>this.renderItem(item)}
                    data={this.state.itemData}

                />
            </View>
        );
    }

    renderItem=(other)=> {
        return (
            <TouchableNativeFeedback
                 onPress={()=>{this.props.itemSelect(other)}}
            >
            <View style={styles.item}>

                <Text style={{ flex: 1, fontSize: 16, marginLeft: 16,}} >{other.name} </Text>
                <Image style={ {marginRight:16,width: 16,height: 16}} source={{uri:'ic_menu_follow'}}/>
            </View>
            </TouchableNativeFeedback>
        );
    };

    renderHeader = () => {
        return (
            <View style={styles.head}>
                <View style={styles.userInfo}>
                    <View style={styles.icon}>
                        <Image
                            source={{uri: 'comment_avatar'}}
                            style={{width: 40, height: 40, marginLeft: 8, marginRight: 8}}
                        />
                        <Text style={{color: 'white', fontSize: 14}}>
                            请登录
                        </Text>

                    </View>
                    <View style={styles.icon}>
                        <View style={styles.collect}>
                            <Image
                                source={{uri: 'ic_favorites_white'}}
                                style={{width: 30, height: 30}}/>
                            <Text style={{color: 'white', fontSize: 14}}>
                                我的收藏
                            </Text>
                        </View>
                        <View style={styles.collect}>
                            <Image
                                source={{uri: 'ic_download_white'}}
                                style={{width: 30, height: 30}}/>
                            <Text style={{color: 'white', fontSize: 14}}>
                                离线下载
                            </Text>
                        </View>
                    </View>
                </View>
                <TouchableNativeFeedback
                    onPress={()=>{this.props.homeSelect()}}
                >
                <View style={styles.home}>
                    <Image source={{uri: 'home'}} style={{width: 30, height: 30, marginLeft: 10}}/>
                    <Text style={{fontSize: 16, marginLeft: 16, color: '#00a2ed'}}> 首页</Text>
                </View>
                </TouchableNativeFeedback>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#FAFAFA',

    },
    head: {
        flexDirection: 'column',
        flex: 1

    },
    userInfo: {
        flex: 1,
        backgroundColor: '#00a2ed',

    },
    icon: {
        padding: 10,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    },
    row: {
        flex: 1,
        flexDirection: 'row'
    },
    collect: {
        paddingLeft: 7,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    },
    home: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        padding: 10

    },
    item: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
    }

});