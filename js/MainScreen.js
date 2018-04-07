import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    ToolbarAndroid,
    StatusBar,
    FlatList,
    DrawerLayoutAndroid,
    TouchableOpacity,
    Image,
    Dimensions,
    View
} from 'react-native';
import MainItem from "./MainItem";
import MainHeader from "./MainHeader";
import DataSourceRepository from "./DataSourceRepository";
import NavigationView from "./NavigationView";
const TYPE_HOME='home';
const TYPE_THEM='them';
const TYPE_LOAD_MORE='load_more';
const toolbarActions = [
    {title: '提醒', icon: {uri: 'ic_message_white'}, show: 'always'},
    {title: '夜间模式', show: 'never'},
    {title: '设置选项', show: 'never'},
];
let dataSource = new DataSourceRepository();

export default class MainScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            headData: null,
            itemData: null,
            data:null,
            them:null
        };

    }
    closeDrawer=()=>{
        if(this.refs['drawer'])
        this.refs['drawer'].closeDrawer()
    };

    openDrawer=()=>{
        if(this.refs['drawer'])
            this.refs['drawer'].openDrawer()

    };


    _onRefresh = () =>{
            if(this.state.them)
                this.refreshData(TYPE_THEM,this.state.them);
            else
                this.refreshData(TYPE_HOME)
    };

    componentDidMount() {
        this.refreshData(TYPE_HOME);
    }

    refreshData(type,them) {
        this.closeDrawer();

        switch (type) {
            case TYPE_HOME:
                dataSource.fetchMainData(null)
                    .then((data) => {
                        this.setState({headData: data.top_stories, itemData: data.stories, data:data,them: null});

                    });
                break;
            case TYPE_THEM:
                dataSource.fetchMainDataByThemId(them.id)
                    .then((data)=>{ this.setState({itemData:data.stories,them:them,data:data,headData:null}) });
                break;
            case TYPE_LOAD_MORE:
                dataSource.fetchMainData(this.state.data)
                            .then((data) => {this.setState({headData: data.top_stories, itemData: data.stories, data:data,them: null});});
                break
        }


    }

    drawerSelect=(them)=>{
        this.refreshData(TYPE_THEM,them);

    };
    drawerHomeSelect=()=>{
        this.refreshData(TYPE_HOME);


    };
    render() {
        if (this.state.itemData === null) {
            return (
                <View style={styles.centerEmpty}>
                    <Text>正在加载</Text>
                </View> );
        }
        else {
            let title;
            if(this.state.them)
                title=this.state.them.name;
            else
                title='首页';


            return (
                <DrawerLayoutAndroid
                    ref={'drawer'}
                    drawerWidth={300}
                    drawerPosition={DrawerLayoutAndroid.positions.Left}
                    renderNavigationView={ ()=>{return <NavigationView itemSelect={ this.drawerSelect} homeSelect={this.drawerHomeSelect} />}}

                >
                <View style={styles.container}>

                    <StatusBar
                        backgroundColor="#00a2ed"
                        barStyle="light-content"
                    />
                    <ToolbarAndroid
                        navIcon={{uri: 'ic_menu_white'}}
                        title={title}
                        titleColor="white"
                        style={styles.toolbar}
                        onIconClicked={this.openDrawer}
                        actions={toolbarActions}
                    />
                    <FlatList
                        style={{height:Dimensions.get('window').height-100}}
                        data={this.state.itemData}
                        refreshing={false}
                        onRefresh={this._onRefresh}
                        ListHeaderComponent={this.header}
                        renderItem={({item}) => <MainItem  itemClick={this.itemClick} story={item}/>}
                        onEndReached={this.onEndReached}
                        onEndReachedThreshold={0.1}
                    />
                </View>
                </DrawerLayoutAndroid>

            );
        }
    }
    onEndReached=()=>{
        if(!this.state.them) {
            alert('end')
            this.refreshData(TYPE_LOAD_MORE)
        }
    };
    itemClick=(story)=>{
        const { navigate } = this.props.navigation;
        navigate('StoryDetail', { story: story });
    };

    renderThemHeader=()=>{
        let topData = this.state.data;
        if (!topData) {
            return null;
        }

        let editorsAvator = [];
        if (topData.editors) {
            topData.editors.forEach((editor) => {
                editorsAvator.push(<Image style={styles.editorAvatar} source={{uri: editor.avatar}}/>)
            });
        }

        return (
            <View style={{flex: 1}}>
                {MainScreen._renderPage(null,topData.background,topData.description)}
                <View style={styles.editors}>
                    <Text style={styles.editorsLable}>主编:</Text>
                    {editorsAvator}
                </View>
            </View>
        );
    }

    header = () => {
        if(!this.state.headData) {
           return this.renderThemHeader()
        }
        return (
            <View style={{ flexDirection:'column',flex:1}}>
                <MainHeader style={{flex: 1, height: 200}} headData={this.state.headData}/>
                <Text style={{margin:10}}>今日要闻</Text>
            </View>
        );
    };
    static _renderPage(id, image, title){

        return (
            <TouchableOpacity  key={id} style={{flex:1, height: 200}}>
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
}



const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        flex: 1,

    },
    centerEmpty: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    toolbar: {
        backgroundColor: '#00a2ed',
        height: 56,
    },

    headerTitle: {
        fontSize: 18,
        fontWeight: '500',
        color: 'white',
        marginBottom: 10,
    },
    headerItem: {
        flex:1 ,
        height: 200,
        flexDirection: 'row',
    },
    headerTitleContainer: {
        flex: 1,
        alignSelf: 'flex-end',
        padding: 10,
        backgroundColor: 'rgba(0,0,0,0.2)',
    },
    editorAvatar: {
        width: 30,
        height: 30,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: '#AAAAAA',
        margin: 4,
    },
    editors: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 8,
    },
    editorsLable: {
        fontSize: 14,
        color: '#888888',
    },
});