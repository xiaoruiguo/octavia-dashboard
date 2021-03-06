/*
 * Copyright 2016 IBM Corp.
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
    .factory('horizon.dashboard.project.lbaasv2.loadbalancers.actions.edit', editService);

  editService.$inject = [
    'horizon.dashboard.project.lbaasv2.loadbalancers.resourceType',
    'horizon.framework.util.actions.action-result.service',
    'horizon.dashboard.project.lbaasv2.workflow.modal',
    'horizon.app.core.openstack-service-api.policy',
    'horizon.framework.util.q.extensions',
    'horizon.framework.util.i18n.gettext'
  ];

  /**
   * @ngdoc service
   * @ngname horizon.dashboard.project.lbaasv2.loadbalancers.actions.edit
   *
   * @description
   * Provides the service for the edit load balancer action.
   *
   * @param resourceType The loadbalancer resource type.
   * @param actionResultService The horizon action result service.
   * @param workflowModal The LBaaS workflow modal service.
   * @param policy The horizon policy service.
   * @param qExtensions Horizon extensions to the $q service.
   * @param gettext The horizon gettext function for translation.
   *
   * @returns Edit load balancer action service.
   */

  function editService(
    resourceType, actionResultService, workflowModal, policy,
    qExtensions, gettext
  ) {

    return workflowModal.init({
      controller: 'EditLoadBalancerWizardController',
      message: gettext('The load balancer has been updated.'),
      handle: handle,
      allowed: allowed
    });

    ///////////////

    function allowed() {
      return policy.ifAllowed({
        rules: [['load-balancer', 'os_load-balancer_api:loadbalancer:put']]
      });
    }

    function handle(response) {
      return actionResultService.getActionResult()
        .updated(resourceType, response.config.data.loadbalancer.id)
        .result;
    }
  }

})();
