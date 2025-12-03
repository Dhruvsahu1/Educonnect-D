          PUSH / PR to MAIN
                    │
                    ▼
        ┌────────────────────────┐
        │    CodeQL Security     │
        └────────────────────────┘
                    │
                    ▼
        ┌────────────────────────┐
        │ Lint + Test (Both apps)│
        └────────────────────────┘
                    │
     Tests MUST pass (needs: test)
                    │
                    ▼
        ┌────────────────────────┐
        │Docker Build & Push     │
        └────────────────────────┘
                    │
                    ▼
     Image pushed to DockerHub
