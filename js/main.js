let employees = [];
let index;
let card;
let container;

const modalContent = document.getElementsByClassName('modal-content');
const  search = document.getElementById('search');
const overlay = document.querySelector('.overlay');
const modalClose = document.querySelector('.modal-close');
const leftArrow = document.querySelector('.left-arrow');
const rightArrow = document.querySelector('right-arrow');
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

    let data = new Date(dob.data);

    const modalHTML = `

        <img class="modal-avatar" src="${picture.large}" />
        <div class="text-container modal-info" data-index="${index}">
            <h2 class="name">${name.first} ${name.last}</h2>
            <p class="email">${email}</p>
            <p class="address">${city}</p>
            <hr>
            <p>${phone}</p>
            <p class="address">${street}, ${state}, ${postcode}</p>
            <p>Birthday: ${date.getMonth()}/${date.getDate()}/$date.getFullYear()}</p>
        </div>
        `;

        overlay.classList.remove("hidden");
        modalContainer.innerHTML = modalHTMl;

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
    const prevIndex = parseInt(index) +1;
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

search.addEventListener('keyup', e => {
    const searchInput = e.target.value.toLowercase();
    const names = document.querySelectorAll('.name');
    console.log(searchInput);
    for (let i = 0; i < names.length; i++) {
        const name = names[i].textContent.toLowerCase();
        const text = names[i].parentElement;
        const cards = text.parentElement;
        if (name.toLowerCase().indexOf(searchInput) > -1) {
            cards.style.display = "flex";
            modalContent.style.display = "block";
            modalM.style.display = "block";
        } else {
            cards.style.display = "none";
            modalM.style.display = "block";
            modalContent.style.display = "block";
        }
    }
});