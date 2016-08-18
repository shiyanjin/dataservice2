/**
 * Created by Administrator on 2016/5/30.
 */
var app = angular.module('app', [
    'ngAnimate',
    'ngCookies',
    'ui.router',
    'ui.bootstrap'
])
    .run(
        ['$rootScope', '$state', '$stateParams',
            function ($rootScope, $state, $stateParams) {
                $rootScope.$state = $state;
                $rootScope.$stateParams = $stateParams;
                //$rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
                //})
            }
        ]
    )
    .config(
        ['$stateProvider', '$urlRouterProvider',
            function ($stateProvider, $urlRouterProvider) {
                $urlRouterProvider
                    .otherwise('signIn');
                $stateProvider
                //登录
                    .state('signIn', {
                        url: '/signIn',
                        templateUrl: './static/login.html',
                        controller: 'loginCtl'
                    })
                    //基本信息
                    .state('info', {
                        url: '/info',
                        templateUrl: './static/info.html',
                        controller: 'info'
                    })
                    //官网首页
                    .state('webIndex', {
                        url: '/webIndex',
                        templateUrl: './static/website/websiteIndex.html',
                        controller: 'webIndex'
                    })
                    //目录
                    .state('menu', {
                        url: '/menu',
                        templateUrl: './static/webMenu.html',
                        controller: 'NavBarController'
                    })
                    // 官网-数据服务
                    // 二级目录-用户中心
                    .state('menu.menu-user', {
                        url: '/menu-user',
                        templateUrl: './static/menu2.html',
                        controller: 'menuUserController'
                    })
                    // 用户信息
                    .state('menu.menu-user.user', {
                        url: '/user',
                        template: '<div ui-view></div>'
                    })
                    // 宏观用户信息
                    .state('menu.menu-user.user.macro', {
                        url: '/macro',
                        templateUrl: './static/website/user/user-manger/macro.html',
                        controller: 'macroCtrl'
                    })
                    // 用户概况
                    .state('menu.menu-user.user.overview', {
                        url: '/overview',
                        templateUrl: './static/website/user/user-manger/overview.html',
                        controller: 'userOverviewCtrl'
                    })
                    // 用户留存率
                    .state('menu.menu-user.user.remain', {
                        url: '/remain',
                        templateUrl: './static/website/user/user-manger/remain.html',
                        controller: 'remainCtrl'
                    })
                    // 用户信息明细
                    .state('menu.menu-user.user.detail', {
                        url: '/detail',
                        templateUrl: './static/website/user/user-manger/detail.html',
                        controller: 'userDetailCtrl'
                    })
                    // 用户分析
                    .state('menu.menu-user.user-analyze', {
                        url: '/user-analyze',
                        template: '<div ui-view></div>'
                    })
                    // 访问量分析
                    .state('menu.menu-user.user-analyze.visit', {
                        url: '/visit',
                        templateUrl: './static/website/user/user-analyze/visit-number.html',
                        controller: 'visitCtrl'
                    })
                    // 访问人数分析
                    .state('menu.menu-user.user-analyze.visitor', {
                        url: '/visitor',
                        templateUrl: './static/website/user/user-analyze/visitor-number.html',
                        controller: 'visitorCtrl'
                    })
                    // 设备分析
                    .state('menu.menu-user.device', {
                        url: '/device',
                        template: '<div ui-view></div>'
                    })
                    // 设备分析
                    .state('menu.menu-user.device.device', {
                        url: '/device',
                        templateUrl: './static/website/user/device-analyze/device.html',
                        controller: 'deviceCtrl'
                    })
                    // 地域分析
                    .state('menu.menu-user.location', {
                        url: '/location',
                        template: '<div ui-view></div>'
                    })
                    // 地域分析
                    .state('menu.menu-user.location.location', {
                        url: '/location',
                        templateUrl: './static/website/user/location-analyze/location.html',
                        controller: 'locationCtrl'
                    })
                    // 二级目录-交易中心
                    .state('menu.menu-trade', {
                        url: '/menu-trade',
                        templateUrl: './static/menu2.html',
                        controller: 'tradeController'
                    })
                    // 经营分析
                    .state('menu.menu-trade.operate', {
                        url: '/operate',
                        template: '<div ui-view></div>'
                    })
                    // 经营概况
                    .state('menu.menu-trade.operate.overview', {
                        url: '/overview',
                        templateUrl: './static/website/trade/operate/overview.html',
                        controller: 'tradeOverviewController'
                    })
                    // 经营总览明细
                    .state('menu.menu-trade.operate.detail', {
                        url: '/detail',
                        templateUrl: './static/website/trade/operate/detail.html',
                        controller: 'tradeDetailController'
                    })
                    // 商品交易明细
                    .state('menu.menu-trade.operate.orderDetail', {
                        url: '/orderDetail',
                        templateUrl: './static/website/trade/operate/orderDetail.html',
                        controller: 'orderDetailController'
                    })
                    // 流量分析
                    .state('menu.menu-trade.flow', {
                        url: '/flow',
                        template: '<div ui-view></div>'
                    })
                    // 流量分析明细
                    .state('menu.menu-trade.flow.detail', {
                        url: '/detail',
                        templateUrl: './static/website/trade/flow/detail.html',
                        controller: 'flewDetailController'
                    })
                    // 交易分析
                    .state('menu.menu-trade.trade', {
                        url: '/trade',
                        template: '<div ui-view></div>'
                    })
                    // 价格带构成
                    .state('menu.menu-trade.trade.price', {
                        url: '/price',
                        templateUrl: './static/website/trade/trade/price.html',
                        controller: 'priceController'
                    })
                    // 二级目录-服务中心
                    .state('menu.menu-service', {
                        url: '/menu-service',
                        templateUrl: './static/menu2.html',
                        controller: 'serviceController'
                    })
                    // 流量分析
                    .state('menu.menu-service.flow', {
                        url: '/flow',
                        template: '<div ui-view></div>'
                    })
                    // 流量概况
                    .state('menu.menu-service.flow.overview', {
                        url: '/overview',
                        templateUrl: './static/website/service/flow/overview.html',
                        controller: 'flowOverviewCtl'
                    })
                    // 流量总览明细
                    .state('menu.menu-service.flow.detail', {
                        url: '/detail',
                        templateUrl: './static/website/service/flow/detail.html',
                        controller: 'flowDetailCtl'
                    })
                    // 流量来源分析
                    .state('menu.menu-service.flow.from', {
                        url: '/from',
                        templateUrl: './static/website/service/flow/from.html',
                        controller: 'flowFromCtl'
                    })
                    // 流量下载分析
                    .state('menu.menu-service.flow.download', {
                        url: '/download',
                        templateUrl: './static/website/service/flow/download.html',
                        controller: 'flowDownloadCtl'
                    })
                    // 用户分析
                    .state('menu.menu-service.user', {
                        url: '/trade',
                        template: '<div ui-view></div>'
                    })
                    // 会员分析
                    .state('menu.menu-service.user.member', {
                        url: '/member',
                        templateUrl: './static/website/service/user/member.html',
                        controller: 'memberCtl'
                    })
                    // 地域分析
                    .state('menu.menu-service.user.locate', {
                        url: '/locate',
                        templateUrl: './static/website/service/user/locate.html',
                        controller: 'locateCtl'
                    })
                    // 设备分析
                    .state('menu.menu-service.user.device', {
                        url: '/device',
                        templateUrl: './static/website/service/user/device.html',
                        controller: 'deviceCtl'
                    })
                    // BBS首页
                    .state('bbsIndex', {
                        url: '/bbsIndex',
                        templateUrl: './static/BBS/bbsIndex.html',
                        controller: 'bbsIndex'
                    })
                    // bbsmenu
                    .state('bbsmenu', {
                        url: '/bbsmenu',
                        templateUrl: './static/bbsMenu.html',
                        controller: 'NavBarController'
                    })
                    // 二级菜单
                    .state('bbsmenu.menu2', {
                        url: '/menu2',
                        templateUrl: './static/menu2.html',
                        controller: 'bbsMenuCtl'
                    })
                    // 流量分析
                    .state('bbsmenu.menu2.flow', {
                        url: '/flow',
                        template: '<div ui-view></div>'
                    })
                    // 宏观运营分析
                    .state('bbsmenu.menu2.flow.macro', {
                        url: '/macro',
                        templateUrl: './static/BBS/flow/macro.html',
                        controller: 'bbsFlowMacroCtl'
                    })
                    // 流量总览详情
                    .state('bbsmenu.menu2.flow.overview', {
                        url: '/overview',
                        templateUrl: './static/BBS/flow/overview.html',
                        controller: 'bbsFlowOverviewCtl'
                    })

            }
        ]
    )
