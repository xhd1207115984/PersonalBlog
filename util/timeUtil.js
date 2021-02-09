function getNow() {
    
    return parseInt(Date.now()/1000)
}

function timeFormat(unixTime) {
    const date = new Date(unixTime * 1000);
    const dateMonth = new Date((unixTime + 2626560)* 1000);
    return date.getFullYear() + "-" + dateMonth.getMonth() + "-" + date.getDate();
}
module.exports.getNow = getNow;
module.exports.timeFormat = timeFormat;