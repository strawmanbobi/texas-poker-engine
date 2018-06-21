/*
 * Created by Dummy team
 * 2017/12/17
 */

/**
 * judge if elements in array.attribute equal to status
 * @param array
 * @param attribute
 * @param status
 * @returns {boolean}
 */
exports.JudgeEleInArray = function(array, attribute, status) {
    var len= array.length;
    var i=0;
    while(i<len) {
        if (array[i].attribute === status) {
            i++;
        }else{
            break;
        }
    }
    if (i===len){
        return true;
    } else{
        return false;
    }
};