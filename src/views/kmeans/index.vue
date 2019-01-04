<template>
  <div class="components-container">
    <code><strong>上传文件并执行K均值算法</strong>
    </code>
    <el-upload
      ref="upload"
      :on-exceed="handleExceed"
      :before-remove="beforeRemove"
      :file-list="fileList"
      :auto-upload="false"
      :limit="limit"
      :http-request="handlePost"
      class="upload-demo"
      action=""
    >
      <el-button
        slot="trigger"
        type="primary"
        plain
      >选取文件</el-button>
      <el-input
        v-model="clusterNumber"
        placeholder="设定K值"
        style="width: 100px; margin:0 16px"
      />
      <el-button
        style="margin-left: 10px;"
        type="success"
        plain
        @click="excute"
      >执行算法</el-button>
      <div
        slot="tip"
        class="el-upload__tip"
      >只能上传json文件，文件个数限制为1个</div>
    </el-upload>
    <transition name="el-fade-in">
      <div
        v-if="clusterNumber"
        class="chart-wrapper"
      >
        <div
          id="kmeans"
          style="width:800px;height:600px;"
        />
      </div>
    </transition>

  </div>
</template>

<script>
import echarts from 'echarts'
import ecStat from 'echarts-stat'
import { uploadFiles } from '@/api/file'

export default {
  data() {
    return {
      fileList: [],
      limit: 1,
      clusterNumber: null,
      data: null
    }
  },
  methods: {
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
    },
    excute() {
      this.$refs.upload.submit()
      if (this.clusterNumber !== null) {
        this.drawChart()
      } else {
        this.$notify.error({
          title: '错误',
          message: '请输入k值'
        })
      }
    },
    handlePost(files) {
      const file = files.file
      const pd = new FormData()
      pd.append('file', file)
      uploadFiles(pd).then((res) => {
        this.data = res.data
      })
    },
    getOption(result, k, data) {
      // var clusterAssment = result.clusterAssment
      var centroids = result.centroids
      var clusterAssigned = result.clusterAssigned
      var ptsInCluster = []
      for (let i = 0; i < k; i++) {
        ptsInCluster[i] = []
      }
      for (let i = 0; i < k; i++) {
        for (let j = 0; j < clusterAssigned.length; j++) {
          if (clusterAssigned[j][0] === i) {
            ptsInCluster[i].push(data[j])
          }
        }
      }
      console.log(ptsInCluster)

      var color = [
        '#c23531',
        '#2f4554',
        '#61a0a8',
        '#d48265',
        '#91c7ae',
        '#749f83',
        '#ca8622',
        '#bda29a',
        '#6e7074',
        '#546570',
        '#c4ccd3'
      ]
      var series = []
      for (var i = 0; i < k; i++) {
        series.push({
          name: 'scatter' + i,
          type: 'scatter',
          animation: false,
          data: ptsInCluster[i],
          markPoint: {
            symbolSize: 29,
            label: {
              normal: {
                show: false
              },
              emphasis: {
                show: true,
                position: 'top',
                formatter: function(params) {
                  return (
                    Math.round(params.data.coord[0] * 100) / 100 +
                    '  ' +
                    Math.round(params.data.coord[1] * 100) / 100 +
                    ' '
                  )
                },
                textStyle: {
                  color: '#000'
                }
              }
            },
            itemStyle: {
              normal: {
                opacity: 0.7
              }
            },
            data: [
              {
                coord: centroids[i]
              }
            ]
          }
        })
      }

      return {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          }
        },
        series: series,
        color: color
      }
    },
    drawChart() {
      console.log(this.data)

      // var clusterNumber = 4
      var result = ecStat.clustering.kMeans(this.data, this.clusterNumber)

      const option = {
        timeline: {
          top: 'center',
          right: 35,
          height: 300,
          width: 10,
          inverse: false,
          playInterval: 2500,
          symbol: 'none',
          orient: 'vertical',
          axisType: 'category',
          label: {
            normal: {
              show: false
            }
          },
          data: []
        },
        baseOption: {
          title: {
            text: 'K-means聚类结果散点图',
            left: 'center'
          },
          xAxis: {
            type: 'value'
          },
          yAxis: {
            type: 'value'
          },
          series: [
            {
              type: 'scatter'
            }
          ]
        },
        options: []
      }

      console.log(result)
      option.options.push(this.getOption(result, this.clusterNumber, this.data))

      var myChart = echarts.init(document.getElementById('kmeans'))
      myChart.setOption(option)
    }
  }
}
</script>

<style lang="scss" scoped>
.chart-wrapper {
  margin-top: 64px;
  #kmeans {
    margin: 0 auto;
  }
}
</style>
