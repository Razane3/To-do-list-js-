let inputElement = document.querySelector(".task");
let submit = document.querySelector(".done");
let tasklist = document.querySelector(".tasks");
let f = document.querySelector(".x");

let a = [];

//// getting the tasks from the localstorage when reloading : 
if(window.localStorage.getItem("Storedtask")){
  a = JSON.parse(window.localStorage.getItem("Storedtask"));
}

getlocalStorageitems();

// clicking submit 
submit.onclick = function(){
if(inputElement.value.trim() !== ""){ 
  addtoArray(inputElement.value);
  inputElement.value = "";
  valueToPage(a); 
  addLocalStorage(a);
}
}
 ////// clicking the delete button 
tasklist.addEventListener("click", (e) => {
  if(e.target.classList.contains("del")) {
    removeItem(e.target.parentElement.getAttribute("data-id"));
    e.target.parentElement.remove();
  }
  if(e.target.classList.contains("task")) {
    e.target.classList.toggle("completed");
    completedTaskStatus(e.target.getAttribute("data-id"));
  }

})

//// add the string to the array :

function addtoArray(v){
   const taskn = {
    id: Date.now(),
    title: v,
    completed: false,
   };
   a.push(taskn);
} 
//// add the string to page :
function valueToPage(a){
  tasklist.innerHTML = "";
  a.forEach((tas) => {
    let taskx =  document.createElement('div');
    taskx.className = "task";
    taskx.setAttribute("data-id",tas.id)
    console.log(taskx);
    taskx.style.cssText = 'display:flex; justify-content:space-between;background-color: white; padding: 20px; border: none;border-radius: 10px; margin-top:8px'
    let textx = document.createTextNode(tas.title);
    tasklist.appendChild(taskx); 
    taskx.appendChild(textx);
    //// check if task is completed : 
    if(tas.completed == true){
     taskx.className = "task completed";
    }
    //// delete
    let span = document.createElement('span');
    span.className= "del"
    span.appendChild(document.createTextNode("Delete"));
    span.style.cssText = 'padding: 6px;border: none;border-radius: 10px;color: white;background-color: orangered;font-weight: 300;cursor: pointer;'
    taskx.appendChild(span);
    JSON.stringify()
  });
}
//// add the array to the localstorage :

function addLocalStorage(a){
 window.localStorage.setItem("Storedtask",JSON.stringify(a));
}

//// get the elements of the localstorage :
function getlocalStorageitems(){
  let x = localStorage.getItem("Storedtask");
  if(x){
    let y = JSON.parse(x);
    valueToPage(y);
  }
}
////// remove item from lovale storage 
function removeItem(taskr){
  a = a.filter((e) => e.id != taskr );
  addLocalStorage(a);
}
//// update  completed Task Status
function completedTaskStatus(taskId){
  for(let i=0;i<a.length;i++){
   if(a[i].id == taskId) {
    a[i].completed === false ? (a[i].completed = true) : (a[i].completed = false) ;
     }
  }
   addLocalStorage(a);
}
