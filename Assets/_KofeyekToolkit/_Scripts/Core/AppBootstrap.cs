using KofeyekToolkit.Core.Options;
using KofeyekToolkit.Core.TickSystem;
using UnityEngine;

namespace KofeyekToolkit.Core
{
    /// <summary>
    /// Глобальная точка входа в приложение
    /// </summary>
    internal static class AppBootstrap
    {
        [RuntimeInitializeOnLoadMethod(RuntimeInitializeLoadType.BeforeSceneLoad)]
        private static void Initialize()
        {
            var tickService = new TickService(TickOptions.TICK_RATE);
            
        }
    }
}