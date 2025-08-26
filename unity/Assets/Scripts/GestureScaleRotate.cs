using UnityEngine;

// Pinch to scale & two-finger rotate for placed object
public class GestureScaleRotate : MonoBehaviour
{
    public Transform target; // assign placed object (or parent)
    public float rotateSpeed = 0.2f;
    public Vector2 scaleRange = new Vector2(0.3f, 3.0f);

    private float _initialDistance;
    private Vector3 _initialScale;
    private float _lastAngle;
    private bool _pinching;

    void Update()
    {
        if (target == null) return;

        if (Input.touchCount == 2)
        {
            var t0 = Input.GetTouch(0);
            var t1 = Input.GetTouch(1);

            // Pinch scale
            var currentDistance = Vector2.Distance(t0.position, t1.position);
            var currentAngle = Mathf.Atan2(t1.position.y - t0.position.y, t1.position.x - t0.position.x) * Mathf.Rad2Deg;

            if (!_pinching)
            {
                _pinching = true;
                _initialDistance = currentDistance;
                _initialScale = target.localScale;
                _lastAngle = currentAngle;
            }
            else
            {
                // Scale
                if (_initialDistance > 0.01f)
                {
                    float scaleFactor = currentDistance / _initialDistance;
                    var s = Mathf.Clamp(_initialScale.x * scaleFactor, scaleRange.x, scaleRange.y);
                    target.localScale = new Vector3(s, s, s);
                }
                // Rotate (two-finger twist)
                float deltaAngle = Mathf.DeltaAngle(_lastAngle, currentAngle);
                target.Rotate(Vector3.up, deltaAngle * rotateSpeed, Space.World);
                _lastAngle = currentAngle;
            }
        }
        else
        {
            _pinching = false;
        }
    }
}

