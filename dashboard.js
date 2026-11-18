let users = [
    { id: 1, name: "Rafid Hossain Rafi", email: "rafi420@gmail.com", role: "reader", status: "active" },
    { id: 2, name: "Musfiqun Nobi Mahim", email: "mahim520@gmail.com", role: "reader", status: "active" },
    { id: 3, name: "Umbrella Corporation", email: "uc@gmail.com", role: "publisher", status: "active" },
    { id: 4, name: "Shorline", email: "shoreline@gmail.com", role: "publisher", status: "pending" }
];

let comics = [
    { id: 1, title: "Shadow Realm Chronicles", status: "approved" },
    { id: 2, title: "Moonlit Sword Saga", status: "approved" },
    { id: 3, title: "Iron Blossom", status: "pending" }
];

let applications = [
    { id: 1, applicant: "ufotable Inc", email: "info@ufotable.com", message: "I want to publish a dark fantasy and action comic.", status: "pending" },
    { id: 2, applicant: "Shorline", email: "shoreline@gmail.com", message: "Request to upgrade to publisher account.", status: "pending" }
];

let reports = [
    { id: 1, type: "comment", author: "user_anon42", target: "Shadow Realm Ch.12", reason: "Spam / advertising", status: "pending" },
    { id: 2, type: "content", author: "Sajid", target: "Neon Samurai Ch.5", reason: "Copyrighted artwork", status: "resolved" }
];

const statUsers = document.getElementById("stat-users");
const statSeries = document.getElementById("stat-series");
const statPending = document.getElementById("stat-pending");
const statReports = document.getElementById("stat-reports");
const pendingAppsBody = document.getElementById("pending-apps-body");
const activityList = document.getElementById("activity-list");

function updateStats() {
    statUsers.textContent = users.length;
    statSeries.textContent = comics.length;

    let pendingApps = 0;
    applications.forEach(function (app) {
        if (app.status === "pending") {
            pendingApps = pendingApps + 1;
        }
    });

    let pendingReports = 0;
    reports.forEach(function (report) {
        if (report.status === "pending") {
            pendingReports = pendingReports + 1;
        }
    });

    statPending.textContent = pendingApps + pendingReports;
    statReports.textContent = pendingReports;
}

function displayPendingApps() {
    pendingAppsBody.innerHTML = "";

    let pendingApps = [];
    applications.forEach(function (app) {
        if (app.status === "pending") {
            pendingApps.push(app);
        }
    });

    if (pendingApps.length === 0) {
        let row = document.createElement("tr");
        let cell = document.createElement("td");
        cell.colSpan = 5;
        cell.textContent = "No pending applications.";
        cell.style.textAlign = "center";
        cell.style.color = "#9CA3AF";
        row.appendChild(cell);
        pendingAppsBody.appendChild(row);
    }
    else {
        pendingApps.forEach(function (app) {
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
            statusSpan.className = "status-pending";
            statusSpan.textContent = "Pending";
            statusCell.appendChild(statusSpan);
            row.appendChild(statusCell);

            let actionCell = document.createElement("td");
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

            row.appendChild(actionCell);
            pendingAppsBody.appendChild(row);
        });
    }
}

function displayActivity() {
    activityList.innerHTML = "";

    let items = [];

    applications.forEach(function (app) {
        if (app.status === "pending") {
            items.push("📝 " + app.applicant + " applied for publisher status.");
        }
    });

    comics.forEach(function (comic) {
        if (comic.status === "approved") {
            items.push("✅ Comic \"" + comic.title + "\" approved.");
        }
    });

    reports.forEach(function (report) {
        if (report.status === "pending") {
            items.push("🚩 Report on \"" + report.target + "\" - " + report.reason);
        }
    });

    if (items.length === 0) {
        let li = document.createElement("li");
        li.textContent = "No recent activity available.";
        li.style.color = "#9CA3AF";
        activityList.appendChild(li);
    }
    else {
         items.forEach(function (text) {
        let li = document.createElement("li");
        li.textContent = text;
        activityList.appendChild(li);
    });
    }
}

function approveApplication(id) {
    applications.forEach(function (app) {
        if (app.id === id) {
            app.status = "approved";
        }
    });
    alert("Application approved successfully!");
    updateStats();
    displayPendingApps();
    displayActivity();
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
        updateStats();
        displayPendingApps();
        displayActivity();
    }
}

updateStats();
displayPendingApps();
displayActivity();