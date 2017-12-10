/*
 * Copyright 2015 IBM Corp.
 * Copyright 2017 Walmart.
 *
 * Licensed under the Apache License, Version 2.0 (the 'License');
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an 'AS IS' BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
(function() {
  'use strict';

  angular
    .module('horizon.dashboard.project.lbaasv2.loadbalancers')
    .controller('LoadBalancerDetailController', LoadBalancerDetailController);

  LoadBalancerDetailController.$inject = [
    'loadbalancer',
    'horizon.dashboard.project.lbaasv2.loadbalancers.service',
    'horizon.dashboard.project.lbaasv2.loadbalancers.resourceType',
    'horizon.framework.conf.resource-type-registry.service',
    'horizon.framework.widgets.modal-wait-spinner.service',
    '$q'
  ];

  /**
   * @ngdoc controller
   * @name LoadBalancerDetailController
   *
   * @description
   * Controller for the LBaaS v2 load balancers detail page.
   *
   * @param loadbalancer The loadbalancer object.
   * @param loadBalancersService The LBaaS v2 load balancers service.
   * @param resourceType The load balancer resource type.
   * @param typeRegistry The horizon type registry service.
   * @param spinnerService The horizon modal wait spinner service.
   * @param $q The angular service for promises.
   *
   * @returns undefined
   */

  function LoadBalancerDetailController(
    loadbalancer, loadBalancersService, resourceType, typeRegistry,
    spinnerService, $q
  ) {
    var ctrl = this;

    ctrl.operatingStatus = loadBalancersService.operatingStatus;
    ctrl.provisioningStatus = loadBalancersService.provisioningStatus;
    ctrl.loadbalancer = loadbalancer;
    ctrl.listFunctionExtraParams = {
      loadbalancerId: ctrl.loadbalancer.id
    };
    ctrl.resourceType = typeRegistry.getResourceType(resourceType);
    ctrl.context = {};
    ctrl.context.identifier = loadbalancer.id;

    ctrl.resultHandler = actionResultHandler;

    function actionResultHandler(returnValue) {
      return $q.when(returnValue, actionSuccessHandler);
    }

    function loadData(response) {
      spinnerService.hideModalSpinner();
      ctrl.showDetails = true;
      ctrl.resourceType.initActions();
      ctrl.loadbalancer = response.data;
      ctrl.loadbalancer.floating_ip_address = response.data.floating_ip.ip;
    }

    function actionSuccessHandler(result) {
      // The action has completed (for whatever "complete" means to that
      // action. Notice the view doesn't really need to know the semantics of the
      // particular action because the actions return data in a standard form.
      // That return includes the id and type of each created, updated, deleted
      // and failed item.
      // Currently just refreshes the display each time.
      if (result) {
        spinnerService.showModalSpinner(gettext('Please Wait'));
        ctrl.showDetails = false;
        ctrl.context.loadPromise = ctrl.resourceType.load(ctrl.context.identifier);
        ctrl.context.loadPromise.then(loadData);
      }
    }
  }

})();