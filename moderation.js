let reports = [
    { id: 1, type: "comment", author: "user_anon42", target: "Shadow Realm Ch.12", reason: "Spam / advertising", status: "pending" },
    { id: 2, type: "comment", author: "dark_knight99", target: "Moonlit Sword Ch.30", reason: "Hate speech", status: "pending" },
    { id: 3, type: "content", author: "Sajid", target: "Neon Samurai Ch.5", reason: "Copyrighted artwork", status: "resolved" }
];

const reportTbody = document.getElementById("report-tbody");
const totalCount = document.getElementById("stat-total");
const pendingCount = document.getElementById("stat-pending");
const resolvedCount = document.getElementById("stat-resolved");
const filterButtons = document.querySelectorAll(".filter-btn");

let currentFilter = "all";

function displayReports() {
    reportTbody.innerHTML = "";

    let filteredReports = reports;

    if (currentFilter === "comment") {
        filteredReports = reports.filter(function (report) {
            return report.type === "comment";
        });
    }
    else if (currentFilter === "content") {
        filteredReports = reports.filter(function (report) {
            return report.type === "content";
        });
    }
    else if (currentFilter === "resolved") {
        filteredReports = reports.filter(function (report) {
            return report.status === "resolved";
        });
    }

    if (filteredReports.length === 0) {
        let row = document.createElement("tr");
        let cell = document.createElement("td");
        cell.colSpan = 7;
        cell.textContent = "No reports match this filter.";
        cell.style.textAlign = "center";
        cell.style.color = "#9CA3AF";
        row.appendChild(cell);
        reportTbody.appendChild(row);
    }
    else {
        filteredReports.forEach(function (report) {
            let row = document.createElement("tr");

            let idCell = document.createElement("td");
            idCell.textContent = report.id;
            row.appendChild(idCell);

            let typeCell = document.createElement("td");
            typeCell.textContent = report.type;
            typeCell.style.textTransform = "capitalize";
            row.appendChild(typeCell);

            let authorCell = document.createElement("td");
            authorCell.textContent = report.author;
            row.appendChild(authorCell);

            let targetCell = document.createElement("td");
            targetCell.textContent = report.target;
            row.appendChild(targetCell);

            let reasonCell = document.createElement("td");
            reasonCell.textContent = report.reason;
            row.appendChild(reasonCell);

            let statusCell = document.createElement("td");
            let statusSpan = document.createElement("span");
            if (report.status === "pending") {
                statusSpan.className = "status-pending";
                statusSpan.textContent = "Pending";
            }
            else {
                statusSpan.className = "status-approved";
                statusSpan.textContent = "Resolved";
            }
            statusCell.appendChild(statusSpan);
            row.appendChild(statusCell);

            let actionCell = document.createElement("td");

            if (report.status === "pending") {
                let resolveBtn = document.createElement("button");
                resolveBtn.className = "action-btn approve-btn small-btn";
                resolveBtn.textContent = "Resolve";
                resolveBtn.addEventListener("click", function () {
                    resolveReport(report.id);
                });
                actionCell.appendChild(resolveBtn);

                let deleteBtn = document.createElement("button");
                deleteBtn.className = "action-btn danger-btn small-btn";
                deleteBtn.textContent = "Delete";
                deleteBtn.addEventListener("click", function () {
                    deleteReport(report.id);
                });
                actionCell.appendChild(deleteBtn);
            }
            else {
                let span = document.createElement("span");
                span.textContent = "No action needed";
                span.style.color = "#9CA3AF";
                span.style.fontSize = "0.85rem";
                actionCell.appendChild(span);
            }

            row.appendChild(actionCell);
            reportTbody.appendChild(row);
        });
    }

    updateStats();
}

function updateStats() {
    totalCount.textContent = reports.length;

    let pendingTotal = 0;
    let resolvedTotal = 0;

    reports.forEach(function (report) {
        if (report.status === "pending") {
            pendingTotal = pendingTotal + 1;
        }
        else if (report.status === "resolved") {
            resolvedTotal = resolvedTotal + 1;
        }
    });

    pendingCount.textContent = pendingTotal;
    resolvedCount.textContent = resolvedTotal;
}

function resolveReport(id) {
    reports.forEach(function (report) {
        if (report.id === id) {
            report.status = "resolved";
        }
    });
    alert("Report resolved successfully!");
    displayReports();
}

function deleteReport(id) {
    let answer = confirm("Do you want to delete this report?");
    if (answer) {
        let newReports = [];
        reports.forEach(function (report) {
            if (report.id !== id) {
                newReports.push(report);
            }
        });
        reports = newReports;
        alert("Report deleted successfully!");
        displayReports();
    }
}

filterButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        filterButtons.forEach(function (btn) {
            btn.classList.remove("active-filter");
        });
        button.classList.add("active-filter");
        currentFilter = button.getAttribute("data-filter");
        displayReports();
    });
});

displayReports();