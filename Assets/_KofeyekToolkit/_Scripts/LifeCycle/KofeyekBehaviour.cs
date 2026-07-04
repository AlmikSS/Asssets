using UnityEngine;

namespace KofeyekToolkit.LifeCycle
{
    public abstract class KofeyekBehaviour : MonoBehaviour
    {
        internal void Created()
        {
            OnCreated();
        }
        
        internal void Spawn()
        {
            OnSpawn();
        }

        internal void Despawn()
        {
            OnDespawn();
        }

        internal void Destroy()
        {
            OnDestroyed();
        }

        protected virtual void OnCreated() { }
        protected virtual void OnSpawn() { }
        protected virtual void OnDespawn() { }
        protected virtual void OnDestroyed() { }
    }
}