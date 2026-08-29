---
title: Get Started
sidebar_position: 1
---

# Get Started

CCG Toolkit is the shared foundation for small CandyCandleGames Unity projects. This repository uses **Unity 6000.5.1f1**; use the same editor version when opening it.

## Open the project

1. Clone the repository and open its root directory in Unity Hub.
2. Select Unity **6000.5.1f1** when Hub asks for an editor.
3. Let Unity restore packages, then open `Assets/_KofeyekToolkit/Scenes/SampleScene.unity` or add the toolkit objects to your own bootstrap scene.

## Scene setup

- **`AppBootstrap`** is the global runtime entry point. It builds the container, creates services, and discovers scene objects after the scene loads.
- Add **`SceneObject`** to a root object that must be spawned/constructed as part of scene initialization.
- Create a **`SpawnPoolsConfig`** asset to declare prefab pools and capacities used by spawning.
- Place the **`DevConsole` prefab** from `Assets/_KofeyekToolkit/Prefabs/Console/DevConsole.prefab` in a scene when developer commands and log UI are needed.

## Startup order

At runtime the toolkit registers services, starts ticking, then initializes tagged scene objects:

1. `AppBootstrap` creates the DI container and registers services.
2. `TickService`, `SpawnService`, and scene switching support are configured.
3. `SpawnService` processes `SceneObject` instances and runs their lifecycle.
4. Your scene bootstrap and gameplay systems can use the public [API Reference](api-reference.md).

Continue with [Architecture](architecture.md) before adding systems.
