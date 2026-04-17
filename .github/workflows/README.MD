
---

[![🦂 ZAP Security (DAST - Zero Trust)](https://github.com/Dhruvsahu1/Educonnect-D/actions/workflows/dast.yaml/badge.svg)](https://github.com/Dhruvsahu1/Educonnect-D/actions/workflows/dast.yaml)
[![CI Pipeline 🔁 → 🔍 → 🧹 → 🧪 → 🐳 → 🦂 → 📦](https://github.com/Dhruvsahu1/Educonnect-D/actions/workflows/ci.yml/badge.svg)](https://github.com/Dhruvsahu1/Educonnect-D/actions/workflows/ci.yml)
[![OpenSSF Scorecard](https://api.securityscorecards.dev/projects/github.com/Dhruvsahu1/Educonnect-D/badge)](https://securityscorecards.dev/viewer/?uri=github.com/Dhruvsahu1/Educonnect-D)
![CodeQL](https://img.shields.io/badge/Security-CodeQL-blueviolet?logo=github)
[![SonarQube Cloud](https://github.com/Dhruvsahu1/Educonnect-D/actions/workflows/build.yaml/badge.svg)](https://github.com/Dhruvsahu1/Educonnect-D/actions/workflows/build.yaml)
![Trivy Scan](https://img.shields.io/badge/Trivy-Image%20Scan-blue?logo=aquasecurity)
![SBOM](https://img.shields.io/badge/SBOM-CycloneDX-informational)
[![InfraScan Security Audit](https://github.com/Dhruvsahu1/Educonnect-D/actions/workflows/infrascan.yaml/badge.svg)](https://github.com/Dhruvsahu1/Educonnect-D/actions/workflows/infrascan.yaml)
![Docker](https://img.shields.io/badge/Docker-Build%20%26%20Push-2496ED?logo=docker)
![DevSecOps](https://img.shields.io/badge/DevSecOps-Enabled-critical)
![Container Security](https://img.shields.io/badge/Container%20Security-Trivy-informational)
![Cloud Native](https://img.shields.io/badge/Cloud--Native-Kubernetes-326CE5?logo=kubernetes)

---

# 🦂 DevSecOps Pipeline Overview

Each stage in this pipeline is deliberately ordered.  
**Nothing moves forward unless it earns the right to.**

Every step acts as a gate — protecting downstream stages from insecure, low-quality, or unverified code.

---

## 🔐 Code Security — CodeQL (Shift-Left)

The pipeline starts with **SAST using CodeQL**.

### What happens:
- Static analysis (no execution required)
- Backend and frontend scanned independently
- Results published in GitHub Security tab

### Detects:
- SQL Injection
- XSS
- Command Injection
- Hardcoded secrets
- Unsafe deserialization
- Weak cryptography
- Path traversal

👉 **Goal:** Catch vulnerabilities early.


---
## 🕸️ Dynamic Application Security Testing (DAST) — OWASP ZAP
Validating the application at runtime:

Actively scans the running application/container to find dynamic vulnerabilities

Detects runtime flaws that static analysis (SAST) might miss

Tests for real-world exploits like improper authentication, misconfigured security headers, and runtime injections

👉 Goal: Verify the security posture from an active attacker's perspective.
---
## 🧹 Linting — Code Quality Gate

After security validation:

- Backend and frontend linted separately
- Ensures readability and consistency
- Prevents bad coding practices
- Gracefully skips if lint rules not defined

👉 Prevents long-term technical debt.

---

## 🧪 Testing — Functional Validation

Basic validation stage:

- Backend & frontend test hooks present
- Supports gradual adoption of testing

👉 Ensures system stability.

---

## 🐳 Docker Build — Immutable Artifacts

Only validated code is packaged:

- Backend & frontend images built
- Clean, reproducible environments
- Secure DockerHub authentication

👉 Produces consistent deployable artifacts.

---

## 🛡️ Container Security — Trivy Scan

Before pushing images:

- Backend and frontend images scanned
- Detects HIGH & CRITICAL vulnerabilities
- Uses cached DB for faster scans

👉 No insecure image gets pushed.

---

## 📦 SBOM Generation — Supply Chain Transparency

Generates a **CycloneDX SBOM** using Trivy.

### Benefits:
- Full dependency visibility
- Transparency in software supply chain
- Useful for audits & compliance

---

## 🚀 Image Distribution

After passing all checks:

- Images pushed to Docker Hub
- Ready for deployment

---
🏗️ Infrastructure Security & Cost Audit — InfraScan
Before any infrastructure is modified, we validate the underlying architecture.

What happens:
Scans Infrastructure as Code (IaC) manifests and templates

Performs a comprehensive cost audit to prevent budget overruns

Validates configurations against security best practices

👉 Goal: Ensure the foundation we deploy on is secure, compliant, and cost-effective.

---

## 🧠 Why This Pipeline Matters

This reflects **real DevSecOps practices**:

- Security-first (Shift Left)
- Quality gates enforced
- Infrastructure and Cost Auditing (IaC)
- Container vulnerability scanning
- SBOM generation
- Runtime validation (DAST)
- Modular, production-style pipeline

---

## 🔮 Future Enhancements

- ☁️ Kubernetes auto-deployment (GKE / EKS / K3S ) using ArgoCD
- 🏷️ Image Versioning with Git SHA
- 🏷️ Versioned Docker tagging (replace `latest`)
- ❌ Fail builds on critical vulnerabilities



---

## ⚡ Summary

This pipeline ensures:

✔ Secure code

✔ Secure and cost-effective infrastructure

✔ Clean code

✔ Tested code

✔ Safe container images

✔ Transparent dependencies

✔ Validated runtime security


---
**CI is not just automation — it’s trust, enforced at every commit.**
