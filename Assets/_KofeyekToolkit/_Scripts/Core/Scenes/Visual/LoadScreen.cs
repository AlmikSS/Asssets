using KofeyekToolkit.Core.LifeCycle.Core.Interfaces;
using UnityEngine;

namespace KofeyekToolkit.Core.Scenes.Visual
{
    public sealed class LoadScreen : MonoBehaviour, IConstructable
    {
        [SerializeField] private GameObject _root;
        
        public void OnConstruct()
        {
            DontDestroyOnLoad(gameObject);
            Hide();
        }

        internal void Hide() => _root.SetActive(false);

        internal void Show() => _root.SetActive(true);
    }
}