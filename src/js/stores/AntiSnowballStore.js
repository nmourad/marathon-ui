import {EventEmitter} from "events";

import AppDispatcher from "../AppDispatcher";
import AntiSnowballEvents from "../events/AntiSnowballEvents";

import Util from "../helpers/Util";

const storeData = {
  antiSnowballStatus: {}
};

var AntiSnowballStore = Util.extendObject(EventEmitter.prototype, {
  getAntiSnowballStatus: function (appId) {
    var antiSnowballStatus = storeData[appId];
    if (antiSnowballStatus != null) {
      return antiSnowballStatus;
    } else {
      return {};
    }
  }
});

AppDispatcher.register(function (action) {
  switch (action.actionType) {
    case AntiSnowballEvents.REQUEST:
      storeData[action.appId] = action.data.body;
      AntiSnowballStore.emit(AntiSnowballEvents.CHANGE);
      break;
    case AntiSnowballEvents.REQUEST_ERROR:
      AntiSnowballStore.emit(
        AntiSnowballEvents.REQUEST_ERROR,
        action.data.body
      );
      break;
  }
});

export default AntiSnowballStore;
