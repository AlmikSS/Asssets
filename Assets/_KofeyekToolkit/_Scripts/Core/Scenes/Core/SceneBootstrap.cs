using UnityEngine;

namespace KofeyekToolkit.Core.Scenes.Core
{
    public abstract class SceneBootstrap : MonoBehaviour
    {
        internal abstract void Initialize(ISceneArgs sceneArgs);
    }
}