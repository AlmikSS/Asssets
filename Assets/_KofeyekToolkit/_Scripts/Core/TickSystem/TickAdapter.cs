using UnityEngine;

namespace KofeyekToolkit.Core.TickSystem
{
    public sealed class TickAdapter : MonoBehaviour
    {
        private TickService _tickService;

        public void Initialize(TickService tickService)
        {
            _tickService = tickService;
        }

        private void Update()
        {
            if (_tickService == null)
                return;
            
            _tickService.Update(Time.unscaledDeltaTime);
        }
    }
}