let newTODOS = '';
let newLiEle_LS = [];
let emptyLi_LS = [];
const plusIcon = document.querySelector('#plusIcon');
const newAddedList = document.querySelector('.newAddedList');

function titleNListHandler(event) {
    event.preventDefault()
    //enter keyup event
    if (event.keyCode == 13) {
        const ET = event.target;
        if (ET.classList.contains('titleInput')) { //title input
            const ETV = ET.value;
            newTODOS = ETV;
            ET.previousElementSibling.innerText = ETV; //h2
            ET.previousElementSibling.classList.remove('dis-non')
            ET.classList.add('dis-non') //input display none
            saveLS(newTODOS, newLiEle_LS); //save title with an empty array
            const main = ET.parentElement.nextElementSibling;
            main.firstElementChild.classList.add(ETV);
            main.nextElementSibling.lastElementChild.focus();
            main.nextElementSibling.lastElementChild.classList.add(ETV);
        } else if (ET.classList.contains('userNewInput')) {
            const headTitle = ET.parentElement.previousElementSibling.previousElementSibling.firstElementChild.innerText;
            const ETV = ET.value;
            const getnew_LS = localStorage.getItem(headTitle);
            let new_LS = [];
            if (getnew_LS) {
                new_LS = JSON.parse(getnew_LS);
            }
            const thisUl = ET.parentElement.previousElementSibling.firstElementChild;
            createNewList(new_LS, ETV, getnew_LS, headTitle, thisUl);
            ET.value = '';
        }
    }
}
function newBtnsHandler(event) {
    event.preventDefault();
    const ET = event.target;
    if (ET.classList.contains('editBtn')) {
        const ETP = ET.previousElementSibling;
        ETP.classList.remove('dis-non');
        ETP.focus();
        ETP.previousElementSibling.classList.add('dis-non');
        // saveLS()*******
    } else if (ET.classList.contains('delBtn')) {
        const ETP = ET.parentElement;
        ETP.parentElement.remove();
        localStorage.removeItem(ETP.firstElementChild.innerText);
    } else {
        return;
    }
}
function createDiv() {
    const div = document.createElement('div');
    const ulCnt = document.querySelectorAll('main ul').length;
    //set div id
    div.id = ulCnt;
    div.classList.add('container');
    div.innerHTML = `<header>
    <h2 class="title dis-non"></h2>
    <input type='text' class='titleInput ${ulCnt}' placeholder='Press enter after type title'>
    <i class="fa fa-pencil-square-o btn editBtn" aria-hidden="true"></i>
    <i class="fa fa-minus-square-o btn delBtn" aria-hidden="true"></i>
    </header>
    <main>
    <ul id='${ulCnt}'></ul>
    </main>
    <footer>
    <i class="fa fa-plus" aria-hidden="true"></i>
    <input type="text" class='userNewInput ${ulCnt}' placeholder="add to-do here" />
    </footer>`;
    div.addEventListener('click', newBtnsHandler)
    newAddedList.appendChild(div);
}
function iconEventHandler(event) {
    event.preventDefault();
    createDiv();
}
function addIconEvent() {
    plusIcon.addEventListener('click', iconEventHandler)
    document.addEventListener('keyup', titleNListHandler)
}
function initContainers() {
    let keyNames = [];
    if (localStorage.length > 1) {
        //get key names && create Div except main todo list
        for (let i = 0; i < localStorage.length; i++) {
            if (localStorage.key(i) !== 'todos') {
                keyNames.push(localStorage.key(i));
                createDiv();
            }
        }
        //make a list for every key name
        keyNames.forEach((list, index) => {
            //additional list
            const getListLS = localStorage.getItem(list);
            const parsedLS = JSON.parse(getListLS);
            const newUl = document.querySelectorAll('ul');
            newUl.forEach(ul => {
                if (ul.id == index + 1) {
                    //setting the title
                    const ulTitle = ul.parentElement.previousElementSibling.firstElementChild;
                    ulTitle.innerText = list;
                    newTODOS = list;
                    //change display for h2 && input
                    ulTitle.classList.remove('dis-non');
                    ulTitle.nextElementSibling.classList.add('dis-non');
                    let newListArray = [];
                    parsedLS.forEach(ls => {
                        createNewList(newListArray, ls.text, getListLS, list, ul)
                        // createNewList(anArray, INPUTVALUE, getFromLS, listOfTodos, ulForList) {
                    });
                }
            })
        })
    }
}
initContainers();
addIconEvent();

