---
title: Examples
sidebar_position: 4
---

# Examples

The snippets below use CCG Toolkit's public contracts. Put Unity classes in a
project assembly, and add components to a prefab or a scene root with
`SceneObject`.

## Dependency registration and injection

`RegisterAttribute` declares a service contract and lifetime. The container
supplies a registered contract to a field, property, or method marked with
`InjectAttribute`.

```csharp
using KofeyekToolkit.DI.Attributes;

public interface IPlayerNameProvider
{
    string Name { get; }
}

[Register(typeof(IPlayerNameProvider), RegisterType.Singleton)]
public sealed class PlayerNameProvider : IPlayerNameProvider
{
    public string Name => "Player";
}

public sealed class GreetingPresenter
{
    [Inject] private IPlayerNameProvider _playerNameProvider;

    public string Greeting => $"Hello, {_playerNameProvider.Name}!";
}
```

## Gameplay ticks

Implement `IGameplayTickable` for fixed-step gameplay logic. `SpawnService`
registers the component with `TickService` when it processes a `SceneObject` or
a spawned instance.

```csharp
using KofeyekToolkit.Core.TickSystem.Interfaces;
using UnityEngine;

public sealed class EnemyMover : MonoBehaviour, IGameplayTickable
{
    [SerializeField] private float _speed = 2f;

    public void Tick(float deltaTime)
    {
        transform.position += Vector3.forward * (_speed * deltaTime);
    }
}
```

## Events

An event implements the `IGameEvent` marker interface. Use `Register` to
subscribe, `Invoke` to publish, and always call `Unregister` when the handler
owner stops working.

```csharp
using KofeyekToolkit.Events;
using UnityEngine;

public sealed class CoinCollectedEvent : IGameEvent
{
    public CoinCollectedEvent(int amount) => Amount = amount;

    public int Amount { get; }
}

public sealed class CoinEventsExample : MonoBehaviour
{
    private readonly EventBus _eventBus = new EventBus();

    private void OnEnable()
    {
        _eventBus.Register<CoinCollectedEvent>(OnCoinCollected);
        _eventBus.Invoke(new CoinCollectedEvent(1));
    }

    private void OnDisable()
    {
        _eventBus.Unregister<CoinCollectedEvent>(OnCoinCollected);
    }

    private void OnCoinCollected(CoinCollectedEvent gameEvent)
    {
        Debug.Log($"Collected {gameEvent.Amount} coin(s).");
    }
}
```

## Scene objects and spawning

Add `SceneObject` to a scene root: at startup `SpawnService` injects
dependencies, calls `OnConstruct`, then calls `OnSpawn`. Request prefab
creation through `SpawnService`; it processes the request in its tick. On
`Despawn`, it calls `OnDespawn`, and it also calls `OnDestroyed` for an object
outside a pool.

```csharp
using KofeyekToolkit.Core.LifeCycle.Core;
using KofeyekToolkit.Core.LifeCycle.Core.Interfaces;
using KofeyekToolkit.DI.Attributes;
using UnityEngine;

[RequireComponent(typeof(SceneObject))]
public sealed class Chest : MonoBehaviour, IConstructable, ISpawnable, IDespawnable, IDestroyable
{
    public void OnConstruct() => Debug.Log("Chest constructed.");
    public void OnSpawn() => Debug.Log("Chest spawned.");
    public void OnDespawn() => Debug.Log("Chest despawned.");
    public void OnDestroyed() => Debug.Log("Chest destroyed.");
}

public sealed class ChestSpawner : MonoBehaviour
{
    [SerializeField] private Chest _chestPrefab;
    [Inject] private SpawnService _spawnService;

    public void SpawnChest(Vector3 position)
    {
        _spawnService.Spawn(_chestPrefab, position, Quaternion.identity,
            chest => chest.name = "SpawnedChest");
    }
}
```

## Console commands

Mark a method with `CommandAttribute`, supplying a name and description.
`DevConsole` discovers it through `CommandsRegistry` and passes command
arguments to the method parameters.

```csharp
using KofeyekToolkit.DevConsole;
using UnityEngine;

public static class DebugCommands
{
    [Command("set_score", "Sets the current score.")]
    private static void SetScore(int score)
    {
        Debug.Log($"Score set to {score}.");
    }
}
```

For startup order, see [Get started](get-started.md); for service conventions
and queues, see the [Developer guide](developer-guide.md).
