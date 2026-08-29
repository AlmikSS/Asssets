# CCG Toolkit

CCG Toolkit is a Unity foundation maintained by CandyCandleGames for small indie projects. It provides application bootstrapping, reflection-based dependency injection, lifecycle-aware spawning and pooling, layered ticks, an event bus, scene switching, and a developer console.

## Documentation

The isolated Docusaurus site lives in [`website/`](website/), so Node tooling does not alter the Unity project. Its generated C# API covers only `Assets/_KofeyekToolkit/_Scripts`.

### Local launch

Install Node.js 18+ and the **system** dependency Doxygen, then run:

```bash
cd website
npm install
npm run docs:start
```

Doxygen installation for supported development systems:

- **Ubuntu/Debian:** `sudo apt-get install doxygen`
- **macOS (Homebrew):** `brew install doxygen`
- **Windows (Chocolatey):** `choco install doxygen.install`

`npm run docs:api` refreshes generated API files, `npm run docs:build` produces a production site, and `npm run docs:check` generates API documentation then validates a production build (including links).

## Current scope

This version targets Unity **6000.5.1f1** and small CandyCandleGames projects. It is a toolkit foundation, not a complete game framework or a promise of enterprise-scale features; larger-project capabilities will be introduced only as project needs validate them.
