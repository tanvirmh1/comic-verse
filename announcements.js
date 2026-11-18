let announcements = [
    { id: 1, title: "Season 2 Launch!", body: "New comics dropping this Friday. Stay tuned!", featured: true },
    { id: 2, title: "Scheduled Maintenance", body: "Site will be down Sunday 2AM - 4AM.", featured: false }
];

const annTbody = document.getElementById("ann-tbody");
const annTitle = document.getElementById("ann-title");
const annBody = document.getElementById("ann-body");
const annFeatured = document.getElementById("ann-featured");
const postAnnBtn = document.getElementById("post-ann-btn");

function displayAnnouncements() {
    annTbody.innerHTML = "";

    if (announcements.length === 0) {
        let row = document.createElement("tr");
        let cell = document.createElement("td");
        cell.colSpan = 5;
        cell.textContent = "No announcements yet.";
        cell.style.textAlign = "center";
        cell.style.color = "#9CA3AF";
        row.appendChild(cell);
        annTbody.appendChild(row);
    }
    else {
        announcements.forEach(function (announcement) {
            let row = document.createElement("tr");

            let idCell = document.createElement("td");
            idCell.textContent = announcement.id;
            row.appendChild(idCell);

            let titleCell = document.createElement("td");
            titleCell.textContent = announcement.title;
            titleCell.style.fontWeight = "600";
            row.appendChild(titleCell);

            let bodyCell = document.createElement("td");
            bodyCell.textContent = announcement.body;
            bodyCell.style.color = "#9CA3AF";
            row.appendChild(bodyCell);

            let featuredCell = document.createElement("td");
            if (announcement.featured === true) {
                let featuredSpan = document.createElement("span");
                featuredSpan.className = "status-active";
                featuredSpan.textContent = "Yes";
                featuredCell.appendChild(featuredSpan);
            }
            else {
                let noSpan = document.createElement("span");
                noSpan.textContent = "No";
                noSpan.style.color = "#9CA3AF";
                noSpan.style.fontSize = "0.85rem";
                featuredCell.appendChild(noSpan);
            }
            row.appendChild(featuredCell);

            let actionCell = document.createElement("td");
            let deleteBtn = document.createElement("button");
            deleteBtn.className = "action-btn danger-btn small-btn";
            deleteBtn.textContent = "Delete";
            deleteBtn.addEventListener("click", function () {
                deleteAnnouncement(announcement.id);
            });
            actionCell.appendChild(deleteBtn);
            row.appendChild(actionCell);

            annTbody.appendChild(row);
        });
    }
}

function deleteAnnouncement(id) {
    let answer = confirm("Are you sure you want to delete this announcement?");
    if (answer) {
        let newAnnouncements = [];
        announcements.forEach(function (announcement) {
            if (announcement.id !== id) {
                newAnnouncements.push(announcement);
            }
        });
        announcements = newAnnouncements;
        alert("Announcement deleted successfully!");
        displayAnnouncements();
    }
}

function postAnnouncement() {
    let titleValue = annTitle.value.trim();
    let bodyValue = annBody.value.trim();
    let featuredValue = annFeatured.checked;

    if (titleValue === "") {
        alert("Please enter an announcement title.");
        return;
    }

    if (bodyValue === "") {
        alert("Please enter the announcement message.");
        return;
    }

    let newId = 1;
    if (announcements.length > 0) {
        newId = announcements[announcements.length - 1].id + 1;
    }

    let newAnnouncement = {
        id: newId,
        title: titleValue,
        body: bodyValue,
        featured: featuredValue
    };

    announcements.push(newAnnouncement);

    alert("Announcement posted successfully!");

    annTitle.value = "";
    annBody.value = "";
    annFeatured.checked = false;

    displayAnnouncements();
}

postAnnBtn.addEventListener("click", postAnnouncement);

displayAnnouncements();