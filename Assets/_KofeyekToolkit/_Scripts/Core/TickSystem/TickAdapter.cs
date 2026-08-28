using KofeyekToolkit.DI.Attributes;
using UnityEngine;

namespace KofeyekToolkit.Core.TickSystem
{
    public sealed class TickAdapter : MonoBehaviour
    {
        private TickService _tickService;

        [Inject]
        private void Initialize(TickService tickService)
        {
            _tickService = tickService;
            Debug.Log("[TickAdapter] Initialized");
        }

        private void Update()
        {
            if (_tickService == null)
                return;
            
            _tickService.Update(Time.unscaledDeltaTime);
        }
    }
}