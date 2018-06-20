const firebase=require("firebase");
const helper=require("./helper.js");
let arTasks=[];

function fillDBWithSampleData(){
    database.ref("tasks").remove();
    pushToDB(new Date(2018,5,20,16,45).getTime(),"nm1","just a simple fucking alert1","console.log('hello world1')");
    pushToDB(new Date(2018,5,20,16,42).getTime(),"nm2","just a simple fucking alert2","console.log('hello world2')");
    pushToDB(new Date(2018,5,20,16,51).getTime(),"nm3","just a simple fucking alert3","console.log('hello world3')");
    pushToDB(new Date(2018,5,20,16,48).getTime(),"nm4","just a simple fucking alert4","alert('hello world4')");
    pushToDB(new Date(2018,5,20,16,38).getTime(),"nm5","just a simple fucking alert5","alert('hello world5')");
}
function pushToDB(oDt,sNm,sDescription,sTask,swState){
    database
    .ref("tasks").push({
        dt:oDt,
        nm:sNm,
        description:sDescription,
        task:sTask,
        state:0,
    })
    .then(()=>{
        console.log ("push success");
    })
    .catch((err)=>{
        console.log("err is - ",err);
    });
}
const config = {
    apiKey: "AIzaSyBI9WNf2SE5GdjgBBzDY2NbBFK3b7Sjj5A",
    authDomain: "scheduler-f9806.firebaseapp.com",
    databaseURL: "https://scheduler-f9806.firebaseio.com",
    projectId: "scheduler-f9806",
    storageBucket: "scheduler-f9806.appspot.com",
    messagingSenderId: "706024833241",
  };
  firebase.initializeApp(config);
  const database = firebase.database();
 fillDBWithSampleData();


  database.ref("tasks").on('child_added',childSnapshot=>{
    console.log("child added");
    arTasks.push({
        id:childSnapshot.key,
        ...childSnapshot.val(),
    });
    helper.sortTasksArray();
//    console.log(printCurrentArContents());
  });
  database.ref("tasks").on('child_changed',childSnapshot=>{
    console.log("child changed");
    iIndex=arTasks.findIndex(elm=>{
        return elm.id===childSnapshot.key
    });
    arTasks[iIndex]={
        id:childSnapshot.key,
        ...childSnapshot.val(),
        
    };
    helper.sortTasksArray();
  //  console.log(printCurrentArContents());
  });
  database.ref("tasks").on('child_removed',childSnapshot=>{
    console.log("child removed");
    iIndex=arTasks.findIndex(elm=>{
        return elm.id===childSnapshot.key
    });
    arTasks.splice(iIndex,1);
    helper.sortTasksArray();
  //  console.log(printCurrentArContents());
  });

/* main procedure. iterates over the array and execute due to tasks*/
/* the setInterval is very problematic. i should investigate whether a better alternative exist somewhere out there */
/*
setInterval(()=>{
    for (let oTask of arTasks){
        console.log ((new Date(oTask.dt)).toString());
    }
},1000);
*/

setInterval(()=>{
    for (let oTask of arTasks){
        if (oTask.dt>(new Date()).getTime()) break;
        console.log ("here making the transaction");
        // here to perform the action
        database.ref("tasks/"+oTask.id+"/state")
        .transaction(result=>{
            if (result===0){
                return 1;
            }
        },(error,committed,snapshot)=>{
            if (error){
                console.log ("retrieving permission to proceed with activating sask transaction failed. err is ",err);
            }else{
                if (committed){
                    try{
                        eval(oTask.task);
                    }
                    catch(err){
                       console.log ("there was an error activating this one. the task is - "+oTask.task);
                    }
//                    console.log(oTask.nm+" *** "+(new Date(oTask.dt)).toString()+" *** "+oTask.task);
                    database.ref("tasks/"+oTask.id).remove();
                }
            }
        });
//        console.log ((new Date(oTask.dt)).toString());
    }
},5000);
