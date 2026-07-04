using UnityEngine;

namespace KofeyekToolkit.LifeCycle
{
    public abstract class SpawnParams
    {
        public Vector3 Position { get; }
        public Quaternion Rotation { get; }
        public Transform Parent { get; }
        
        protected SpawnParams(Vector3 position, Quaternion rotation, Transform parent)
        {
            Position = position;
            Rotation = rotation;
            Parent = parent;
        }
    }
}