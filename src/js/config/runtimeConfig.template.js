// This runtime configuration will be fetched during loading of the main page
// and merged with the static configuration
var runtimeConfig = {
  // The domain used to compute the service endpoint
  serviceDomain: "marathon.service.domain",

  // The generator building the logs links for applications
  appLogsLinkGenerator: function (appId) {
    return "http://logs-store-like-kibana/?appId=" + appId.substring(1);
  },

  // The generator building the logs links for tasks
  taskLogsLinkGenerator: function (appId, taskId) {
    return "http://logs-store-like-kibana/?appId=" + appId.substring(1) + "&taskId=" + taskId;
  },

  // The generator building the monitoring links for tasks
  taskMonitoringLinkGenerator: function (appId, task) {
    return "" + appId.substring(1) + "&taskId=" + task.host;
  },

  // The generator building the traffic dump link for tasks
  taskTrafficDumpLinkGenerator: function (appId, task) {
    return "http://some-traffic-dump-tool/" + task.host;
  },

  // The generator building the web terminal link for debugging tasks
  debugLinkGenerator: function (taskId) {
    return "http://webterminal/?taskId=" + taskId;
  },

  // The generator building the host link to access host info
  hostLinkGenerator: function (host) {
    return "http://" + host + ":5051";
  },
  // Callback when "troubleshoot" button is clicked
  troubleshootApp: function(appId) {
    var win = window.open("http://troubleshoot/appId/" + appId, '_blank');
    win.focus();
  },

  // The generator building link to sandbox to override
  // default urls (pointing to mesos leader ui)
  // It returns a url
  taskSandboxLinkGenerator: function (executorId) {
    return null;
  },

};
