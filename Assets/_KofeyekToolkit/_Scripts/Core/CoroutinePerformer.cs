using UnityEngine;

namespace KofeyekToolkit.Core
{
    public sealed class CoroutinePerformer : MonoBehaviour
    {
        public static CoroutinePerformer Instance { get; private set; }
        
        private void Awake()
        {
            if (Instance == null)
            {
                Instance = this;
                DontDestroyOnLoad(gameObject);
            }
            else
                Destroy(gameObject);
        }
    }
}