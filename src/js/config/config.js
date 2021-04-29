import packageJSON from "../../../package.json";

var config = Object.assign({
  // @@ENV gets replaced by build system
  environment: "@@ENV",
  // If the UI is served through a proxied URL, this can be set here.
  rootUrl: "",
  // Defines the Marathon API URL,
  // leave empty to use the same as the UI is served.
  apiURL: "../",
  // Intervall of API request in ms
  updateInterval: 5000,
  // Local http server URI while tests run
  localTestserverURI: {
    address: "localhost",
    port: 8181
  },
  mesosLeaderUiUrl: null,
  // The generator building the logs links for applications
  // input: appId
  // output: the link to the logs
  appLogsLinkGenerator: function () {
    return "";
  },
  // The generator building the logs links for tasks
  // input: appId, taskId
  // output: the link to the logs
  taskLogsLinkGenerator: function () {
    return "";
  },

  // The generator building the monitoring link for tasks
  // input: appId, taskId
  // output: the link to the logs
  taskMonitoringLinkGenerator: function () {
    return "";
  },

  // The generator building the traffic dump link for tasks
  // input: appId, taskId
  // output: the link to the logs
  taskTrafficDumpLinkGenerator: function () {
    return "";
  },

  // Size of page size on task list
  taskPageSize: 8,
  // The generator build the exec links for tasks debugging
  // input: the taskId
  // output: the to the web terminal
  debugLinkGenerator: function () {
    return "";
  },
  // The generator build the exec links for host
  // input: the host name
  // output: the link to the host
  hostLinkGenerator: function () {
    return "";
  },
  // The generator building link to sandbox to override
  // default urls (pointing to mesos leader ui)
  // It returns a url
  taskSandboxLinkGenerator: function (executorId) {
    return null;
  },

  // The generate build a link to diagnose broken deployments
  // It returns a url on which a GET will be made.
  // the api calls is expected to return a json of the form:
  // {
  //   success: true
  //   hints: [ String, String, [..] ]
  // }
  deploymentDiagnosisUrlGenerate: function () {
    return null;
  },

  // Callback when "troubleshoot" button is clicked
  troubleshootApp: function (appId) {
    return null;
  },

  serviceDomain: "",
  version: ("@@TEAMCITY_UI_VERSION".indexOf("@@TEAMCITY") === -1) ?
    "@@TEAMCITY_UI_VERSION" :
    `${packageJSON.version}-SNAPSHOT`
}, runtimeConfig);

export default config;
