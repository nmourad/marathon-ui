import ajaxWrapper from "../helpers/ajaxWrapper";

import config from "../config/config";

import AppDispatcher from "../AppDispatcher";
import AntiSnowballEvents from "../events/AntiSnowballEvents";

var AntiSnowballActions = {
  requestAntiSnowball: function (appId) {
    this.request({
      url: `${config.apiURL}v2/apps/${appId}/antisnowball`
    })
      .success(function (antisnowballStatus) {
        AppDispatcher.dispatch({
          actionType: AntiSnowballEvents.REQUEST,
          data: antisnowballStatus,
          appId: appId
        });
      })
      .error(function (error) {
        AppDispatcher.dispatch({
          actionType: AntiSnowballEvents.REQUEST_ERROR,
          data: error
        });
      });
  },
  request: ajaxWrapper
};

export default AntiSnowballActions;
