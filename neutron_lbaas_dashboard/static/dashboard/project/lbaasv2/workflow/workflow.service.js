/*
 * Copyright 2015 IBM Corp.
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
(function () {
  'use strict';

  angular
    .module('horizon.dashboard.project.lbaasv2')
    .factory('horizon.dashboard.project.lbaasv2.workflow.workflow', lbaasWorkflow);

  lbaasWorkflow.$inject = [
    'horizon.dashboard.project.lbaasv2.basePath',
    'horizon.app.core.workflow.factory',
    'horizon.framework.util.i18n.gettext'
  ];

  function lbaasWorkflow(basePath, dashboardWorkflow, gettext) {
    var workflowSteps = [
      {
        id: 'loadbalancer',
        title: gettext('Load Balancer Details'),
        templateUrl: basePath + 'workflow/loadbalancer/loadbalancer.html',
        helpUrl: basePath + 'workflow/loadbalancer/loadbalancer.help.html',
        formName: 'loadBalancerDetailsForm'
      },
      {
        id: 'listener',
        title: gettext('Listener Details'),
        templateUrl: basePath + 'workflow/listener/listener.html',
        helpUrl: basePath + 'workflow/listener/listener.help.html',
        formName: 'listenerDetailsForm'
      },
      {
        id: 'pool',
        title: gettext('Pool Details'),
        templateUrl: basePath + 'workflow/pool/pool.html',
        helpUrl: basePath + 'workflow/pool/pool.help.html',
        formName: 'poolDetailsForm'
      },
      {
        id: 'members',
        title: gettext('Pool Members'),
        templateUrl: basePath + 'workflow/members/members.html',
        helpUrl: basePath + 'workflow/members/members.help.html',
        formName: 'memberDetailsForm'
      },
      {
        id: 'monitor',
        title: gettext('Monitor Details'),
        templateUrl: basePath + 'workflow/monitor/monitor.html',
        helpUrl: basePath + 'workflow/monitor/monitor.help.html',
        formName: 'monitorDetailsForm'
      }
    ];

    return initWorkflow;

    function initWorkflow(title, icon, steps) {
      return dashboardWorkflow({
        title: title,
        btnText: {
          finish: title
        },
        btnIcon: {
          finish: icon
        },
        steps: steps ? workflowSteps.filter(function(step) {
          return steps.indexOf(step.id) > -1;
        }) : workflowSteps
      });
    }
  }

})();
