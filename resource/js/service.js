angular.module('app')
    .service('service', ['$http', function ($http) {
        return {
            // 获取菜单
            getMenu: function (id) {
                return  $http({
                    method: 'POST',
                    url:'/api/common/submenu',
                    data: $.param({resourceId:id}),
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                })
            }
        }
    }])