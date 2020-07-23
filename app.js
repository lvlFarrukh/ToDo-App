var dataSource = document.getElementById('addData');
var taskBody = document.getElementById('task');

function addTask() {
    var task = dataSource.childNodes[1];
    var time = dataSource.childNodes[3];
    // console.log(time);
    if (task.value != ''){
        var mainDiv = document.createElement('div');
        var cb = document.createElement('input');
        cb.setAttribute('type', 'checkbox');
        cb.setAttribute('onclick', 'doneTask(this)');

        var tF = document.createElement('input');
        tF.setAttribute('type', 'test');
        tF.setAttribute('class', 'taskText');
        tF.value = task.value;
        tF.disabled = true;

        var eBtn = document.createElement('button');
        eBtn.appendChild(document.createTextNode('Edit'));
        eBtn.setAttribute('onclick', 'updateTask(this)');
        // console.log(eBtn);
        
        var dBtn = document.createElement('button');
        dBtn.appendChild(document.createTextNode('Delete'));
        dBtn.setAttribute('onclick', 'deleteTask(this)');
        
        var timeSpan = document.createElement('span');
        timeSpan.setAttribute('class', 'badge badge-danger');
        if (time.value != ''){
            timeSpan.append(document.createTextNode(time.value+'h'));
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

    textField.disabled = true;
    textField.style.borderBottom = 'none';
    textField.style.fontSize = '20px';
    textField.style.marginRight = '50px';

    elm.innerHTML = 'edit';
    elm.setAttribute('onclick', 'updateTask(this)');
}

function deleteAllTask(elm) {
    elm.innerHTML = '';
}