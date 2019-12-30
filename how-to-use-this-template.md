1. set up a new repo for your class
    1. start an empty repository in your organization
    1. clone this repo
    1. replace all instances of `class-repo-template` with the name of your new class
    1. set your new repo as a remote
    1. push
1. set up the class overview app
    1. turn on github pages
    1. update the `repoName` and `userName` in `./app/data/index.json`
    1. add your students to `./app/data/students.js` (`{name:"student name", userName: "githubUserName"}`)
1. set up the wiki in your new repo
    1. enable wikis in your new repo
    1. enable editing for non-contributors (if you want to)
    1. clone the wiki from this template repo
    1. replace all instances of `class-repo-template` with your new repo name
    1. push to your new repo's wiki
1. copy the template project board to your repo, one for each module


> if you're using this repo outside of the HackYourFutureBelgium organization, you'll need to update a few links to make sure that the class repo is consistently pointing to itself where necessary.
>
> Once you think it's set up spend a half hour or so navigating the repo to make sure you didn't miss any
