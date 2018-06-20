module.exports.printCurrentArContents=function printCurrentArContents(arTasks){
    return JSON.stringify(arTasks);
};
module.exports.sortTasksArray=function sortTasksArray(arTasks){
    arTasks.sort(sortByDt);
    return arTasks;
}
module.exports.sortByDt=function sortByDt(elm1,elm2){
    return elm1.dt-elm2.dt;
}
