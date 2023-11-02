const taskInput = document.getElementById("taskInput");
const addTaskButton = document.getElementById("addTask");
const taskList = document.getElementById("taskList");
const menuElement = document.getElementById('js-menu-icon')

let menuIsOpen = false;

menuElement.addEventListener("click", function() {
    if (!menuIsOpen) {
        menuIsOpen = true;

        const menuPopup = document.createElement("div");
        menuPopup.classList.add("menuPopup");
        menuPopup.innerHTML = `
        <div class="dropdown-menu">
            <ul>
                <li><a href="./public/readme.html">Read Me</a></li>
                <li><a href="./public/howto.html">Story</a></li>
                <li><button id="js-close-button" class="close-button">Close</button></li>
                <p class="copyright">&copy;2023 Ahmadmahadi</p>
            </ul>
            
        </div>
        `;

        document.body.appendChild(menuPopup);

        setTimeout(() => {
            menuPopup.style.left = "0";
        }, 10);

        const closeButton = menuPopup.querySelector("#js-close-button");
        closeButton.addEventListener("click", function() {
            menuPopup.style.left = "-275px";
            setTimeout(() => {
                document.body.removeChild(menuPopup);
                menuIsOpen = false;
            }, 300);
        });
    }
});

taskInput.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        addTaskButton.click();
    }
});

addTaskButton.addEventListener("click", function() {
    const taskText = taskInput.value;
    
    if (taskText.trim() !== "") {   
        if (taskText.length > 20) {
            const popup = document.createElement("div");
            popup.classList.add("popup");
            popup.innerHTML = `
            <div class="popup-content">
                <p>Task description is too long! <br> Keep it under 20 characters.</p><br>
                <button id="closePopup">Close</button>
            </div>`;

            document.body.appendChild(popup);
        
            const closePopupButton = document.getElementById("closePopup");
            closePopupButton.addEventListener("click", function() {
                popup.remove();
            });
        } else {
            const li = document.createElement("li");
            li.innerHTML = `
            <div class="input-task-text">
                <div class="div-common-container">
                    <input type="checkbox">
                    <span class="task-text" id="task-text">${taskText}</span>
                </div>
            </div>
            <button class="delete-button">Delete</button>`;
            
            taskList.appendChild(li);
            taskInput.value = "";
            saveTasks(taskText);
        }
    }     
});

taskList.addEventListener("change", function(e) {
    if (e.target.tagName === "INPUT" && e.target.type === "checkbox") {
        const taskText = e.target.nextElementSibling;
        taskText.style.textDecoration = e.target.checked ? "line-through" : "none";
    }
});

taskList.addEventListener("click", function(e) {
    if (e.target.tagName === "BUTTON") {
        e.target.parentElement.remove();
        saveTasks();
    }
});

window.addEventListener("load", function() {
    const tasksAndStyles = JSON.parse(localStorage.getItem("tasksAndStyles")) || [];

    tasksAndStyles.forEach(({ taskText, styles }) => {
        const li = document.createElement("li");
        li.innerHTML = `
            <div class="input-task-text">
                <div class="div-common-container">
                    <input type="checkbox">
                    <span class="task-text" id="task-text">${taskText}</span>
                </div>
            </div>
            <button class="delete-button">Delete</button>
        `;

        li.querySelector(".task-text").style.textDecoration = styles.textDecoration;

        taskList.appendChild(li);
    });
});

function saveTasks(taskText) {
    const tasksAndStyles = Array.from(taskList.children).map(li => {
        const storedTaskText = li.querySelector("span").textContent;
        const styles = {
            textDecoration: li.querySelector(".task-text").style.textDecoration,
        };
        return { taskText: storedTaskText, styles };
    });
    localStorage.setItem("tasksAndStyles", JSON.stringify(tasksAndStyles));
}
