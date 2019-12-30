const assignment = async (assignment, student) => {

  const container = document.createElement('li');
  container.style = 'padding-bottom:1%';

  const title = document.createElement('h3');
  title.style.display = 'inline';
  const titleText = document.createTextNode(assignment.name + ': ');
  title.appendChild(titleText);
  container.appendChild(title);

  const preLiveURL = typeof assignment.live === 'string'
    ? assignment.live
    : 'https://' + student.userName + '.github.io/' + (assignment.repo || assignment.name);
  const liveURL = preLiveURL.replace('<user-name>', student.userName);


  // if source property is provided, use it
  if (assignment.source) {
    const sourceURL = assignment.source.replace('<user-name>', student.userName);

    const repoButton = document.createElement('button');
    repoButton.innerHTML = 'visit repo';
    const repoA = document.createElement('a');
    repoA.target = '_blank';
    repoA.href = sourceURL;
    repoA.appendChild(repoButton);
    container.appendChild(repoA);


    // else use the repo/name for url generation
    // repos "don't exist" without a README & gh-pages
    //  assume repos exist unless explicitly told false
  }

  if (assignment.repo || !assignment.hasOwnProperty('repo')) {
    try {

      const res = await fetch('https://cors-anywhere.herokuapp.com/' + liveURL);
      // const res = await fetch(liveURL + '/README.md');
      // const res = await fetch(liveURL);

      if (res.ok) {
        const preHrefURL = typeof assignment.repo === 'string'
          ? 'https://github.com/' + student.userName + '/' + assignment.repo
          : 'https://github.com/' + student.userName + '/' + assignment.name;
        const hrefURL = preHrefURL.replace('<user-name>', student.userName);

        const repoButton = document.createElement('button');
        repoButton.innerHTML = 'visit repo';
        const repoA = document.createElement('a');
        repoA.target = '_blank';
        repoA.href = hrefURL;
        repoA.appendChild(repoButton);
        container.appendChild(repoA);

        if (Array.isArray(assignment.directories) && assignment.directories.length > 0) {
          const directoriesUl = assignment.directories
            .map(directory => {
              const directoryButton = document.createElement('button');
              directoryButton.innerHTML = 'review directory';

              const directoryA = document.createElement('a');
              directoryA.target = '_blank';
              directoryA.href = hrefURL + '/tree/master/' + directory;
              directoryA.appendChild(directoryButton);

              const directoryLi = document.createElement('li');
              directoryLi.appendChild(document.createTextNode(directory));
              directoryLi.appendChild(directoryA);
              return directoryLi;
            })
            .reduce((ul, li) => {
              ul.appendChild(li);
              return ul;
            }, document.createElement('ul'));

          container.appendChild(directoriesUl);
        }
      } else {
        const repoText = document.createElement('text');
        repoText.innerHTML = '-- ' + res.status + ' --';
        container.appendChild(repoText);
        return container;
      }
    } catch (err) {
      const repoText = document.createElement('text');
      repoText.innerHTML = '-- ' + err.message + ' --';
      container.appendChild(repoText);
      return container;
    }
  };

  // use this directly as a review link
  // cors: can't do an existence check
  if (typeof assignment.live === 'string') {
    const liveButton = document.createElement('button');
    liveButton.innerHTML = 'review assignment';
    const liveA = document.createElement('a');
    liveA.target = '_blank';
    liveA.href = liveURL;
    // liveA.href = assignment.live.replace('<user-name>', student.userName);
    liveA.appendChild(liveButton);
    container.appendChild(liveA);

    // if true or not present
    // generate a live link from repo/name & username
  } else if (assignment.live === true) {

    const liveEl = (async () => {
      try {
        const response = await fetch('https://cors-anywhere.herokuapp.com/' + liveURL + '/README.md');
        if (response.ok) {
          const liveButton = document.createElement('button');
          liveButton.innerHTML = 'live project';
          const liveA = document.createElement('a');
          liveA.target = '_blank';
          liveA.href = liveURL;
          liveA.appendChild(liveButton);
          return liveA;
        } else {
          const deadLinkEl = document.createElement('text');
          deadLinkEl.innerHTML = '-- ' + response.status + ' --';
          return deadLinkEl;
        }
      } catch (err) {
        const deadLinkEl = document.createElement('text');
        deadLinkEl.innerHTML = '-- ' + err.message + ' --';
        return deadLinkEl;
      }
    })();

    container.appendChild(await liveEl);
  };

  // reports will only exist in repos via github pages
  //  keep testing separate from potential fullstack deployments
  if (assignment.reports && assignment.reports.length > 0) {
    const ul = document.createElement('ul');
    for (const reportPath of assignment.reports) {

      const reportLi = document.createElement('li');

      const reportPathEl = document.createElement('text');
      reportPathEl.innerHTML = reportPath + ": ";
      reportLi.appendChild(reportPathEl);

      try {
        const res = await fetch('https://cors-anywhere.herokuapp.com/' + liveURL + '/' + reportPath);

        if (res.ok) {

          const reportButton = document.createElement('button');
          reportButton.innerHTML = 'log report';
          reportButton.onclick = async () => {
            console.group(student.name + ': ' + assignment.name + ' -> ' + reportPath);
            console.log(await (async () => {
              try {
                return await res.clone().json();
              } catch (err) {
                return await res.text();
              }
            })());
            console.groupEnd();
          }
          reportLi.appendChild(reportButton);

        } else {
          const statusText = document.createElement('text');
          statusText.innerHTML = '-- ' + res.status + ' --';
          reportLi.appendChild(statusText);
        }
      } catch (err) {
        const statusText = document.createElement('text');
        statusText.innerHTML = '-- ' + err.message + ' --';
        reportLi.appendChild(statusText);
      }

      // container.appendChild(reportLi);
      ul.appendChild(reportLi)
    };
    container.appendChild(ul);
  }

  return container;

}
