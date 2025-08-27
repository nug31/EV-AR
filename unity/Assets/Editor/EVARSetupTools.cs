#if UNITY_EDITOR
using System.IO;
using UnityEditor;
using UnityEditor.SceneManagement;
using UnityEngine;
#if AR_FOUNDATION_PRESENT || true
using UnityEngine.XR.ARFoundation;
#endif

// EV AR Starter Tools: create Reticle prefab, generate AR scene, export package
public static class EVARSetupTools
{
    private const string RootFolder = "Assets/EVAR";
    private const string PrefabsFolder = RootFolder + "/Prefabs";
    private const string ScenesFolder = RootFolder + "/Scenes";
    private const string MaterialsFolder = RootFolder + "/Materials";

    [MenuItem("Tools/EV AR/Create Reticle Prefab")]
    public static void CreateReticlePrefab()
    {
        EnsureFolders();

        // Create material (green transparent)
        var mat = new Material(Shader.Find("Standard"));
        mat.name = "Reticle_Green_Transparent";
        mat.color = new Color(0.1f, 0.9f, 0.3f, 0.35f);
        // Set Rendering Mode to Transparent
        mat.SetFloat("_Mode", 3);
        mat.SetInt("_SrcBlend", (int)UnityEngine.Rendering.BlendMode.SrcAlpha);
        mat.SetInt("_DstBlend", (int)UnityEngine.Rendering.BlendMode.OneMinusSrcAlpha);
        mat.SetInt("_ZWrite", 0);
        mat.DisableKeyword("_ALPHATEST_ON");
        mat.EnableKeyword("_ALPHABLEND_ON");
        mat.DisableKeyword("_ALPHAPREMULTIPLY_ON");
        mat.renderQueue = (int)UnityEngine.Rendering.RenderQueue.Transparent;

        var matPath = MaterialsFolder + "/" + mat.name + ".mat";
        AssetDatabase.CreateAsset(mat, matPath);

        // Create reticle GameObject (flat cylinder)
        var go = GameObject.CreatePrimitive(PrimitiveType.Cylinder);
        go.name = "Reticle";
        Object.DestroyImmediate(go.GetComponent<Collider>());
        go.transform.localScale = new Vector3(0.3f, 0.005f, 0.3f);
        var mr = go.GetComponent<MeshRenderer>();
        mr.sharedMaterial = AssetDatabase.LoadAssetAtPath<Material>(matPath);

        // Save prefab
        var prefabPath = PrefabsFolder + "/Reticle.prefab";
        PrefabUtility.SaveAsPrefabAsset(go, prefabPath, out bool success);
        Object.DestroyImmediate(go);

        if (success)
        {
            EditorUtility.DisplayDialog("EV AR", "Reticle prefab created at\n" + prefabPath, "OK");
            AssetDatabase.Refresh();
        }
    }

    [MenuItem("Tools/EV AR/Create AR Scene (AR Foundation)")]
    public static void CreateARScene()
    {
        EnsureFolders();

        // New scene
        var scene = EditorSceneManager.NewScene(NewSceneSetup.EmptyScene, NewSceneMode.Single);

        // AR Session
        var arSessionGO = new GameObject("AR Session");
#if AR_FOUNDATION_PRESENT || true
        arSessionGO.AddComponent<ARSession>();
#endif

        // AR Session Origin
        var originGO = new GameObject("AR Session Origin");
#if AR_FOUNDATION_PRESENT || true
        var origin = originGO.AddComponent<ARSessionOrigin>();
        var raycast = originGO.AddComponent<ARRaycastManager>();
        var planeMgr = originGO.AddComponent<ARPlaneManager>();
#endif

        // Camera
        var camGO = new GameObject("AR Camera");
        var cam = camGO.AddComponent<Camera>();
        camGO.tag = "MainCamera";
#if AR_FOUNDATION_PRESENT || true
        camGO.AddComponent<ARCameraManager>();
        camGO.AddComponent<ARCameraBackground>();
#endif
        cam.transform.SetParent(originGO.transform);

        // Directional Light
        var lightGO = new GameObject("Directional Light");
        var light = lightGO.AddComponent<Light>();
        light.type = LightType.Directional;
        light.intensity = 1.0f;
        light.transform.rotation = Quaternion.Euler(50, -30, 0);

        // Add helper scripts (if present in project)
        TryAddComponent(camGO, "LightEstimationToDirectional", (comp) =>
        {
            var so = new SerializedObject(comp);
            so.FindProperty("directionalLight").objectReferenceValue = light;
            so.ApplyModifiedProperties();
        });

        TryAddComponent(originGO, "TapToPlace");
        TryAddComponent(originGO, "GestureScaleRotate");

        // Save scene
        var savePath = ScenesFolder + "/ARMain.unity";
        Directory.CreateDirectory(ScenesFolder);
        var ok = EditorSceneManager.SaveScene(scene, savePath);
        if (ok)
        {
            EditorSceneManager.OpenScene(savePath);
            EditorUtility.DisplayDialog("EV AR", "AR Scene created at\n" + savePath + "\n\nAssign a placeable prefab in TapToPlace.placeablePrefab.", "OK");
        }
    }

    [MenuItem("Tools/EV AR/Export Starter Package…")]
    public static void ExportStarterPackage()
    {
        EnsureFolders();
        string[] assets = new[]
        {
            PrefabsFolder + "/Reticle.prefab",
            MaterialsFolder,
            "Assets/Assets", // keep if user has additional assets
            "Assets/Scripts", // user scripts top-level (optional)
            "Assets/EVAR" // our folder
        };

        // Filter to existing
        var list = new System.Collections.Generic.List<string>();
        foreach (var p in assets)
        {
            if (AssetDatabase.IsValidFolder(p) || File.Exists(p)) list.Add(p);
        }

        var defaultName = "EV-AR-Starter.unitypackage";
        var path = EditorUtility.SaveFilePanel("Export EV AR Starter", "", defaultName, "unitypackage");
        if (string.IsNullOrEmpty(path)) return;

        AssetDatabase.ExportPackage(list.ToArray(), path, ExportPackageOptions.Recurse);
        EditorUtility.DisplayDialog("EV AR", "Exported:\n" + path, "OK");
    }

    private static void EnsureFolders()
    {
        CreateFolderIfNotExists("Assets", "EVAR");
        CreateFolderIfNotExists(RootFolder, "Prefabs");
        CreateFolderIfNotExists(RootFolder, "Scenes");
        CreateFolderIfNotExists(RootFolder, "Materials");
    }

    private static void CreateFolderIfNotExists(string parent, string child)
    {
        var path = Path.Combine(parent, child).Replace("\\", "/");
        if (!AssetDatabase.IsValidFolder(path))
        {
            AssetDatabase.CreateFolder(parent, child);
        }
    }

    private static void TryAddComponent(GameObject go, string typeName, System.Action<Component> afterAdd = null)
    {
        var t = FindType(typeName);
        if (t == null)
        {
            Debug.LogWarning($"[EV AR] Script '{typeName}' not found in project. Skipped.");
            return;
        }
        var comp = go.AddComponent(t);
        afterAdd?.Invoke(comp);
    }

    private static System.Type FindType(string typeName)
    {
        foreach (var asm in System.AppDomain.CurrentDomain.GetAssemblies())
        {
            var t = asm.GetType(typeName);
            if (t != null) return t;
        }
        return null;
    }
}
#endif

