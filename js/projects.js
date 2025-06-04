var projectData = null;

function stringToHTML(text) {
    let parser = new DOMParser();
    let doc = parser.parseFromString(text, 'text/html');
    return doc.body;
}

function showProjects(projects) {
    let display = document.querySelector("#portfolio-display");
    display.innerHTML = "";

    for (let i = 0; i < projects.length; i++) {
        let project = projects[i];

        fetch('./project.html')
            .then((res) => {
                if (!res.ok) {
                    throw new Error(`HTTP error! Status: ${res.status}`);
                }
                return res.text();
            })
            .then((text) => {
                let html = stringToHTML(text);

                html = html.querySelector("#project");

                let title = html.querySelector("#title");
                let description = html.querySelector("#description");
                let image = html.querySelector("#image");
                let link = html.querySelector("#link");
                let tags = html.querySelector("#tags");

                title.textContent = project.title;
                description.textContent = project.description;

                image.setAttribute("src", project.image);
                image.setAttribute("alt", project.imageAlt);
                link.setAttribute("href", project.link);

                for (t in project.tags) {
                    let newTag = `<div class="project-tag">${project.tags[t]}</div>`
                    tags.append(stringToHTML(newTag));
                }

                display.append(html);
            })
    }
}

function fetchProjects() {
    fetch("./data/projects.json")
        .then((res) => {
            if (!res.ok) {
                throw new Error(`HTTP error! Status: ${res.status}`);
            }
            return res.json();
        })
        .then((data) => {
            projectData = data;
            showProjects(projectData);
        })
        .catch((error) =>
            console.error("Unable to fetch data:", error));
}

fetchProjects();