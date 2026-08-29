using System.Collections;
using KofeyekToolkit.Core.LifeCycle.Core;
using KofeyekToolkit.Core.Scenes.Core;
using KofeyekToolkit.Core.Scenes.Visual;
using UnityEngine;
using UnityEngine.SceneManagement;

namespace KofeyekToolkit.Core.Scenes.Management
{
    /// <summary>
    /// Асинхронно загружает сцену, отображает экран загрузки и запускает её инициализацию.
    /// </summary>
    public sealed class SceneSwitcher
    {
        private readonly SpawnService _spawnService;
        private readonly LoadScreen _loadScreen;
        
        /// <summary>
        /// Предоставляет API-член <c>SceneSwitcher</c>.
        /// </summary>
        public SceneSwitcher(SpawnService spawnService, LoadScreen loadScreen)
        {
            _loadScreen = loadScreen;
            _spawnService = spawnService;
        }
        
        /// <summary>
        /// Запускает асинхронную загрузку сцены и передаёт ей аргументы.
        /// </summary>
        public void LoadScene(string sceneName, ISceneArgs sceneArgs)
        {
            CoroutinePerformer.Instance.StartCoroutine(LoadSceneRoutine(sceneName, sceneArgs));
        }

        private IEnumerator LoadSceneRoutine(string sceneName, ISceneArgs sceneArgs)
        {
            _loadScreen.Show();
            var waitOperation = SceneManager.LoadSceneAsync(sceneName);
            
            yield return new WaitUntil(() => waitOperation.isDone);
            
            _loadScreen.Hide();
            _spawnService.SpawnInSceneObjects();
            var bootstrap = Object.FindAnyObjectByType<SceneBootstrap>();
            bootstrap.Initialize(sceneArgs);
        }
    }
}