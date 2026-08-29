---
title: Toolkit Rules
sidebar_position: 3
---

# Toolkit Rules

These rules keep CandyCandleGames projects compatible with the toolkit's public [API Reference](api-reference.md).

1. **Use the public API.** Do not couple game code to private queues, reflection metadata, or Unity implementation details inside toolkit services.
2. **Declare dependencies.** Register services with `[Register]`; consume them through `[Inject]` rather than constructing or searching for dependencies ad hoc.
3. **Route spawn state through `SpawnService`.** Spawn, despawn, pooling, and lifecycle changes must not be reimplemented directly with `Instantiate`, `Destroy`, or raw activation changes.
4. **Clean up event subscriptions.** Every event handler must unregister when its owner despawns, is disabled, or is destroyed.
5. **Mark scene participants.** A game object that belongs to toolkit scene initialization must have `SceneObject`.
6. **Choose ticks by layer.** Implement `ISystemTickable` for infrastructure, `IGameplayTickable` for fixed-step gameplay, `IUITickable` for UI, and `IPresentationTickable` for visual presentation.
