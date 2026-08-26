using System.Collections.Generic;
using System.Diagnostics;
using KofeyekToolkit.Core.Attributes;
using KofeyekToolkit.Core.TickSystem.Interfaces;
using KofeyekToolkit.DevConsole;

namespace KofeyekToolkit.Core.TickSystem
{
    /// <summary>
    /// Сервис детерминированных тиков, разделенных на каналы, такие как System, UI, Gameplay и Presentation
    /// </summary>
    [Service]
    public sealed class TickService
    {
        private int _tickCounter;
        private float _accumulator;
        private float _tickTimer;
        private readonly Stopwatch _stopwatch = new Stopwatch();
        
        private readonly List<ISystemTickable> _systems = new();
        private readonly List<IGameplayTickable> _gameplay = new();
        private readonly List<IUITickable> _ui = new();
        private readonly List<IPresentationTickable> _presentation = new();
        
        private readonly Queue<ITickable> _registerQueue = new();
        private readonly Queue<ITickable> _unregisterQueue = new();

        public int TargetTickRate { get; private set; }
        public int RealTickRate { get; private set; }
        public float TickExecutionTimeMs { get; private set; }
        public float TickInterval { get; private set; }
        public bool IsGameplayPaused { get; private set; }
        
        public TickService(int tickRate)
        {
            ChangeTickRate(tickRate);
        }
        
        public void Register(ITickable tickable) => _registerQueue.Enqueue(tickable);
        public void Unregister(ITickable tickable) => _unregisterQueue.Enqueue(tickable);

        public void Pause() => IsGameplayPaused = true;
        public void Resume() => IsGameplayPaused = false;

        internal void Update(float unscaledDeltaTime)
        {
            _tickTimer += unscaledDeltaTime;
            if (_tickTimer >= 1f)
            {
                RealTickRate = _tickCounter;
                _tickCounter = 0;
                _tickTimer -= 1f;
            }
            
            ReleaseRegisterQueue();
            ReleaseUnregisterQueue();
            
            Tick(_systems.ToArray(), TickInterval);
            Tick(_ui.ToArray(), TickInterval);

            if (!IsGameplayPaused)
            {
                _accumulator += unscaledDeltaTime;
            
                while (_accumulator >= TickInterval)
                {
                    _stopwatch.Restart();
                
                    Tick(_gameplay.ToArray(), TickInterval);
                    _tickCounter++;
                
                    _stopwatch.Stop();
                    TickExecutionTimeMs = (float)_stopwatch.Elapsed.TotalMilliseconds;
                
                    _accumulator -= TickInterval;
                }
                
                Tick(_presentation.ToArray(), TickInterval);
            }
        }

        private void ReleaseRegisterQueue()
        {
            while (_registerQueue.Count > 0)
            {
                var tickable = _registerQueue.Dequeue();
                
                switch (tickable)
                {
                    case ISystemTickable systemTickable:
                        _systems.Add(systemTickable);
                        break;
                    case IGameplayTickable gameplayTickable:
                        _gameplay.Add(gameplayTickable);
                        break;
                    case IUITickable uiTickable:
                        _ui.Add(uiTickable);
                        break;
                    case IPresentationTickable presentationTickable:
                        _presentation.Add(presentationTickable);
                        break;
                }
            }
        }

        private void ReleaseUnregisterQueue()
        {
            while (_unregisterQueue.Count > 0)
            {
                var tickable = _unregisterQueue.Dequeue();
                
                switch (tickable)
                {
                    case ISystemTickable systemTickable:
                        if (_systems.Contains(systemTickable))
                            _systems.Remove(systemTickable);
                        break;
                    case IGameplayTickable gameplayTickable:
                        if (_gameplay.Contains(gameplayTickable))
                            _gameplay.Remove(gameplayTickable);
                        break;
                    case IUITickable uiTickable:
                        if (_ui.Contains(uiTickable))
                            _ui.Remove(uiTickable);
                        break;
                    case IPresentationTickable presentationTickable:
                        if (_presentation.Contains(presentationTickable))
                            _presentation.Remove(presentationTickable);
                        break;
                }
            }
        }

        private void Tick(ITickable[] tickables, float deltaTime)
        {
            foreach (var tickable in tickables)
            {
                tickable.Tick(deltaTime);
            }
        }

        [Command("change_tick_rate", "Изменяет текущий tick rate игры.")]
        private void ChangeTickRate(int newTickRate)
        {
            TargetTickRate = newTickRate;
            TickInterval = 1f / newTickRate;
            _accumulator = 0f;
        }
    }
}