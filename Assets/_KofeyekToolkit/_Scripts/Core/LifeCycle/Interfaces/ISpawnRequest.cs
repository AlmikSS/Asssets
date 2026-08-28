using KofeyekToolkit.DI.Core;

namespace KofeyekToolkit.Core.LifeCycle.Core.Interfaces
{
    public interface ISpawnRequest
    {
        void Execute(SpawnService spawnService);
    }
}