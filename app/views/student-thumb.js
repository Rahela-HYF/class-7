// with Map cache
const studentThumb = async student => {

  if (studentThumb.cache.has(student)) {
    return studentThumb.cache.get(student);
  }

  const studentImg = document.createElement('img');
  studentImg.alt = student.name + ' - ' + student.userName;
  studentImg.style = 'height:130px;width:130px;';
  try {
    const userObjPromise = await fetch('https://cors-anywhere.herokuapp.com/' + 'https://api.github.com/users/' + student.userName);
    const userData = await userObjPromise.json();
    studentImg.src = userData.avatar_url;
  } catch (err) {
    console.log('--------', err);
  };


  const nameComponent = document.createElement('h2');
  nameComponent.innerHTML = student.name;


  const githubButton = document.createElement('button');
  githubButton.innerHTML = 'github.com/' + student.userName;

  const githubLink = document.createElement('a');
  githubLink.href = 'https://github.com/' + student.userName;
  githubLink.target = '_blank';
  githubLink.appendChild(githubButton);


  const personalPageButton = document.createElement('button');
  personalPageButton.innerHTML = student.userName + '.github.io';

  const personalPageLink = document.createElement('a');
  personalPageLink.href = 'https://' + student.userName + '.github.io';
  personalPageLink.target = '_blank';
  personalPageLink.appendChild(personalPageButton);


  const allAssignments = document.createElement('button');
  allAssignments.innerHTML = 'Review all assignments';
  allAssignments.onclick = async () => {
    renderStudent(student, state);
  }

  const studentInfo = [nameComponent, githubLink, personalPageLink, allAssignments]
    .map(item => {
      const li = document.createElement('li');
      li.appendChild(item);
      return li;
    })
    .reduce((ul, li) => {
      ul.appendChild(li);
      return ul;
    }, document.createElement('ul'));


  const container = document.createElement('div');
  container.id = student.name;
  container.style = 'display:flex;flex-direction:row;padding-bottom:5%;padding-right:5%'

  container.appendChild(studentImg);
  container.appendChild(studentInfo);

  studentThumb.cache.set(student, container);
  return container;

}

studentThumb.cache = new Map();

