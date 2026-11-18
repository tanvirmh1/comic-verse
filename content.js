let comics = [
    { id: 1, title: "Shadow Realm Chronicles", publisher: "Tanvir", type: "Comic", chapters: 45, status: "approved" },
    { id: 2, title: "Moonlit Sword Saga", publisher: "Mim", type: "Novel", chapters: 120, status: "approved" },
    { id: 3, title: "Iron Blossom", publisher: "Tanvir", type: "Comic", chapters: 8, status: "pending" },
    { id: 4, title: "The Last Scribe", publisher: "Nadia", type: "Novel", chapters: 3, status: "rejected" },
    { id: 5, title: "Neon Samurai", publisher: "Sajid", type: "Comic", chapters: 22, status: "approved" }
];

const pendingTbody = document.getElementById("pending-tbody");
const allTbody = document.getElementById("all-tbody");
const filterButtons = document.querySelectorAll(".filter-btn");

let currentFilter = "all";

function displayPending() {
    pendingTbody.innerHTML = "";

    let pendingComics = comics.filter(function (comic) {
    if (comic.status !== "pending") return false;
    if (currentFilter !== "all" && comic.type.toLowerCase() !== currentFilter) return false;
    return true;
});

    if (pendingComics.length === 0) {
        let row = document.createElement("tr");
        let cell = document.createElement("td");
        cell.colSpan = 7;
        cell.textContent = "No pending content.";
        cell.style.textAlign = "center";
        cell.style.color = "#9CA3AF";
        row.appendChild(cell);
        pendingTbody.appendChild(row);
    }
    else {
        pendingComics.forEach(function (comic) {
            let row = document.createElement("tr");

            let idCell = document.createElement("td");
            idCell.textContent = comic.id;
            row.appendChild(idCell);

            let titleCell = document.createElement("td");
            titleCell.textContent = comic.title;
            row.appendChild(titleCell);

            let publisherCell = document.createElement("td");
            publisherCell.textContent = comic.publisher;
            row.appendChild(publisherCell);

            let typeCell = document.createElement("td");
            typeCell.textContent = comic.type;
            typeCell.className = "type-cell";
            row.appendChild(typeCell);

            let chaptersCell = document.createElement("td");
            chaptersCell.textContent = comic.chapters;
            row.appendChild(chaptersCell);

            let statusCell = document.createElement("td");
            let statusSpan = document.createElement("span");
            statusSpan.className = "status-pending";
            statusSpan.textContent = "Pending";
            statusCell.appendChild(statusSpan);
            row.appendChild(statusCell);

            let actionCell = document.createElement("td");
            let approveBtn = document.createElement("button");
            approveBtn.className = "action-btn approve-btn small-btn";
            approveBtn.textContent = "Approve";
            approveBtn.addEventListener("click", function () {
                approveComic(comic.id);
            });
            actionCell.appendChild(approveBtn);

            let rejectBtn = document.createElement("button");
            rejectBtn.className = "action-btn reject-btn small-btn";
            rejectBtn.textContent = "Reject";
            rejectBtn.addEventListener("click", function () {
                rejectComic(comic.id);
            });
            actionCell.appendChild(rejectBtn);

            row.appendChild(actionCell);
            pendingTbody.appendChild(row);
        });
    }
}

function displayAll() {
    allTbody.innerHTML = "";

    if (comics.length === 0) {
        let row = document.createElement("tr");
        let cell = document.createElement("td");
        cell.colSpan = 7;
        cell.textContent = "No series yet.";
        cell.style.textAlign = "center";
        cell.style.color = "#9CA3AF";
        row.appendChild(cell);
        allTbody.appendChild(row);
    }
    else {
        comics.forEach(function (comic) {
            let row = document.createElement("tr");

            let idCell = document.createElement("td");
            idCell.textContent = comic.id;
            row.appendChild(idCell);

            let titleCell = document.createElement("td");
            titleCell.textContent = comic.title;
            row.appendChild(titleCell);

            let publisherCell = document.createElement("td");
            publisherCell.textContent = comic.publisher;
            row.appendChild(publisherCell);

            let typeCell = document.createElement("td");
            typeCell.textContent = comic.type;
            typeCell.className = "type-cell";
            row.appendChild(typeCell);

            let chaptersCell = document.createElement("td");
            chaptersCell.textContent = comic.chapters;
            row.appendChild(chaptersCell);

            let statusCell = document.createElement("td");
            let statusSpan = document.createElement("span");
            if (comic.status === "approved") {
                statusSpan.className = "status-approved";
                statusSpan.textContent = "Approved";
            }
            else if (comic.status === "pending") {
                statusSpan.className = "status-pending";
                statusSpan.textContent = "Pending";
            }
            else {
                statusSpan.className = "status-rejected";
                statusSpan.textContent = "Rejected";
            }
            statusCell.appendChild(statusSpan);
            row.appendChild(statusCell);

            let actionCell = document.createElement("td");
            let deleteBtn = document.createElement("button");
            deleteBtn.className = "action-btn danger-btn small-btn";
            deleteBtn.textContent = "Delete";
            deleteBtn.addEventListener("click", function () {
                deleteComic(comic.id);
            });
            actionCell.appendChild(deleteBtn);
            row.appendChild(actionCell);

            allTbody.appendChild(row);
        });
    }
}

function approveComic(id) {
    comics.forEach(function (comic) {
        if (comic.id === id) {
            comic.status = "approved";
        }
    });
    alert("Content approved successfully!");
    displayPending();
    displayAll();
}

function rejectComic(id) {
    let answer = confirm("Do you want to reject this content?");
    if (answer) {
        comics.forEach(function (comic) {
            if (comic.id === id) {
                comic.status = "rejected";
            }
        });
        alert("Content rejected.");
        displayPending();
        displayAll();
    }
}

function deleteComic(id) {
    let answer = confirm("Do you want to delete this series permanently?");
    if (answer) {
    comics = comics.filter(function (comic) {
        return comic.id !== id;
    });
    alert("Series deleted successfully!");
    displayAll();
}
}

filterButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        filterButtons.forEach(function (btn) {
            btn.classList.remove("active-filter");
        });
        button.classList.add("active-filter");
        currentFilter = button.getAttribute("data-filter");
        displayPending();
    });
});

displayPending();
displayAll();