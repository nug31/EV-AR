using UnityEngine;
using UnityEngine.XR.ARFoundation;

// Simple reticle that hovers at y=0 and faces camera, used while searching plane
public class PlaceOnPlaneReticle : MonoBehaviour
{
    public Transform reticle;
    public float followSpeed = 10f;

    Camera _cam;

    void Start()
    {
        _cam = Camera.main;
    }

    void Update()
    {
        if (reticle == null || _cam == null) return;
        var pos = reticle.position;
        pos.y = 0.01f; // just above ground
        reticle.position = Vector3.Lerp(reticle.position, pos, Time.deltaTime * followSpeed);
        reticle.LookAt(_cam.transform);
    }
}

