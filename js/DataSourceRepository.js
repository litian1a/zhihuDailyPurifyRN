import {} from "react-native";
import DateUtils from './DateUtils'

const API_COVER_URL = "http://news-at.zhihu.com/api/4/start-image/1080*1776";//开屏广告api
const API_LATEST_URL = 'http://news-at.zhihu.com/api/4/news/latest';//最新消息
const API_BEFORE_URL = 'http://news.at.zhihu.com/api/4/news/before/';//过往消息
const API_THEME_URL = 'http://news-at.zhihu.com/api/4/theme/';//主题api
const API_THEMES_URL = 'http://news-at.zhihu.com/api/4/themes';//主题列表
const API_DETAIL_URL = 'http://news.at.zhihu.com/api/4/news/';


let instance=null;
let beforeDate=null;
export  default class DataSourceRepository{

       constructor(){
             if(!instance){
                 instance=this;
             }
             return instance;
           }

    fetchMainData(data){
       if (data===null|| data===undefined ) {
           beforeDate=new Date().yyyymmdd();
           return this._fetchData(API_LATEST_URL);
       }
        alert(beforeDate)
       return this._fetchData(API_BEFORE_URL+beforeDate)
                  .then((dataJson)=>{
                      let date=DateUtils.parseDateFromYYYYMMdd(beforeDate);
                      date.setDate(date.getDate()-1);
                      beforeDate=date.yyyymmdd();
                      let dateItem={
                          date:date,
                          type:'date'
                      }
                      dataJson.stories=[dateItem].concat(dataJson.stories);

                      data.stories=data.stories.concat(dataJson.stories);

                      return data
                    })

    }
    fetchMainDataByThemId(id){
        return this._fetchData(API_THEME_URL+id)
    }
    fetchDrawerData(){
        return  this._fetchData(API_THEMES_URL)
    }
    fetchStoryDetailData(id){
        return this._fetchData(API_DETAIL_URL+id)
    }

    _fetchData(url:String){
        return fetch(url)
            .then((response) => response.json())
            .then((responseJson)=>{return responseJson})
            .catch(error=>{console.log(error)})
    }

}

