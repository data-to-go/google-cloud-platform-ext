
const Buffer = require('safe-buffer').Buffer;
const Container = require('@google-cloud/container');
const client = new Container.v1.ClusterManagerClient({
    // optional auth parameters.
  });


/**
 * Starts an exist Cluster.
 *
 * Expects a PubSub message with JSON-formatted event data containing the
 * following attributes:
 *  projectId - the project identifier.
 *  zone - the GCP zone the instance is located in.
 *  clusterId - the cluster identifier.
 *
 * @param {!object} event Cloud Function PubSub message event.
 * @param {!object} callback Cloud Function PubSub callback indicating completion.
 */
exports.startClusterPubSub = (event, callback) => {
  try {
    const pubsubMessage = event.data;
    const payload = _validatePayload(
      JSON.parse(Buffer.from(pubsubMessage.data, 'base64').toString())
    );

    const request = {
      projectId: payload.projectId,
      zone: payload.zone,
      clusterId: payload.clusterId,
      nodePoolId: payload.nodePoolId,
      nodeCount: 3,
    };

    client
      .setNodePoolSize(request)
      .then(data => {
        // Operation pending.
        const operation = data[0];
        return operation.promise();
      })
      .then(() => {
        // Operation complete. Instance successfully started.
        const message = 'Successfully started cluster ' + payload.clusterId;
        console.log(message);
        callback(null, message);
      })
      .catch(err => {
        console.log(err);
        callback(err);
      });
  } catch (err) {
    console.log(err);
    callback(err);
  }
};



/**
 * Stops an exist Cluster.
 *
 * Expects a PubSub message with JSON-formatted event data containing the
 * following attributes:
 *  projectId - the project identifier.
 *  zone - the GCP zone the instance is located in.
 *  clusterId - the cluster identifier.
 *
 * @param {!object} event Cloud Function PubSub message event.
 * @param {!object} callback Cloud Function PubSub callback indicating completion.
 */
exports.stopClusterPubSub = (event, callback) => {
  try {
    const pubsubMessage = event.data;
    const payload = _validatePayload(
      JSON.parse(Buffer.from(pubsubMessage.data, 'base64').toString())
    );

    const request = {
      projectId: payload.projectId,
      zone: payload.zone,
      clusterId: payload.clusterId,
      nodePoolId: payload.nodePoolId,
      nodeCount: 0,
    };

    client
      .setNodePoolSize(request)
      .then(data => {
        // Operation pending.
        const operation = data[0];
        return operation.promise();
      })
      .then(() => {
        // Operation complete. Cluster successfully stopped.
        const message = 'Successfully stopped cluster ' + payload.clusterId;
        console.log(message);
        callback(null, message);
      })
      .catch(err => {
        console.log(err);
        callback(err);
      });
  } catch (err) {
    console.log(err);
    callback(err);
  }
};

/**
 * Validates that a request payload contains the expected fields.
 *
 * @param {!object} payload the request payload to validate.
 * @returns {!object} the payload object.
 */
function _validatePayload(payload) {
  if (!payload.zone) {
    throw new Error(`Attribute 'zone' missing from payload`);
  } else if (!payload.projectId) {
    throw new Error(`Attribute 'projectId' missing from payload`);
  } else if (!payload.clusterId) {
    throw new Error(`Attribute 'clusterId' missing from payload`);
  } else if (!payload.nodePoolId) {
    throw new Error(`Attribute 'nodePoolId' missing from payload`);
  }
  return payload;
}
