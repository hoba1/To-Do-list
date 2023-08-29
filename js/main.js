let form = document.querySelector("form");
let input = document.querySelector("#name");
let showdata = document.querySelector(".show-data");
let arrayoftasks = []

if(localStorage.getItem("box") !== null){
    arrayoftasks = JSON.parse(localStorage.getItem("box"));
}
getitemfromlocalstorage()

form.addEventListener("submit", (e) => {
    e.preventDefault();
    let task = input.value;
    input.value = ""

    const tasks = {
        title: task,
        date: Date.now(),
        status: "loading",
    }
    arrayoftasks.push(tasks);
    addtask();
    additemtolocalstorage();
})

function addtask(){
    showdata.innerHTML = "";
    arrayoftasks.forEach((task) => {
    // create task box 
    let box = document.createElement("div");
    box.classList.add("box");
    box.classList.add((task.title).split(" ").join("-"));
    box.setAttribute("data-date",task.date);
    // create task name 
    let taskname= document.createElement("p");
    taskname.innerHTML = task.title;
    taskname.classList.add("name")
    box.appendChild(taskname);
    // create task options 
    let optionsdiv = document.createElement("div");
    optionsdiv.classList.add("options")

    let done = document.createElement("i");
    done.classList.add("fa-regular");
    done.classList.add("fa-circle-check");
    done.classList.add("green");
    done.onclick = () => {
        box.classList.add("complete");
        box.setAttribute("data-status","complete");
        task.status = "complete";
    }
    optionsdiv.appendChild(done)
    
    let notdone = document.createElement("i");
    notdone.classList.add("fa-regular");
    notdone.classList.add("fa-circle-xmark");
    notdone.classList.add("red");
    notdone.onclick = () => {
        box.classList.add("failed");
        box.setAttribute("data-status","failed");
        task.status = "failed";
        additemtolocalstorage()
    }
    optionsdiv.appendChild(notdone)
    
    let trash = document.createElement("i");
    trash.classList.add("fa-regular");
    trash.classList.add("fa-trash-can");
    trash.addEventListener("click", (e) => {
        let option = e.currentTarget.parentElement;
        option.parentElement.remove()
        deleteitemfromlocalstorage(option.parentElement.getAttribute("data-date"))
    })
    optionsdiv.appendChild(trash)
    
    box.appendChild(optionsdiv);
    showdata.appendChild(box);

    addoverlayfromarray();
    })
}

function additemtolocalstorage(){
    localStorage.setItem("box",JSON.stringify(arrayoftasks))
}

function getitemfromlocalstorage(){
    let data = localStorage.getItem("box")
    if(data){
        addtask()
    }
}

function deleteitemfromlocalstorage(taskdate){
    arrayoftasks = arrayoftasks.filter((task) => task.date != taskdate);
    additemtolocalstorage()
}

function addoverlayfromarray(){
    arrayoftasks.forEach((task) => {
        if(task.status === "failed"){
            document.querySelectorAll(`.${(task.title).split(" ").join("-")}`).forEach((e) => {
                e.classList.add("failed");
            })
        }else if(task.status === "complete"){
            document.querySelectorAll(`.${(task.title).split(" ").join("-")}`).forEach((e) => {
                e.classList.add("complete");
            })
        }
    });
}

addoverlayfromarray();