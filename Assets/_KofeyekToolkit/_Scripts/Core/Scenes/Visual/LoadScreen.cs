using KofeyekToolkit.Core.LifeCycle.Core.Interfaces;
using UnityEngine;

namespace KofeyekToolkit.Core.Scenes.Visual
{
    /// <summary>
    /// Отображает или скрывает сохраняемый между сценами экран загрузки.
    /// </summary>
    public sealed class LoadScreen : MonoBehaviour, IConstructable
    {
        [SerializeField] private GameObject _root;
        
        /// <summary>
        /// Инициализирует компонент после создания.
        /// </summary>
        public void OnConstruct()
        {
            DontDestroyOnLoad(gameObject);
            Hide();
        }

        internal void Hide() => _root.SetActive(false);

        internal void Show() => _root.SetActive(true);
    }
}