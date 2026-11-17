document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-link');
    const mainContent = document.getElementById('mainContent');

    async function loadPage(pageName, element) {
        
        navLinks.forEach(link => link.classList.remove('active'));
        element.classList.add('active');

        try {

            const response = await fetch(`pages/${pageName}.html`);
            if (!response.ok) throw new Error('Page not found');
            const html = await response.text();
            
            mainContent.innerHTML = html;
            
            mainContent.firstElementChild.classList.add('animate-in');

            initPageScripts(pageName);

        } catch (error) {
            mainContent.innerHTML = `<h2>Error loading page: ${error.message}</h2>`;
        }
    }

    //click events of sidebar links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = e.currentTarget.getAttribute('data-target');
            loadPage(target, e.currentTarget);
        });
    });

    loadPage('dashboard', document.querySelector('[data-target="dashboard"]'));

    // --- Page Logic ---

    function initPageScripts(pageName) {
        if (pageName === 'dashboard') {
        } 
        
        else if (pageName === 'series') {
            // Modal Logic
            window.openModal = () => document.getElementById('seriesModal').style.display = 'block';
            window.closeModal = () => document.getElementById('seriesModal').style.display = 'none';
            
            // new series logic
            window.addNewSeries = () => {
                const title = document.getElementById('newSeriesTitle').value;
                const type = document.getElementById('newSeriesType').value;
                if(!title) return alert("Enter a title");

                const tbody = document.querySelector('#seriesTable tbody');
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td><strong>${title}</strong><br><span style="font-size:12px;color:gray;">New Genre</span></td>
                    <td>${type}</td>
                    <td><span class="badge badge-warning">Pending</span></td>
                    <td>
                        <button class="btn-icon"><i class="fas fa-edit"></i></button>
                        <button class="btn-icon text-danger" onclick="this.closest('tr').remove()"><i class="fas fa-trash"></i></button>
                    </td>
                `;
                tbody.prepend(tr);
                closeModal();
            };
        } 
        
        else if (pageName === 'upload') {
            // Toggle upload type
            window.toggleUploadType = (type) => {
                document.getElementById('comic-upload').style.display = type === 'comic' ? 'block' : 'none';
                document.getElementById('novel-upload').style.display = type === 'novel' ? 'block' : 'none';
            };

            // Toggle schedule date
            window.toggleScheduleDate = () => {
                const val = document.getElementById('releaseSchedule').value;
                document.getElementById('datePicker').style.display = val === 'schedule' ? 'block' : 'none';
            };
        } 
        
        else if (pageName === 'chapters') {
            // Drag and Drop Reordering
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
                        const all = [...document.querySelectorAll('.page-item')];
                        const draggedIdx = all.indexOf(draggedItem);
                        const targetIdx = all.indexOf(this);
                        if (draggedIdx < targetIdx) this.after(draggedItem);
                        else this.before(draggedItem);
                    }
                });
            });
        }
    }
});