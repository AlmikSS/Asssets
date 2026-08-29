---
title: Examples
sidebar_position: 4
---

# Examples

The project includes a ready-to-run scene at
`Assets/_KofeyekToolkit/Scenes/SampleScene.unity`. Open it in Unity
**6000.5.1f1** to see how CCG Toolkit components are assembled in a working
project.

## What to explore in SampleScene

- `AppBootstrap` creates the dependency container and starts application services.
- `SceneObject` marks root objects that should be initialized with the scene.
- `DevConsole` from `Assets/_KofeyekToolkit/Prefabs/Console/DevConsole.prefab`
  adds developer commands and a log display.

## Use it in your own scene

Create a scene and add `AppBootstrap`. Then mark root objects that need
initialization with `SceneObject`; add the `DevConsole` prefab when you need its
console UI. Read [Get started](get-started.md) and
[Architecture](architecture.md) for the startup order and services.
