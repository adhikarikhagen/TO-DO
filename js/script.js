let task = document.getElementById('task');

document.getElementById('add_btn').addEventListener('click', () => {
    if (task.value != '') {
        let taskObj = {
            name: task.value,
        };
        let len = taskLength();
        len = len + 1;
        localStorage.setItem('task' + len, JSON.stringify(taskObj));
    } else {
        alert('Fill Some Tasks');
    }
});

let lenList = taskLength();
for (i = 1; i <= lenList; i++) {
    let li = document.createElement('li');
    let ourTask = localStorage.getItem('task' + i);
    let parsedTask = JSON.parse(ourTask);
    let j = i + '1';
    let divs = document.createElement('div');
    divs.className = 'list_items';
    li.innerHTML = `<span class=''id='num${i}'>${i}</span>${
      parsedTask.name
   }<!-- Button trigger modal -->
   <span class='edit_delete'> <button type="button" class="btn btn-sm btn" data-toggle="modal" data-target="#exampleModal${i}">
   EDIT
 </button>
 <!-- Button trigger modal -->
 <button type="button" id='del${i}'class="btn pl-1 btn-sm " data-toggle="modal" data-target="#exampleModal${i}1">
  DELETE
 </button></span>
     <!-- Modal -->
     <div class="modal fade" id="exampleModal${i}" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
       <div class="modal-dialog" role="document">
         <div class="modal-content">
           <div class="modal-header">
             <h5 class="modal-title" id="exampleModalLabel">Task</h5>
             <button type="button" class="close" data-dismiss="modal" aria-label="Close">
               <span aria-hidden="true">&times;</span>
             </button>
           </div>
           <div class="modal-body">
             <input type='text'id='edit_task${i}' value='${parsedTask.name}'/>
           </div>
           <div class="modal-footer text-right">
             <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
             <button type="button" class="btn btn-success" id="save_changes${i}">Save changes</button>
           </div>
         </div>
       </div>
     </div>
     
     <!-- Modal -->
     <div class="modal fade" id="exampleModal${i}1" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
       <div class="modal-dialog modal-sm" role="document">
         <div class="modal-content">
         <div class="modal-header">
         <h3 class="ml-md-1">Are You Sure</h3>
       </div>
         <div class="modal-footer">
           <button type="button" id='yes${i}' class="btn btn-secondary" data-dismiss="modal">YES</button>
           <button type="button" class="btn btn-primary" data-dismiss="modal">Cancel</button>
           </div>
       </div>
     </div>`;

    document.getElementById('ulist').appendChild(li);
}

for (i = 1; i <= lenList; i++) {
    document.getElementById('num' + i).style.borderRight = '1px solid grey';
    document.getElementById('num' + i).style.paddingRight = '15px';
    document.getElementById('num' + i).style.marginRight = '15px';
    document.getElementById('num' + i).style.paddingLeft = '15px';
    document.getElementById('del' + i).style.borderLeft = '1px solid white';
}
//Editing Individual Task
for (i = 1; i <= lenList; i++) {
    let j = i;
    let k = i;
    console.log('helloedit' + i);
    let input = document.getElementById('save_changes' + i);
    input.addEventListener('click', () => {
        let taskName = document.getElementById('edit_task' + k).value;
        let obj = {
            name: taskName,
        };
        localStorage.setItem('task' + j, JSON.stringify(obj));
        location.reload();
    });
}
//Deleting Individual Task
for (i = 1; i <= lenList; i++) {
    let j = i;
    document.getElementById('yes' + j).addEventListener('click', () => {
        let k = j;
        let l = j;

        for (l; l < lenList; l++) {
            let m = l;
            n = m + 1;
            let taskItem = localStorage.getItem('task' + n);
            let taskItem1 = JSON.parse(taskItem);
            localStorage.setItem('task' + m, JSON.stringify(taskItem1));
        }
        localStorage.removeItem('task' + lenList);
        location.reload();
    });
}

//Finding length of our local object
function taskLength() {
    let count = 0;
    let re = /^task[0-9]+$/;
    let len = localStorage.length;
    for (i = 0; i < len; i++) {
        let keys = localStorage.key(i);
        if (re.test(keys)) {
            count = count + 1;
        }
    }
    return count;
}