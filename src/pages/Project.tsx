import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
  Stepper,
  Step,
  StepLabel,
  Button,
  Card,
  CardContent,
  Chip,
  Alert
} from '@mui/material';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

const steps = [
  'Setup & Repository Core',
  'Object Storage System',
  'Staging & Commits',
  'Branching & Merging',
  'CLI Interface'
];

const Project: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());

  const handleNext = () => {
    setCompletedSteps(prev => new Set([...Array.from(prev), activeStep]));
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return {
          title: 'Setup & Repository Core',
          description: 'Create the foundation of our Git-like version control system',
          objectives: [
            'Set up project structure',
            'Create repository initialization',
            'Implement basic file system operations',
            'Add configuration management'
          ],
          code: `# mygit/core/repository.py
import os
import json
from pathlib import Path
from typing import Dict, Optional

class Repository:
    """Core repository class for our version control system"""
    
    def __init__(self, path: str = "."):
        self.path = Path(path).resolve()
        self.git_dir = self.path / ".mygit"
        self.objects_dir = self.git_dir / "objects"
        self.refs_dir = self.git_dir / "refs"
        self.heads_dir = self.refs_dir / "heads"
        self.config_file = self.git_dir / "config"
        self.head_file = self.git_dir / "HEAD"
        
    def init(self) -> bool:
        """Initialize a new repository"""
        try:
            # Create directory structure
            self.git_dir.mkdir(exist_ok=True)
            self.objects_dir.mkdir(exist_ok=True)
            self.refs_dir.mkdir(exist_ok=True)
            self.heads_dir.mkdir(exist_ok=True)
            
            # Create initial HEAD pointing to main branch
            with open(self.head_file, 'w') as f:
                f.write("ref: refs/heads/main\\n")
                
            # Create config file
            config = {
                "core": {
                    "repositoryformatversion": 0,
                    "filemode": True,
                    "bare": False
                }
            }
            with open(self.config_file, 'w') as f:
                json.dump(config, f, indent=2)
                
            print(f"Initialized empty MyGit repository in {self.git_dir}")
            return True
            
        except Exception as e:
            print(f"Error initializing repository: {e}")
            return False
    
    def is_repository(self) -> bool:
        """Check if current directory is a repository"""
        return self.git_dir.exists() and self.git_dir.is_dir()`,
          explanation: 'This module creates the basic repository structure similar to Git\'s .git directory. We initialize the core directories and files needed for version control.',
          files: ['mygit/core/repository.py', 'mygit/core/__init__.py']
        };
      case 1:
        return {
          title: 'Object Storage System',
          description: 'Implement Git\'s object storage using SHA-1 hashing',
          objectives: [
            'Create object storage with SHA-1 hashing',
            'Implement blob objects for files',
            'Add tree objects for directories',
            'Create object compression'
          ],
          code: `# mygit/objects/storage.py
import hashlib
import zlib
import os
from pathlib import Path
from typing import Tuple, Optional

class ObjectStorage:
    """Handles object storage using SHA-1 hashing like Git"""
    
    def __init__(self, objects_dir: Path):
        self.objects_dir = objects_dir
        
    def hash_object(self, data: bytes, obj_type: str = "blob") -> str:
        """Create SHA-1 hash for object data"""
        # Git format: "type size\\0content"
        header = f"{obj_type} {len(data)}\\0".encode()
        full_data = header + data
        
        # Generate SHA-1 hash
        sha1 = hashlib.sha1(full_data).hexdigest()
        return sha1
    
    def store_object(self, data: bytes, obj_type: str = "blob") -> str:
        """Store object in the objects directory"""
        sha1 = self.hash_object(data, obj_type)
        
        # Create directory structure (first 2 chars as directory)
        obj_dir = self.objects_dir / sha1[:2]
        obj_dir.mkdir(exist_ok=True)
        
        obj_path = obj_dir / sha1[2:]
        
        # Compress and store the object
        header = f"{obj_type} {len(data)}\\0".encode()
        full_data = header + data
        compressed_data = zlib.compress(full_data)
        
        with open(obj_path, 'wb') as f:
            f.write(compressed_data)
            
        return sha1
    
    def read_object(self, sha1: str) -> Tuple[str, bytes]:
        """Read object from storage"""
        obj_path = self.objects_dir / sha1[:2] / sha1[2:]
        
        if not obj_path.exists():
            raise FileNotFoundError(f"Object {sha1} not found")
            
        with open(obj_path, 'rb') as f:
            compressed_data = f.read()
            
        # Decompress data
        data = zlib.decompress(compressed_data)
        
        # Parse header
        header_end = data.find(b'\\0')
        header = data[:header_end].decode()
        content = data[header_end + 1:]
        
        obj_type, size = header.split(' ')
        return obj_type, content
    
    def store_file(self, file_path: Path) -> str:
        """Store a file as a blob object"""
        with open(file_path, 'rb') as f:
            content = f.read()
        return self.store_object(content, "blob")`,
          explanation: 'This implements Git\'s object storage system using SHA-1 hashing and zlib compression. Objects are stored in a directory structure based on their hash.',
          files: ['mygit/objects/storage.py', 'mygit/objects/blob.py', 'mygit/objects/tree.py']
        };
      case 2:
        return {
          title: 'Staging & Commits',
          description: 'Build the staging area and commit functionality',
          objectives: [
            'Create staging area (index)',
            'Implement file tracking',
            'Build commit objects',
            'Add commit history management'
          ],
          code: `# mygit/core/staging.py
import json
import time
from pathlib import Path
from typing import Dict, List, Optional
from ..objects.storage import ObjectStorage

class StagingArea:
    """Manages the staging area (index) for commits"""
    
    def __init__(self, repo_path: Path):
        self.repo_path = repo_path
        self.index_file = repo_path / ".mygit" / "index"
        self.storage = ObjectStorage(repo_path / ".mygit" / "objects")
        
    def add_file(self, file_path: str) -> bool:
        """Add file to staging area"""
        full_path = self.repo_path / file_path
        
        if not full_path.exists():
            print(f"File {file_path} does not exist")
            return False
            
        # Store file as blob object
        blob_hash = self.storage.store_file(full_path)
        
        # Update index
        index = self.read_index()
        index[file_path] = {
            "hash": blob_hash,
            "mode": "100644",  # Regular file
            "size": full_path.stat().st_size
        }
        self.write_index(index)
        
        print(f"Added {file_path} to staging area")
        return True
    
    def read_index(self) -> Dict:
        """Read current index"""
        if not self.index_file.exists():
            return {}
            
        with open(self.index_file, 'r') as f:
            return json.load(f)
    
    def write_index(self, index: Dict) -> None:
        """Write index to file"""
        with open(self.index_file, 'w') as f:
            json.dump(index, f, indent=2)
    
    def create_commit(self, message: str, author: str) -> str:
        """Create a commit from staged files"""
        index = self.read_index()
        
        if not index:
            print("No changes staged for commit")
            return ""
            
        # Create tree object from index
        tree_hash = self.create_tree_object(index)
        
        # Get parent commit
        parent = self.get_current_commit()
        
        # Create commit object
        commit_data = {
            "tree": tree_hash,
            "parent": parent,
            "author": author,
            "timestamp": int(time.time()),
            "message": message
        }
        
        commit_content = self.serialize_commit(commit_data)
        commit_hash = self.storage.store_object(commit_content.encode(), "commit")
        
        # Update HEAD
        self.update_head(commit_hash)
        
        # Clear staging area
        self.write_index({})
        
        print(f"Created commit {commit_hash[:7]}: {message}")
        return commit_hash
    
    def create_tree_object(self, index: Dict) -> str:
        """Create tree object from index"""
        tree_entries = []
        for file_path, info in index.items():
            tree_entries.append(f"{info['mode']} {file_path}\\0{info['hash']}")
        
        tree_content = "\\n".join(tree_entries)
        return self.storage.store_object(tree_content.encode(), "tree")`,
          explanation: 'This module implements the staging area and commit functionality. Files are staged, then committed as tree and commit objects with proper metadata.',
          files: ['mygit/core/staging.py', 'mygit/core/commit.py']
        };
      case 3:
        return {
          title: 'Branching & Merging',
          description: 'Implement Git-style branching and merging',
          objectives: [
            'Create branch management',
            'Implement branch switching',
            'Add merge functionality',
            'Handle merge conflicts'
          ],
          code: `# mygit/core/branches.py
from pathlib import Path
from typing import List, Optional, Dict
import json

class BranchManager:
    """Manages branches and merging operations"""
    
    def __init__(self, repo_path: Path):
        self.repo_path = repo_path
        self.git_dir = repo_path / ".mygit"
        self.heads_dir = self.git_dir / "refs" / "heads"
        self.head_file = self.git_dir / "HEAD"
        
    def create_branch(self, branch_name: str) -> bool:
        """Create a new branch"""
        branch_file = self.heads_dir / branch_name
        
        if branch_file.exists():
            print(f"Branch {branch_name} already exists")
            return False
            
        # Get current commit hash
        current_commit = self.get_current_commit()
        if not current_commit:
            print("No commits yet, cannot create branch")
            return False
            
        # Create branch file pointing to current commit
        with open(branch_file, 'w') as f:
            f.write(current_commit)
            
        print(f"Created branch {branch_name}")
        return True
    
    def switch_branch(self, branch_name: str) -> bool:
        """Switch to a different branch"""
        branch_file = self.heads_dir / branch_name
        
        if not branch_file.exists():
            print(f"Branch {branch_name} does not exist")
            return False
            
        # Update HEAD to point to new branch
        with open(self.head_file, 'w') as f:
            f.write(f"ref: refs/heads/{branch_name}\\n")
            
        print(f"Switched to branch {branch_name}")
        return True
    
    def list_branches(self) -> List[str]:
        """List all branches"""
        branches = []
        current_branch = self.get_current_branch()
        
        for branch_file in self.heads_dir.glob("*"):
            branch_name = branch_file.name
            if branch_name == current_branch:
                branches.append(f"* {branch_name}")
            else:
                branches.append(f"  {branch_name}")
                
        return branches
    
    def merge_branch(self, source_branch: str) -> bool:
        """Merge source branch into current branch"""
        source_file = self.heads_dir / source_branch
        
        if not source_file.exists():
            print(f"Branch {source_branch} does not exist")
            return False
            
        current_commit = self.get_current_commit()
        with open(source_file, 'r') as f:
            source_commit = f.read().strip()
            
        if current_commit == source_commit:
            print("Already up to date")
            return True
            
        # Simple fast-forward merge
        current_branch = self.get_current_branch()
        current_file = self.heads_dir / current_branch
        
        with open(current_file, 'w') as f:
            f.write(source_commit)
            
        print(f"Merged {source_branch} into {current_branch}")
        return True
    
    def get_current_branch(self) -> Optional[str]:
        """Get current branch name"""
        if not self.head_file.exists():
            return None
            
        with open(self.head_file, 'r') as f:
            head_content = f.read().strip()
            
        if head_content.startswith("ref: refs/heads/"):
            return head_content[16:]  # Remove "ref: refs/heads/"
            
        return None  # Detached HEAD
    
    def get_current_commit(self) -> Optional[str]:
        """Get current commit hash"""
        current_branch = self.get_current_branch()
        if not current_branch:
            return None
            
        branch_file = self.heads_dir / current_branch
        if not branch_file.exists():
            return None
            
        with open(branch_file, 'r') as f:
            return f.read().strip()`,
          explanation: 'This module handles branch creation, switching, and merging. It maintains branch references and implements fast-forward merging.',
          files: ['mygit/core/branches.py', 'mygit/core/merge.py']
        };
      case 4:
        return {
          title: 'CLI Interface',
          description: 'Build a complete command-line interface',
          objectives: [
            'Create main CLI application',
            'Implement all Git commands',
            'Add help and documentation',
            'Handle errors gracefully'
          ],
          code: `# mygit/cli.py
import argparse
import sys
from pathlib import Path
from .core.repository import Repository
from .core.staging import StagingArea
from .core.branches import BranchManager

class MyGitCLI:
    """Command-line interface for MyGit"""
    
    def __init__(self):
        self.repo = Repository()
        self.staging = StagingArea(self.repo.path)
        self.branches = BranchManager(self.repo.path)
        
    def init(self, args):
        """Initialize a new repository"""
        success = self.repo.init()
        if success:
            return 0
        return 1
    
    def add(self, args):
        """Add files to staging area"""
        if not self.repo.is_repository():
            print("Not a MyGit repository")
            return 1
            
        for file_path in args.files:
            self.staging.add_file(file_path)
        return 0
    
    def commit(self, args):
        """Create a commit"""
        if not self.repo.is_repository():
            print("Not a MyGit repository")
            return 1
            
        if not args.message:
            print("Commit message required")
            return 1
            
        author = "MyGit User <user@example.com>"  # Simplified
        commit_hash = self.staging.create_commit(args.message, author)
        
        if commit_hash:
            return 0
        return 1
    
    def branch(self, args):
        """Manage branches"""
        if not self.repo.is_repository():
            print("Not a MyGit repository")
            return 1
            
        if args.branch_name:
            self.branches.create_branch(args.branch_name)
        else:
            branches = self.branches.list_branches()
            for branch in branches:
                print(branch)
        return 0
    
    def checkout(self, args):
        """Switch branches"""
        if not self.repo.is_repository():
            print("Not a MyGit repository")
            return 1
            
        self.branches.switch_branch(args.branch_name)
        return 0
    
    def status(self, args):
        """Show repository status"""
        if not self.repo.is_repository():
            print("Not a MyGit repository")
            return 1
            
        current_branch = self.branches.get_current_branch()
        print(f"On branch {current_branch or 'HEAD'}")
        
        index = self.staging.read_index()
        if index:
            print("\\nChanges to be committed:")
            for file_path in index:
                print(f"  new file: {file_path}")
        else:
            print("\\nNothing to commit, working tree clean")
        
        return 0

def main():
    """Main entry point"""
    parser = argparse.ArgumentParser(description='MyGit - A simple version control system')
    subparsers = parser.add_subparsers(dest='command', help='Available commands')
    
    # Init command
    init_parser = subparsers.add_parser('init', help='Initialize repository')
    
    # Add command
    add_parser = subparsers.add_parser('add', help='Add files to staging area')
    add_parser.add_argument('files', nargs='+', help='Files to add')
    
    # Commit command
    commit_parser = subparsers.add_parser('commit', help='Create commit')
    commit_parser.add_argument('-m', '--message', required=True, help='Commit message')
    
    # Branch command
    branch_parser = subparsers.add_parser('branch', help='Manage branches')
    branch_parser.add_argument('branch_name', nargs='?', help='Branch name to create')
    
    # Checkout command
    checkout_parser = subparsers.add_parser('checkout', help='Switch branches')
    checkout_parser.add_argument('branch_name', help='Branch to switch to')
    
    # Status command
    status_parser = subparsers.add_parser('status', help='Show status')
    
    args = parser.parse_args()
    
    if not args.command:
        parser.print_help()
        return 1
    
    cli = MyGitCLI()
    
    # Route to appropriate command
    command_map = {
        'init': cli.init,
        'add': cli.add,
        'commit': cli.commit,
        'branch': cli.branch,
        'checkout': cli.checkout,
        'status': cli.status
    }
    
    if args.command in command_map:
        return command_map[args.command](args)
    else:
        print(f"Unknown command: {args.command}")
        return 1

if __name__ == '__main__':
    sys.exit(main())`,
          explanation: 'This creates a complete CLI interface that ties together all the modules. Users can run commands like "python -m mygit init" to use the version control system.',
          files: ['mygit/cli.py', 'mygit/__main__.py', 'setup.py', 'README.md']
        };
      default:
        return {
          title: '',
          description: '',
          objectives: [],
          code: '',
          explanation: '',
          files: []
        };
    }
  };

  const currentStep = getStepContent(activeStep);

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Build Your Own Git in Python
        </Typography>
        <Typography variant="h6" color="text.secondary" paragraph>
          Learn Git internals by implementing a complete version control system
        </Typography>
        
        <Alert severity="info" sx={{ mt: 3, textAlign: 'left' }}>
          <Typography variant="h6" gutterBottom>🎯 Project Overview</Typography>
          <Typography variant="body2">
            You'll build a fully functional version control system called "MyGit" that implements core Git features:
            object storage with SHA-1 hashing, staging area, commits, branching, and a CLI interface.
            By the end, you'll understand exactly how Git works under the hood!
          </Typography>
        </Alert>
      </Box>

      <Paper sx={{ p: 3, mb: 4 }}>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label, index) => (
            <Step key={label} completed={completedSteps.has(index)}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Paper>

      <Box 
        sx={{ 
          display: 'grid', 
          gridTemplateColumns: { xs: '1fr', lg: '1fr 1fr' },
          gap: 3 
        }}
      >
        <Card>
          <CardContent>
            <Typography variant="h5" component="h2" gutterBottom>
              {currentStep.title}
            </Typography>
            <Typography variant="body1" paragraph>
              {currentStep.description}
            </Typography>
            
            {currentStep.objectives && (
              <Box sx={{ mb: 3 }}>
                <Typography variant="h6" gutterBottom>
                  🎯 Objectives
                </Typography>
                {currentStep.objectives.map((objective, index) => (
                  <Typography key={index} variant="body2" sx={{ ml: 2, mb: 1 }}>
                    • {objective}
                  </Typography>
                ))}
              </Box>
            )}
            
            <Typography variant="body2" paragraph sx={{ fontStyle: 'italic' }}>
              {currentStep.explanation}
            </Typography>
            
            {currentStep.files && (
              <Box sx={{ mb: 3 }}>
                <Typography variant="h6" gutterBottom>
                  📁 Files to Create
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {currentStep.files.map((file) => (
                    <Chip 
                      key={file}
                      label={file}
                      size="small"
                      variant="outlined"
                      sx={{ fontFamily: 'monospace' }}
                    />
                  ))}
                </Box>
              </Box>
            )}
            
            <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
              <Button 
                onClick={handleBack} 
                disabled={activeStep === 0}
                variant="outlined"
              >
                Previous
              </Button>
              <Button 
                onClick={handleNext} 
                disabled={activeStep === steps.length - 1}
                variant="contained"
                sx={{ 
                  bgcolor: '#4ECDC4',
                  '&:hover': { bgcolor: '#26A69A' }
                }}
              >
                {activeStep === steps.length - 1 ? 'Complete' : 'Next Step'}
              </Button>
            </Box>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              💻 Implementation Code
            </Typography>
            <SyntaxHighlighter
              language="python"
              style={vscDarkPlus}
              customStyle={{ 
                margin: 0, 
                fontSize: '12px',
                maxHeight: '600px',
                overflow: 'auto'
              }}
            >
              {currentStep.code}
            </SyntaxHighlighter>
          </CardContent>
        </Card>
      </Box>
      
      {activeStep === steps.length - 1 && (
        <Alert severity="success" sx={{ mt: 4 }}>
          <Typography variant="h6" gutterBottom>🎉 Congratulations!</Typography>
          <Typography variant="body2">
            You've built a complete version control system! You now understand Git's internals including:
            object storage, SHA-1 hashing, staging areas, commits, branches, and merging.
            Try extending your MyGit with additional features like remote repositories, tags, or a web interface!
          </Typography>
        </Alert>
      )}
    </Container>
  );
};

export default Project; 