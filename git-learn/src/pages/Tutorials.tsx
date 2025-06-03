import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Paper,
  Button,
  TextField,
  Alert
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface Lesson {
  id: string;
  title: string;
  description: string;
  content: LessonContent[];
  practice?: PracticeSection;
  completed?: boolean;
}

interface LessonContent {
  type: 'text' | 'code' | 'command' | 'visual';
  title?: string;
  content: string;
  explanation?: string;
  output?: string;
}

interface PracticeSection {
  steps: PracticeStep[];
}

interface PracticeStep {
  id: string;
  challenge: string;
  expectedCommand: string;
  hint: string;
  explanation: string;
  solution: string;
  completed?: boolean;
}

const lessons: Lesson[] = [
  {
    id: 'what-is-git',
    title: 'What is Git? (History & Basics)',
    description: 'Understanding version control and why Git was created',
    content: [
      {
        type: 'text',
        title: '📚 A Brief History',
        content: 'In 2005, Linus Torvalds (the creator of Linux) needed a better way to manage changes to his operating system code. Thousands of programmers worldwide were contributing, and keeping track of changes was becoming impossible. So he created Git in just 10 days! Today, Git is used by millions of developers and companies like Google, Facebook, and Microsoft.'
      },
      {
        type: 'text',
        title: '🤔 What Problem Does Git Solve?',
        content: 'Imagine you\'re writing a book with friends. Without Git, you might email files back and forth like "Chapter1_final.doc", "Chapter1_final_REAL.doc", "Chapter1_final_ACTUAL.doc". This gets messy fast! Git is like having a smart assistant that keeps track of every change, who made it, when, and why.'
      },
      {
        type: 'text',
        title: '🏠 Think of Git Like a Photo Album',
        content: 'Git takes "snapshots" (called commits) of your project at different points in time. Just like a photo album lets you see how your family grew over the years, Git lets you see how your project evolved. You can always go back to any "photo" (version) if needed.'
      },
      {
        type: 'visual',
        title: 'Git vs Traditional File Management',
        content: `❌ Traditional Way:
📁 MyProject_v1/
📁 MyProject_v2/  
📁 MyProject_final/
📁 MyProject_final_REAL/
📁 MyProject_final_FINAL/ (We've all been here! 😅)

✅ Git Way:
📁 MyProject/ (One folder, complete history inside)`
      },
      {
        type: 'text',
        title: '🌟 Why Git is Amazing',
        content: '• You never lose work (Git remembers everything)\n• Multiple people can work on the same project without conflicts\n• You can experiment freely and undo mistakes\n• You can see exactly what changed and why\n• It works offline (no internet needed)'
      }
    ]
  },
  {
    id: 'git-setup',
    title: 'Setting Up Git (Your Digital Identity)',
    description: 'Configure Git so it knows who you are',
    content: [
      {
        type: 'text',
        title: '🆔 Why Git Needs to Know You',
        content: 'Just like signing your name on a document, Git needs to know who made each change. This helps when multiple people work together - everyone can see who contributed what. Think of it as your digital signature!'
      },
      {
        type: 'text',
        title: '🔧 What We\'re Setting Up',
        content: 'We need to tell Git two things about you:\n\n1. **Your Name**: This appears in the history, like "John made this change"\n2. **Your Email**: This links your changes to your identity (like a digital business card)'
      },
      {
        type: 'command',
        title: '👤 Setting Your Name',
        content: 'git config --global user.name "Your Name"',
        explanation: 'This command tells Git your name. The --global part means "use this name for all my projects". Replace "Your Name" with your actual name (keep the quotes!).'
      },
      {
        type: 'command',
        title: '📧 Setting Your Email',
        content: 'git config --global user.email "your.email@example.com"',
        explanation: 'This tells Git your email address. Use the same email you might use for GitHub or other coding platforms. The quotes are important!'
      },
      {
        type: 'command',
        title: '✅ Checking Your Setup',
        content: 'git config --list',
        explanation: 'This shows all your Git settings. It\'s like checking your profile to make sure everything looks right.'
      }
    ],
    practice: {
      steps: [
        {
          id: 'step1',
          challenge: '👤 Set your name to "Alex Smith" (or use your real name)',
          expectedCommand: 'git config --global user.name "Alex Smith"',
          hint: '💡 Type: git config --global user.name "Alex Smith" (keep the quotes!)',
          explanation: 'This tells Git who you are, so when you save changes, it knows to credit you.',
          solution: 'git config --global user.name "Alex Smith"'
        },
        {
          id: 'step2',
          challenge: '📧 Set your email to "alex@example.com" (or use your real email)',
          expectedCommand: 'git config --global user.email "alex@example.com"',
          hint: '💡 Type: git config --global user.email "alex@example.com" (don\'t forget the quotes!)',
          explanation: 'This links your changes to your email address, like a digital signature.',
          solution: 'git config --global user.email "alex@example.com"'
        },
        {
          id: 'step3',
          challenge: '✅ Check that Git saved your information correctly',
          expectedCommand: 'git config --list',
          hint: '💡 Type: git config --list (this shows all your Git settings)',
          explanation: 'This displays all your Git configuration to verify everything is set up correctly.',
          solution: 'git config --list'
        }
      ]
    }
  },
  {
    id: 'creating-repository',
    title: 'Creating Your First Git Project',
    description: 'Start tracking changes in a project folder',
    content: [
      {
        type: 'text',
        title: '📂 What is a Repository?',
        content: 'A repository (or "repo" for short) is just a folder where Git watches for changes. Think of it like a special notebook where Git writes down everything that happens to your files. Once you "initialize" a folder with Git, it becomes a repository!'
      },
      {
        type: 'text',
        title: '🏗️ The History Behind Repositories',
        content: 'Before Git, programmers used systems called CVS and SVN. These required a central server - if the server went down, nobody could work! Git revolutionized this by making every folder a complete repository. Your laptop has the full history, just like everyone else\'s.'
      },
      {
        type: 'command',
        title: '🆕 Starting a Repository',
        content: 'git init',
        explanation: 'This creates a hidden .git folder inside your current directory. This folder is Git\'s "brain" - it stores all the history and settings. You only need to do this once per project.'
      },
      {
        type: 'command',
        title: '👀 Checking Status',
        content: 'git status',
        explanation: 'This is like asking Git "What\'s happening?". It shows which files have changed, which are ready to save, and what Git is paying attention to.',
        output: 'On branch main\n\nNo commits yet\n\nnothing to commit (create/copy files and use "git add" to track)'
      },
      {
        type: 'text',
        title: '📝 Understanding the Three Areas',
        content: 'Git has three important areas:\n\n1. **Working Directory**: Your normal files (what you see in your folder)\n2. **Staging Area**: Files ready to be saved (like a shopping cart before checkout)\n3. **Repository**: Permanent saved history (like purchased items in your order history)'
      },
      {
        type: 'command',
        title: '➕ Adding Files to Staging',
        content: 'git add filename.txt',
        explanation: 'This puts a file in the "staging area" - like adding items to your shopping cart. Use "git add ." to add ALL files in the folder at once.'
      },
      {
        type: 'command',
        title: '💾 Saving Changes (Commit)',
        content: 'git commit -m "My first save"',
        explanation: 'This permanently saves your staged files with a message describing what you did. It\'s like taking a snapshot of your project at this moment.',
        output: '[main (root-commit) f7fde4f] My first save\n 1 file changed, 1 insertion(+)\n create mode 100644 filename.txt'
      }
    ],
    practice: {
      steps: [
        {
          id: 'step1',
          challenge: '🆕 Turn your current folder into a Git repository',
          expectedCommand: 'git init',
          hint: '💡 Type: git init (this creates a new repository in your folder)',
          explanation: 'This creates a hidden .git folder that will track all changes to your files.',
          solution: 'git init'
        },
        {
          id: 'step2',
          challenge: '👀 Check the status of your new repository',
          expectedCommand: 'git status',
          hint: '💡 Type: git status (this shows what Git sees in your folder)',
          explanation: 'Git status tells you what files have changed and what\'s ready to be saved.',
          solution: 'git status'
        },
        {
          id: 'step3',
          challenge: '➕ Add all files to the staging area (shopping cart)',
          expectedCommand: 'git add .',
          hint: '💡 Type: git add . (the dot means "add everything in this folder")',
          explanation: 'This puts all your files in the staging area, ready to be committed.',
          solution: 'git add .'
        },
        {
          id: 'step4',
          challenge: '💾 Save your changes with the message "My first commit"',
          expectedCommand: 'git commit -m "My first commit"',
          hint: '💡 Type: git commit -m "My first commit" (the -m lets you add a message)',
          explanation: 'This permanently saves your staged files with a descriptive message.',
          solution: 'git commit -m "My first commit"'
        }
      ]
    }
  },
  {
    id: 'understanding-commits',
    title: 'Understanding Commits (Your Project\'s Photo Album)',
    description: 'Learn how Git saves and tracks your project history',
    content: [
      {
        type: 'text',
        title: '📸 What is a Commit?',
        content: 'A commit is like taking a photo of your entire project at a specific moment. Each photo has a timestamp, your name, and a caption (commit message) explaining what changed. Git keeps all these photos in order, creating a complete timeline of your project.'
      },
      {
        type: 'text',
        title: '🔍 The Anatomy of a Commit',
        content: 'Every commit contains:\n\n• **A unique ID** (like a photo\'s serial number)\n• **Your name and email** (who took the photo)\n• **Timestamp** (when the photo was taken)\n• **Commit message** (what\'s happening in the photo)\n• **The actual changes** (what\'s different from the last photo)'
      },
      {
        type: 'command',
        title: '📖 Viewing Your History',
        content: 'git log',
        explanation: 'This shows all your commits in reverse chronological order (newest first). It\'s like flipping through your photo album from the most recent picture backward.'
      },
      {
        type: 'command',
        title: '📊 Pretty History View',
        content: 'git log --oneline',
        explanation: 'This shows a condensed, one-line summary of each commit. Much easier to read when you have many commits!'
      },
      {
        type: 'text',
        title: '💡 Writing Good Commit Messages',
        content: 'Good commit messages are like good photo captions:\n\n✅ "Add user login feature"\n✅ "Fix bug in shopping cart"\n✅ "Update homepage design"\n\n❌ "Fixed stuff"\n❌ "Changes"\n❌ "Asdf" (we\'ve all done this! 😅)'
      }
    ],
    practice: {
      steps: [
        {
          id: 'step1',
          challenge: '📖 View the history of your commits',
          expectedCommand: 'git log',
          hint: '💡 Type: git log (this shows all your saved snapshots)',
          explanation: 'Git log displays your project\'s complete history with details about each commit.',
          solution: 'git log'
        },
        {
          id: 'step2',
          challenge: '📊 View a condensed history (one line per commit)',
          expectedCommand: 'git log --oneline',
          hint: '💡 Type: git log --oneline (this shows a simplified view)',
          explanation: 'The --oneline flag makes the history easier to read by showing just the essentials.',
          solution: 'git log --oneline'
        }
      ]
    }
  },
  {
    id: 'branching',
    title: 'Branching (Parallel Universes for Your Code)',
    description: 'Learn how to work on different features without breaking your main project',
    content: [
      {
        type: 'text',
        title: '🌳 The Story of Branching',
        content: 'In the early days of programming, teams would "freeze" their code when someone wanted to add a new feature. Nobody else could make changes until the feature was done! This was incredibly inefficient. Git\'s branching system revolutionized collaboration by letting everyone work on separate "branches" simultaneously.'
      },
      {
        type: 'text',
        title: '🛤️ What is a Branch?',
        content: 'Imagine you\'re writing a story. The main plot is your "main branch". But what if you want to try a different ending? Instead of erasing your original story, you make a copy and experiment there. That\'s exactly what Git branches do - they let you experiment without affecting your main work.'
      },
      {
        type: 'visual',
        title: 'Branch Visualization (Like a Family Tree)',
        content: `main branch:    A---B---C---F---G
                      \\       /
new-feature:           D---E

A, B, C = commits on main
D, E = experimental commits on new-feature
F = merging the experiment back to main`
      },
      {
        type: 'text',
        title: '🎯 Why Branches are Powerful',
        content: '• **Safety**: Your main code stays safe while you experiment\n• **Organization**: Different features get their own space\n• **Collaboration**: Team members work on separate branches\n• **Flexibility**: Easy to switch between different ideas\n• **Backup**: If an experiment fails, just delete the branch!'
      },
      {
        type: 'command',
        title: '🔍 Seeing All Branches',
        content: 'git branch',
        explanation: 'Lists all branches in your repository. The current branch has an asterisk (*) next to it, like highlighting your current location on a map.'
      },
      {
        type: 'command',
        title: '🌿 Creating a New Branch',
        content: 'git branch feature-name',
        explanation: 'Creates a new branch (like making a copy of your story to try different ideas). The branch starts as an exact copy of where you currently are.'
      },
      {
        type: 'command',
        title: '🚀 Switching to a Branch',
        content: 'git checkout feature-name',
        explanation: 'Moves you to a different branch (like switching to your experimental story draft). Your files actually change to match that branch!'
      },
      {
        type: 'command',
        title: '⚡ Create and Switch (Shortcut)',
        content: 'git checkout -b feature-name',
        explanation: 'Creates a new branch AND switches to it in one command. This is the most common way to start working on something new!'
      }
    ],
    practice: {
      steps: [
        {
          id: 'step1',
          challenge: '🔍 See what branches exist in your repository',
          expectedCommand: 'git branch',
          hint: '💡 Type: git branch (this lists all your parallel universes)',
          explanation: 'This shows all branches, with an asterisk (*) marking your current location.',
          solution: 'git branch'
        },
        {
          id: 'step2',
          challenge: '🌿 Create a new branch called "my-feature"',
          expectedCommand: 'git branch my-feature',
          hint: '💡 Type: git branch my-feature (this creates a new parallel timeline)',
          explanation: 'This creates a new branch that\'s an exact copy of your current branch.',
          solution: 'git branch my-feature'
        },
        {
          id: 'step3',
          challenge: '🚀 Switch to your new "my-feature" branch',
          expectedCommand: 'git checkout my-feature',
          hint: '💡 Type: git checkout my-feature (this moves you to your new timeline)',
          explanation: 'This switches your working directory to the my-feature branch.',
          solution: 'git checkout my-feature'
        },
        {
          id: 'step4',
          challenge: '⚡ Create and switch to a branch called "experiment" in one command',
          expectedCommand: 'git checkout -b experiment',
          hint: '💡 Type: git checkout -b experiment (the -b creates and switches in one go)',
          explanation: 'This is the shortcut that most developers use - create and switch in one step!',
          solution: 'git checkout -b experiment'
        }
      ]
    }
  },
  {
    id: 'merging',
    title: 'Merging (Combining Your Parallel Universes)',
    description: 'Learn how to combine different branches back together',
    content: [
      {
        type: 'text',
        title: '🤝 What is Merging?',
        content: 'Remember our story analogy? After experimenting with different endings on separate branches, you might want to bring the best ideas back into your main story. That\'s merging! It\'s like combining the best parts of different drafts into one final version.'
      },
      {
        type: 'text',
        title: '🎭 Types of Merges',
        content: '**Fast-Forward Merge**: Like adding new chapters to the end of your book - simple and clean!\n\n**Three-Way Merge**: When both branches have new content, Git creates a special "merge commit" that combines both sets of changes.\n\n**Merge Conflicts**: Sometimes Git can\'t automatically combine changes (like if you edited the same sentence differently in two drafts). Don\'t worry - Git will ask for your help!'
      },
      {
        type: 'command',
        title: '🏠 Switch to Main Branch',
        content: 'git checkout main',
        explanation: 'Before merging, you need to go to the branch you want to merge INTO. Usually this is main (your primary branch).'
      },
      {
        type: 'command',
        title: '🔀 Merge a Feature Branch',
        content: 'git merge feature-name',
        explanation: 'This brings all the changes from "feature-name" into your current branch. Git automatically combines the histories.'
      },
      {
        type: 'command',
        title: '🗑️ Clean Up: Delete Old Branch',
        content: 'git branch -d feature-name',
        explanation: 'After merging, you can delete the feature branch since its changes are now in main. It\'s like throwing away your rough drafts after publishing the final book.'
      },
      {
        type: 'text',
        title: '⚠️ Handling Merge Conflicts (Don\'t Panic!)',
        content: 'If Git can\'t automatically merge, it will mark the conflicts in your files like this:\n\n```\n<<<<<<< HEAD\nYour current version\n=======\nThe incoming version\n>>>>>>> feature-branch\n```\n\nJust edit the file to keep what you want, remove the markers, and commit!'
      }
    ],
    practice: {
      steps: [
        {
          id: 'step1',
          challenge: '🏠 Switch back to your main branch',
          expectedCommand: 'git checkout main',
          hint: '💡 Type: git checkout main (go back to your primary timeline)',
          explanation: 'You need to be on the branch you want to merge INTO (usually main).',
          solution: 'git checkout main'
        },
        {
          id: 'step2',
          challenge: '🔀 Merge your "my-feature" branch into main',
          expectedCommand: 'git merge my-feature',
          hint: '💡 Type: git merge my-feature (combine the timelines)',
          explanation: 'This brings all changes from my-feature into your main branch.',
          solution: 'git merge my-feature'
        },
        {
          id: 'step3',
          challenge: '🗑️ Delete the "my-feature" branch (it\'s been merged)',
          expectedCommand: 'git branch -d my-feature',
          hint: '💡 Type: git branch -d my-feature (clean up the old timeline)',
          explanation: 'Since the changes are now in main, you can safely delete the feature branch.',
          solution: 'git branch -d my-feature'
        }
      ]
    }
  },
  {
    id: 'remote-repositories',
    title: 'Working with Others (GitHub & Remote Repositories)',
    description: 'Learn how to share your code and collaborate with others online',
    content: [
      {
        type: 'text',
        title: '🌐 The Birth of GitHub',
        content: 'In 2008, three developers wanted to make Git easier to use and share. They created GitHub - think of it as "Facebook for code"! Today, GitHub hosts over 200 million repositories and is owned by Microsoft. It\'s where most open-source software lives, from tiny personal projects to massive systems like Linux.'
      },
      {
        type: 'text',
        title: '☁️ What are Remote Repositories?',
        content: 'A remote repository is like having your project stored in the cloud. Instead of just existing on your computer, it lives on a server (like GitHub) where others can access it. Think of it like Google Drive, but specifically designed for code projects with full Git functionality.'
      },
      {
        type: 'text',
        title: '🤝 Why Remotes are Game-Changing',
        content: '• **Backup**: Your code is safe even if your computer breaks\n• **Collaboration**: Multiple people can work on the same project\n• **Sharing**: Easy to show your work to others\n• **Open Source**: Contribute to projects used by millions\n• **Portfolio**: Showcase your skills to potential employers'
      },
      {
        type: 'command',
        title: '🔗 Adding a Remote',
        content: 'git remote add origin https://github.com/username/repo.git',
        explanation: '"Origin" is just a nickname for your remote repository. It\'s like saving a contact in your phone - instead of typing the full URL every time, you just say "origin".'
      },
      {
        type: 'command',
        title: '📤 Pushing (Uploading) Your Code',
        content: 'git push origin main',
        explanation: 'This uploads your local commits to the remote repository. It\'s like syncing your files to Google Drive, but for your entire project history.'
      },
      {
        type: 'command',
        title: '📥 Pulling (Downloading) Updates',
        content: 'git pull origin main',
        explanation: 'This downloads any new commits from the remote repository. Essential when working with others - you stay up to date with their changes.'
      },
      {
        type: 'command',
        title: '📋 Cloning (Copying) a Repository',
        content: 'git clone https://github.com/username/repo.git',
        explanation: 'This downloads an entire repository to your computer. It\'s like downloading a complete project folder with its full history.'
      }
    ],
    practice: {
      steps: [
        {
          id: 'step1',
          challenge: '🔗 Add a remote repository called "origin"',
          expectedCommand: 'git remote add origin https://github.com/username/repo.git',
          hint: '💡 Type: git remote add origin https://github.com/username/repo.git',
          explanation: 'This links your local repository to a remote one on GitHub.',
          solution: 'git remote add origin https://github.com/username/repo.git'
        },
        {
          id: 'step2',
          challenge: '📤 Push your main branch to the remote',
          expectedCommand: 'git push origin main',
          hint: '💡 Type: git push origin main (upload your commits to GitHub)',
          explanation: 'This uploads all your local commits to the remote repository.',
          solution: 'git push origin main'
        },
        {
          id: 'step3',
          challenge: '📥 Pull the latest changes from the remote',
          expectedCommand: 'git pull origin main',
          hint: '💡 Type: git pull origin main (download any new changes)',
          explanation: 'This downloads and merges any new commits from the remote repository.',
          solution: 'git pull origin main'
        }
      ]
    }
  },
  {
    id: 'advanced-branching',
    title: 'Advanced Branching (Git Flow & Professional Workflows)',
    description: 'Learn how professional teams organize their branches',
    content: [
      {
        type: 'text',
        title: '🏢 How Big Companies Use Git',
        content: 'Companies like Google, Netflix, and Spotify use sophisticated branching strategies. The most popular is "Git Flow" - created by Vincent Driessen in 2010. It defines specific types of branches for different purposes, making large team collaboration smooth and organized.'
      },
      {
        type: 'text',
        title: '🌊 Git Flow Branch Types',
        content: '• **main/master**: Production-ready code (what users see)\n• **develop**: Integration branch for features\n• **feature/**: New features being developed\n• **release/**: Preparing for a new release\n• **hotfix/**: Emergency fixes for production bugs'
      },
      {
        type: 'text',
        title: '🔄 Pull Requests (Code Review)',
        content: 'Instead of directly merging branches, professional teams use Pull Requests (GitHub) or Merge Requests (GitLab). These let other developers review your code before it\'s merged - like having your writing proofread before publishing!'
      },
      {
        type: 'command',
        title: '🏷️ Creating Feature Branches',
        content: 'git checkout -b feature/user-authentication',
        explanation: 'Professional teams use descriptive branch names with prefixes. This makes it clear what each branch is for.'
      },
      {
        type: 'command',
        title: '🚀 Working with Upstream',
        content: 'git push -u origin feature/user-authentication',
        explanation: 'The -u flag sets up tracking between your local and remote branches. After this, you can just use "git push" without specifying the remote.'
      }
    ],
    practice: {
      steps: [
        {
          id: 'step1',
          challenge: '🏷️ Create a feature branch called "feature/login-system"',
          expectedCommand: 'git checkout -b feature/login-system',
          hint: '💡 Type: git checkout -b feature/login-system (professional naming style)',
          explanation: 'Professional teams use descriptive names with prefixes like "feature/".',
          solution: 'git checkout -b feature/login-system'
        },
        {
          id: 'step2',
          challenge: '🚀 Push the feature branch and set up tracking',
          expectedCommand: 'git push -u origin feature/login-system',
          hint: '💡 Type: git push -u origin feature/login-system (the -u sets up tracking)',
          explanation: 'The -u flag links your local branch to the remote, making future pushes easier.',
          solution: 'git push -u origin feature/login-system'
        }
      ]
    }
  },
  {
    id: 'advanced-commands',
    title: 'Advanced Git Commands (Power User Tools)',
    description: 'Master the advanced commands that professionals use daily',
    content: [
      {
        type: 'text',
        title: '🧙‍♂️ Git Stash (Your Magic Pocket)',
        content: 'Imagine you\'re working on something but suddenly need to fix an urgent bug. Git stash lets you temporarily "pocket" your current changes, work on something else, then restore your work exactly as it was. It\'s like having a magic pause button!'
      },
      {
        type: 'command',
        title: '💾 Stashing Changes',
        content: 'git stash',
        explanation: 'Saves your current work-in-progress and gives you a clean working directory. Your changes aren\'t lost - they\'re stored in Git\'s "stash".'
      },
      {
        type: 'command',
        title: '📤 Retrieving Stashed Changes',
        content: 'git stash pop',
        explanation: 'Restores your most recent stash and removes it from the stash list. Like taking something out of your pocket.'
      },
      {
        type: 'text',
        title: '🏷️ Tags (Milestone Markers)',
        content: 'Tags are like bookmarks in your project history. Companies use them to mark releases: v1.0, v2.0, etc. Unlike branches, tags never change - they permanently mark important points in your project\'s timeline.'
      },
      {
        type: 'command',
        title: '🏷️ Creating a Tag',
        content: 'git tag v1.0',
        explanation: 'Creates a tag at your current commit. It\'s like putting a sticky note on a page in your photo album.'
      },
      {
        type: 'text',
        title: '🔍 Git Diff (Spotting Changes)',
        content: 'Git diff is like having X-ray vision for your files. It shows exactly what changed between different versions, highlighting additions in green and deletions in red.'
      },
      {
        type: 'command',
        title: '🔍 Seeing Changes',
        content: 'git diff',
        explanation: 'Shows changes in your working directory that haven\'t been staged yet. Perfect for reviewing what you\'ve modified before committing.'
      }
    ],
    practice: {
      steps: [
        {
          id: 'step1',
          challenge: '💾 Stash your current changes (if any)',
          expectedCommand: 'git stash',
          hint: '💡 Type: git stash (temporarily saves your work)',
          explanation: 'This saves any uncommitted changes and gives you a clean working directory.',
          solution: 'git stash'
        },
        {
          id: 'step2',
          challenge: '📤 Restore your stashed changes',
          expectedCommand: 'git stash pop',
          hint: '💡 Type: git stash pop (brings back your saved work)',
          explanation: 'This restores your most recent stash and removes it from the stash list.',
          solution: 'git stash pop'
        },
        {
          id: 'step3',
          challenge: '🏷️ Create a tag called "v1.0" for your current commit',
          expectedCommand: 'git tag v1.0',
          hint: '💡 Type: git tag v1.0 (marks this commit as version 1.0)',
          explanation: 'This creates a permanent bookmark at your current commit.',
          solution: 'git tag v1.0'
        },
        {
          id: 'step4',
          challenge: '🔍 View any changes in your working directory',
          expectedCommand: 'git diff',
          hint: '💡 Type: git diff (shows what you\'ve changed)',
          explanation: 'This displays all modifications you\'ve made since the last commit.',
          solution: 'git diff'
        }
      ]
    }
  },
  {
    id: 'git-workflows',
    title: 'Professional Git Workflows (How Teams Actually Work)',
    description: 'Learn the workflows used by successful development teams',
    content: [
      {
        type: 'text',
        title: '🏭 The Evolution of Development Workflows',
        content: 'In the early 2000s, most teams used "trunk-based development" - everyone worked on one branch. This caused chaos! Git enabled new workflows that revolutionized software development. Today, teams choose workflows based on their size, release schedule, and collaboration style.'
      },
      {
        type: 'text',
        title: '🌊 GitHub Flow (Simple and Popular)',
        content: 'Used by GitHub, Shopify, and many startups. Perfect for teams that deploy frequently:'
      },
      {
        type: 'text', 
        content: '1. Create feature branch from main\n2. Make changes and commit regularly\n3. Open Pull Request when ready\n4. Discuss and review with team\n5. Merge when approved\n6. Deploy to production'
      },
      {
        type: 'text',
        title: '🔄 GitLab Flow (Environment-Based)',
        content: 'Adds environment branches for better control. Used by teams with staging/production environments:'
      },
      {
        type: 'text',
        content: 'Feature → Master → Pre-production → Production\n\nEach environment has its own branch, allowing for controlled releases and rollbacks.'
      },
      {
        type: 'text',
        title: '🌊 Git Flow (Complex but Thorough)',
        content: 'Created by Vincent Driessen. Used by teams with scheduled releases:'
      },
      {
        type: 'text',
        content: '• **main/master**: Production-ready releases\n• **develop**: Integration branch for features\n• **feature/**: New features being developed\n• **release/**: Preparing for next release\n• **hotfix/**: Emergency fixes for production'
      },
      {
        type: 'text',
        title: '📋 Code Review Best Practices',
        content: 'How professional teams ensure code quality:'
      },
      {
        type: 'text',
        content: '• **Small PRs**: Easier to review, faster to merge\n• **Clear descriptions**: Explain what and why you changed\n• **Test everything**: Don\'t break existing features\n• **Be respectful**: Remember, humans wrote this code\n• **Learn from feedback**: Every review makes you better'
      },
      {
        type: 'text',
        title: '🚀 Continuous Integration/Deployment (CI/CD)',
        content: 'Modern teams use automated systems for lightning-fast delivery:'
      },
      {
        type: 'text',
        content: '• Run tests on every commit automatically\n• Deploy to staging environments for testing\n• Check code quality and security\n• Deploy to production when everything passes\n\n🎯 Result: Code goes from your laptop to users in minutes, not months!'
      }
    ]
  }
];

const Tutorials: React.FC = () => {
  const [expanded, setExpanded] = useState<string | false>('what-is-git');
  const [completedLessons, setCompletedLessons] = useState<Set<string>>(new Set());
  const [practiceAnswers, setPracticeAnswers] = useState<{[key: string]: string}>({});
  const [practiceResults, setPracticeResults] = useState<{[key: string]: boolean}>({});
  const [currentSteps, setCurrentSteps] = useState<{[key: string]: number}>({});
  const [attemptCounts, setAttemptCounts] = useState<{[key: string]: number}>({});
  const [showSolutions, setShowSolutions] = useState<{[key: string]: boolean}>({});

  const handleChange = (panel: string) => (
    event: React.SyntheticEvent,
    isExpanded: boolean
  ) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handlePracticeSubmit = (lessonId: string, lesson: Lesson, stepIndex: number) => {
    if (!lesson.practice?.steps[stepIndex]) return;
    
    const stepKey = `${lessonId}-${stepIndex}`;
    const userAnswer = practiceAnswers[stepKey]?.trim().toLowerCase();
    const expectedAnswer = lesson.practice.steps[stepIndex].expectedCommand.toLowerCase();
    
    if (userAnswer === expectedAnswer) {
      setPracticeResults(prev => ({ ...prev, [stepKey]: true }));
      setAttemptCounts(prev => ({ ...prev, [stepKey]: 0 }));
      
      // Move to next step or complete lesson
      const nextStep = stepIndex + 1;
      if (nextStep < lesson.practice.steps.length) {
        setCurrentSteps(prev => ({ ...prev, [lessonId]: nextStep }));
      } else {
        // All steps completed - mark lesson as complete
        setCompletedLessons(prev => new Set([...Array.from(prev), lessonId]));
      }
    } else {
      setPracticeResults(prev => ({ ...prev, [stepKey]: false }));
      
      // Increment attempt count
      const currentAttempts = (attemptCounts[stepKey] || 0) + 1;
      setAttemptCounts(prev => ({ ...prev, [stepKey]: currentAttempts }));
      
      // Show solution after 2 wrong attempts
      if (currentAttempts >= 2) {
        setShowSolutions(prev => ({ ...prev, [stepKey]: true }));
      }
    }
  };

  const handleShowSolution = (lessonId: string, stepIndex: number) => {
    const stepKey = `${lessonId}-${stepIndex}`;
    setShowSolutions(prev => ({ ...prev, [stepKey]: true }));
  };

  const getCurrentStep = (lessonId: string): number => {
    return currentSteps[lessonId] || 0;
  };

  const getCompletedStepsCount = (lessonId: string, lesson: Lesson): number => {
    if (!lesson.practice) return 0;
    let completed = 0;
    for (let i = 0; i < lesson.practice.steps.length; i++) {
      if (practiceResults[`${lessonId}-${i}`] === true) {
        completed++;
      }
    }
    return completed;
  };

  const renderContent = (content: LessonContent) => {
    switch (content.type) {
      case 'text':
        return (
          <Box sx={{ mb: 3 }}>
            {content.title && (
              <Typography variant="h6" gutterBottom sx={{ color: '#4ECDC4' }}>
                {content.title}
              </Typography>
            )}
            <Box sx={{ 
              '& p': { margin: '8px 0' },
              '& ul': { paddingLeft: '20px', margin: '8px 0' },
              '& li': { marginBottom: '4px' }
            }}>
              {content.content.split('\n').map((line, index) => {
                if (line.trim() === '') {
                  return <br key={index} />;
                }
                
                // Handle bullet points
                if (line.trim().startsWith('•')) {
                  const bulletContent = line.trim().substring(1).trim();
                  const parts = bulletContent.split('**');
                  
                  return (
                    <Typography key={index} component="div" sx={{ 
                      display: 'flex', 
                      alignItems: 'flex-start', 
                      mb: 1,
                      ml: 2
                    }}>
                      <span style={{ marginRight: '8px', color: '#4ECDC4' }}>•</span>
                      <span>
                        {parts.map((part, partIndex) => (
                          partIndex % 2 === 1 ? (
                            <strong key={partIndex} style={{ color: '#FFE082' }}>{part}</strong>
                          ) : (
                            <span key={partIndex}>{part}</span>
                          )
                        ))}
                      </span>
                    </Typography>
                  );
                }
                
                // Handle numbered lists
                if (/^\d+\./.test(line.trim())) {
                  return (
                    <Typography key={index} component="div" sx={{ 
                      display: 'flex', 
                      alignItems: 'flex-start', 
                      mb: 1,
                      ml: 2
                    }}>
                      <span style={{ 
                        marginRight: '8px', 
                        color: '#4ECDC4',
                        fontWeight: 'bold',
                        minWidth: '20px'
                      }}>
                        {line.trim().match(/^\d+\./)?.[0]}
                      </span>
                      <span>{line.trim().replace(/^\d+\.\s*/, '')}</span>
                    </Typography>
                  );
                }
                
                // Handle arrows and special formatting
                if (line.includes('→')) {
                  return (
                    <Typography key={index} variant="body1" sx={{ 
                      textAlign: 'center',
                      fontFamily: 'monospace',
                      bgcolor: 'rgba(76, 205, 196, 0.1)',
                      p: 1,
                      borderRadius: 1,
                      my: 1
                    }}>
                      {line.trim()}
                    </Typography>
                  );
                }
                
                // Regular text with bold formatting
                const parts = line.split('**');
                return (
                  <Typography key={index} variant="body1" paragraph sx={{ mb: 1 }}>
                    {parts.map((part, partIndex) => (
                      partIndex % 2 === 1 ? (
                        <strong key={partIndex} style={{ color: '#FFE082' }}>{part}</strong>
                      ) : (
                        <span key={partIndex}>{part}</span>
                      )
                    ))}
                  </Typography>
                );
              })}
            </Box>
          </Box>
        );
      
      case 'visual':
        return (
          <Box sx={{ mb: 3 }}>
            {content.title && (
              <Typography variant="h6" gutterBottom sx={{ color: '#4ECDC4' }}>
                {content.title}
              </Typography>
            )}
            <Paper sx={{ p: 2, bgcolor: '#1e1e1e', fontFamily: 'monospace' }}>
              <pre style={{ margin: 0, color: '#fff' }}>{content.content}</pre>
            </Paper>
          </Box>
        );
      
      case 'command':
        return (
          <Box sx={{ mb: 3 }}>
            {content.title && (
              <Typography variant="h6" gutterBottom sx={{ color: '#4ECDC4' }}>
                {content.title}
              </Typography>
            )}
            <SyntaxHighlighter
              language="bash"
              style={vscDarkPlus}
              customStyle={{ margin: '8px 0' }}
            >
              {content.content}
            </SyntaxHighlighter>
            {content.explanation && (
              <Typography variant="body2" sx={{ color: 'text.secondary', mt: 1 }}>
                💡 {content.explanation}
              </Typography>
            )}
            {content.output && (
              <Box sx={{ mt: 2 }}>
                <Typography variant="body2" sx={{ color: '#4ECDC4', mb: 1 }}>
                  Output:
                </Typography>
                <SyntaxHighlighter
                  language="bash"
                  style={vscDarkPlus}
                  customStyle={{ margin: '8px 0', backgroundColor: '#0d1117' }}
                >
                  {content.output}
                </SyntaxHighlighter>
              </Box>
            )}
          </Box>
        );
      
      default:
        return null;
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Interactive Git Tutorials
        </Typography>
        <Typography variant="h6" color="text.secondary" paragraph>
          Learn Git step-by-step with hands-on practice
        </Typography>
        
        {/* Progress indicator */}
        <Box sx={{ mt: 4 }}>
          <Typography variant="body1" sx={{ mb: 2 }}>
            Progress: {completedLessons.size}/{lessons.length} lessons completed
          </Typography>
          <Box 
            sx={{ 
              width: '100%', 
              height: 8, 
              bgcolor: 'grey.300', 
              borderRadius: 4,
              overflow: 'hidden'
            }}
          >
            <Box 
              sx={{ 
                width: `${(completedLessons.size / lessons.length) * 100}%`,
                height: '100%',
                bgcolor: '#4ECDC4',
                transition: 'width 0.3s ease'
              }}
            />
          </Box>
        </Box>
      </Box>

      {lessons.map((lesson) => (
        <Accordion
          key={lesson.id}
          expanded={expanded === lesson.id}
          onChange={handleChange(lesson.id)}
          sx={{ 
            mb: 2,
            '&:before': { display: 'none' },
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            borderRadius: '8px !important',
            overflow: 'hidden'
          }}
        >
          <AccordionSummary 
            expandIcon={<ExpandMoreIcon />}
            sx={{
              bgcolor: completedLessons.has(lesson.id) ? 'rgba(76, 175, 80, 0.1)' : 'inherit',
              borderBottom: expanded === lesson.id ? '1px solid rgba(255,255,255,0.12)' : 'none'
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', gap: 2 }}>
              <Box sx={{ flexGrow: 1 }}>
                <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  {completedLessons.has(lesson.id) && (
                    <CheckCircleIcon sx={{ color: '#4CAF50', fontSize: 20 }} />
                  )}
                  {lesson.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {lesson.description}
                </Typography>
              </Box>
              <PlayArrowIcon sx={{ color: 'primary.main' }} />
            </Box>
          </AccordionSummary>
          
          <AccordionDetails sx={{ p: 4 }}>
            {lesson.content.map((content, index) => (
              <Box key={index}>
                {renderContent(content)}
              </Box>
            ))}
            
            {lesson.practice && (
              <Box sx={{ mt: 4, p: 3, bgcolor: 'rgba(76, 205, 196, 0.05)', borderRadius: 2 }}>
                <Typography variant="h6" gutterBottom sx={{ color: '#4ECDC4' }}>
                  🚀 Practice Challenge
                </Typography>
                
                {/* Step Progress Indicator */}
                <Box sx={{ mb: 3 }}>
                  <Typography variant="body2" sx={{ mb: 1, color: 'text.secondary' }}>
                    Step {getCurrentStep(lesson.id) + 1} of {lesson.practice.steps.length}
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                    {lesson.practice.steps.map((_, index) => (
                      <Box
                        key={index}
                        sx={{
                          width: 8,
                          height: 8,
                          borderRadius: '50%',
                          bgcolor: practiceResults[`${lesson.id}-${index}`] === true 
                            ? '#4CAF50' 
                            : index === getCurrentStep(lesson.id)
                            ? '#4ECDC4'
                            : 'rgba(255,255,255,0.3)',
                          transition: 'all 0.3s ease'
                        }}
                      />
                    ))}
                  </Box>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Progress: {getCompletedStepsCount(lesson.id, lesson)}/{lesson.practice.steps.length} steps completed
                  </Typography>
                </Box>
                
                {/* Practice Challenge Section */}
                <Typography variant="body1" paragraph>
                  {lesson.practice.steps[getCurrentStep(lesson.id)].challenge}
                </Typography>
                
                {/* Show explanation for current step */}
                <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2, fontStyle: 'italic' }}>
                  💡 {lesson.practice.steps[getCurrentStep(lesson.id)].explanation}
                </Typography>
                
                <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', mb: 2 }}>
                  <TextField
                    fullWidth
                    placeholder="Type your Git command here..."
                    value={practiceAnswers[`${lesson.id}-${getCurrentStep(lesson.id)}`] || ''}
                    onChange={(e) => setPracticeAnswers(prev => ({
                      ...prev,
                      [`${lesson.id}-${getCurrentStep(lesson.id)}`]: e.target.value
                    }))}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        fontFamily: 'monospace',
                      }
                    }}
                  />
                  <Button
                    variant="contained"
                    onClick={() => handlePracticeSubmit(lesson.id, lesson, getCurrentStep(lesson.id))}
                    sx={{ 
                      bgcolor: '#4ECDC4',
                      '&:hover': { bgcolor: '#26A69A' },
                      minWidth: 100
                    }}
                  >
                    {getCurrentStep(lesson.id) === lesson.practice.steps.length - 1 ? 'Complete' : 'Check'}
                  </Button>
                </Box>

                {/* Attempt counter and solution button */}
                {attemptCounts[`${lesson.id}-${getCurrentStep(lesson.id)}`] > 0 && (
                  <Box sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      Attempts: {attemptCounts[`${lesson.id}-${getCurrentStep(lesson.id)}`]}
                    </Typography>
                    {attemptCounts[`${lesson.id}-${getCurrentStep(lesson.id)}`] >= 2 && (
                      <Button
                        size="small"
                        variant="outlined"
                        onClick={() => handleShowSolution(lesson.id, getCurrentStep(lesson.id))}
                        sx={{ 
                          borderColor: '#FF9800', 
                          color: '#FF9800',
                          '&:hover': { borderColor: '#F57400', bgcolor: 'rgba(255, 152, 0, 0.1)' }
                        }}
                      >
                        Show Solution
                      </Button>
                    )}
                  </Box>
                )}

                {/* Solution display */}
                {showSolutions[`${lesson.id}-${getCurrentStep(lesson.id)}`] && (
                  <Box sx={{ mb: 2, p: 2, bgcolor: 'rgba(255, 152, 0, 0.1)', borderRadius: 1, border: '1px solid #FF9800' }}>
                    <Typography variant="body2" sx={{ color: '#FF9800', fontWeight: 'bold', mb: 1 }}>
                      💡 Solution:
                    </Typography>
                    <Typography variant="body2" sx={{ fontFamily: 'monospace', bgcolor: 'rgba(0,0,0,0.3)', p: 1, borderRadius: 1 }}>
                      {lesson.practice.steps[getCurrentStep(lesson.id)].solution}
                    </Typography>
                    <Typography variant="body2" sx={{ mt: 1, fontSize: '0.85rem', color: 'text.secondary' }}>
                      Try typing this command above and click Check!
                    </Typography>
                  </Box>
                )}
                
                {practiceResults[`${lesson.id}-${getCurrentStep(lesson.id)}`] !== undefined && (
                  <Alert 
                    severity={practiceResults[`${lesson.id}-${getCurrentStep(lesson.id)}`] ? "success" : "error"}
                    sx={{ mt: 2 }}
                  >
                    {practiceResults[`${lesson.id}-${getCurrentStep(lesson.id)}`] 
                      ? getCurrentStep(lesson.id) === lesson.practice.steps.length - 1
                        ? "🎉 Lesson completed! Excellent work!"
                        : "✅ Correct! Moving to next step..."
                      : `❌ Not quite right. Hint: ${lesson.practice.steps[getCurrentStep(lesson.id)].hint}`
                    }
                  </Alert>
                )}
                
                {/* Show all completed steps */}
                {getCompletedStepsCount(lesson.id, lesson) > 0 && (
                  <Box sx={{ mt: 3, p: 2, bgcolor: 'rgba(76, 175, 80, 0.1)', borderRadius: 1 }}>
                    <Typography variant="body2" sx={{ color: '#4CAF50', fontWeight: 'bold', mb: 1 }}>
                      ✅ Completed Steps:
                    </Typography>
                    {lesson.practice.steps.map((step, index) => (
                      practiceResults[`${lesson.id}-${index}`] === true && (
                        <Typography key={index} variant="body2" sx={{ ml: 2, mb: 0.5, fontFamily: 'monospace', fontSize: '0.85rem' }}>
                          {index + 1}. {step.expectedCommand}
                        </Typography>
                      )
                    ))}
                  </Box>
                )}
              </Box>
            )}
          </AccordionDetails>
        </Accordion>
      ))}
      
      {completedLessons.size === lessons.length && (
        <Box sx={{ textAlign: 'center', mt: 6, p: 4, bgcolor: 'rgba(76, 175, 80, 0.1)', borderRadius: 2 }}>
          <Typography variant="h4" gutterBottom sx={{ color: '#4CAF50' }}>
            🎉 Congratulations, Git Master!
          </Typography>
          <Typography variant="h6" paragraph>
            You've completed all Git tutorials from beginner to professional level!
          </Typography>
          <Typography variant="body1" paragraph>
            You now understand Git workflows used by top tech companies. Ready to become a Git ninja? Try our advanced challenges!
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', mt: 3 }}>
            <Button
              variant="contained"
              onClick={() => window.location.href = '/interactive-demo'}
              sx={{ bgcolor: '#FF9800', '&:hover': { bgcolor: '#F57400' } }}
            >
              Master the Terminal
            </Button>
            <Button
              variant="outlined"
              onClick={() => window.location.href = '/project'}
              sx={{ borderColor: '#2196F3', color: '#2196F3' }}
            >
              Build Your Own Git
            </Button>
          </Box>
        </Box>
      )}
    </Container>
  );
};

export default Tutorials; 