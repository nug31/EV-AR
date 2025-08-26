using UnityEngine;
using UnityEngine.XR.ARFoundation;

// Applies ARCameraManager light estimation to a Directional Light
[RequireComponent(typeof(ARCameraManager))]
public class LightEstimationToDirectional : MonoBehaviour
{
    public Light directionalLight;
    private ARCameraManager _cameraManager;

    void Awake()
    {
        _cameraManager = GetComponent<ARCameraManager>();
        _cameraManager.frameReceived += OnFrameReceived;
    }

    void OnDestroy()
    {
        _cameraManager.frameReceived -= OnFrameReceived;
    }

    void OnFrameReceived(ARCameraFrameEventArgs args)
    {
        if (directionalLight == null) return;
        if (args.lightEstimation.averageBrightness.HasValue)
        {
            var intensity = Mathf.Clamp01(args.lightEstimation.averageBrightness.Value);
            directionalLight.intensity = Mathf.Lerp(0.2f, 1.2f, intensity);
        }
        if (args.lightEstimation.mainLightDirection.HasValue)
        {
            directionalLight.transform.rotation = Quaternion.LookRotation(args.lightEstimation.mainLightDirection.Value);
        }
        if (args.lightEstimation.mainLightColor.HasValue)
        {
            directionalLight.color = args.lightEstimation.mainLightColor.Value;
        }
    }
}

