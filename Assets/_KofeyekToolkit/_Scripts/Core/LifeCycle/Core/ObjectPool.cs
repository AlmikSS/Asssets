using System;
using System.Collections.Generic;
using KofeyekToolkit.Core.LifeCycle.Core.Interfaces;
using KofeyekToolkit.Core.TickSystem.Interfaces;
using UnityEngine;
using Object = UnityEngine.Object;

namespace KofeyekToolkit.Core.LifeCycle.Core
{
    public sealed class ObjectPool : IDisposable
    {
        private readonly GameObject _objectPrefab;
        private readonly Queue<(GameObject Instance, ITickable[] Tickables)> _poolQueue = new();
        private readonly SpawnService _spawnService;
        private readonly Transform _root;
        
        public ObjectPool(GameObject objectPrefab, int capacity, SpawnService spawnService, Transform parent = null)
        {
            _objectPrefab = objectPrefab;
            _spawnService = spawnService;
            
            _root = new GameObject($"{_objectPrefab.name}_Pool").transform;
            _root.SetParent(parent);

            for (var i = 0; i < capacity; i++)
            {
                SpawnInstance();
            }
        }
        
        public void Dispose()
        {
            while (_poolQueue.Count > 0)
            {
                var instance = _poolQueue.Dequeue();
                _spawnService.NotifyComponents<IDestroyable>(instance.Instance, component => component.OnDestroyed());
            }
            
            Object.Destroy(_root);
        }

        public GameObject Get(Vector3 position, Quaternion rotation, Transform parent = null)
        {
            if (_poolQueue.Count <= 0)
            {
                SpawnInstance();
            }
            
            var instance = _poolQueue.Dequeue();
            
            instance.Instance.transform.SetPositionAndRotation(position, rotation);
            instance.Instance.transform.SetParent(parent);
            instance.Instance.SetActive(true);
            _spawnService.InjectAllComponents(instance.Instance);
            _spawnService.NotifyComponents<ISpawnable>(instance.Instance, component => component.OnSpawn());
            _spawnService.RegisterAllTickables(instance.Tickables);
            return instance.Instance;
        }

        public void Return(GameObject instance)
        {
            var tickables = instance.GetComponentsInChildren<ITickable>();
            instance.transform.SetParent(_root);
            instance.transform.SetPositionAndRotation(Vector3.zero, Quaternion.identity);
            instance.SetActive(false);
            _spawnService.NotifyComponents<IDespawnable>(instance, component => component.OnDespawn());
            _spawnService.UnregisterAllTickables(tickables);
            _poolQueue.Enqueue((instance, tickables));
        }
        
        private void SpawnInstance()
        {
            var instance = Object.Instantiate(_objectPrefab, _root);
            var tickables = instance.GetComponentsInChildren<ITickable>();
            _poolQueue.Enqueue((instance, tickables));
            instance.SetActive(false);
            _spawnService.NotifyComponents<IConstructable>(instance, component => component.OnConstruct());
        }
    }
}