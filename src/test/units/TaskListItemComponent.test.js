import {expect} from "chai";
import {shallow} from "enzyme";

import React from "react/addons";
import TaskListItemComponent from "../../js/components/TaskListItemComponent";
import Config from "../../js/config/config";
import AppsStore from "../../js/stores/AppsStore";

Config.taskLogsLinkGenerator = function (appId, taskId) {
  return "https://logs-store?appId=" + appId + "&taskId=" + taskId;
};
Config.debugLinkGenerator = function (taskId) {
  return "https://debug/?taskId=" + taskId;
};

describe("Task List Item component", function () {

  before(function () {
    var model = {
      appId: "/app-1",
      id: "task-123",
      host: "host-1",
      ports: [8081, 8082, 8083],
      status: "status-0",
      updatedAt: "2015-06-29T14:11:58.709Z",
      version: "2015-06-29T13:54:24.171Z",
      ipAddresses: [{ipAddress: "192.168.0.10", protocol: "IPv4"}]
    };

    this.component = shallow(
      <TaskListItemComponent appId={"/app-1"}
                             hasHealth={true}
                             labels={{}}
                             taskHealthMessage="Healthy"
                             isActive={false}
                             onToggle={()=>{}}
                             task={model} />
    );
  });

  it("has the correct task id", function () {
    expect(this.component
      .find("td")
      .at(1)
      .children()
      .first()
      .text()
    ).to.equal("task-123");
  });

  describe("service url are correct", function() {
    function getNthServiceLink(component, n) {
      return component.find("td")
        .at(1).children()
        .at(2).children()
        .at(2 + n).children().first().props().href
    }

    it("has a HTTP service url when app does not have scheme label", function() {
      expect(getNthServiceLink(this.component, 0)).to.equal("http://192.168.0.10:8081");
      expect(getNthServiceLink(this.component, 1)).to.equal("http://192.168.0.10:8082");
      expect(getNthServiceLink(this.component, 2)).to.equal("http://192.168.0.10:8083");
    });

    it("has only https schemes", function() {
      var model = {
        appId: "/app-1",
        id: "task-123",
        host: "host-1",
        ports: [8081, 8082, 8083],
        status: "status-0",
        updatedAt: "2015-06-29T14:11:58.709Z",
        version: "2015-06-29T13:54:24.171Z",
      	ipAddresses: [{ipAddress: "192.168.0.10", protocol: "IPv4"}]
      };
  
      this.component = shallow(
        <TaskListItemComponent appId={"/app-1"}
                               hasHealth={true}
                               taskHealthMessage="Healthy"
                               isActive={false}
                               labels={{ 
                                 "MARATHON_SERVICE_SCHEME": "https"
                                }}
                               onToggle={()=>{}}
                               task={model} />
      );
      expect(getNthServiceLink(this.component, 0)).to.equal("https://192.168.0.10:8081");
      expect(getNthServiceLink(this.component, 1)).to.equal("https://192.168.0.10:8082");
      expect(getNthServiceLink(this.component, 2)).to.equal("https://192.168.0.10:8083");
    })

    it("has different schemes depending on the port", function() {
      var model = {
        appId: "/app-1",
        id: "task-123",
        host: "host-1",
        ports: [8081, 8082, 8083],
        status: "status-0",
        updatedAt: "2015-06-29T14:11:58.709Z",
        version: "2015-06-29T13:54:24.171Z",
      	ipAddresses: [{ipAddress: "192.168.0.10", protocol: "IPv4"}]
      };
  
      this.component = shallow(
        <TaskListItemComponent appId={"/app-1"}
                               hasHealth={true}
                               taskHealthMessage="Healthy"
                               isActive={false}
                               labels={{ 
                                 "MARATHON_SERVICE_SCHEME_0": "https",
                                 "MARATHON_SERVICE_SCHEME_2": "http"
                                }}
                               onToggle={()=>{}}
                               task={model} />
      );
      expect(getNthServiceLink(this.component, 0)).to.equal("https://192.168.0.10:8081");
      expect(getNthServiceLink(this.component, 1)).to.equal("http://192.168.0.10:8082");
      expect(getNthServiceLink(this.component, 2)).to.equal("http://192.168.0.10:8083");
    })
  })

  it("has correct health message", function () {
    expect(this.component.find("td").at(2).text()).to.equal("Healthy");
  });

  it("has the correct status", function () {
    expect(this.component.find("td").at(3).text()).to.equal("status-0");
  });

  it("has the correct version", function () {
    expect(this.component
      .find("td")
      .at(10)
      .children()
      .first()
      .props()
      .title
    ).to.equal("2015-06-29T13:54:24.171Z");
  });

  it("has the correct update timestamp", function () {
    var cellProps = this.component
      .find("td")
      .at(11)
      .children()
      .first()
      .props();
    expect(cellProps.title).to.equal("2015-06-29T14:11:58.709Z");
    expect(cellProps.dateTime).to.equal("2015-06-29T14:11:58.709Z");
  });

  it("has the correct logs link", function () {
    var a = this.component
    .find("td")
    .at(5)
    .children()
    .first()
    .props();
    expect(a.href).to.equal("https://logs-store?appId=/app-1&taskId=task-123");
  });

  it("has the correct debug link", function () {
    var a = this.component
    .find("td")
    .at(9)
    .children()
    .first()
    .props();
    expect(a.href).to.equal("https://debug/?taskId=task-123");
  });
});
