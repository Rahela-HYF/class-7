// bad that it does root directly? whatever for now

const renderStudent = async (student, state) => {
  history.pushState({}, null, window.location.pathname + '?student=' + student.userName);

  const root = state.root;
  root.innerHTML = '';
  const renderedStudentThumb = await studentThumb(student);
  root.appendChild(renderedStudentThumb);

  for (const module of state.modules) {
    const renderedModuleThumb = await moduleThumb(module);
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

    root.appendChild(renderedModuleThumb);
    root.appendChild(renderedStudentAssignments);
    root.appendChild(document.createElement('br'));
  }
}
