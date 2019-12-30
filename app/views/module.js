const renderModule = async (module, state) => {
  history.pushState({}, null, window.location.pathname + '?module=' + module.name);

  const root = document.getElementById('root');
  root.innerHTML = '';
  const renderedModuleThumb = await moduleThumb(module)
  root.appendChild(renderedModuleThumb);

  for (const student of state.students) {
    const renderedStudentThumb = await studentThumb(student);
    const renderedStudentAssignments = await assignments(module, student)


    root.appendChild(document.createElement('hr'));

    const permalinkButton = document.createElement('button');
    permalinkButton.innerHTML = `review only ${student.userName}'s ${module.name} assignments`;
    permalinkButton.onclick = () => {

      history.pushState({}, null, `${window.location.pathname}?student=${student.userName}&module=${module.name}`);

      root.innerHTML = '';
      root.appendChild(renderedStudentThumb);
      root.appendChild(document.createElement('hr'));
      root.appendChild(renderedModuleThumb);
      root.appendChild(renderedStudentAssignments);

    }
    root.appendChild(permalinkButton);

    // css-fix this later
    root.appendChild(document.createElement('br'));
    root.appendChild(document.createElement('br'));
    root.appendChild(renderedStudentThumb);
    root.appendChild(renderedStudentAssignments);
    root.appendChild(document.createElement('br'));
  }
}
