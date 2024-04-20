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

function acceptRequest() {
    alert('Request accepted');
    closeModal();
}

function contactOwner() {
    alert('Contacting school owner...');
    // Implement contact logic here
}

function declineRequest() {
    alert('Request declined');
    closeModal();
}

// Attach event listeners to the "Details" buttons yaeni meme ida bzf request
document.querySelectorAll('.details-button').forEach(button => {
    button.addEventListener('click', () => {
        const requestBox = button.closest('.request-box');
        const schoolName = requestBox.querySelector('h2').textContent.trim();
        const ownerName = 'Marie Curie'; 
        const address = '123 Main Street, City, Country'; 
        const email = 'abc@example.com'; 
        const phone = '+1234567890'; 

        openModal(schoolName, ownerName, address, email, phone);
    });
});