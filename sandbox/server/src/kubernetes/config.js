import * as K8sApi from '@kubernetes/client-node';

/**
 * Create a Kubernetes client configuration
 */

export const kc = new K8sApi.KubeConfig();
kc.loadFromDefault();

export const K8sCoreV1Api = kc.makeApiClient(K8sApi.CoreV1Api);

// To create services and pods in Kubernetes, you can use the `K8sCoreV1Api` client. 
