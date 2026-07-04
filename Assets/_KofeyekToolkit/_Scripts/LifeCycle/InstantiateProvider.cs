using UnityEngine;

namespace KofeyekToolkit.LifeCycle
{
    public sealed class InstantiateProvider<T> : IObjectProvider<T> where T : MonoBehaviour
    {
        public T Get(T prefab, Vector3 position, Quaternion rotation, Transform parent = null)
        {
            return Object.Instantiate(prefab, position, rotation, parent);
        }
    }
}