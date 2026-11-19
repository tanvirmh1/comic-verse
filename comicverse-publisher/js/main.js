document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-link');
    const mainContent = document.getElementById('mainContent');

    async function loadPage(pageName, element) {
        navLinks.forEach(link => link.classList.remove('active'));
        if (element) element.classList.add('active');

        try {
            const response = await fetch(`pages/${pageName}.html`);
            if (!response.ok) throw new Error('Page not found');
            const html = await response.text();
            
            mainContent.innerHTML = html;
            mainContent.firstElementChild.classList.add('animate-in');
            initPageScripts(pageName);

        } catch (error) {
            mainContent.innerHTML = `<h2>Error loading page. Are you using a local server?</h2>`;
        }
    }

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            loadPage(e.currentTarget.getAttribute('data-target'), e.currentTarget);
        });
    });

    loadPage('dashboard', document.querySelector('[data-target="dashboard"]'));


    function updateDashboardStats() {
        const rows = document.querySelectorAll('#seriesTable tbody tr');
        let total = rows.length;
        let pending = 0;

        rows.forEach(row => {
            if (row.innerHTML.includes('Pending')) {
                pending++;
            }
        });

        sessionStorage.setItem('totalSeries', total);
        sessionStorage.setItem('pendingSeries', pending);
    }

    window.updateDashboardStats = updateDashboardStats;

    function initPageScripts(pageName) {
        if (pageName === 'series') {

            updateDashboardStats();
            
            window.openModal = () => {
                document.getElementById('modalTitle').innerText = 'Create New Series';
                document.getElementById('editRowIndex').value = "-1"; 
                document.getElementById('newSeriesTitle').value = '';
                document.getElementById('newSeriesGenre').value = '';
                document.getElementById('seriesModal').style.display = 'block';
            };

            window.closeModal = () => document.getElementById('seriesModal').style.display = 'none';

            window.editSeries = (btn) => {
                const row = btn.closest('tr');
                document.getElementById('modalTitle').innerText = 'Edit Series';
                document.getElementById('newSeriesTitle').value = row.querySelector('.series-title').innerText;
                document.getElementById('newSeriesGenre').value = row.querySelector('.series-genre').innerText;
                document.getElementById('newSeriesType').value = row.querySelector('.series-type').innerText;
                document.getElementById('editRowIndex').value = Array.from(row.parentNode.children).indexOf(row);
                document.getElementById('seriesModal').style.display = 'block';
            };

            window.saveSeries = () => {
                const title = document.getElementById('newSeriesTitle').value;
                const type = document.getElementById('newSeriesType').value;
                const genre = document.getElementById('newSeriesGenre').value || 'Uncategorized';
                const editIndex = document.getElementById('editRowIndex').value;

                if(!title) return alert("Enter a title");
                const tbody = document.querySelector('#seriesTable tbody');

                if (editIndex === "-1") {
                    // Create
                    const tr = document.createElement('tr');
                    tr.innerHTML = `
                        <td><strong class="series-title">${title}</strong><br><span class="series-genre" style="font-size:12px;color:gray;">${genre}</span></td>
                        <td class="series-type">${type}</td>
                        <td><span class="badge badge-warning">Pending</span></td>
                        <td>
                            <button class="btn-icon" onclick="editSeries(this)"><i class="fas fa-edit"></i></button>
                            <button class="btn-icon text-danger" onclick="this.closest('tr').remove(); updateDashboardStats();"><i class="fas fa-trash"></i></button>
                        </td>
                    `;
                    tbody.prepend(tr);
                } else {
                    // Edit
                    const rowToEdit = tbody.children[editIndex];
                    rowToEdit.querySelector('.series-title').innerText = title;
                    rowToEdit.querySelector('.series-genre').innerText = genre;
                    rowToEdit.querySelector('.series-type').innerText = type;
                    rowToEdit.cells[2].innerHTML = '<span class="badge badge-warning">Pending</span>';
                }

                updateDashboardStats(); // Refresh numbers
                closeModal();
            };
        } 
        
        else if (pageName === 'dashboard') {
            // Read the simple numbers from browser memory
            const total = sessionStorage.getItem('totalSeries') || 5;
            const pending = sessionStorage.getItem('pendingSeries') || 2;

            document.getElementById('dashTotalSeries').innerText = total;
            document.getElementById('dashPendingSeries').innerText = pending;
        }
        
        else if (pageName === 'upload') {
            window.toggleUploadType = (type) => {
                document.getElementById('comic-upload').classList.toggle('hidden', type !== 'comic');
                document.getElementById('novel-upload').classList.toggle('hidden', type !== 'novel');
            };
            window.toggleScheduleDate = () => {
                const val = document.getElementById('releaseSchedule').value;
                document.getElementById('datePicker').classList.toggle('hidden', val !== 'schedule');
            };
            window.submitChapterData = () => {
                const series = document.getElementById('uploadSeries').value;
                const chapterNum = document.getElementById('uploadChapterNum').value;
                if (!chapterNum) return alert("Please enter a chapter number.");

                let savedChapters = JSON.parse(localStorage.getItem('publisherChapters')) || [];
                savedChapters.push({ id: Date.now(), series: series, number: chapterNum });
                localStorage.setItem('publisherChapters', JSON.stringify(savedChapters));

                alert(`Chapter ${chapterNum} submitted!`);
                document.getElementById('uploadChapterNum').value = ''; 
            };
        } 
        
        else if (pageName === 'chapters') {
            const container = document.getElementById('chapterList');
            let savedChapters = JSON.parse(localStorage.getItem('publisherChapters')) || [];

            function renderChapters() {
                container.innerHTML = ''; 
                if (savedChapters.length === 0) {
                    container.innerHTML = '<p style="color:gray;">No chapters uploaded yet.</p>';
                    return;
                }

                savedChapters.forEach(chap => {
                    const card = document.createElement('div');
                    card.className = 'card';
                    card.style.marginBottom = '20px';
                    card.innerHTML = `
                        <div class="flex-between" style="margin-bottom: 15px;">
                            <h3>${chap.series} - Chapter ${chap.number}</h3>
                            <button class="btn-icon text-danger" onclick="removeChapter(${chap.id})"><i class="fas fa-trash"></i> Delete</button>
                        </div>
                        <div class="reorder-grid">
                            <div class="page-item" draggable="true"><span class="page-num">Page 1</span><div class="page-placeholder"><img style="width: 100px; height:130px;" src="img/spidy.jpg" alt="Description of the image"></div></div>
                            <div class="page-item" draggable="true"><span class="page-num">Page 2</span><div class="page-placeholder"><img style="width: 100px; height:130px;" src="img/2.jpg" alt="Description of the image"></div></div>
                        </div>
                    `;
                    container.appendChild(card);
                });
                setupDragAndDrop();
            }

            window.removeChapter = (id) => {
                if(confirm("Delete this chapter?")) {
                    savedChapters = savedChapters.filter(chap => chap.id !== id);
                    localStorage.setItem('publisherChapters', JSON.stringify(savedChapters));
                    renderChapters(); 
                }
            };

            function setupDragAndDrop() {
                const items = document.querySelectorAll('.page-item');
                let draggedItem = null;
                items.forEach(item => {
                    item.addEventListener('dragstart', function() {
                        draggedItem = this;
                        setTimeout(() => this.classList.add('dragging'), 0);
                    });
                    item.addEventListener('dragend', function() {
                        this.classList.remove('dragging');
                        draggedItem = null;
                    });
                    item.addEventListener('dragover', e => e.preventDefault());
                    item.addEventListener('dragenter', function(e) {
                        e.preventDefault();
                        if (this !== draggedItem) {
                            const all = [...this.closest('.reorder-grid').querySelectorAll('.page-item')];
                            const draggedIdx = all.indexOf(draggedItem);
                            const targetIdx = all.indexOf(this);
                            if (draggedIdx < targetIdx) this.after(draggedItem);
                            else this.before(draggedItem);
                        }
                    });
                });
            }
            renderChapters();
        }
    }
});
