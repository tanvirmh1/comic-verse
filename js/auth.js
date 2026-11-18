
const defaultUsers = [
    { email: "admin@comicverse.com", password: "admin123", role: "admin", redirect: "admin.html" },
    { email: "publisher@comicverse.com", password: "pub123", role: "publisher", redirect: "publisher/index.html" },
    { email: "client@comicverse.com", password: "client123", role: "client", redirect: "index.html" }
];

function handleRoleLogin(event) {
    event.preventDefault();
    
    const emailInput = document.getElementById('loginEmail').value.toLowerCase().trim();
    const passwordInput = document.getElementById('loginPassword').value;


    const defaultUser = defaultUsers.find(u => u.email === emailInput && u.password === passwordInput);
    

    let registeredUsers = JSON.parse(localStorage.getItem('comicVerseUsers')) || [];
    const registeredUser = registeredUsers.find(u => u.email === emailInput && u.password === passwordInput);

    if (defaultUser) {
        loginSuccess(defaultUser.email, defaultUser.role, defaultUser.redirect);
    } 
    else if (registeredUser) {
  
        loginSuccess(registeredUser.email, 'client', 'index.html');
    } 
    else {
        alert("Invalid email or password! Please try again.");
    }
}

function loginSuccess(email, role, redirectUrl) {

    sessionStorage.setItem('isLoggedIn', 'true');
    sessionStorage.setItem('userEmail', email);
    sessionStorage.setItem('userRole', role);

    alert(`Login successful!\nWelcome, ${role.toUpperCase()}.`);
    window.location.href = redirectUrl;
}

//  REGISTRATION LOGIC
function handleRegister(event) {
    event.preventDefault();
    const email = document.getElementById('regEmail').value.toLowerCase().trim();
    const password = document.getElementById('regPassword').value;
    const confirmPassword = document.getElementById('regConfirmPassword').value;

    if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
    }

    let users = JSON.parse(localStorage.getItem('comicVerseUsers')) || [];
    
   
    if (defaultUsers.find(u => u.email === email) || users.find(u => u.email === email)) {
        alert("Email is already registered!");
        return;
    }

    users.push({ email: email, password: password });
    localStorage.setItem('comicVerseUsers', JSON.stringify(users));

    alert("Registration successful! Redirecting to login...");
    window.location.href = 'login.html';
}


function togglePassword(inputId) {
    const input = document.getElementById(inputId);
    const icon = input.nextElementSibling;
    if (input.type === "password") {
        input.type = "text";
        icon.classList.remove("fa-eye");
        icon.classList.add("fa-eye-slash");
    } else {
        input.type = "password";
        icon.classList.remove("fa-eye-slash");
        icon.classList.add("fa-eye");
    }
}