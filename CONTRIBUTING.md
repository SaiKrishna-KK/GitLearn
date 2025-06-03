# Contributing to GitLearn 🚀

Thank you for your interest in contributing to GitLearn! This project aims to make Git and GitHub learning accessible to everyone, and we welcome contributions from developers of all skill levels.

## 🎯 How You Can Contribute

### 🐛 **Bug Reports**
- Found a bug? Please create an issue with:
  - Clear description of the problem
  - Steps to reproduce
  - Expected vs actual behavior
  - Your environment (OS, browser, Node.js version)

### ✨ **Feature Requests**
- Have an idea for improvement? We'd love to hear it!
- Create an issue with the "enhancement" label
- Describe the feature and why it would be valuable

### 📚 **Content Contributions**
- Add new Git commands to the terminal simulator
- Create additional practice challenges
- Improve existing tutorial content
- Add more real-world examples

### 🎨 **UI/UX Improvements**
- Enhance the visual design
- Improve mobile responsiveness
- Add animations and micro-interactions
- Optimize accessibility

## 🛠️ Development Setup

### Prerequisites
- Node.js 16 or higher
- npm or yarn
- Git (obviously! 😄)

### Getting Started

1. **Fork the repository** on GitHub

2. **Clone your fork**
```bash
git clone https://github.com/SaiKrishna-KK/git-learn.git
cd git-learn
```

3. **Add upstream remote**
```bash
git remote add upstream https://github.com/SaiKrishna-KK/git-learn.git
```

4. **Install dependencies**
```bash
npm install
```

5. **Start development server**
```bash
npm start
```

6. **Open http://localhost:3000** and start coding!

## 📝 Development Guidelines

### Code Style
- Use TypeScript for all new code
- Follow existing naming conventions
- Add comments for complex logic
- Use functional components with hooks
- Keep components small and focused

### Commit Messages
Follow conventional commit format:
```
type(scope): description

feat(tutorials): add advanced branching lesson
fix(terminal): resolve command parsing issue
docs(readme): update installation instructions
style(ui): improve button hover effects
```

### Branch Naming
- `feature/description` - New features
- `fix/description` - Bug fixes
- `docs/description` - Documentation updates
- `style/description` - UI/styling changes

## 🧪 Testing

### Running Tests
```bash
npm test           # Run test suite
npm test:watch     # Run tests in watch mode
npm test:coverage  # Generate coverage report
```

### Adding Tests
- Add unit tests for new utility functions
- Test React components with React Testing Library
- Ensure practice challenges work correctly
- Test edge cases and error conditions

## 📁 Project Structure

```
git-learn/
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── Navbar.tsx     # Navigation component
│   │   └── ...
│   ├── pages/             # Main application pages
│   │   ├── Home.tsx       # Landing page
│   │   ├── Tutorials.tsx  # Tutorial lessons
│   │   ├── InteractiveDemo.tsx  # Terminal simulator
│   │   └── Project.tsx    # Python project guide
│   ├── hooks/             # Custom React hooks
│   ├── types/             # TypeScript type definitions
│   └── utils/             # Utility functions
├── public/                # Static assets
└── docs/                  # Additional documentation
```

## 🎨 Styling Guidelines

### Theme System
- Use Material-UI theme for consistency
- Follow the purple-to-pink gradient color scheme
- Maintain glassmorphism effects where appropriate
- Ensure dark theme compatibility

### Responsive Design
- Mobile-first approach
- Test on multiple screen sizes
- Use Material-UI breakpoints
- Ensure touch-friendly interactions

## 🔄 Pull Request Process

### Before Submitting
1. **Update from upstream**
```bash
git fetch upstream
git checkout main
git merge upstream/main
```

2. **Create feature branch**
```bash
git checkout -b feature/amazing-new-feature
```

3. **Make your changes**
- Write clean, documented code
- Add tests if applicable
- Update documentation

4. **Test thoroughly**
```bash
npm test
npm run build  # Ensure production build works
```

5. **Commit and push**
```bash
git add .
git commit -m "feat: add amazing new feature"
git push origin feature/amazing-new-feature
```

### Pull Request Checklist
- [ ] Code follows project style guidelines
- [ ] Tests pass and coverage is maintained
- [ ] Documentation is updated
- [ ] Changes are backward compatible
- [ ] Commit messages follow convention
- [ ] Pull request description is clear

### PR Template
```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] Style/UI improvement

## Testing
- [ ] Tests pass locally
- [ ] Tested on multiple browsers
- [ ] Mobile responsiveness checked

## Screenshots (if applicable)
[Add screenshots of UI changes]
```

## 🏷️ Issue Labels

- `good first issue` - Perfect for newcomers
- `help wanted` - We need community help
- `bug` - Something isn't working
- `enhancement` - New feature request
- `documentation` - Documentation improvements
- `ui/ux` - User interface improvements
- `tutorial-content` - Educational content updates

## 🎉 Recognition

Contributors will be:
- Added to the README contributors section
- Mentioned in release notes
- Invited to be project maintainers (for significant contributions)

## 📞 Getting Help

- **GitHub Issues**: For bugs and feature requests
- **Discussions**: For questions and ideas
- **Discord**: [Join our community](discord-link) (if available)

## 📜 Code of Conduct

### Our Pledge
We pledge to make participation in our project a harassment-free experience for everyone, regardless of age, body size, disability, ethnicity, gender identity and expression, level of experience, nationality, personal appearance, race, religion, or sexual identity and orientation.

### Our Standards
- Be respectful and inclusive
- Welcome newcomers and help them learn
- Focus on what's best for the community
- Show empathy towards other community members

Thank you for contributing to GitLearn! Together, we're making Git learning accessible to everyone. 🌟 