# KofeyekToolkit

KofeyekToolkit — фундамент Unity-проектов CandyCandleGames. Он предназначен для небольших инди-игр: даёт общие механизмы для старта приложения, внедрения зависимостей, выполнения игровой логики и управления объектами. По мере подтверждённой потребности проектов тулкит развивается в сторону более крупных игр.

## Реализованные системы

- `AppBootstrap` и `CoroutinePerformer` для старта приложения и корутин между сценами;
- DI-контейнер с `RegisterAttribute` и `InjectAttribute`;
- `TickService` с системным, gameplay, UI и presentation-каналами;
- жизненный цикл объектов: `SpawnService`, `ObjectPool`, конфигурация пулов и lifecycle-интерфейсы;
- типизированная шина событий `EventBus`;
- асинхронное переключение сцен через `SceneSwitcher`, `SceneBootstrap` и `LoadScreen`;
- developer console: регистрация и выполнение команд, автодополнение и журнал Unity-логов.

Исходники находятся в [`Assets/_KofeyekToolkit/_Scripts`](Assets/_KofeyekToolkit/_Scripts). Статичная документация для GitHub Pages находится в [`docs-site/`](docs-site/); инструкция публикации — в [`docs-site/README.md`](docs-site/README.md).
