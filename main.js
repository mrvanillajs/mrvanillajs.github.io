
const projects = [
  'sveltejs/svelte',
  'aurelia/framework'
];

function fetchFactory(project_name) {
  const url = `https://api.github.com/repos/${project_name}`;
  return fetch(url).then(res => res.json());
}

(async () => {
  const results = await Promise.all(projects.map((project_name) => fetchFactory(project_name)));

  const res = results.map(({ name, full_name, stargazers_count }) => ({ name, full_name, stargazers_count }));

  render({ projects: res })
})();


function render(state) {
  document.querySelector('#app').innerHTML = `
  <div>
    <h1> Popular JS framework github repo </h1>
    <div>
      ${state.projects.map((project) => `<div> ${project.full_name} -- ${project.stargazers_count} </div>`).join('')}
    </div>
  </div>
  `;
}
