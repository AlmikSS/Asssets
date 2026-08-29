# CCG Toolkit

CCG Toolkit is a Unity foundation maintained by CandyCandleGames for small indie projects. It provides application bootstrapping, reflection-based dependency injection, lifecycle-aware spawning and pooling, layered ticks, an event bus, scene switching, and a developer console.

## Documentation

The isolated Docusaurus site lives in [`website/`](website/), so Node tooling does not alter the Unity project. Its generated C# API covers only `Assets/_KofeyekToolkit/_Scripts`.

### Local launch

Install Node.js 18+ and the **system** dependency Doxygen, then run:

```bash
cd website
npm ci
npm run docs:start
```

Doxygen installation for supported development systems:

- **Ubuntu/Debian:** `sudo apt-get install doxygen`
- **macOS (Homebrew):** `brew install doxygen`
- **Windows (Chocolatey):** `choco install doxygen.install`

`npm run docs:api` refreshes generated API files, `npm run docs:build` produces a production site, and `npm run docs:check` generates API documentation then validates a production build (including links).

This local development cycle is isolated from Unity: `website/build`, `website/node_modules`, `website/static/api`, and `website/static/xml` are generated files and are not committed. Running these commands does not modify Unity files.

## Публикация на GitHub Pages

1. В репозитории откройте **Settings → Pages** и в разделе **Build and deployment** выберите источник **GitHub Actions**.
2. Убедитесь, что имя репозитория совпадает со значением `projectName`, а `baseUrl` в `website/docusaurus.config.ts` использует это же имя репозитория (например, `projectName: 'Asssets'` и `baseUrl: '/Asssets/'`).
3. Выполните первый push в ветку `main`.
4. Дождитесь успешного завершения workflow **Documentation** на вкладке **Actions**.
5. Откройте опубликованный URL GitHub Pages, который будет показан в **Settings → Pages** и в результате шага deploy workflow.

Изменения в документации и C# исходниках автоматически запускают workflow **Documentation** по уже настроенным `paths`; pull request проходит сборку как проверку, но не публикуется.

### Windows troubleshooting

If Docusaurus reports a `Progress Plugin` validation error mentioning `name`, `color`, or `reporters`, update to the current documentation configuration, then reinstall the dependencies from scratch in PowerShell:

```powershell
cd website
Remove-Item -Recurse -Force node_modules
npm ci
npm run docs:start
```

The project pins Webpack 5.97.1 through npm overrides because newer Webpack releases are incompatible with the progress reporter used by this Docusaurus version.

## Current scope

This version targets Unity **6000.5.1f1** and small CandyCandleGames projects. It is a toolkit foundation, not a complete game framework or a promise of enterprise-scale features; larger-project capabilities will be introduced only as project needs validate them.
