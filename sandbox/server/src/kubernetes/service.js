import { K8sCoreV1Api } from "./config.js";

export const createService = async (sandboxId) => {
    const serviceManifest = {
        metadata: {
            name: `sandbox-service-${sandboxId}`,
            labels: {
                app: 'sandbox-preview',
                sandboxId: sandboxId
            }
        },
        spec: { 
            selector: {
                app: 'sandbox-preview',
                sandboxId: sandboxId
            },
                ports: [
                {
                    name: 'http',
                    protocol: 'TCP',
                    port: 80, // Port exposed by the service
                    targetPort: 5173 // Port on the pod to forward traffic to
                }
            ],
            type: 'ClusterIP' // You can change this to 'NodePort' or 'LoadBalancer' if needed
        }
    };

        const response = await K8sCoreV1Api.createNamespacedService({
            namespace: "default",
            body: serviceManifest
        });
    return response;

}

/*
    Without this service, the pod will not be accessible from outside the Kubernetes cluster. 
    The service acts as a stable endpoint to access the pod, even if the pod is restarted or rescheduled to a different node.
*/