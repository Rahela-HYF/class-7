const assignments = async (module, student) => {

  const assignmentsUl = document.createElement('ul');

  if (module.projects && module.projects.length > 0) {
    const projLi = document.createElement('li');

    const header = document.createElement('h3');
    header.innerHTML = "Projects";
    projLi.appendChild(header);

    const projUl = document.createElement('ul');
    for (const project of module.projects) {
      projUl.appendChild(await assignment(project, student));
    }
    projLi.appendChild(projUl);

    assignmentsUl.appendChild(projLi);
  }

  if (module.exercises && module.exercises.length > 0) {
    const exLi = document.createElement('li');

    const header = document.createElement('h3');
    header.innerHTML = "Exercises";
    exLi.appendChild(header);

    const exUl = document.createElement('ul');
    for (const exercise of module.exercises) {
      exUl.appendChild(await assignment(exercise, student));
    }
    exLi.appendChild(exUl);

    assignmentsUl.appendChild(exLi);
  }

  if (module.assessments && module.assessments.length > 0) {
    const assLi = document.createElement('li');

    const header = document.createElement('h3');
    header.innerHTML = "Assessments";
    assLi.appendChild(header);

    const assUl = document.createElement('ul');
    for (const assessment of module.assessments) {
      assUl.appendChild(await assignment(assessment, student));
    }
    assLi.appendChild(assUl);

    assignmentsUl.appendChild(assLi);
  }

  const container = document.createElement('div');
  container.appendChild(assignmentsUl);

  return container;

}
