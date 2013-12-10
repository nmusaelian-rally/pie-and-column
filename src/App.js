  Ext.define('CustomApp', {
     extend: 'Rally.app.App',
     componentCls: 'app',

     items: [
         {
         }
     ],
     launch: function(){
        this._makeStore();
     },
     _makeStore:function(){
        this._myStore = Ext.create('Rally.data.WsapiDataStore', {
           model: 'Test Case Result',
           fetch: true,
           autoLoad: true,
           listeners: {
                            load: this._onDataLoaded,
                            scope: this
            }
       });
     },
     _onDataLoaded: function(store, data) {
                    var records = [];
                    var verdictsGroups = ["Pass","Blocked","Error","Fail","Inconclusive"]

                    var passCount = 0;
                    var blockedCount = 0;
                    var errorCount = 0;
                    var failCount = 0;
                    var inconclusiveCount = 0;
                    
                    var getColor = {
                        'Pass': '#009900',
                        'Blocked': '#663300',
                        'Error': '#990000', 
                        'Fail': '#FF0000', 
                        'Inconclusive': '#A0A0A0', 
                    };

                    Ext.Array.each(data, function(record) {

                        verdict = record.get('Verdict');

                        switch(verdict)
                        {
                            case "Pass":
                               passCount++;
                                break;
                            case "Blocked":
                                blockedCount++;
                                break;
                            case "Error":
                                errorCount++;
                                break;
                            case "Fail":
                                failCount++;
                                break;
                            case "Inconclusive":
                                inconclusiveCount++;
                        }
                    });
                    if (this.down('#myChart')) {
                                this.remove('myChart');
                    }
                    if (this.down('#myChart2')) {
                                this.remove('myChart2');
                    }
                    this.add(
                        {
                            xtype: 'rallychart',
                            height: 400,
                            storeType: 'Rally.data.WsapiDataStore',
                            store: this._myStore,
                            itemId: 'myChart2',
                            xAxis: {
                                    categories: [
                                        'Pass',
                                        'Blocked',
                                        'Fail',
                                        'Error',
                                        'Inconclusive'
                                        ],
                                   // labels : {
                                        //enabled: false
                                       // }
                                },
                            chartConfig: {
                               chart: { 
                                    //type: 'column'//has no effect, but the outer empty chart obj is needed
                                },
                                title: {
                                    text: 'TestCaseResults Verdict Counts',
                                    align: 'center'
                                },
                                tooltip: {  
                                },
                                //xField : 'Verdict',
                                xAxis: {
                                    categories: [
                                        'Pass',
                                        'Blocked',
                                        'Fail',
                                        'Error',
                                        'Inconclusive'
                                        ],
                                   // labels : {
                                        //enabled: false
                                       // }
                                },
                                yAxis: {
                                    title: {
                                        text: 'Count'
                                    }
                                },
                                plotOptions : {
                                    column: {
                                        color: '#F00',
                                        dataLabels: { //prints data on above columns
                                            enabled: true
                                        }
                                    },
                                    series : {
                                        animation : {
                                            duration : 2000,
                                            easing : 'swing'
                                        }
                                    }
                                },
                                /*
                                legend: {
                                    align: 'right',
                                    verticalAlign: 'top',
                                    x: 0,
                                    y: 100
                                },*/
                                /*
                                series: [ 
                                    {   
                                        type: 'column',
                                        name: 'Verdicts',
                                        data: [
                                            {name: 'Pass',
                                            y: passCount,
                                            color: getColor['Pass']
                                            },
                                            {name: 'Blocked',
                                            y: blockedCount,
                                            color: getColor['Blocked']
                                            },
                                            {name: 'Fail',
                                            y: failCount,
                                            color: getColor['Fail']
                                            },
                                            {name: 'Error',
                                             y: errorCount,
                                            color: getColor['Error']
                                            },
                                            {name: 'Inconclusive',
                                             y: inconclusiveCount,
                                            color: getColor['Inconclusive']
                                            }
                                              ]
                                    }
                                ]*/
                            },                
                            chartData: {
                                //categories: verdict,
                                xAxis: {
                                    categories: [
                                        'Pass',
                                        'Blocked',
                                        'Fail',
                                        'Error',
                                        'Inconclusive'
                                        ],
                                   // labels : {
                                        //enabled: false
                                       //}
                                },
                                series: [ 
                                    {   
                                        type: 'column',  //default is line
                                        name: 'Verdicts',
                                        data: [
                                            {name: 'Pass',
                                            y: passCount,
                                            color: getColor['Pass']
                                            },
                                            {name: 'Blocked',
                                            y: blockedCount,
                                            color: getColor['Blocked']
                                            },
                                            {name: 'Fail',
                                            y: failCount,
                                            color: getColor['Fail']
                                            },
                                            {name: 'Error',
                                             y: errorCount,
                                            color: getColor['Error']
                                            },
                                            {name: 'Inconclusive',
                                             y: inconclusiveCount,
                                            color: getColor['Inconclusive']
                                            }
                                              ]
                                    }
                                ]
                            }
                        },
                        {
                            xtype: 'rallychart',
                            height: 400,
                            storeType: 'Rally.data.WsapiDataStore',
                            store: this._myStore,
                            itemId: 'myChart',
                            chartConfig: {
                                chart: {
                                },
                                title: {
                                    text: 'TestCaseResults Verdict Counts',
                                    align: 'center'
                                },
                                tooltip: {
                                    //pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>' //did not resolve {point.percentage:.1f}%
                                    //from http://stackoverflow.com/questions/15907496/highcharts-pie-chart-ignores-percentagedecimals-tooltip-setting-and-has-floating
                                    formatter: function () {
                                       return this.point.name + ': <b>' + Highcharts.numberFormat(this.percentage, 1) + '%</b>';
                                        }
                                    //if comment out formatter, the tooltip by default will show numbers, not %
                                },
                                plotOptions : {
                                     pie: {
                                        allowPointSelect: true,
                                        cursor: 'pointer',
                                        dataLabels: {
                                            enabled: true,
                                            color: '#000000',
                                            connectorColor: '#000000',
                                            //format: '<b>{point.name}</b>: {point.percentage:.1f} %'
                                        }
                                    }
                                }
                            },            
                            chartData: {
                                //categories: verdict, 
                                series: [ 
                                    {   
                                        type: 'pie',
                                        name: 'Verdicts',
                                        data: [
                                            {name: 'Pass',
                                            y: passCount,
                                            color: getColor['Pass']
                                            },
                                            {name: 'Blocked',
                                            y: blockedCount,
                                            color: getColor['Blocked']
                                            },
                                            {name: 'Fail',
                                            y: failCount,
                                            color: getColor['Fail']
                                            },
                                            {name: 'Error',
                                             y: errorCount,
                                            color: getColor['Error']
                                            },
                                            {name: 'Inconclusive',
                                             y: inconclusiveCount,
                                            color: getColor['Inconclusive']
                                            }
                                              ]
                                    }
                                ]
                            }
                        }
                    );
                    this.down('#myChart')._unmask();
                    this.down('#myChart2')._unmask();
                }
     
 });
