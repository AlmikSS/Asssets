using KofeyekToolkit.DI.Core;

namespace KofeyekToolkit.Core.LifeCycle.Interfaces
{
    public interface ISpawnRequest
    {
        void Execute(SpawnService spawnService);
    }
}