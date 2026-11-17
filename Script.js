document.addEventListener("DOMContentLoaded", () => {
    fetchProjects();
    setupContactForm();
});

async function fetchProjects() {
    const projectListContainer = document.getElementById('project-list');
    try {
        const response = await fetch('/api/projects');
        const projects = await response.json();
        
        projectListContainer.innerHTML = '';
        projects.forEach(proj => {
            const card = document.createElement('div');
            card.className = 'project-card';
            card.innerHTML = `
                <h3>${proj.title}</h3>
                <p>${proj.description}</p>
                <p style="margin-top: 0.5rem;"><strong>Tech:</strong> ${proj.techStack}</p>
                <br>
                <a href="${proj.link}" class="btn" target="_blank">View Project</a>
            `;
            projectListContainer.appendChild(card);
        });
    } catch (error) {
        projectListContainer.innerHTML = '<p>Could not load projects from server.</p>';
    }
}

function setupContactForm() {
    const form = document.getElementById('contact-form');
    const responseP = document.getElementById('form-response');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, message })
            });
            const data = await res.json();
            responseP.style.color = '#16a34a';
            responseP.textContent = data.message;
            form.reset();
        } catch (err) {
            responseP.style.color = '#dc2626';
            responseP.textContent = 'Failed to submit message.';
        }
    });
                                                }
