/*
 * Copyright 2018 Walmart.
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

  describe('LBaaS v2 Edit L7Policy Action Service', function() {
    var policy, service;

    beforeEach(module('horizon.dashboard.project.lbaasv2'));

    beforeEach(module(function($provide) {
      $provide.value('$modal', {
        open: function() {
          return {
            result: {
              then: function(func) {
                func({ data: { id: 'l7policy1' } });
              }
            }
          };
        }
      });
    }));

    beforeEach(inject(function ($injector) {
      policy = $injector.get('horizon.app.core.openstack-service-api.policy');
      service = $injector.get('horizon.dashboard.project.lbaasv2.l7policies.actions.edit');
    }));

    it('should check policy to allow editing a l7policy', function() {
      spyOn(policy, 'ifAllowed').and.returnValue(true);
      expect(service.allowed()).toBe(true);
      expect(policy.ifAllowed).toHaveBeenCalled();
    });

    it('should handle the action result properly', function() {
      var result = service.handle({config: {data: {l7policy: {id: 1}}}});
      expect(result.updated[0].id).toBe(1);
    });

  });
})();
