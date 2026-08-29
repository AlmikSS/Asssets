---
title: Примеры
sidebar_position: 4
---

# Примеры

Ниже приведены небольшие примеры использования публичных контрактов CCG Toolkit.
Поместите классы Unity в сборку проекта, а компоненты добавляйте на prefab или
корневой объект сцены с `SceneObject`.

## Регистрация и внедрение зависимостей

`RegisterAttribute` задаёт контракт сервиса и его время жизни. Контейнер
передаёт зарегистрированный контракт в поле, свойство или метод с
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

## Игровые тики

Реализуйте `IGameplayTickable` для игровой логики с фиксированным шагом.
`SpawnService` зарегистрирует компонент в `TickService`, когда обработает
`SceneObject` или заспавненный экземпляр.

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

## События

Событие реализует маркерный интерфейс `IGameEvent`. Для подписки используйте
`Register`, для публикации — `Invoke`, а при прекращении работы владельца
обработчика обязательно вызывайте `Unregister`.

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

## Объекты сцены и спавнинг

Добавьте `SceneObject` к корневому объекту сцены: при запуске `SpawnService`
внедрит зависимости и вызовет `OnConstruct`, затем `OnSpawn`. Для prefab
запрашивайте создание через `SpawnService`; запрос будет обработан в его тике.
При `Despawn` сервис вызовет `OnDespawn`, а для объекта вне пула — также
`OnDestroyed`.

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

## Команды консоли

Пометьте метод `CommandAttribute`, указав имя и описание. `DevConsole`
обнаружит его через `CommandsRegistry` и передаст аргументы команды параметрам
метода.

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

Подробнее о порядке запуска см. в [Быстром старте](get-started.md), а о
соглашениях и очередях сервисов — в [Руководстве разработчика](developer-guide.md).
