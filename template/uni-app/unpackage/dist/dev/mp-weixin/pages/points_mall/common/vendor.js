(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["pages/points_mall/common/vendor"],{

/***/ 1031:
/*!*****************************************************************!*\
  !*** C:/Users/46708/Desktop/uni-app/uni-app/api/points_mall.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getStoreIntegral = getStoreIntegral;
var _request = _interopRequireDefault(__webpack_require__(/*! @/utils/request.js */ 39));
// +----------------------------------------------------------------------
// | CRMEB [ CRMEB赋能开发者，助力企业发展 ]
// +----------------------------------------------------------------------
// | Copyright (c) 2016~2023 https://www.crmeb.com All rights reserved.
// +----------------------------------------------------------------------
// | Licensed CRMEB并不是自由软件，未经许可不能去掉CRMEB相关版权
// +----------------------------------------------------------------------
// | Author: CRMEB Team <admin@crmeb.com>
// +----------------------------------------------------------------------

/**
 * 积分商城
 */
function getStoreIntegral(data) {
  return _request.default.get("store_integral/index", data);
}

/***/ })

}]);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/points_mall/common/vendor.js.map