const home = async state => {

  history.pushState({}, null, window.location.pathname);

  const container = document.createElement('div');
  container.id = state.repoName;
  home.rendered = container;

  container.appendChild(await displayMany(state.modules, moduleThumb, 'Modules'));
  container.appendChild(document.createElement('hr'));
  container.appendChild(await displayMany(state.students, studentThumb, 'Students'));

  return container;

}

