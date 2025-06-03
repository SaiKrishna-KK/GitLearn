import React, { useState, useEffect, useRef } from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
  TextField,
  Button,
  Card,
  CardContent,
  Chip,
  Tabs,
  Tab
} from '@mui/material';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface Command {
  input: string;
  output: string;
  explanation: string;
  type: 'success' | 'error' | 'info';
}

interface GitState {
  repository: boolean;
  branches: string[];
  currentBranch: string;
  stagedFiles: string[];
  workingFiles: string[];
  commits: Array<{id: string, message: string, branch: string}>;
  remotes: string[];
}

const InteractiveDemo: React.FC = () => {
  const [command, setCommand] = useState('');
  const [history, setHistory] = useState<Command[]>([]);
  const [currentDir] = useState('~/my-project');
  const [tabValue, setTabValue] = useState(0);
  const terminalRef = useRef<HTMLDivElement>(null);
  
  const [gitState, setGitState] = useState<GitState>({
    repository: false,
    branches: [],
    currentBranch: '',
    stagedFiles: [],
    workingFiles: ['README.md', 'index.js'],
    commits: [],
    remotes: []
  });

  const gitCommands = {
    'git init': {
      description: 'Initialize a new Git repository',
      category: 'Setup'
    },
    'git status': {
      description: 'Show working tree status',
      category: 'Basic'
    },
    'git add': {
      description: 'Add files to staging area',
      category: 'Basic'
    },
    'git commit': {
      description: 'Record changes to repository',
      category: 'Basic'
    },
    'git log': {
      description: 'Show commit history',
      category: 'Information'
    },
    'git branch': {
      description: 'List, create, or delete branches',
      category: 'Branching'
    },
    'git checkout': {
      description: 'Switch branches or restore files',
      category: 'Branching'
    },
    'git merge': {
      description: 'Join development histories',
      category: 'Branching'
    },
    'git remote': {
      description: 'Manage remote repositories',
      category: 'Remote'
    },
    'git push': {
      description: 'Upload changes to remote',
      category: 'Remote'
    },
    'git pull': {
      description: 'Download changes from remote',
      category: 'Remote'
    },
    'git clone': {
      description: 'Copy a repository',
      category: 'Remote'
    },
    'git diff': {
      description: 'Show changes between commits',
      category: 'Information'
    },
    'git reset': {
      description: 'Reset current HEAD to specified state',
      category: 'Advanced'
    },
    'git rebase': {
      description: 'Reapply commits on top of another base',
      category: 'Advanced'
    },
    'git stash': {
      description: 'Temporarily store changes',
      category: 'Advanced'
    },
    'git tag': {
      description: 'Create, list, delete tags',
      category: 'Advanced'
    },
    'git show': {
      description: 'Show various types of objects',
      category: 'Information'
    },
    'git config': {
      description: 'Get and set repository options',
      category: 'Setup'
    },
    'git fetch': {
      description: 'Download objects from remote',
      category: 'Remote'
    }
  };

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  const generateCommitHash = () => {
    return Math.random().toString(36).substring(2, 9);
  };

  const handleCommand = () => {
    if (!command.trim()) return;

    let output = '';
    let explanation = '';
    let type: 'success' | 'error' | 'info' = 'info';
    const newGitState = { ...gitState };

    const cmd = command.toLowerCase().trim();
    const parts = cmd.split(' ');
    const baseCmd = parts.slice(0, 2).join(' ');

    try {
      switch (baseCmd) {
        case 'git init':
          if (newGitState.repository) {
            output = 'Reinitialized existing Git repository in ~/my-project/.git/';
          } else {
            output = 'Initialized empty Git repository in ~/my-project/.git/';
            newGitState.repository = true;
            newGitState.branches = ['main'];
            newGitState.currentBranch = 'main';
          }
          explanation = 'Creates a new Git repository in the current directory.';
          type = 'success';
          break;

        case 'git status':
          if (!newGitState.repository) {
            output = 'fatal: not a git repository (or any of the parent directories): .git';
            type = 'error';
            explanation = 'You need to initialize a Git repository first with "git init".';
          } else {
            const untracked = newGitState.workingFiles.filter(f => 
              !newGitState.stagedFiles.includes(f)
            );
            
            output = `On branch ${newGitState.currentBranch}\n`;
            if (newGitState.commits.length === 0) {
              output += '\nNo commits yet\n';
            }
            
            if (newGitState.stagedFiles.length > 0) {
              output += '\nChanges to be committed:\n  (use "git reset HEAD <file>..." to unstage)\n';
              newGitState.stagedFiles.forEach(file => {
                output += `\n\tnew file:   ${file}`;
              });
            }
            
            if (untracked.length > 0) {
              output += '\n\nUntracked files:\n  (use "git add <file>..." to include in what will be committed)\n';
              untracked.forEach(file => {
                output += `\n\t${file}`;
              });
            }
            
            if (newGitState.stagedFiles.length === 0 && untracked.length === 0) {
              output += '\nnothing to commit, working tree clean';
            }
          }
          explanation = 'Shows the current state of your working directory and staging area.';
          break;

        case 'git add':
          if (!newGitState.repository) {
            output = 'fatal: not a git repository (or any of the parent directories): .git';
            type = 'error';
            explanation = 'You need to initialize a Git repository first.';
          } else {
            const fileName = parts[2];
            if (fileName === '.') {
              newGitState.stagedFiles = [...newGitState.workingFiles];
              output = '';
              explanation = 'Stages all files in the current directory for the next commit.';
              type = 'success';
            } else if (fileName && newGitState.workingFiles.includes(fileName)) {
              if (!newGitState.stagedFiles.includes(fileName)) {
                newGitState.stagedFiles.push(fileName);
              }
              output = '';
              explanation = `Stages ${fileName} for the next commit.`;
              type = 'success';
            } else if (fileName) {
              output = `fatal: pathspec '${fileName}' did not match any files`;
              type = 'error';
              explanation = 'The specified file does not exist in the working directory.';
            } else {
              output = 'Nothing specified, nothing added.\nMaybe you wanted to say \'git add .\'?';
              type = 'error';
              explanation = 'You need to specify which files to add.';
            }
          }
          break;

        case 'git commit':
          if (!newGitState.repository) {
            output = 'fatal: not a git repository (or any of the parent directories): .git';
            type = 'error';
            explanation = 'You need to initialize a Git repository first.';
          } else if (newGitState.stagedFiles.length === 0) {
            output = 'On branch main\nnothing to commit, working tree clean';
            explanation = 'There are no staged changes to commit. Use "git add" first.';
          } else {
            const messageMatch = command.match(/-m\s+"([^"]+)"/);
            const message = messageMatch ? messageMatch[1] : 'Initial commit';
            const commitHash = generateCommitHash();
            
            newGitState.commits.push({
              id: commitHash,
              message,
              branch: newGitState.currentBranch
            });
            
            const fileCount = newGitState.stagedFiles.length;
            const isFirst = newGitState.commits.length === 1;
            
            output = `[${newGitState.currentBranch}${isFirst ? ' (root-commit)' : ''} ${commitHash}] ${message}\n ${fileCount} file${fileCount !== 1 ? 's' : ''} changed`;
            
            newGitState.stagedFiles = [];
            explanation = 'Creates a new commit with the staged changes and the provided message.';
            type = 'success';
          }
          break;

        case 'git log':
          if (!newGitState.repository) {
            output = 'fatal: not a git repository (or any of the parent directories): .git';
            type = 'error';
            explanation = 'You need to initialize a Git repository first.';
          } else if (newGitState.commits.length === 0) {
            output = 'fatal: your current branch \'main\' does not have any commits yet';
            type = 'error';
            explanation = 'There are no commits to show. Make your first commit!';
          } else {
            output = newGitState.commits
              .slice()
              .reverse()
              .map(commit => 
                `commit ${commit.id}\nDate: ${new Date().toDateString()}\n\n    ${commit.message}\n`
              ).join('\n');
            explanation = 'Shows the commit history for the current branch.';
          }
          break;

        case 'git branch':
          if (!newGitState.repository) {
            output = 'fatal: not a git repository (or any of the parent directories): .git';
            type = 'error';
            explanation = 'You need to initialize a Git repository first.';
          } else {
            const branchName = parts[2];
            if (branchName) {
              if (newGitState.branches.includes(branchName)) {
                output = `fatal: A branch named '${branchName}' already exists.`;
                type = 'error';
              } else {
                newGitState.branches.push(branchName);
                output = '';
                explanation = `Creates a new branch named '${branchName}'.`;
                type = 'success';
              }
            } else {
              output = newGitState.branches
                .map(branch => 
                  branch === newGitState.currentBranch ? `* ${branch}` : `  ${branch}`
                ).join('\n');
              explanation = 'Lists all branches. The current branch is marked with an asterisk (*).';
            }
          }
          break;

        case 'git checkout':
          if (!newGitState.repository) {
            output = 'fatal: not a git repository (or any of the parent directories): .git';
            type = 'error';
            explanation = 'You need to initialize a Git repository first.';
          } else {
            const flag = parts[2];
            const branchName = parts[3] || parts[2];
            
            if (flag === '-b' && branchName) {
              if (newGitState.branches.includes(branchName)) {
                output = `fatal: A branch named '${branchName}' already exists.`;
                type = 'error';
              } else {
                newGitState.branches.push(branchName);
                newGitState.currentBranch = branchName;
                output = `Switched to a new branch '${branchName}'`;
                explanation = `Creates and switches to a new branch named '${branchName}'.`;
                type = 'success';
              }
            } else if (branchName && newGitState.branches.includes(branchName)) {
              newGitState.currentBranch = branchName;
              output = `Switched to branch '${branchName}'`;
              explanation = `Switches to the existing branch '${branchName}'.`;
              type = 'success';
            } else if (branchName) {
              output = `error: pathspec '${branchName}' did not match any file(s) known to git`;
              type = 'error';
              explanation = 'The specified branch does not exist.';
            } else {
              output = 'fatal: you must specify path(s) to restore';
              type = 'error';
              explanation = 'You need to specify a branch name to checkout.';
            }
          }
          break;

        case 'git merge':
          if (!newGitState.repository) {
            output = 'fatal: not a git repository (or any of the parent directories): .git';
            type = 'error';
            explanation = 'You need to initialize a Git repository first.';
          } else {
            const branchName = parts[2];
            if (branchName && newGitState.branches.includes(branchName)) {
              if (branchName === newGitState.currentBranch) {
                output = 'Already up to date.';
              } else {
                output = `Merge made by the 'recursive' strategy.\n 1 file changed, 1 insertion(+)`;
                explanation = `Merges the '${branchName}' branch into the current branch.`;
                type = 'success';
              }
            } else {
              output = `merge: ${branchName} - not something we can merge`;
              type = 'error';
              explanation = 'The specified branch does not exist.';
            }
          }
          break;

        case 'git diff':
          if (!newGitState.repository) {
            output = 'fatal: not a git repository (or any of the parent directories): .git';
            type = 'error';
          } else {
            output = `diff --git a/README.md b/README.md
index 83db48f..84d55c5 100644
--- a/README.md
+++ b/README.md
@@ -1,3 +1,4 @@
 # My Project
 
 This is my awesome project.
+Added a new line!`;
            explanation = 'Shows the differences between your working directory and the last commit.';
          }
          break;

        case 'git remote':
          if (!newGitState.repository) {
            output = 'fatal: not a git repository (or any of the parent directories): .git';
            type = 'error';
          } else {
            const subCommand = parts[2];
            if (subCommand === 'add') {
              const remoteName = parts[3];
              const remoteUrl = parts[4];
              if (remoteName && remoteUrl) {
                newGitState.remotes.push(remoteName);
                output = '';
                explanation = `Adds a new remote named '${remoteName}'.`;
                type = 'success';
              } else {
                output = 'usage: git remote add <name> <url>';
                type = 'error';
              }
            } else {
              output = newGitState.remotes.join('\n') || '';
              explanation = 'Lists all configured remotes.';
            }
          }
          break;

        case 'git push':
          if (!newGitState.repository) {
            output = 'fatal: not a git repository (or any of the parent directories): .git';
            type = 'error';
          } else if (newGitState.remotes.length === 0) {
            output = 'fatal: No configured push destination.';
            type = 'error';
            explanation = 'You need to add a remote repository first with "git remote add".';
          } else {
            output = `Enumerating objects: 3, done.
Counting objects: 100% (3/3), done.
Writing objects: 100% (3/3), 242 bytes | 242.00 KiB/s, done.
Total 3 (delta 0), reused 0 (delta 0)
To https://github.com/user/repo.git
 * [new branch]      main -> main`;
            explanation = 'Uploads your commits to the remote repository.';
            type = 'success';
          }
          break;

        case 'git config':
          const configKey = parts[3];
          const configValue = parts[4];
          if (parts[2] === '--global' && configKey && configValue) {
            output = '';
            explanation = `Sets the global Git configuration for ${configKey}.`;
            type = 'success';
          } else if (parts[2] === '--list') {
            output = `user.name=John Doe
user.email=john@example.com
core.editor=nano
init.defaultBranch=main`;
            explanation = 'Shows all Git configuration settings.';
          } else {
            output = 'usage: git config [--global] <key> <value>';
            type = 'error';
          }
          break;

        case 'clear':
          setHistory([]);
          setCommand('');
          return;

        case 'help':
          output = `Available Git commands:
• git init - Initialize repository
• git status - Check repository status
• git add <file> - Stage files
• git commit -m "message" - Commit changes
• git log - View commit history
• git branch [name] - List or create branches
• git checkout [-b] <branch> - Switch branches
• git merge <branch> - Merge branches
• git diff - Show changes
• git remote - Manage remotes
• git push - Upload changes
• git config - Configure Git
• clear - Clear terminal
• help - Show this help`;
          explanation = 'Shows available commands and their basic usage.';
          break;

        default:
          if (cmd.startsWith('git')) {
            output = `git: '${parts[1]}' is not a git command. See 'help'.`;
            type = 'error';
            explanation = 'Unknown Git command. Try "help" to see available commands.';
          } else {
            output = `bash: ${parts[0]}: command not found`;
            type = 'error';
            explanation = 'Command not recognized. This terminal supports Git commands.';
          }
      }
    } catch (error) {
      output = 'An error occurred while processing the command.';
      type = 'error';
      explanation = 'Something went wrong. Please try again.';
    }

    setGitState(newGitState);
    setHistory([...history, { input: command, output, explanation, type }]);
    setCommand('');
  };

  const commandCategories = {
    'Setup': ['git init', 'git config'],
    'Basic': ['git status', 'git add', 'git commit'],
    'Information': ['git log', 'git diff', 'git show'],
    'Branching': ['git branch', 'git checkout', 'git merge'],
    'Remote': ['git remote', 'git push', 'git pull', 'git clone', 'git fetch'],
    'Advanced': ['git reset', 'git rebase', 'git stash', 'git tag']
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom>
        Interactive Git Terminal
      </Typography>
      <Typography variant="h6" color="text.secondary" paragraph>
        Practice Git commands in a real terminal environment
      </Typography>

      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={tabValue} onChange={(e, newValue) => setTabValue(newValue)}>
          <Tab label="Terminal" />
          <Tab label="Repository State" />
          <Tab label="Command Reference" />
        </Tabs>
      </Box>

      {tabValue === 0 && (
        <Box 
          sx={{ 
            display: 'grid', 
            gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
            gap: 3 
          }}
        >
          <Box>
            <Paper 
              sx={{ 
                p: 3, 
                mb: 3,
                bgcolor: '#0d1117',
                border: '1px solid #30363d',
                borderRadius: 2
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Box sx={{ display: 'flex', gap: 1, mr: 2 }}>
                  <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: '#ff5f56' }} />
                  <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: '#ffbd2e' }} />
                  <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: '#27ca3f' }} />
                </Box>
                <Typography variant="body2" sx={{ color: '#8b949e', fontFamily: 'monospace' }}>
                  {currentDir}
                </Typography>
              </Box>
              
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography sx={{ color: '#4ECDC4', fontFamily: 'monospace' }}>
                  $
                </Typography>
                <TextField
                  fullWidth
                  variant="standard"
                  value={command}
                  onChange={(e) => setCommand(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleCommand()}
                  placeholder="Type a Git command..."
                  sx={{
                    '& .MuiInput-root': {
                      color: 'white',
                      fontFamily: 'monospace',
                      fontSize: '14px',
                    },
                    '& .MuiInput-root:before': { borderBottom: 'none' },
                    '& .MuiInput-root:after': { borderBottom: 'none' },
                    '& .MuiInput-root:hover:not(.Mui-disabled):before': { borderBottom: 'none' },
                  }}
                  InputProps={{
                    disableUnderline: true,
                  }}
                />
                <Button
                  variant="contained"
                  onClick={handleCommand}
                  disabled={!command.trim()}
                  sx={{ 
                    bgcolor: '#4ECDC4',
                    '&:hover': { bgcolor: '#26A69A' },
                    minWidth: 80
                  }}
                >
                  Enter
                </Button>
              </Box>
            </Paper>

            <Paper 
              ref={terminalRef}
              sx={{ 
                p: 3, 
                bgcolor: '#0d1117',
                border: '1px solid #30363d',
                borderRadius: 2,
                maxHeight: 500,
                overflowY: 'auto',
                '&::-webkit-scrollbar': {
                  width: '8px',
                },
                '&::-webkit-scrollbar-track': {
                  background: '#161b22',
                },
                '&::-webkit-scrollbar-thumb': {
                  background: '#30363d',
                  borderRadius: '4px',
                },
              }}
            >
              <Typography variant="h6" gutterBottom sx={{ color: 'white' }}>
                Command History
              </Typography>
              {history.length === 0 ? (
                <Typography sx={{ color: '#8b949e', fontStyle: 'italic' }}>
                  Start typing Git commands to see the output here...
                </Typography>
              ) : (
                history.map((cmd, index) => (
                  <Box key={index} sx={{ mb: 3 }}>
                    <Typography 
                      sx={{ 
                        color: '#4ECDC4', 
                        fontFamily: 'monospace',
                        fontSize: '14px',
                        mb: 1
                      }}
                    >
                      $ {cmd.input}
                    </Typography>
                    
                    {cmd.output && (
                      <Box sx={{ 
                        pl: 2, 
                        borderLeft: `3px solid ${
                          cmd.type === 'error' ? '#f85149' : 
                          cmd.type === 'success' ? '#3fb950' : '#58a6ff'
                        }`,
                        mb: 1
                      }}>
                        <pre style={{ 
                          margin: 0, 
                          color: cmd.type === 'error' ? '#f85149' : 'white',
                          fontFamily: 'monospace',
                          fontSize: '13px',
                          whiteSpace: 'pre-wrap',
                          wordWrap: 'break-word'
                        }}>
                          {cmd.output}
                        </pre>
                      </Box>
                    )}
                    
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        color: '#8b949e',
                        fontStyle: 'italic',
                        pl: 2
                      }}
                    >
                      💡 {cmd.explanation}
                    </Typography>
                  </Box>
                ))
              )}
            </Paper>
          </Box>

          <Box>
            <Card sx={{ mb: 3 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Quick Commands
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {['git init', 'git status', 'git add .', 'git commit -m "Initial commit"', 'git log', 'git branch', 'clear', 'help'].map((cmd) => (
                    <Chip
                      key={cmd}
                      label={cmd}
                      onClick={() => setCommand(cmd)}
                      sx={{ 
                        fontFamily: 'monospace',
                        fontSize: '12px',
                        cursor: 'pointer',
                        '&:hover': {
                          backgroundColor: 'primary.main',
                          color: 'white'
                        }
                      }}
                    />
                  ))}
                </Box>
              </CardContent>
            </Card>

            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Git Basics Cheat Sheet
                </Typography>
                <SyntaxHighlighter
                  language="bash"
                  style={vscDarkPlus}
                  customStyle={{ margin: '8px 0', fontSize: '12px' }}
                >
                  {`# Repository Setup
git init                    # Initialize repository
git config --global user.name "Name"

# Basic Workflow
git status                  # Check status
git add <file>             # Stage files
git add .                  # Stage all files
git commit -m "message"    # Commit changes
git log                    # View history

# Branching
git branch                 # List branches
git branch <name>          # Create branch
git checkout <branch>      # Switch branch
git checkout -b <branch>   # Create & switch
git merge <branch>         # Merge branch

# Remote Operations
git remote add origin <url>
git push origin main
git pull origin main`}
                </SyntaxHighlighter>
              </CardContent>
            </Card>
          </Box>
        </Box>
      )}

      {tabValue === 1 && (
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Repository State
            </Typography>
            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 2 }}>
              <Paper sx={{ p: 2 }}>
                <Typography variant="subtitle2" gutterBottom>Repository</Typography>
                <Chip 
                  label={gitState.repository ? 'Initialized' : 'Not initialized'} 
                  color={gitState.repository ? 'success' : 'error'}
                  size="small"
                />
              </Paper>
              
              <Paper sx={{ p: 2 }}>
                <Typography variant="subtitle2" gutterBottom>Current Branch</Typography>
                <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
                  {gitState.currentBranch || 'None'}
                </Typography>
              </Paper>
              
              <Paper sx={{ p: 2 }}>
                <Typography variant="subtitle2" gutterBottom>Branches</Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {gitState.branches.map(branch => (
                    <Chip 
                      key={branch}
                      label={branch}
                      size="small"
                      variant={branch === gitState.currentBranch ? 'filled' : 'outlined'}
                    />
                  ))}
                  {gitState.branches.length === 0 && (
                    <Typography variant="body2" color="text.secondary">None</Typography>
                  )}
                </Box>
              </Paper>
              
              <Paper sx={{ p: 2 }}>
                <Typography variant="subtitle2" gutterBottom>Staged Files</Typography>
                <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
                  {gitState.stagedFiles.length > 0 ? gitState.stagedFiles.join(', ') : 'None'}
                </Typography>
              </Paper>
              
              <Paper sx={{ p: 2 }}>
                <Typography variant="subtitle2" gutterBottom>Working Files</Typography>
                <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
                  {gitState.workingFiles.join(', ')}
                </Typography>
              </Paper>
              
              <Paper sx={{ p: 2 }}>
                <Typography variant="subtitle2" gutterBottom>Commits</Typography>
                <Typography variant="body2">
                  {gitState.commits.length} commit{gitState.commits.length !== 1 ? 's' : ''}
                </Typography>
              </Paper>
            </Box>
          </CardContent>
        </Card>
      )}

      {tabValue === 2 && (
        <Box>
          {Object.entries(commandCategories).map(([category, commands]) => (
            <Card key={category} sx={{ mb: 2 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom color="primary">
                  {category} Commands
                </Typography>
                <Box sx={{ display: 'grid', gap: 2 }}>
                  {commands.map(command => (
                    <Box key={command} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Chip
                        label={command}
                        onClick={() => setCommand(command)}
                        sx={{ 
                          fontFamily: 'monospace',
                          minWidth: 150,
                          cursor: 'pointer'
                        }}
                      />
                      <Typography variant="body2" color="text.secondary">
                        {gitCommands[command as keyof typeof gitCommands]?.description}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>
      )}
    </Container>
  );
};

export default InteractiveDemo; 