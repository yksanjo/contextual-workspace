# Contributing to Contextual Workspace

Thank you for your interest in contributing to Contextual Workspace! This document provides guidelines and instructions for contributing.

## 🎯 Code of Conduct

Please be respectful and considerate of others when contributing to this project.

## 🚀 Getting Started

### Development Setup
1. Fork the repository
2. Clone your fork: `git clone https://github.com/YOUR_USERNAME/contextual-workspace.git`
3. Install dependencies: `npm install`
4. Set up environment variables: `cp .env.local.example .env.local`
5. Set up database: `npx prisma db push`
6. Seed database: `npm run db:seed`
7. Start development server: `npm run dev`

### Branch Strategy
- `main` - Production-ready code
- `develop` - Development branch (if using Git Flow)
- Feature branches: `feature/description`
- Bug fixes: `fix/description`
- Documentation: `docs/description`

## 📝 Pull Request Process

1. **Create a Feature Branch**: Branch from `main`
2. **Make Your Changes**: Follow coding standards
3. **Write Tests**: Add tests for new functionality
4. **Update Documentation**: Update README or docs as needed
5. **Run Tests**: Ensure all tests pass
6. **Submit PR**: Use the PR template

### PR Checklist
- [ ] Tests pass
- [ ] Code follows style guidelines
- [ ] Documentation updated
- [ ] No console logs in production code
- [ ] Commit messages follow convention

## 🏗️ Development Guidelines

### Code Style
- Use TypeScript strict mode
- Follow ESLint rules
- Use Prettier for formatting
- Write meaningful commit messages

### Commit Message Convention
```
type(scope): description

[optional body]

[optional footer]
```

Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `style`: Formatting
- `refactor`: Code restructuring
- `test`: Adding tests
- `chore`: Maintenance

### Testing
- Write unit tests for utilities
- Write component tests for UI
- Aim for >70% code coverage
- Test edge cases and error states

### Database Changes
1. Create migration: `npx prisma migrate dev --name description`
2. Update seed data if needed
3. Test migration rollback

## 🐛 Reporting Issues

### Bug Reports
1. Use the issue template
2. Describe the bug clearly
3. Include steps to reproduce
4. Add screenshots if applicable
5. Mention environment details

### Feature Requests
1. Describe the feature
2. Explain the use case
3. Suggest implementation approach
4. Consider alternatives

## 📚 Documentation

### Updating Documentation
- Keep README.md up to date
- Document new environment variables
- Update API documentation
- Add code comments for complex logic

### Writing Documentation
- Use clear, concise language
- Include code examples
- Document edge cases
- Keep it up to date

## 🔧 Technical Decisions

### Architecture Decisions
Major architectural changes should be discussed in an issue before implementation.

### Dependency Updates
- Keep dependencies updated
- Test thoroughly after updates
- Consider breaking changes
- Update lock files

## 🚢 Release Process

### Versioning
We use [Semantic Versioning](https://semver.org/):
- MAJOR: Breaking changes
- MINOR: New features (backwards compatible)
- PATCH: Bug fixes

### Release Checklist
- [ ] All tests pass
- [ ] Documentation updated
- [ ] Changelog updated
- [ ] Version bumped
- [ ] Tag created
- [ ] Release notes written

## 🤝 Community

### Getting Help
- Check existing issues and PRs
- Read documentation
- Ask in discussions
- Be patient and respectful

### Recognition
Contributors will be recognized in:
- README.md contributors section
- Release notes
- Project documentation

## 📄 License

By contributing, you agree that your contributions will be licensed under the project's MIT License.

---

Thank you for contributing to Contextual Workspace! 🎉