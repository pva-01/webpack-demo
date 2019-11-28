/*
 * Demografic mark tool
 * Demografic mark tool API
 *
 * OpenAPI spec version: 1.0.0
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 *
 * Swagger Codegen version: 2.4.9
 *
 * Do not edit the class manually.
 *
 */

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['../ApiClient'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'));
  } else {
    // Browser globals (root is window)
    if (!root.DemograficMarkTool) {
      root.DemograficMarkTool = {};
    }
    root.DemograficMarkTool.Label = factory(root.DemograficMarkTool.ApiClient);
  }
}(this, function(ApiClient) {
  'use strict';

  /**
   * The Label model module.
   * @module model/Label
   * @version 1.0.0
   */

  /**
   * Constructs a new <code>Label</code>.
   * @alias module:model/Label
   * @class
   */
  var exports = function() {
  };

  /**
   * Constructs a <code>Label</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/Label} obj Optional instance to populate.
   * @return {module:model/Label} The populated <code>Label</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();
      if (data.hasOwnProperty('value'))
        obj.value = ApiClient.convertToType(data['value'], 'String');
    }
    return obj;
  }

  /**
   * Author label
   * @member {String} value
   */
  exports.prototype.value = undefined;

  return exports;

}));
