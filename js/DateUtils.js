
Date.prototype.yyyymmdd = function() {
    let yyyy = this.getFullYear().toString();
    let mm = (this.getMonth()+1).toString(); // getMonth() is zero-based
    let dd  = this.getDate().toString();
    return yyyy + (mm[1]?mm:"0"+mm[0]) + (dd[1]?dd:"0"+dd[0]); // padding
};
// x月x日 星期
Date.prototype.mdw = function() {
    let mm = (this.getMonth()+1).toString(); // getMonth() is zero-based
    let dd  = this.getDate().toString();
    let week;
    switch (this.getDay()) {
        case 0:week="星期天";break
        case 1:week="星期一";break
        case 2:week="星期二";break
        case 3:week="星期三";break
        case 4:week="星期四";break
        case 5:week="星期五";break
        case 6:week="星期六";break
    }
    return  (mm[1]?mm[0]+mm[1]:mm[0])+'月' + (dd[1]?dd[0]+dd[1]:dd[0])+'日 '+week; // padding
};
export default class DateUtils{

    static  parseDateFromYYYYMMdd(str) {
        if (!str) return new Date();
        return new Date(str.slice(0, 4),str.slice(4, 6) - 1,str.slice(6, 8));
    }
}
