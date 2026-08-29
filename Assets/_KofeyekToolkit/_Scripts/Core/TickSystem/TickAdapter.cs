using KofeyekToolkit.DI.Attributes;
using KofeyekToolkit.Logging;
using UnityEngine;

namespace KofeyekToolkit.Core.TickSystem
{
    /// <summary>
    /// Передаёт Unity-обновления в <see cref="TickService"/>.
    /// </summary>
    public sealed class TickAdapter : MonoBehaviour
    {
        private TickService _tickService;
        
        [Inject]
        private void Initialize(TickService tickService)
        {
            DontDestroyOnLoad(gameObject);
            _tickService = tickService;
            Log.Message("Initialized");
        }

        private void Update()
        {
            _tickService?.Update(Time.unscaledDeltaTime);
        }
    }
}