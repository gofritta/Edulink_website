
function openModal(schoolName, ownerName, address, email, phone) {
    document.getElementById('modalSchoolName').textContent = schoolName;
    document.getElementById('modalOwnerName').textContent = ownerName;
    document.getElementById('modalAddress').textContent = address;
    document.getElementById('modalEmail').textContent = email;
    document.getElementById('modalPhone').textContent = phone;

    const modalOverlay = document.getElementById('modalOverlay');
    const modal = modalOverlay.querySelector('.modal');
    modalOverlay.style.display = 'flex'; 
    setTimeout(() => {
        modal.classList.add('show'); 
        modalOverlay.style.opacity = '1'; 
    }, 50); 
}

function closeModal() {
    const modalOverlay = document.getElementById('modalOverlay');
    const modal = modalOverlay.querySelector('.modal');
    modal.classList.remove('show'); 
    modalOverlay.style.opacity = '0'; 
    setTimeout(() => {
        modalOverlay.style.display = 'none'; 
    }, 1000); 
}

function contactOwner() {
    alert('Contacting school owner...');
    // Implémentez la logique de contact ici
    closeModal();
}

// Affichages des informations d'école pending:
document.querySelectorAll('.details-button-school').forEach(button => {
    button.addEventListener('click', () => {
        fetch("http://127.0.0.1:3000/school-pending")
        .then(response => response.json())
        .then(response => {
        
        console.log(response);
        const schoolName = response[0].namesch;
        const ownerName = response[0].firstName; 
        const address = response[0].adresssch; 
        const email = response[0].emailsch; 
        const phone = response[0].numbersch; 



        openModal(schoolName, ownerName, address, email, phone);
        })
        .catch(error => alert("Erreur : " + error));
    });
});

//*************************************************** */

function declineSchools(){
    fetch('http://localhost:3000/school-pending' , {
        method: 'GET'
    })
    .then(response => response.json())
    .then(response => {

        const email = response[0].emailsch;
        
        localStorage.setItem('email', email);
    })
    .catch((error) => {
        console.error('Erreur:', error);
    });
    
    const email = localStorage.getItem('email');

    deleteSchool(email);

    alert('Request rejected')
    closeModal();

    localStorage.clear();
    
};

function deleteSchool(email) {

    fetch('http://localhost:3000/reject?emailsch=' +email, {
        method: 'DELETE'
    })
    .then(response => response.json())
    .then(response => {
        console.log(response);
    });

    
}

function addSchool() {
    
    const name = localStorage.getItem('name');
    const email = localStorage.getItem('email');
    const password = localStorage.getItem('password');
    const state = localStorage.getItem('state');
    const adress = localStorage.getItem('adress');
    const number = localStorage.getItem('number');
    
    fetch('http://localhost:3000/accept', {
        method: 'POST',
        body: JSON.stringify({
          name_sch:name,
          email_sch:email,
          password_sch:password,
          state_sch:state,
          adress_sch:adress,
          number_sch:number,
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        }
        })
        .then(function(response){ 
        return response.json()})
        .then(function(data)
        {console.log(data)
        })
        .catch(error => console.error('Error:', error)); 

}
    
function acceptRequest() {
    fetch('http://localhost:3000/school-pending')
    .then(response => response.json())
    .then(response => {

        const name = response[0].namesch
        const email = response[0].emailsch;
        const password = response[0].passwordsch;
        const state = response[0].statesch;
        const adress = response[0].adresssch;
        const number = response[0].numbersch;

        localStorage.setItem('name', name);
        localStorage.setItem('email', email);
        localStorage.setItem('password', password);
        localStorage.setItem('state', state);
        localStorage.setItem('adress', adress);
        localStorage.setItem('number', number);
    })
    .catch((error) => {
        console.error('Erreur:', error);
    });

    addSchool();
        
    const email = localStorage.getItem('email');

    deleteSchool(email);

    alert('Request accepted');
    closeModal();

    localStorage.clear();
    
}

//***********************   Student rapport's modal ********************************* */

function openModalRapportStudent(studentName, problem) {
    document.getElementById('modalStudentName').textContent = studentName;
    document.getElementById('modalProblem').textContent = problem;

    const modalOverlay = document.getElementById('modalOverlay2');
    const modal = modalOverlay.querySelector('.modal');
    modalOverlay.style.display = 'flex'; 
    setTimeout(() => {
        modal.classList.add('show'); 
        modalOverlay.style.opacity = '1'; 
    }, 50); 
}

function closeModalRapportStudent() {
    const modalOverlay = document.getElementById('modalOverlay2');
    const modal = modalOverlay.querySelector('.modal');
    modal.classList.remove('show'); 
    modalOverlay.style.opacity = '0'; 
    setTimeout(() => {
        modalOverlay.style.display = 'none'; 
    }, 1000); 
}


function doneRequestS() {
    alert('the problem is solved');
    closeModalRapportStudent();
}


document.querySelectorAll('.details-button-student').forEach(button => {
    button.addEventListener('click', () => {
        const requestBox = button.closest('.request-box');
        const studentName = requestBox.querySelector('h2').textContent.trim();
        const problem = 'quand je click sur le button il veut pas , regler ca sil vout plai !!'; 

        openModalRapportStudent(studentName, problem);
    });
});
