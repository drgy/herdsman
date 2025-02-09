# Herdsman
A simple 2D prototype built with PixiJS and TypeScript, where the goal is to collect animals and bring them to the barn to score points. The player controls the herdsman by clicking on the screen, leading limited amount of animals at once to the barn.

## Build & Run

This project uses Vite for development and local server hosting.

```bash
npm install
npm run dev
```

## Project Overview

This prototype follows OOP best practices while maintaining a balance between SOLID principles and practical game architecture.

### Encapsulation & Inheritance
The Herdsman and Animals share common behavior through an Agent base class, which ensures code reuse and easy extensibility (e.g., adding a herdsman’s dog).

### Single responsibility

Game entities handle strictly their own behavior while delegating events to managers, ensuring modularity.

### Trade-offs & Pragmatism

Some aspects, like how the Game class manages the background, herdsman, and barn, are simplified to fit the prototype’s scope. A production-ready version would require a more structured approach.

Production-ready application would also include automated tests (unit & integration) to ensure stability and prevent regressions.

In this prototype, functionality is straightforward, so code intentions should be clear at first glance, making excessive comments unnecessary, but larger codebase would require comments and ideally more detailed documentation.