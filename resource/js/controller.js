angular.module("app")
// 一级菜单
    .controller("NavBarController", ['$http', '$scope', '$state', '$cookieStore',
        function ($http, $scope, $state, $cookieStore) {
            $scope.state = $state;
            var vm = $scope.vm = {};
            vm.menuclass = $cookieStore.get("menuclass");
            if (vm.menuclass == undefined) {
                vm.menuclass = 'app-header-fixed';
            }
            //将菜单样式保存在本地
            vm.changecollopes = function () {
                if (vm.menuclass == 'app-header-fixed') {
                    vm.menuclass = 'app-no-fixed';
                    $cookieStore.put("menuclass", "app-no-fixed");
                }
                else {
                    vm.menuclass = 'app-header-fixed';
                    $cookieStore.put("menuclass", "app-header-fixed");
                }
            }
            vm.logout = function () {
                $state.go('signin');
            }
        }])
    //登录
    .controller("info", ['$scope', '$state',
        function ($scope, $state) {
            var vm = $scope.vm = {};
            vm.edite = function () {
                $('#editbefore').hide();
                $('#editinfo').show();
            }
            vm.hide = function () {
                $('#editinfo').hide();
                $('#editbefore').show();
            }
        }])
    //基本信息
    .controller("loginCtl", ['$scope', '$state',
        function ($scope, $state) {
            var vm = $scope.vm = {};
            vm.login = function () {
                if (vm.username == "admin" && vm.password == "12345") {
                    $state.go('bbsmenu.menu2');
                } else {
                    swal("", "用户名或密码错误!", "error");
                }
            }
        }])
    //官网首页
    .controller("webIndex", ['$scope', '$state',
        function ($scope, $state) {
            var vm = $scope.vm = {};
            //时间控件
            var popup1 = $scope.popup1 = {opened: false};
            var popup2 = $scope.popup2 = {opened: false};

            $scope.open1 = function ($event) {
                popup1.opened = true;
            };
            $scope.open2 = function ($event) {
                popup2.opened = true;
            };
            $scope.dateOptions1 = {
                formatYear: 'yyyy/MM/dd',
                startingDay: 1,
                showWeeks: false,
                class: 'datepicker1'
            };

            $scope.dateOptions2 = {
                formatYear: 'yyyy/MM/dd',
                startingDay: 1,
                showWeeks: false,
                class: 'datepicker2'
            };
            //画图
            vm.drawchartpie = function () {
                require.config({
                    paths: {
                        echarts: './dependency/echarts/js'
                    }
                });
                require(
                    [
                        'echarts',
                        'echarts/chart/pie'
                    ],
                    function (ec) {
                        var myChart = ec.init(document.getElementById('mainpie'));

                        myChart.setOption({
                            title: {
                                text: '成员分析',
                                x: 'left'
                            },
                            tooltip: {
                                trigger: 'item',
                                formatter: "{a} <br/>{b} : {c} ({d}%)"
                            },
                            legend: {
                                orient: 'vertical',
                                left: 'left',
                                data: ['注册会员', '匿名用户', '金牌用户', '银派用户', '铁牌用户']
                            },
                            series: [
                                {
                                    name: '访问来源',
                                    type: 'pie',
                                    radius: '55%',
                                    center: ['50%', '60%'],
                                    data: [
                                        {value: 335, name: '注册会员'},
                                        {value: 310, name: '匿名用户'},
                                        {value: 234, name: '金牌用户'},
                                        {value: 135, name: '银派用户'},
                                        {value: 1548, name: '铁牌用户'}
                                    ],
                                    itemStyle: {
                                        emphasis: {
                                            shadowBlur: 10,
                                            shadowOffsetX: 0,
                                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                                        }
                                    }
                                }
                            ]
                        });

                    }
                );
            }
            vm.drawchartpie();
        }])
    // 二级菜单11
    .controller("menuUserController", ['$http', '$scope', '$state', 'service',
        function ($http, $scope, $state, service) {
            $scope.state = $state;
            var vm = $scope.vm = {};
            vm.getmenu = function (ID) {
                service.getMenu(ID).success(function (data) {
                    console.log(data);
                    $scope.NavData = data.data;
                }).error(function () {
                    swal("", "菜单获取失败!", "error");
                })
            }
            vm.getmenu('33')
        }])
    // 宏观用户信息
    .controller("macroCtrl", ['$scope', '$state',
        function ($scope, $state) {
            var vm = $scope.vm = {};
            //时间控件
            var popup1 = $scope.popup1 = {opened: false};
            $scope.open1 = function ($event) {
                popup1.opened = true;
            };
            $scope.dateOptions1 = {
                formatYear: 'yyyy/MM/dd',
                startingDay: 1,
                showWeeks: false,
                class: 'datepicker1'
            };
            //画图
            vm.drawchartfunnel = function () {
                require.config({
                    paths: {
                        echarts: './dependency/echarts/js'
                    }
                });
                require(
                    [
                        'echarts',
                        'echarts/chart/funnel'
                    ],
                    function (ec) {
                        var myChart = ec.init(document.getElementById('main'));

                        myChart.setOption({

                            title: {
                                text: '用户留存'
                            },
                            tooltip: {
                                trigger: 'item',
                                formatter: "{a} <br/>{b} : {c}%"
                            },
                            toolbox: {
                                show: true,
                                feature: {
                                    mark: {show: true},
                                    dataView: {show: true, readOnly: false},
                                    restore: {show: true},
                                    saveAsImage: {show: true}
                                }
                            },
                            legend: {
                                data: ['展现', '点击', '访问', '咨询', '订单']
                            },
                            calculable: true,
                            series: [
                                {
                                    name: '漏斗图',
                                    type: 'funnel',
                                    width: '40%',
                                    data: [
                                        {value: 60, name: '访问'},
                                        {value: 40, name: '咨询'},
                                        {value: 20, name: '订单'},
                                        {value: 80, name: '点击'},
                                        {value: 100, name: '展现'}
                                    ]
                                },
                                {
                                    name: '金字塔',
                                    type: 'funnel',
                                    x: '55%',
                                    itemStyle: {
                                        normal: {
                                            // color: 各异,
                                            label: {
                                                position: 'left'
                                            }
                                        }
                                    },
                                    data: [
                                        {value: 60, name: '访问'},
                                        {value: 40, name: '咨询'},
                                        {value: 20, name: '订单'},
                                        {value: 80, name: '点击'},
                                        {value: 100, name: '展现'}
                                    ]
                                }
                            ]
                        });

                    }
                );
            }
            vm.drawchartfunnel();
        }])
    // 用户概况
    .controller("userOverviewCtrl", ['$scope', '$state', '$stateParams',
        function ($scope, $state, $stateParams) {
            var vm = $scope.vm = {};
            //分页
            $scope.totalPages = 20;//总页数
            $scope.totalItems = 100;//总条数
            $scope.currentPage = 1;//游标
            $scope.maxSize = 5;
            $scope.setPageNo = '';
            $scope.setPage = function () {
                $scope.currentPage = $scope.setPageNo;
            };
        }])
    // 用户留存率
    .controller("remainCtrl", ['$scope', '$state', '$stateParams',
        function ($scope, $state, $stateParams) {
            var vm = $scope.vm = {};
            //分页
            $scope.totalPages = 20;//总页数
            $scope.totalItems = 100;//总条数
            $scope.currentPage = 1;//游标
            $scope.maxSize = 5;
            $scope.setPageNo = '';
            $scope.setPage = function () {
                $scope.currentPage = $scope.setPageNo;
            };
        }])
    // 商户信息明细
    .controller("userDetailCtrl", ['$scope', '$state', '$stateParams',
        function ($scope, $state, $stateParams) {
            var vm = $scope.vm = {};
            //分页
            $scope.totalPages = 20;//总页数
            $scope.totalItems = 100;//总条数
            $scope.currentPage = 1;//游标
            $scope.maxSize = 5;
            $scope.setPageNo = '';
            $scope.setPage = function () {
                $scope.currentPage = $scope.setPageNo;
            };
        }])
    // 访问量分析
    .controller("visitCtrl", ['$scope', '$state', '$stateParams',
        function ($scope, $state, $stateParams) {
            var vm = $scope.vm = {};
            //分页
            $scope.totalPages = 20;//总页数
            $scope.totalItems = 100;//总条数
            $scope.currentPage = 1;//游标
            $scope.maxSize = 5;
            $scope.setPageNo = '';
            $scope.setPage = function () {
                $scope.currentPage = $scope.setPageNo;
            };
        }])
    // 访问数分析
    .controller("visitorCtrl", ['$scope', '$state', '$stateParams',
        function ($scope, $state, $stateParams) {
            var vm = $scope.vm = {};
            //分页
            $scope.totalPages = 20;//总页数
            $scope.totalItems = 100;//总条数
            $scope.currentPage = 1;//游标
            $scope.maxSize = 5;
            $scope.setPageNo = '';
            $scope.setPage = function () {
                $scope.currentPage = $scope.setPageNo;
            };
        }])
    // 设备分析
    .controller("deviceCtrl", ['$scope', '$state', '$stateParams',
        function ($scope, $state, $stateParams) {
            var vm = $scope.vm = {};
            //分页
            $scope.totalPages = 20;//总页数
            $scope.totalItems = 100;//总条数
            $scope.currentPage = 1;//游标
            $scope.maxSize = 5;
            $scope.setPageNo = '';
            $scope.setPage = function () {
                $scope.currentPage = $scope.setPageNo;
            };
            //时间控件
            var popup1 = $scope.popup1 = {opened: false};
            var popup2 = $scope.popup2 = {opened: false};

            $scope.open1 = function ($event) {
                popup1.opened = true;
            };
            $scope.open2 = function ($event) {
                popup2.opened = true;
            };
            $scope.dateOptions1 = {
                formatYear: 'yyyy/MM/dd',
                startingDay: 1,
                showWeeks: false,
                class: 'datepicker1'
            };

            $scope.dateOptions2 = {
                formatYear: 'yyyy/MM/dd',
                startingDay: 1,
                showWeeks: false,
                class: 'datepicker2'
            };
        }])
    // 地域分析
    .controller("locationCtrl", ['$scope', '$state', '$stateParams',
        function ($scope, $state, $stateParams) {
            var vm = $scope.vm = {};
        }])

    // 帖子分析
    .controller('postCtl', ['$scope', '$state',
        function ($scope, $state) {
            var vm = $scope.vm = {};
            //日期控件
            var popup1 = $scope.popup1 = {opened: false};
            var popup2 = $scope.popup2 = {opened: false};
            var popup3 = $scope.popup3 = {opened: false};
            var popup4 = $scope.popup4 = {opened: false};
            var popup5 = $scope.popup5 = {opened: false};
            var popup6 = $scope.popup6 = {opened: false};

            $scope.open1 = function ($event) {
                popup1.opened = true;
            };
            $scope.open2 = function ($event) {
                popup2.opened = true;
            };
            $scope.open3 = function ($event) {
                popup3.opened = true;
            };
            $scope.open4 = function ($event) {
                popup4.opened = true;
            };
            $scope.open5 = function ($event) {
                popup5.opened = true;
            };
            $scope.open6 = function ($event) {
                popup6.opened = true;
            };

            $scope.dateOptions1 = {
                formatYear: 'yyyy/MM/dd',
                startingDay: 1,
                showWeeks: false,
                class: 'datepicker1'
            };

            $scope.dateOptions2 = {
                formatYear: 'yyyy/MM/dd',
                startingDay: 1,
                showWeeks: false,
                class: 'datepicker2'
            };
            $scope.dateOptions3 = {
                formatYear: 'yyyy/MM/dd',
                startingDay: 1,
                showWeeks: false,
                class: 'datepicker2'
            };
            $scope.dateOptions4 = {
                formatYear: 'yyyy/MM/dd',
                startingDay: 1,
                showWeeks: false,
                class: 'datepicker2'
            };
            $scope.dateOptions5 = {
                formatYear: 'yyyy/MM/dd',
                startingDay: 1,
                showWeeks: false,
                class: 'datepicker2'
            };
            $scope.dateOptions6 = {
                formatYear: 'yyyy/MM/dd',
                startingDay: 1,
                showWeeks: false,
                class: 'datepicker2'
            };
        }])
    // 二级菜单12
    .controller("tradeController", ['$http', '$scope', '$state', 'service',
        function ($http, $scope, $state, service) {
            $scope.state = $state;
            var vm = $scope.vm = {};
            vm.getmenu = function (ID) {
                service.getMenu(ID).success(function (data) {
                    console.log(data);
                    $scope.NavData = data.data;
                }).error(function () {
                    swal("", "菜单获取失败!", "error");
                })
            }
            vm.getmenu('34')
        }])
    // 经营概况
    .controller("tradeOverviewController", ['$http', '$scope', '$state', '$cookieStore',
        function ($http, $scope, $state, $cookieStore) {
            $scope.state = $state;
            var vm = $scope.vm = {};
            //时间控件
            var popup1 = $scope.popup1 = {opened: false};
            var popup2 = $scope.popup2 = {opened: false};

            $scope.open1 = function ($event) {
                popup1.opened = true;
            };
            $scope.open2 = function ($event) {
                popup2.opened = true;
            };
            $scope.dateOptions1 = {
                formatYear: 'yyyy/MM/dd',
                startingDay: 1,
                showWeeks: false,
                class: 'datepicker1'
            };

            $scope.dateOptions2 = {
                formatYear: 'yyyy/MM/dd',
                startingDay: 1,
                showWeeks: false,
                class: 'datepicker2'
            };

            //画图
            vm.drawchart = function () {
                require.config({
                    paths: {
                        echarts: './dependency/echarts/js'
                    }
                });
                require(
                    [
                        'echarts',
                        'echarts/chart/line'
                    ],
                    function (ec) {
                        var myChart = ec.init(document.getElementById('main'));

                        myChart.setOption({
                            title: {
                                text: '访客趋势图'
                            },
                            tooltip: {
                                trigger: 'axis'
                            },
                            calculable: true,
                            xAxis: [
                                {
                                    type: 'category',
                                    boundaryGap: false,
                                    data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
                                }
                            ],
                            yAxis: [
                                {
                                    type: 'value'
                                }
                            ],
                            series: [
                                {
                                    name: '最高气温',
                                    type: 'line',
                                    data: [11, 11, 15, 13, 12, 13, 10]
                                }
                            ]
                        });

                    }
                );
            }
            vm.drawchartpie = function (title, id) {
                require.config({
                    paths: {
                        echarts: './dependency/echarts/js'
                    }
                });
                require(
                    [
                        'echarts',
                        'echarts/chart/pie'
                    ],
                    function (ec) {
                        var myChart = ec.init(document.getElementById(id));

                        myChart.setOption({
                            title: {
                                text: title
                            },
                            legend: {
                                orient: 'vertical',
                                x: 'right',
                                data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
                            },
                            calculable: true,
                            series: [
                                {
                                    name: '访问来源',
                                    type: 'pie',
                                    radius: ['50%', '70%'],
                                    itemStyle: {
                                        normal: {
                                            label: {
                                                show: false
                                            },
                                            labelLine: {
                                                show: false
                                            }
                                        },
                                        emphasis: {
                                            label: {
                                                show: true,
                                                position: 'center',
                                                textStyle: {
                                                    fontSize: '30',
                                                    fontWeight: 'bold'
                                                }
                                            }
                                        }
                                    },
                                    data: [
                                        {value: 335, name: '直接访问'},
                                        {value: 310, name: '邮件营销'},
                                        {value: 234, name: '联盟广告'},
                                        {value: 135, name: '视频广告'},
                                        {value: 1548, name: '搜索引擎'}
                                    ]
                                }
                            ]

                        });

                    }
                );
            }
            vm.drawchart();
            vm.drawchartpie('品类', 'mainpie1')
            vm.drawchartpie('会员分布', 'mainpie2')
        }])
    // 经营总览明细
    .controller("tradeDetailController", ['$scope', '$state', '$stateParams',
        function ($scope, $state, $stateParams) {
            var vm = $scope.vm = {};
            //时间控件
            var popup1 = $scope.popup1 = {opened: false};
            var popup2 = $scope.popup2 = {opened: false};

            $scope.open1 = function ($event) {
                popup1.opened = true;
            };
            $scope.open2 = function ($event) {
                popup2.opened = true;
            };
            $scope.dateOptions1 = {
                formatYear: 'yyyy/MM/dd',
                startingDay: 1,
                showWeeks: false,
                class: 'datepicker1'
            };

            $scope.dateOptions2 = {
                formatYear: 'yyyy/MM/dd',
                startingDay: 1,
                showWeeks: false,
                class: 'datepicker2'
            };
            //分页
            $scope.totalPages = 20;//总页数
            $scope.totalItems = 100;//总条数
            $scope.currentPage = 1;//游标
            $scope.maxSize = 5;
            $scope.setPageNo = '';
            $scope.setPage = function () {
                $scope.currentPage = $scope.setPageNo;
            };
        }])
    // 商品交易明细
    .controller("orderDetailController", ['$scope', '$state', '$stateParams',
        function ($scope, $state, $stateParams) {
            var vm = $scope.vm = {};
            //时间控件
            //日期控件
            var popup1 = $scope.popup1 = {opened: false};
            var popup2 = $scope.popup2 = {opened: false};
            var popup3 = $scope.popup3 = {opened: false};
            var popup4 = $scope.popup4 = {opened: false};

            $scope.open1 = function ($event) {
                popup1.opened = true;
            };
            $scope.open2 = function ($event) {
                popup2.opened = true;
            };
            $scope.open3 = function ($event) {
                popup3.opened = true;
            };
            $scope.open4 = function ($event) {
                popup4.opened = true;
            };

            $scope.dateOptions1 = {
                formatYear: 'yyyy/MM/dd',
                startingDay: 1,
                showWeeks: false,
                class: 'datepicker1'
            };

            $scope.dateOptions2 = {
                formatYear: 'yyyy/MM/dd',
                startingDay: 1,
                showWeeks: false,
                class: 'datepicker2'
            };
            $scope.dateOptions3 = {
                formatYear: 'yyyy/MM/dd',
                startingDay: 1,
                showWeeks: false,
                class: 'datepicker2'
            };
            $scope.dateOptions4 = {
                formatYear: 'yyyy/MM/dd',
                startingDay: 1,
                showWeeks: false,
                class: 'datepicker2'
            };
            //分页
            $scope.totalPages = 20;//总页数
            $scope.totalItems = 100;//总条数
            $scope.currentPage = 1;//游标
            $scope.maxSize = 5;
            $scope.setPageNo = '';
            $scope.setPage = function () {
                $scope.currentPage = $scope.setPageNo;
            };
        }])
    // 流量分析明细
    .controller("flewDetailController", ['$scope', '$state', '$stateParams',
        function ($scope, $state, $stateParams) {
            var vm = $scope.vm = {};
            //时间控件
            //日期控件
            var popup1 = $scope.popup1 = {opened: false};
            var popup2 = $scope.popup2 = {opened: false};
            $scope.open1 = function ($event) {
                popup1.opened = true;
            };
            $scope.open2 = function ($event) {
                popup2.opened = true;
            };
            $scope.dateOptions1 = {
                formatYear: 'yyyy/MM/dd',
                startingDay: 1,
                showWeeks: false,
                class: 'datepicker1'
            };

            $scope.dateOptions2 = {
                formatYear: 'yyyy/MM/dd',
                startingDay: 1,
                showWeeks: false,
                class: 'datepicker2'
            };
            //分页
            $scope.totalPages = 20;//总页数
            $scope.totalItems = 100;//总条数
            $scope.currentPage = 1;//游标
            $scope.maxSize = 5;
            $scope.setPageNo = '';
            $scope.setPage = function () {
                $scope.currentPage = $scope.setPageNo;
            };
        }])
    // 价格带构成
    .controller("priceController", ['$scope', '$state', '$stateParams',
        function ($scope, $state, $stateParams) {
            var vm = $scope.vm = {};
            //时间控件
            //日期控件
            var popup1 = $scope.popup1 = {opened: false};
            var popup2 = $scope.popup2 = {opened: false};
            $scope.open1 = function ($event) {
                popup1.opened = true;
            };
            $scope.open2 = function ($event) {
                popup2.opened = true;
            };
            $scope.dateOptions1 = {
                formatYear: 'yyyy/MM/dd',
                startingDay: 1,
                showWeeks: false,
                class: 'datepicker1'
            };

            $scope.dateOptions2 = {
                formatYear: 'yyyy/MM/dd',
                startingDay: 1,
                showWeeks: false,
                class: 'datepicker2'
            };
            //分页
            $scope.totalPages = 20;//总页数
            $scope.totalItems = 100;//总条数
            $scope.currentPage = 1;//游标
            $scope.maxSize = 5;
            $scope.setPageNo = '';
            $scope.setPage = function () {
                $scope.currentPage = $scope.setPageNo;
            };
        }])
    // 二级菜单13 服务中心
    .controller("serviceController", ['$http', '$scope', '$state', 'service',
        function ($http, $scope, $state, service) {
            $scope.state = $state;
            var vm = $scope.vm = {};
            vm.getmenu = function (ID) {
                service.getMenu(ID).success(function (data) {
                    console.log(data);
                    $scope.NavData = data.data;
                }).error(function () {
                    swal("", "菜单获取失败!", "error");
                })
            }
            vm.getmenu('35')
        }])
    // 流量概况
    .controller("flowOverviewCtl", ['$http', '$scope', '$state', '$cookieStore',
        function ($http, $scope, $state, $cookieStore) {
            $scope.state = $state;
            var vm = $scope.vm = {};
            vm.drawchart = function () {
                require.config({
                    paths: {
                        echarts: './dependency/echarts/js'
                    }
                });
                require(
                    [
                        'echarts',
                        'echarts/chart/line'
                    ],
                    function (ec) {
                        var myChart = ec.init(document.getElementById('main'));

                        myChart.setOption({
                            title: {
                                text: '访客趋势图'
                            },
                            tooltip: {
                                trigger: 'axis'
                            },
                            calculable: true,
                            xAxis: [
                                {
                                    type: 'category',
                                    boundaryGap: false,
                                    data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
                                }
                            ],
                            yAxis: [
                                {
                                    type: 'value'
                                }
                            ],
                            series: [
                                {
                                    name: '最高气温',
                                    type: 'line',
                                    data: [11, 11, 15, 13, 12, 13, 10]
                                }
                            ]
                        });

                    }
                );
            }
            vm.drawchart();
        }])
    // 流量分析明细
    .controller("flowDetailCtl", ['$scope', '$state', '$stateParams',
        function ($scope, $state, $stateParams) {
            var vm = $scope.vm = {};
            //时间控件
            //日期控件
            var popup1 = $scope.popup1 = {opened: false};
            var popup2 = $scope.popup2 = {opened: false};
            $scope.open1 = function ($event) {
                popup1.opened = true;
            };
            $scope.open2 = function ($event) {
                popup2.opened = true;
            };
            $scope.dateOptions1 = {
                formatYear: 'yyyy/MM/dd',
                startingDay: 1,
                showWeeks: false,
                class: 'datepicker1'
            };

            $scope.dateOptions2 = {
                formatYear: 'yyyy/MM/dd',
                startingDay: 1,
                showWeeks: false,
                class: 'datepicker2'
            };
            //分页
            $scope.totalPages = 20;//总页数
            $scope.totalItems = 100;//总条数
            $scope.currentPage = 1;//游标
            $scope.maxSize = 5;
            $scope.setPageNo = '';
            $scope.setPage = function () {
                $scope.currentPage = $scope.setPageNo;
            };
        }])
    // 流量来源分析
    .controller("flowFromCtl", ['$scope', '$state', '$stateParams',
        function ($scope, $state, $stateParams) {
            var vm = $scope.vm = {};
            //时间控件
            //日期控件
            var popup1 = $scope.popup1 = {opened: false};
            var popup2 = $scope.popup2 = {opened: false};
            $scope.open1 = function ($event) {
                popup1.opened = true;
            };
            $scope.open2 = function ($event) {
                popup2.opened = true;
            };
            $scope.dateOptions1 = {
                formatYear: 'yyyy/MM/dd',
                startingDay: 1,
                showWeeks: false,
                class: 'datepicker1'
            };

            $scope.dateOptions2 = {
                formatYear: 'yyyy/MM/dd',
                startingDay: 1,
                showWeeks: false,
                class: 'datepicker2'
            };
            //分页
            $scope.totalPages = 20;//总页数
            $scope.totalItems = 100;//总条数
            $scope.currentPage = 1;//游标
            $scope.maxSize = 5;
            $scope.setPageNo = '';
            $scope.setPage = function () {
                $scope.currentPage = $scope.setPageNo;
            };
        }])
    // 流量下载
    .controller("flowDownloadCtl", ['$scope', '$state', '$stateParams',
        function ($scope, $state, $stateParams) {
            var vm = $scope.vm = {};
            //时间控件
            //日期控件
            var popup1 = $scope.popup1 = {opened: false};
            var popup2 = $scope.popup2 = {opened: false};
            $scope.open1 = function ($event) {
                popup1.opened = true;
            };
            $scope.open2 = function ($event) {
                popup2.opened = true;
            };
            $scope.dateOptions1 = {
                formatYear: 'yyyy/MM/dd',
                startingDay: 1,
                showWeeks: false,
                class: 'datepicker1'
            };

            $scope.dateOptions2 = {
                formatYear: 'yyyy/MM/dd',
                startingDay: 1,
                showWeeks: false,
                class: 'datepicker2'
            };
            //分页
            $scope.totalPages = 20;//总页数
            $scope.totalItems = 100;//总条数
            $scope.currentPage = 1;//游标
            $scope.maxSize = 5;
            $scope.setPageNo = '';
            $scope.setPage = function () {
                $scope.currentPage = $scope.setPageNo;
            };
        }])
    // 会员分析
    .controller("memberCtl", ['$scope', '$state', '$stateParams',
        function ($scope, $state, $stateParams) {
            var vm = $scope.vm = {};
            //时间控件
            //画图
            vm.drawchartpie = function () {
                require.config({
                    paths: {
                        echarts: './dependency/echarts/js'
                    }
                });
                require(
                    [
                        'echarts',
                        'echarts/chart/pie'
                    ],
                    function (ec) {
                        var myChart = ec.init(document.getElementById('mainpie'));

                        myChart.setOption({
                            title: {
                                text: '成员分析',
                                x: 'left'
                            },
                            tooltip: {
                                trigger: 'item',
                                formatter: "{a} <br/>{b} : {c} ({d}%)"
                            },
                            legend: {
                                orient: 'vertical',
                                left: 'left',
                                data: ['注册会员', '匿名用户', '金牌用户', '银派用户', '铁牌用户']
                            },
                            series: [
                                {
                                    name: '访问来源',
                                    type: 'pie',
                                    radius: '55%',
                                    center: ['50%', '60%'],
                                    data: [
                                        {value: 335, name: '注册会员'},
                                        {value: 310, name: '匿名用户'},
                                        {value: 234, name: '金牌用户'},
                                        {value: 135, name: '银派用户'},
                                        {value: 1548, name: '铁牌用户'}
                                    ],
                                    itemStyle: {
                                        emphasis: {
                                            shadowBlur: 10,
                                            shadowOffsetX: 0,
                                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                                        }
                                    }
                                }
                            ]
                        });

                    }
                );
            }
            vm.drawchartpie();
        }])
    // 地域分析
    .controller("locateCtl", ['$scope', '$state', '$stateParams',
        function ($scope, $state, $stateParams) {
            var vm = $scope.vm = {};
            //分页
            $scope.totalPages = 20;//总页数
            $scope.totalItems = 100;//总条数
            $scope.currentPage = 1;//游标
            $scope.maxSize = 5;
            $scope.setPageNo = '';
            $scope.setPage = function () {
                $scope.currentPage = $scope.setPageNo;
            };
        }])
    // 设备分析
    .controller("deviceCtl", ['$scope', '$state', '$stateParams',
        function ($scope, $state, $stateParams) {
            var vm = $scope.vm = {};
            //分页
            $scope.totalPages = 20;//总页数
            $scope.totalItems = 100;//总条数
            $scope.currentPage = 1;//游标
            $scope.maxSize = 5;
            $scope.setPageNo = '';
            $scope.setPage = function () {
                $scope.currentPage = $scope.setPageNo;
            };
        }])
    // bbs二级菜单
    .controller("bbsMenuCtl", ['$http', '$scope', '$state', 'service',
        function ($http, $scope, $state, service) {
            $scope.state = $state;
            var vm = $scope.vm = {};
            vm.getmenu = function () {
                $http.get('./resource/json/menu-21.json').success(function (data) {
                    console.log(data);
                    $scope.NavData = data;
                }).error(function () {
                    swal("", "菜单获取失败!", "error");
                })
            }
            vm.getmenu()
        }])
    // 宏观运营分析
    .controller("bbsFlowMacroCtl", ['$scope', '$state',
        function ($scope, $state) {
            var vm = $scope.vm = {};
            //时间控件
            var popup1 = $scope.popup1 = {opened: false};
            $scope.open1 = function ($event) {
                popup1.opened = true;
            };
            $scope.dateOptions1 = {
                formatYear: 'yyyy/MM/dd',
                startingDay: 1,
                showWeeks: false,
                class: 'datepicker1'
            };
            //画图
            vm.drawchartfunnel = function () {
                require.config({
                    paths: {
                        echarts: './dependency/echarts/js'
                    }
                });
                require(
                    [
                        'echarts',
                        'echarts/chart/funnel'
                    ],
                    function (ec) {
                        var myChart = ec.init(document.getElementById('main'));

                        myChart.setOption({

                            title: {
                                text: '用户留存'
                            },
                            tooltip: {
                                trigger: 'item',
                                formatter: "{a} <br/>{b} : {c}%"
                            },
                            toolbox: {
                                show: true,
                                feature: {
                                    mark: {show: true},
                                    dataView: {show: true, readOnly: false},
                                    restore: {show: true},
                                    saveAsImage: {show: true}
                                }
                            },
                            legend: {
                                data: ['展现', '点击', '访问', '咨询', '订单']
                            },
                            calculable: true,
                            series: [
                                {
                                    name: '漏斗图',
                                    type: 'funnel',
                                    width: '40%',
                                    data: [
                                        {value: 60, name: '访问'},
                                        {value: 40, name: '咨询'},
                                        {value: 20, name: '订单'},
                                        {value: 80, name: '点击'},
                                        {value: 100, name: '展现'}
                                    ]
                                },
                                {
                                    name: '金字塔',
                                    type: 'funnel',
                                    x: '55%',
                                    itemStyle: {
                                        normal: {
                                            // color: 各异,
                                            label: {
                                                position: 'left'
                                            }
                                        }
                                    },
                                    data: [
                                        {value: 60, name: '访问'},
                                        {value: 40, name: '咨询'},
                                        {value: 20, name: '订单'},
                                        {value: 80, name: '点击'},
                                        {value: 100, name: '展现'}
                                    ]
                                }
                            ]
                        });

                    }
                );
            }
            vm.drawchartfunnel();
        }])
    // 流量总览详情
    .controller("bbsFlowOverviewCtl", ['$scope', '$state', '$stateParams',
        function ($scope, $state, $stateParams) {
            var vm = $scope.vm = {};
            //分页
            $scope.totalPages = 20;//总页数
            $scope.totalItems = 100;//总条数
            $scope.currentPage = 1;//游标
            $scope.maxSize = 5;
            $scope.setPageNo = '';
            $scope.setPage = function () {
                $scope.currentPage = $scope.setPageNo;
            };
        }])