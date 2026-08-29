---
title: Developer Guide
sidebar_position: 4
---

# Developer Guide

## Dependency registration

At startup, `DIContainer` uses reflection to find `[Register]` declarations. It caches type metadata and uses `[Inject]` fields, properties, and methods to supply resolved contracts. Prefer attributes and container registration over a second service locator.

## Queued services

`TickService` queues registration and removal so its collections are not mutated while ticks execute. `SpawnService` likewise queues spawn requests before it creates or returns instances. This protects frame iteration and makes lifecycle delivery predictable.

## Lifecycle and pooling

The lifecycle order for a newly created instance is **`OnConstruct → OnSpawn`**. Returning an instance runs **`OnDespawn`**; final disposal runs **`OnDestroyed`**. `ObjectPool` reuses instances and delegates those callbacks through `SpawnService` rather than bypassing the lifecycle.

## Scene switching

`SceneSwitcher` shows the load screen, loads the target scene asynchronously, initializes its `SceneObject` instances, then calls the scene bootstrap with its arguments. Scene-specific initialization belongs in the target `SceneBootstrap`.

## Developer console

`DevConsole` uses reflection to register methods marked with the command attribute. Its registry resolves commands, the executor converts input to parameters, and the UI exposes logs and completion. Keep commands deterministic and safe for developer use.

See public contracts in the [generated API](api-reference.md).
