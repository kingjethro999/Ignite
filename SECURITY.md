# Security Policy

## Supported Versions

Use this section to tell people about which versions of your project are currently being supported with security updates.

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |
| < 1.0   | :x:                |

## Reporting a Vulnerability

We take the security of Ignite seriously. If you believe you have found a security vulnerability, please report it to us as described below.

**Please do not report security vulnerabilities through public GitHub issues.**

Instead, please report them via email to [jethrojerrybj@gmail.com](mailto:jethrojerrybj@gmail.com).

You should receive a response within 48 hours. If for some reason you do not, please follow up via email to ensure we received your original message.

Please include the requested information listed below (as much as you can provide) to help us better understand the nature and scope of the possible issue:

* Type of issue (buffer overflow, SQL injection, cross-site scripting, etc.)
* Full paths of source file(s) related to the vulnerability
* The location of the affected source code (tag/branch/commit or direct URL)
* Any special configuration required to reproduce the issue
* Step-by-step instructions to reproduce the issue
* Proof-of-concept or exploit code (if possible)
* Impact of the issue, including how an attacker might exploit it

This information will help us triage your report more quickly.

## Security Best Practices

When using Ignite in your projects, we recommend following these security best practices:

### 1. Keep Dependencies Updated
Regularly update your project dependencies to ensure you have the latest security patches:

```bash
npm audit
npm update
```

### 2. Validate Input Data
Always validate and sanitize input data in your `.ignite` files, especially when using:
- User-provided text in components
- Dynamic navigation paths
- State bindings with external data

### 3. Secure Navigation
Be cautious with dynamic navigation paths to prevent potential security issues:

```xml
<!-- Good: Static, known paths -->
<Button onPress="go('/profile')">Profile</Button>

<!-- Avoid: Dynamic paths without validation -->
<Button onPress="go(userProvidedPath)">Dynamic Link</Button>
```

### 4. Environment Variables
Use environment variables for sensitive configuration instead of hardcoding values in your `.ignite` files.

### 5. Regular Security Audits
Conduct regular security audits of your generated React Native code to ensure it follows security best practices.

## Disclosure Policy

When we receive a security bug report, we will:

1. Confirm the problem and determine the affected versions
2. Audit code to find any similar problems
3. Prepare fixes for all supported versions
4. Release new versions with the fixes
5. Publicly announce the vulnerability and the fix

## Security Updates

Security updates will be released as patch versions (e.g., 1.0.1, 1.0.2) and will be clearly marked in the changelog.

## Credits

We would like to thank all security researchers and contributors who help keep Ignite secure by responsibly reporting vulnerabilities.

## Contact

For security-related questions or concerns, please contact us at [jethrojerrybj@gmail.com](mailto:jethrojerrybj@gmail.com). 