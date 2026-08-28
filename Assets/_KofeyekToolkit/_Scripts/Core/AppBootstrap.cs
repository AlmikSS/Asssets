using KofeyekToolkit.Core.LifeCycle;
using KofeyekToolkit.Core.Options;
using KofeyekToolkit.Core.TickSystem;
using KofeyekToolkit.DI.Core;
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
            var diContainer = new DIContainer();
            diContainer.RegisterServicesFromAssemblies(typeof(AppBootstrap).Assembly);
            
            var tickService = new TickService(TickOptions.TICK_RATE);
            var spawnService = new SpawnService(tickService, diContainer);
            
            diContainer.RegisterInstance(tickService);
            diContainer.RegisterInstance(spawnService);
            
            tickService.Register(spawnService);
        }
        
        
    }
}