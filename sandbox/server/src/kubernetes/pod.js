import { K8sCoreV1Api } from "./config.js";

export async function createPod(sandboxId) {
    
    // Define the pod manifest(container specification) for the sandbox pod
    const podManifest = {
        metadata: {
            name: `sandbox-${sandboxId}`,
            labels: {
                app: 'sandbox',
                sandboxId: sandboxId
            }
        },
        spec: {
            containers: [
                {
                    image: 'template', // Name of the image for the pod1
                    imagePullPolicy: 'IfNotPresent',
                    name: 'sandbox-container',
                    ports: [
                        {
                            containerPort: 5173, // Vite default port
                            name: 'http'
                        }
                    ],
                    resources: {
                        limits: { cpu: '500m', memory: '1Gi' },
                        requests: { cpu: '250m', memory: '500Mi' }
                    }
                }
            ]
        }
    };

    // Create the pod in the default namespace
    const response = await K8sCoreV1Api.createNamespacedPod("default", podManifest);
    return response;
}