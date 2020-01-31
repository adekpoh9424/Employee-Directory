let employees = [];
let index;
let card;
let container;

const gridContainer = document.querySelector('.main-container');
const modalContent = document.querySelector('.modal-content');
const  search = document.getElementById('search');
const overlay = document.querySelector('.overlay');
const modalClose = document.querySelector('.modal-close');
const leftArrow = document.querySelector('.left-arrow');
const rightArrow = document.querySelector('.right-arrow');
const modalInfo = document.querySelector('.modal-info');
const employeeContainer = document.querySelector('.employee-container');
const modalM = document.getElementById('modalM');



fetch('https://randomuser.me/api/?results=12&nat=US')
    .then((data) => data.json())
    .then((res) => res.results)
    .then(displayEmployees)
    .catch(err => console.log(err))


function displayEmployees(employeeData) {
    employees = employeeData;

    let employeeHTML = '';

    employees.forEach((employee, index) => {
        let name = employee.name;
        let email = employee.email;
        let city = employee.location.city;
        let picture = employee.picture;

        employeeHTML+= `
            <div class="card" data-index="${index}">
                <img alt="profile-picture" class="avatar" src="${picture.large}" />
                <div class="text-container">
                    <h2 class="name">${name.first} ${name.last}</h2>
                    <p class="email">${email}</p>
                    <p class="address">${city}</p>
                </div>
            </div>

        `;
    });
    employeeContainer.innerHTML = employeeHTML;
}


function displayModal(index) {
    let { name, dob, phone, email, location: { city, street, state, postcode}, picture } = employees[index];

    let date = new Date(dob.date);

    const modalHTML = `

        <img class="modal-avatar" src="${picture.large}" />
        <div class="text-container modal-info" data-index="${index}">
            <h2 class="name-modal">${name.first} ${name.last}</h2>
            <p class="email-modal">${email}</p>
            <p class="address-modal">${city}</p>
            <hr>
            <p>${phone}</p>
            <p class="address-modal">${street.number}, ${street.name}, ${state}, ${postcode}</p>
            <p>Birthday: ${date.getMonth()}/${date.getDate()}/${date.getFullYear()}</p>
        </div>
        `;

        overlay.classList.remove("hidden");
        modalContent.innerHTML = modalHTML;

}


employeeContainer.addEventListener('click', e => {
    if (e.target !== employeeContainer) {
        const card = e.target.closest(".card");
        const index = card.getAttribute("data-index");

        displayModal(index);
    }
});

modalClose.addEventListener('click', () => {
    overlay.classList.add("hidden");
});


rightArrow.addEventListener('click', (e) => {
    const modalInfo = document.querySelector('.modal-info');
    const index = modalInfo.getAttribute('data-index');
    const nextIndex = parseInt(index) +1;
    if (index < 12) {
        displayModal(nextIndex);
    }
});

leftArrow.addEventListener('click', (e) => {
    const modalInfo = document.querySelector('.modal-info');
    const index = modalInfo.getAttribute('data-index');
    const prevIndex = parseInt(index) -1;
    if (index > 0) {
        displayModal(prevIndex);
    }
});

//Search 

search.addEventListener('keyup', function(){
    let iSearch = event.target.value.toLowerCase();
    let a, txt;
    for (let i = 0; i < document.querySelectorAll('[class*="card"]').length; i++){
        a = document.querySelectorAll('[class*="card"]') [i];
        txt = a.querySelector(".name").textContent;
        if(txt.toLocaleLowerCase().indexOf(iSearch) > -1){
            a.classList.remove("hidden");
        }
        else
        {
            a.classList.add("hidden");
    }
}

});