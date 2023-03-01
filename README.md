<h1>GIT COMMANDS AND THEIR FUNCTIONS</h1>
<h2>Installation:</h2>
`brew install git`: This command installs git on your local machine.
<h2>Initialization:</h2>
`git init`: This command initializes a new git repository in your current directory.
<h2>Staging:</h2>
- `git add 'file name'`: This command stages the specified file for commit.
- `git add .`: This command stages all files in the current directory for commit.
<h2>Committing:</h2>
`git commit -m 'commit message'`: This command commits the staged changes to the repository with a descriptive message.
<h2>Branching:</h2>
- `git checkout -b 'branch name'`: This command creates a new branch from the current branch and switches to it.
- `git checkout 'branch name'`: This command switches to an existing branch.
- `git merge 'branch name'`: This command merges the specified branch into the current branch.
<h2>Connecting to a Remote Repository:</h2>
`git remote add origin (insert either the ssh link or the http link)`: This command connects your local repository to a remote repository.
<h2>Pushing:</h2>
`git push -u origin main`: This command pushes your changes to the remote repository.
<h2>Additional Commands:</h2>
`git branch -M 'new name'`: This command renames the current branch to the specified name.