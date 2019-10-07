
import React from 'react'
import * as echarts from 'echarts'

export class EchartTest extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      styleID: Math.random().toString(36).substr(2),
      option: {
          title: {
              text: 'ECharts Bar example'
          },
          tooltip: {},
          legend: {
              data:['Sales']
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
    console.log(this.props.width)
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
      defaultOptions : {
        toolbox: {
          show: true,
          showTitle: true,
          feature: {
            mark: {
              show: true,
              title: {
              mark: 'Mark Tool',
                markUndo: 'Undo Last Mark',
                  markClear: 'Clear Marks'
              }
            },
            dataZoom: {
              show: true,
              title: {
                dataZoom: 'Range Zoom',
                dataZoomReset: 'Undo Zoom'
              },
            },           
            dataView: {
              show: true,
              title: 'Data View',
              lang: ['Data View', 'Close','Refresh']
            },
            magicType: {
              show: false
            },
            restore: { show: true, title: 'Restore'},
            saveAsImage: {
              show: true,
              title: 'Save as Image',
              lang:['Click to Save']
            }
          }
        }
      },
      theme: {
        textStyle: {
            fontFamily: 'Helvetica Neue‘, Arial, Verdana, sans-serif'
        }
      }
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
    const bar01 = echarts.init(document.getElementById('Bar02'));
    bar01.setOption(this.state.defaultOptions, this.state.theme)
    this.updateChart(this.props);
  }

  updateChart(nextProps) {      
    // give up quickly if props are empty.
    if (!nextProps) {
      return null;
    }
    var newChartOptions = this.makeChartOptions(nextProps);
    const bar01 = echarts.init(document.getElementById('Bar02'));
    // console.log(newChartOptions)
    bar01.setOption(newChartOptions.defaultOptions);
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
        toolbox: {
          feature: {
            saveAsImage: { 
              name: 'scatter_' + xLabel + '_' + yLabel,
              type: 'png'
            }
          }
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
        }
      },
      theme: {
        textStyle: {
            fontFamily: 'Helvetica Neue‘, Arial, Verdana, sans-serif'
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
                lang:['Click to Save']
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
    const setOption = {
      
    }
    
    var barChart = echarts.init(document.getElementById('chartMultiLine'))
    barChart.setOption(this.state.option)
    // this.setState({
    //   option: setOption
    // })
    console.log(this.state.option)
  }
  createChart() {
    var barChart = echarts.init(document.getElementById('chartMultiLine'))
    barChart.setOption(this.state.option)
  }
  render() {
    return (
      <>
        <div id="chartMultiLine" style={{width: this.props.width, height: this.props.height}}></div>
      </>
    )
  }
}
