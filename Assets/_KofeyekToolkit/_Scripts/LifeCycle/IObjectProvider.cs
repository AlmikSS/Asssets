using UnityEngine;

namespace KofeyekToolkit.LifeCycle
{
    public interface IObjectProvider<T>
    {
        T Get(T prefab, Vector3 position, Quaternion rotation, Transform parent = null);
    }
}