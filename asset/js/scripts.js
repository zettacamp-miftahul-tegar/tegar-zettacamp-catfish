// const di javascript artinya tidak boleh melakukan assignment ulang terhadap variable yang sama, tapiii, boleh melakukan mutasi pada value variable tersebut, misalkan variable tersebut value nya berupa object atau array.
// Object{} : untuk tampilkan list bentuk string “ ” /kata
// Array[]: untuk tampilkan list bentuk number/angka.

const todos = [];
const todos1 = [];
const todos2 = [];
const todos3 = [];
const todos4 = [];
const todos5 = [];
const todos6 = [];
const todos7 = [];
const todos8 = [];

const RENDER_EVENT = "render-todo";

document.addEventListener("DOMContentLoaded", function () {
 
    const submitForm = document.getElementById("form");
 
    submitForm.addEventListener("submit", function (event) {
        event.preventDefault();
        addTodo();
    });
    // untuk menjalankan fungsi isStorageExist
    if(isStorageExist()){
        loadDataFromStorage();
    }
});

// implementasi fungsi addTodo() yang digunakan untuk membuat Todo
function addTodo() {
    const gender = document.querySelector('input[name="gender"]:checked').value
    const nama = document.getElementById("nama").value;
    const tempat_lahir = document.getElementById("tempat_lahir").value;
    const tanggal_lahir = document.getElementById("tanggal_lahir").value;
    const email = document.getElementById("email").value;
    const telepon = document.getElementById("telepon").value;
    const umur = document.getElementById("umur").value;
    const deskripsi = document.getElementById("deskripsi").value;
    const chooseFile = document.getElementById("img");

    const generatedID = generateId();
    const gender1 = generateTodoObject(generatedID, gender, false);
    const nama1 = generateTodoObject(generatedID, nama, false);
    const tempat_lahir1 = generateTodoObject(generatedID, tempat_lahir, false);
    const tanggal_lahir1 = generateTodoObject(generatedID, tanggal_lahir, false);
    const email1 = generateTodoObject(generatedID, email, false);
    const telepon1 = generateTodoObject(generatedID, telepon, false);
    const umur1 = generateTodoObject(generatedID, umur, false);
    const deskripsi1 = generateTodoObject(generatedID, deskripsi, false);

    // todos.push(gender1, nama1, tempat_lahir1, tanggal_lahir1, email1, telepon1, umur1, facebook1, deskripsi1);

    todos.push(gender1);
    todos1.push(nama1);
    todos2.push(tempat_lahir1);
    todos3.push(tanggal_lahir1);
    todos4.push(email1);
    todos5.push(telepon1);
    todos6.push(umur1);
    todos7.push(deskripsi1);
   
    document.dispatchEvent(new Event(RENDER_EVENT));
    saveData();
}

function generateId() {
    return +new Text();
}
 
function generateTodoObject(id, task, isCompleted) {
    return {
        id,
        task,
        isCompleted
    }
}

// AddEventListener adalah method yang sangat penting dalam JavaScript. Merupakan method yang berfungsi untuk membuat event (click, change, mouseout, dll) untuk keperluan manipulasi DOM. 
document.addEventListener(RENDER_EVENT, function () {
    const hasil_gender = document.getElementById("todos");
    const hasil_nama = document.getElementById("todos1");
    const hasil_tempat_lahir = document.getElementById("todos2");
    const hasil_tanggal_lahir = document.getElementById("todos3");
    const hasil_email = document.getElementById("todos4");
    const hasil_telepon = document.getElementById("todos5");
    const hasil_umur = document.getElementById("todos6");
    const hasil_deskripsi = document.getElementById("todos7");

    // innerHTML adalah sebuah atribut di dalam (objek) elemen HTML yang berisi string HTML. Dengan innerHTML , kita dapat menampilkan output ke elemen yang lebih spesifik.
    hasil_gender.innerHTML = "";
    hasil_nama.innerHTML = "";
    hasil_tempat_lahir.innerHTML = "";
    hasil_tanggal_lahir.innerHTML = "";
    hasil_email.innerHTML = "";
    hasil_telepon.innerHTML = "";
    hasil_umur.innerHTML = "";
    hasil_deskripsi.innerHTML = "";

    for(todoItem of todos){
        const todoElement = makeTodo(todoItem);

        if(todoItem.isCompleted == false)
            hasil_gender.append(todoElement);
    }

    for(todoItem of todos1){
        const todoElement = makeTodo(todoItem);

        if(todoItem.isCompleted == false)
            hasil_nama.append(todoElement);
    }

    for(todoItem of todos2){
        const todoElement = makeTodo(todoItem);

        if(todoItem.isCompleted == false)
            hasil_tempat_lahir.append(todoElement);
    }

    for(todoItem of todos3){
        const todoElement = makeTodo(todoItem);

        if(todoItem.isCompleted == false)
            hasil_tanggal_lahir.append(todoElement);
    }

    for(todoItem of todos4){
        const todoElement = makeTodo(todoItem);

        if(todoItem.isCompleted == false)
            hasil_email.append(todoElement);
    }

    for(todoItem of todos5){
        const todoElement = makeTodo(todoItem);

        if(todoItem.isCompleted == false)
            hasil_telepon.append(todoElement);
    }

    for(todoItem of todos6){
        const todoElement = makeTodo(todoItem);

        if(todoItem.isCompleted == false)
            hasil_umur.append(todoElement);
    }

    for(todoItem of todos7){
        const todoElement = makeTodo(todoItem);

        if(todoItem.isCompleted == false)
            hasil_deskripsi.append(todoElement);
    }

});

function makeTodo(todoObject) {
 
    const textTitle = document.createElement("h2");
    textTitle.innerText = todoObject.task;
  
    const textContainer = document.createElement("div");
    textContainer.classList.add("inner")
    textContainer.append(textTitle);
  
    const container = document.createElement("tr");
    container.classList.add("item", "shadow")
    container.append(textContainer);
    container.setAttribute("id", `todo-${todoObject.id}`);

    if (todoObject.isCompleted){ 
   
        const checkButton = document.createElement("button");
        checkButton.classList.add("check-button");
        checkButton.addEventListener("click", function () {
            addTaskToCompleted(todoObject.id);
        });
   
        container.append(checkButton);
    }
    return container;
}

//Menyimpan Data
function saveData() {
    if(isStorageExist()){
        const parsed = JSON.stringify(todos);
        const parsed1 = JSON.stringify(todos1);
        const parsed2 = JSON.stringify(todos2);
        const parsed3 = JSON.stringify(todos3);
        const parsed4 = JSON.stringify(todos4);
        const parsed5 = JSON.stringify(todos5);
        const parsed6 = JSON.stringify(todos6);
        const parsed7 = JSON.stringify(todos7);
        
        localStorage.setItem(STORAGE_KEY, parsed);
        localStorage1.setItem(STORAGE_KEY, parsed1);
        localStorage2.setItem(STORAGE_KEY, parsed2);
        localStorage3.setItem(STORAGE_KEY, parsed3);
        localStorage4.setItem(STORAGE_KEY, parsed4);
        localStorage5.setItem(STORAGE_KEY, parsed5);
        localStorage6.setItem(STORAGE_KEY, parsed6);
        localStorage7.setItem(STORAGE_KEY, parsed7);

        document.dispatchEvent(new Event(SAVED_EVENT));
    }
  }

  const SAVED_EVENT = "saved-todo";
  const STORAGE_KEY = "TODO_APPS";
   
   
function isStorageExist() /* boolean */ {
    if(typeof(Storage) === undefined){
        alert("Browser kamu tidak mendukung local storage");
        return false
    }
    return true;
  }

document.addEventListener(SAVED_EVENT, function() {
    console.log(localStorage.getItem(STORAGE_KEY));
    console.log(localStorage1.getItem(STORAGE_KEY));
    console.log(localStorage2.getItem(STORAGE_KEY));
    console.log(localStorage3.getItem(STORAGE_KEY));
    console.log(localStorage4.getItem(STORAGE_KEY));
    console.log(localStorage5.getItem(STORAGE_KEY));
    console.log(localStorage6.getItem(STORAGE_KEY));
    console.log(localStorage7.getItem(STORAGE_KEY));
});


