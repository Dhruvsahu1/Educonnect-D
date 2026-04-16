
---
[![OpenSSF Scorecard](https://api.securityscorecards.dev/projects/github.com/Dhruvsahu1/Educonnect-D/badge)](https://securityscorecards.dev/viewer/?uri=github.com/Dhruvsahu1/Educonnect-D)
![CI](https://img.shields.io/github/actions/workflow/status/Dhruvsahu1/Educonnect-D/ci.yml?label=CI%20Pipeline)
![CodeQL](https://img.shields.io/badge/Security-CodeQL-blueviolet?logo=github)
[![SonarQube Cloud](https://github.com/Dhruvsahu1/Educonnect-D/actions/workflows/build.yaml/badge.svg)](https://github.com/Dhruvsahu1/Educonnect-D/actions/workflows/build.yaml)
![Trivy Scan](https://img.shields.io/badge/Trivy-Image%20Scan-blue?logo=aquasecurity)
![SBOM](https://img.shields.io/badge/SBOM-CycloneDX-informational)
![Docker](https://img.shields.io/badge/Docker-Build%20%26%20Push-2496ED?logo=docker)
![Node.js](https://img.shields.io/badge/Node.js-18.x-339933?logo=node.js)
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

## 🧠 Why This Pipeline Matters

This reflects **real DevSecOps practices**:

- Security-first (Shift Left)
- Quality gates enforced
- Container vulnerability scanning
- SBOM generation
- Modular, production-style pipeline

---

## 🔮 Future Enhancements

- ☁️ Kubernetes auto-deployment (GKE / EKS / K3S ) using ArgoCD
- 🏷️ Image Versioning with Git SHA
- 🏷️ Versioned Docker tagging (replace `latest`)
- ❌ Fail builds on critical vulnerabilities
- 🔍 Secrets scanning (GitLeaks)


---

## ⚡ Summary

This pipeline ensures:

✔ Secure code  
✔ Clean code  
✔ Tested code  
✔ Safe container images  
✔ Transparent dependencies  



---
**CI is not just automation — it’s trust, enforced at every commit.**
