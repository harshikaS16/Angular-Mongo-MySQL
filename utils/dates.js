const _ = require("underscore");

module.exports = {
    /**
     * Change the date format for all the user records 
     * @param {Array} results User records array list
     */
    changeDateFormat(results) {
        var res = _.map(results, (item) => {
            item.dob = onlyDate(item.dob);
            return item;
        });
        return res;
    }

}

/**
 * Get the date in format 'yyyy-MM-dd'
 * @param {Date} date Date object
 */
function onlyDate(date) {
    if(date !== '0000-00-00'){
    var dateWithoutTimeZone = date.toISOString().slice(0, -1);

    var d = new Date(dateWithoutTimeZone);

    var year = d.getFullYear();
    var month = d.getMonth() + 1;
    var day = d.getDate() + 1;

    return `${year}-${(month > 9 ? '' : '0') + month}-${(day > 9 ? '' : '0') + day}`;
    }else{
        return date;
    }
}