var dataSource = document.getElementById('addData');
var taskBody = document.getElementById('task');
var database = firebase.database();
var task, time, key;

function addTask(obj) {
    if (obj != undefined){
        task = obj.value;
        time = obj.time == "" ? '0h': obj.time+'h';
        key = obj.key;
    }
    else {
        task = dataSource.childNodes[1];
        time = dataSource.childNodes[3];
        key = database.ref('Todo Task').push().key;
        database.ref('Todo Task/' + key).set({key: key, value: task.value, time: time.value});
    }
    // console.log(task+' '+time);
    
    // console.log(time);
    if (task.value != ''){
        // console.log('working')
        var mainDiv = document.createElement('div');
        var cb = document.createElement('input');
        cb.setAttribute('type', 'checkbox');
        cb.setAttribute('onclick', 'doneTask(this)');

        var tF = document.createElement('input');
        tF.setAttribute('type', 'test');
        tF.setAttribute('class', 'taskText');
        tF.setAttribute('id', key);
        tF.value = task.value == undefined ? task: task.value;
        tF.disabled = true;

        var eBtn = document.createElement('button');
        eBtn.appendChild(document.createTextNode('Edit'));
        eBtn.setAttribute('onclick', 'updateTask(this)');
        // eBtn.setAttribute('id', key);
        // console.log(eBtn);
        
        var dBtn = document.createElement('button');
        dBtn.appendChild(document.createTextNode('Delete'));
        dBtn.setAttribute('onclick', 'deleteTask(this)');
        dBtn.setAttribute('id', key);
        
        var timeSpan = document.createElement('span');
        timeSpan.setAttribute('class', 'badge badge-danger');
        if (time.value != ''){
            timeSpan.append(document.createTextNode(time.value == undefined ? time: time.value+'h'));
        }
        else {
            timeSpan.append(document.createTextNode('0h'));
        }

        mainDiv.append(cb);
        mainDiv.append(tF);
        mainDiv.append(eBtn);
        mainDiv.append(dBtn);
        mainDiv.append(timeSpan);
        taskBody.append(mainDiv);

        task.value = '';
        time.value = '';
    }
}

function doneTask(elm) {
    var text = elm.nextSibling;
    var temp = text.style.textDecoration;
    var bdg = text.parentNode.childNodes[4];
    // console.log();

    if (temp == '' || temp == 'none'){
        text.style.fontSize = '16px';
        text.style.textDecoration = 'line-through';
        bdg.style.backgroundColor = 'green';
        text.parentNode.childNodes[2].disabled = true;
    }
    else { 
        text.style.fontSize = '20px';
        text.style.textDecoration = 'none';
        bdg.style.backgroundColor = '#dc3545';
        text.parentNode.childNodes[2].disabled = false;
    }
}

function deleteTask(elm) {
    elm.parentNode.remove();
    database.ref('Todo Task/' + elm.getAttribute('id')).remove();
}

function updateTask(elm) {
    var textField = elm.parentNode.childNodes[1];

    textField.disabled = false;
    textField.style.borderBottom = '1px solid white';
    textField.style.fontSize = '16px';
    textField.style.marginRight = '30px';

    elm.innerHTML = 'Update';
    elm.setAttribute('onclick', 'editTask(this)');
}

function editTask(elm) {
    var textField = elm.parentNode.childNodes[1];
    var k = textField.getAttribute('id')
    database.ref('Todo Task/' + k).child('value').set(textField.value);    

    textField.disabled = true;
    textField.style.borderBottom = 'none';
    textField.style.fontSize = '20px';
    textField.style.marginRight = '50px';

    elm.innerHTML = 'edit';
    elm.setAttribute('onclick', 'updateTask(this)');
}

function deleteAllTask(elm) {
    database.ref('Todo Task/').remove();
    document.getElementById(elm).innerHTML = '';
}

// console.log(database)
database.ref('Todo Task').once('value', function(data){
    var allData = data.val();
    for (x in allData){
        // for (var i in x){
        //     console.log(i)
        // }
        // console.log(allData[0])
        addTask(allData[x]);
    }
    // a = data.val();
    // console.log(a)
})