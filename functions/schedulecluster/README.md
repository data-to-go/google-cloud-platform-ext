<img src="https://avatars2.githubusercontent.com/u/2810941?v=3&s=96" alt="Google Cloud Platform logo" title="Google Cloud Platform" align="right" height="96" width="96"/>

# Google Cloud Functions - Scheduling Kubernetes Engine Cluster

## Deploy and run the sample

This solution includes the following GCP components:

* Kubernetes Engine Cluster: A Cluster want to run on a schedule.
* Cloud Functions functions: Functions to start and stop the cluster we want to schedule.
* Cloud Pub/Sub messages: Messages sent and received for each start and stop event.
* Cloud Scheduler jobs: Jobs to make calls on a set schedule to start and stop the cluster.

![Architecture](/docs/images/scheduling_cluster.png)


## Additional resources

* [GCE NodeJS Client Library documentation][compute_nodejs_docs]
* [Background Cloud Functions documentation][background_functions_docs]

[compute_nodejs_docs]: https://cloud.google.com/compute/docs/tutorials/nodejs-guide
[background_functions_docs]: https://cloud.google.com/functions/docs/writing/background