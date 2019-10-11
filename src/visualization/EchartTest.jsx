
import React from 'react'
import * as echarts from 'echarts'
import _ from "lodash"

export class EchartTest extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      styleID: Math.random().toString(36).substr(2),
      option: {
          title: {
              text: 'ECharts Bar example',
              x:'center'
          },
          tooltip: {},
          toolbox: {
              feature: {
                saveAsImage: {
                  show: true,
                  title: 'Save as Image',
                  // lang:['Click to Save']
                },
                dataZoom: {
                  show: true,
                  title: 'Zoom',
                },
                dataZoomReset: {
                  show: true,
                  title: 'Reset'
                }
              }
          },
          legend: {
            data:['Sales'],
            type: 'scroll',
            orient: 'vertical',
            // right: 0,
            // top: 40,
            bottom: 5,
          },
          xAxis: {
              data: ["shirt","cardign","chiffon shirt","pants","heels","socks"]
          },
          yAxis: {},
          series: [{
              name: 'Sales',
              type: 'bar',
              data: [5, 20, 36, 10, 10, 20]
          }]
        },
        width: 0,
        height: 0
    }
  }
  static getDerivedStateFromProps(props) {
    return { 
      width: props.width || 600,
      height: props.height || 500
    }
  }

  componentDidMount() {
    this.barChart = echarts.init(document.getElementById(this.state.styleID))
    this.barChart.setOption(this.state.option)
  }

  componentDidUpdate () {
    this.barChart.resize()
  }

  render() {
    // console.log(this.props.width)
    return(
      <>
        <div id={this.state.styleID} style={{width: this.state.width, height: this.state.height}}></div>
      </>
    )
  }
}

export class BarZoom extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      defaultOptions : {}
    }
  }
  componentDidMount() {
    this.createChart()
  }

  makeDataSeries(seriesArray) {
    return seriesArray.map(function(series, idx) {
      return {
        'name': series.name,
        'type': 'scatter',
        'data': series.data
      };
    });
  }

  createChart() {
    this.bar01 = echarts.init(document.getElementById('Bar02'));
    this.bar01.setOption(this.state.defaultOptions, this.state.theme)
    this.updateChart(this.props);
  }

  updateChart(nextProps) {      
    // give up quickly if props are empty.
    if (!nextProps) {
      return null;
    }
    var newChartOptions = this.makeChartOptions(nextProps);
    this.bar01.setOption(newChartOptions.defaultOptions);
  }

  makeChartOptions() {
    
    var seriesArray = this.props.seriesArray;
    var echartSeriesArray = this.makeDataSeries(seriesArray);
    var xLabel = this.props.xLabel || '';
    var yLabel = this.props.yLabel || '';
    var title = this.props.title || '';
    var ChartSettings = {
      defaultOptions : {
        title : {
          text: title
        },
        series: echartSeriesArray,
        xAxis: [
          {
            name: xLabel,
            type: 'value'
          }
        ],
        yAxis: [
          {
            name: yLabel,
             type: 'value'
          }
        ],
        dataZoom: {
          show: Boolean(this.props.showZoom)
        },
        legend: {
          data: echartSeriesArray.map(function(series){ return series.name; }),
          orient: 'vertical',
          x: 'right',
          y: 'center'
         },
        grid: {
          borderColor: '#eee',
          x: 80,
          y: 60,
          x2: 120,
          y2: 60
        },
        toolbox: {
          show: true,
          // showTitle: false,
          feature: {
            saveAsImage: {
              show: true,
              title: 'Save as Image',
              // lang:['Click to Save']
            },
            dataZoom: {
              show: true,
              title: {
                Zoom: {default: 'area zooming'}
              },
            },
            dataZoomReset: {
              show: true,
              // title: 'Reset',
            }
          }
        }
      }
    }
    return ChartSettings
  }

  render() {
    return(
      <>
        <div id="Bar02" style={{width: this.props.width, height: this.props.height}}></div>
      </>
    )
  }
}

export class MultiLine extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      option: {
        title: {
            text: 'Test'
        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data:['Data A','Data B','Data C','Data D','Data E']
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        toolbox: {
            feature: {
              saveAsImage: {
                show: true,
                title: 'Save as Image',
                // lang:['Click to Save']
              },
              dataZoom: {
                show: true,
                title: 'Zoom',
              },
              dataZoomReset: {
                show: true,
                title: 'Reset'
              }
            }
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['Jan','Feb','Mar','Apr','May','Jun','Jul']
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                name:'Data A',
                type:'line',
                data:[120, 132, 101, 134, 90, 230, 210]
            },
            {
                name:'Data B',
                type:'line',
                data:[220, 182, 191, 234, 290, 330, 310]
            },
            {
                name:'Data C',
                type:'line',
                data:[150, 232, 201, 154, 190, 330, 410]
            },
            {
                name:'Data D',
                type:'line',
                data:[320, 332, 301, 334, 390, 330, 320]
            },
            {
                name:'Data E',
                type:'line',
                data:[820, 932, 901, 934, 1290, 1330, 1320]
            }
        ]
      }
    }
  }
  componentDidMount() {
    var barChart = echarts.init(document.getElementById('chartMultiLine'))
    barChart.setOption(this.state.option)
  }
  // createChart() {
  //   var barChart = echarts.init(document.getElementById('chartMultiLine'))
  //   barChart.setOption(this.state.option)
  // }
  render() {
    return (
      <>
        <div id="chartMultiLine" style={{width: this.props.width, height: this.props.height}}></div>
      </>
    )
  }
}

export class GagueChart extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      chartID: Math.random().toString(36).substr(2),
      data: [],
      optionGague: {
        title: {
          text: 'Gague example',
          x:'center'
        },
        tooltip : {
            formatter: "{a} <br/>{b} : {c}%"
        },
        toolbox: {
            feature: {
              saveAsImage: {
                show: true,
                title: 'Save as Image',
                lang:['Click to Save']
              }
            }
        },
        series: [{
          name: 'Test Gague',
          type: 'gauge',
          detail: {formatter:'{value}%'},
          data: [{value: 56, name: 'AAA'}]
        }]
      },
      width: 0,
      height: 0
    }
  }
  static getDerivedStateFromProps(props) {
    return { 
      width: props.width || 600,
      height: props.height || 500
    }
  }

  componentDidMount() {
    // const API = 'https://next.json-generator.com/api/json/get/VJWFxH8uv'
    // console.log(API)
    // fetch(API)
    //   .then(response => 
    //     response.json()
    //     // console.log(response)
    //     )
    //   .then((pages) => 
    //     console.log(pages)
    //   )

    // console.log(this.state.optionGague)
    this.myChart = echarts.init(document.getElementById(this.state.chartID))
    this.myChart.setOption(this.state.optionGague)
  }

  render() {
    return (
      <>
        <div id={this.state.chartID} style={{width: this.state.width, height: this.state.height}}></div>
      </>
    )
  }
}

export class PieChart extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      chartID: Math.random().toString(36).substr(2),
      option: {
        title : {
            text: 'Test Pie Chart',
            x:'center'
        },
        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)",
        },
        toolbox : {
            show: true,
            feature: {
              saveAsImage: {
                show: true,
                title: 'Save as Image'
              }
            }
        },
        legend: {
            type: 'scroll',
            // orient: 'vertical',
            orient: 'horizontal',
            // right: 10,
            // top: 60,
            bottom: 20,
            data: []
        },
        series :{
            name: 'TEST JA',
            type: 'pie',
            radius : '55%',
            // center: ['40%', '50%'],
            data: [],
            // itemStyle: {
            //     emphasis: {
            //         shadowBlur: 10,
            //         shadowOffsetX: 0,
            //         shadowColor: 'rgba(0, 0, 0, 0.5)'
            //     }
            // }
        }
      }
    }
  }

  genData() {
    const nameList = [ 'aa', 'bb', 'cc', 'dd', 'ee']
    const seriesData = []
    const legendData = []
    _.forEach(nameList, function(name, key) {
      legendData.push(name)
      seriesData.push({
        name: name,
        value: Math.round(Math.random() * 1000)
      })
    })
    const {option} = this.state
    option.legend.data.push(...legendData)
    option.series.data.push(...seriesData)
    this.setState({ option })
    console.log('done')
  }

  componentDidMount() {
    this.genData()
    console.log(this.state.option)
    this.myPie = echarts.init(document.getElementById(this.state.chartID))
    this.myPie.setOption(this.state.option)
  }

  render() {
    // console.log('Render', this.state.option)
    return(
      <>
        <div id={this.state.chartID} style={{width: this.props.width, height: this.props.height}}></div>
      </>
    )
  }
}
