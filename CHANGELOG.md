# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Initial project setup and structure
- Core parser for `.ignite` files
- Component generator for React Native
- Router system for navigation
- CLI commands for compilation and development
- VS Code extension for syntax highlighting

### Changed
- N/A

### Deprecated
- N/A

### Removed
- N/A

### Fixed
- N/A

### Security
- N/A

## [0.1.0] - 2024-01-XX

### Added
- Initial release of Ignite framework
- Basic DSL parser with XML-like syntax support
- Component mapping system (View, Text, Button, Input)
- Automatic state management generation
- Navigation system with tab and stack navigators
- Style integration with StyleSheet
- CLI tool with build and dev commands
- VS Code extension for `.ignite` file syntax highlighting
- File watching and hot reloading support
- TypeScript support for generated code

### Features
- Declarative syntax for React Native development
- Automatic state inference based on component types
- Built-in navigation with simple `go()` function
- Tab navigation support with custom icons and ordering
- Style reference system
- Development mode with real-time compilation

### Technical Implementation
- Parser: Character-by-character parsing with AST generation
- Generator: React Native code generation with proper imports
- Router: Automatic navigation configuration
- Compiler: File system management and build pipeline
- Watcher: Incremental compilation for development

---

## Version History

- **0.1.0**: Initial release with core DSL functionality
- **Future versions**: Will follow semantic versioning for features, fixes, and breaking changes

## Contributing to Changelog

When contributing to this project, please update this changelog with your changes. Follow the format above and include:

- **Added**: New features
- **Changed**: Changes in existing functionality
- **Deprecated**: Soon-to-be removed features
- **Removed**: Removed features
- **Fixed**: Bug fixes
- **Security**: Vulnerability fixes

Use the [Unreleased] section for changes that haven't been released yet. 