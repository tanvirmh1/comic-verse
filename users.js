let users = [
    { id: 1, name: "Rafid Hossain Rafi", email: "rafi420@gmail.com", role: "reader", status: "active" },
    { id: 2, name: "Musfiqun Nobi Mahim", email: "mahim520@gmail.com", role: "reader", status: "active" },
    { id: 3, name: "Umbrella Corporation", email: "uc@gmail.com", role: "publisher", status: "active" },
    { id: 4, name: "Shorline", email: "shoreline@gmail.com", role: "publisher", status: "pending" },
    { id: 5, name: "ufotable Inc", email: "info@ufotable.com", role: "publisher", status: "pending" },
    { id: 6, name: "Tanvir Monzur", email: "tanvir@comicverse.com", role: "reader", status: "active" },
    { id: 7, name: "MD Shadman", email: "shadman@comicverse.com", role: "reader", status: "suspended" }
];

let applications = [
    { id: 1, applicant: "ufotable Inc", email: "info@ufotable.com", message: "I want to publish a dark fantasy and action comic.", status: "pending" },
    { id: 2, applicant: "Shorline", email: "shoreline@gmail.com", message: "Request to upgrade to publisher account.", status: "pending" }
];

const userTbody = document.getElementById("user-tbody");
const appTbody = document.getElementById("app-tbody");
const filterButtons = document.querySelectorAll(".filter-btn");

let currentFilter = "all";

function displayUsers() {
    userTbody.innerHTML = "";

let filteredUsers = users;

if (currentFilter !== "all") {
    if (currentFilter === "suspended") {
        filteredUsers = users.filter(function (user) {
            return user.status === "suspended" || user.status === "banned";
        });
    }
    else {
        filteredUsers = users.filter(function (user) {
            return user.role === currentFilter;
        });
    }
}

    if (filteredUsers.length === 0) {
        let row = document.createElement("tr");
        let cell = document.createElement("td");
        cell.colSpan = 6;
        cell.textContent = "No users match this filter.";
        cell.style.textAlign = "center";
        cell.style.color = "#9CA3AF";
        row.appendChild(cell);
        userTbody.appendChild(row);
    }
    else {
        filteredUsers.forEach(function (user) {
            let row = document.createElement("tr");

            let idCell = document.createElement("td");
            idCell.textContent = user.id;
            row.appendChild(idCell);

            let nameCell = document.createElement("td");
            nameCell.textContent = user.name;
            row.appendChild(nameCell);

            let emailCell = document.createElement("td");
            emailCell.textContent = user.email;
            row.appendChild(emailCell);

            let roleCell = document.createElement("td");
            roleCell.textContent = user.role;
            roleCell.style.textTransform = "capitalize";
            row.appendChild(roleCell);

            let statusCell = document.createElement("td");
            let statusSpan = document.createElement("span");

            
            if (user.status === "active") {
                statusSpan.className = "status-active";
                statusSpan.textContent = "Active";
            }
            else if (user.status === "pending") {
                statusSpan.className = "status-pending";
                statusSpan.textContent = "Pending";
            }
            else if (user.status === "suspended") {
                statusSpan.className = "status-suspended";
                statusSpan.textContent = "Suspended";
            }
            else {
                statusSpan.className = "status-banned";
                statusSpan.textContent = "Banned";
            }
            statusCell.appendChild(statusSpan);
            row.appendChild(statusCell);

            let actionCell = document.createElement("td");

            if (user.status === "active" || user.status === "pending") {
                let suspendBtn = document.createElement("button");
                suspendBtn.className = "action-btn reject-btn small-btn";
                suspendBtn.textContent = "Suspend";
                suspendBtn.addEventListener("click", function () {
                    suspendUser(user.id);
                });
                actionCell.appendChild(suspendBtn);
            }
            else {
                let reactivateBtn = document.createElement("button");
                reactivateBtn.className = "action-btn approve-btn small-btn";
                reactivateBtn.textContent = "Reactivate";
                reactivateBtn.addEventListener("click", function () {
                    reactivateUser(user.id);
                });
                actionCell.appendChild(reactivateBtn);
            }

            let deleteBtn = document.createElement("button");
            deleteBtn.className = "action-btn danger-btn small-btn";
            deleteBtn.textContent = "Delete";
            deleteBtn.addEventListener("click", function () {
                deleteUser(user.id);
            });
            actionCell.appendChild(deleteBtn);

            row.appendChild(actionCell);
            userTbody.appendChild(row);
        });
    }
}

function displayApplications() {
    appTbody.innerHTML = "";

    if (applications.length === 0) {
        let row = document.createElement("tr");
        let cell = document.createElement("td");
        cell.colSpan = 5;
        cell.textContent = "No applications yet.";
        cell.style.textAlign = "center";
        cell.style.color = "#9CA3AF";
        row.appendChild(cell);
        appTbody.appendChild(row);
    }
    else {
        applications.forEach(function (app) {
            let row = document.createElement("tr");

            let nameCell = document.createElement("td");
            nameCell.textContent = app.applicant;
            row.appendChild(nameCell);

            let emailCell = document.createElement("td");
            emailCell.textContent = app.email;
            row.appendChild(emailCell);

            let messageCell = document.createElement("td");
            messageCell.textContent = app.message;
            row.appendChild(messageCell);

            let statusCell = document.createElement("td");
            let statusSpan = document.createElement("span");
            if (app.status === "pending") {
                statusSpan.className = "status-pending";
                statusSpan.textContent = "Pending";
            }
            else if (app.status === "approved") {
                statusSpan.className = "status-approved";
                statusSpan.textContent = "Approved";
            }
            else {
                statusSpan.className = "status-rejected";
                statusSpan.textContent = "Rejected";
            }
            statusCell.appendChild(statusSpan);
            row.appendChild(statusCell);

            let actionCell = document.createElement("td");

            if (app.status === "pending") {
                let approveBtn = document.createElement("button");
                approveBtn.className = "action-btn approve-btn";
                approveBtn.textContent = "Approve";
                approveBtn.addEventListener("click", function () {
                    approveApplication(app.id);
                });
                actionCell.appendChild(approveBtn);

                let rejectBtn = document.createElement("button");
                rejectBtn.className = "action-btn reject-btn";
                rejectBtn.textContent = "Reject";
                rejectBtn.addEventListener("click", function () {
                    rejectApplication(app.id);
                });
                actionCell.appendChild(rejectBtn);
            }
            else {
                let span = document.createElement("span");
                span.textContent = "Resolved";
                span.style.color = "#9CA3AF";
                span.style.fontSize = "0.85rem";
                actionCell.appendChild(span);
            }

            row.appendChild(actionCell);
            appTbody.appendChild(row);
        });
    }
}

function suspendUser(id) {
    let answer = confirm("Do you want to suspend this user?");
    if (answer) {
        users.forEach(function (user) {
            if (user.id === id) {
                user.status = "suspended";
            }
        });
        alert("User suspended successfully!");
        displayUsers();
    }
}

function reactivateUser(id) {
    users.forEach(function (user) {
        if (user.id === id) {
            user.status = "active";
        }
    });
    alert("User reactivated successfully!");
    displayUsers();
}

function deleteUser(id) {
    let answer = confirm("Do you want to delete this user permanently?");
   if (answer) {
    users = users.filter(function (user) {
        return user.id !== id;
    });
    alert("User deleted successfully!");
    displayUsers();
}
}

function approveApplication(id) {
    applications.forEach(function (app) {
        if (app.id === id) {
            app.status = "approved";
        }
    });
    alert("Application approved successfully!");
    displayApplications();
}

function rejectApplication(id) {
    let answer = confirm("Do you want to reject this application?");
    if (answer) {
        applications.forEach(function (app) {
            if (app.id === id) {
                app.status = "rejected";
            }
        });
        alert("Application rejected.");
        displayApplications();
    }
}

filterButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        filterButtons.forEach(function (btn) {
            btn.classList.remove("active-filter");
        });
        button.classList.add("active-filter");
        currentFilter = button.getAttribute("data-filter");
        displayUsers();
    });
});

displayUsers();
displayApplications();