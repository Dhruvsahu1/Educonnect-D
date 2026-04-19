
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

<img width="924" height="467" alt="linting-codeql" src="https://github.com/user-attachments/assets/b163aec4-ec08-43d1-b028-ae7686d81bef" />

👉 **Goal:** Catch vulnerabilities early.


---
## 🕸️ Dynamic Application Security Testing (DAST) — OWASP ZAP
Validating the application at runtime:

Actively scans the running application/container to find dynamic vulnerabilities

Detects runtime flaws that static analysis (SAST) might miss

Tests for real-world exploits like improper authentication, misconfigured security headers, and runtime injections
<img width="950" height="440" alt="Dast" src="https://github.com/user-attachments/assets/0bd056a0-73a6-4ec9-8959-98b287a48971" />
👉 Goal: Verify the security posture from an active attacker's perspective.
---
## 🧹 Linting — Code Quality Gate

After security validation:

- Backend and frontend linted separately
- Ensures readability and consistency
- Prevents bad coding practices
- Gracefully skips if lint rules not defined
<img width="926" height="460" alt="sonarqube-pr-scan" src="https://github.com/user-attachments/assets/82eed7d4-5c82-42c9-832f-a420a5962761" />
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
<img width="959" height="281" alt="both-images-made" src="https://github.com/user-attachments/assets/8f405f9b-aa66-4d97-af85-e5b149b1cab9" />
👉 Produces consistent deployable artifacts.

---

## 🛡️ Container Security — Trivy Scan

Before pushing images:

- Backend and frontend images scanned
- Detects HIGH & CRITICAL vulnerabilities
- Uses cached DB for faster scans
<img width="938" height="475" alt="trivy-frontend" src="https://github.com/user-attachments/assets/eeafdc71-298d-45a9-b38b-8d76b13347e5" />
<img width="554" height="470" alt="trivy-backend" src="https://github.com/user-attachments/assets/01916bb1-3464-40f6-920f-f577d9afee8c" />
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
<img width="958" height="431" alt="dockerhub" src="https://github.com/user-attachments/assets/6e7480ea-a847-469b-8383-dd964d550867" />

---
🏗️ Infrastructure Security & Cost Audit — InfraScan
Before any infrastructure is modified, we validate the underlying architecture.

What happens:
Scans Infrastructure as Code (IaC) manifests and templates

Performs a comprehensive cost audit to prevent budget overruns

Validates configurations against security best practices

<img width="381" height="440" alt="infrascan-image" src="https://github.com/user-attachments/assets/73127b6f-5dc6-4dda-b492-80b3009ebc07" />
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
<img width="1536" height="1024" alt="full-CNCF" src="https://github.com/user-attachments/assets/35dff08c-14fd-4d4d-abc6-dcb540167926" />

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
