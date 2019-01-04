<template>
  <div class="dashboard-container">
    <!-- <div class="dashboard-text">name:{{ name }}</div>
    <div class="dashboard-text">roles:<span v-for="role in roles" :key="role">{{ role }}</span></div> -->
    <h1>大数据算法可视化</h1>
    <p class="dashboard-text">K-means：K-means算法是最常用的聚类算法之一，其主要思想是，首先给定k值以及k个初始聚类中心，计算出每个点到各个初始聚类中心的距离，根据所得到的距离，把每个点划分到离其最近的聚类中心点所代表的簇之中。所有的点第一次分配结束后，将所有点的坐标取平均值，计算出该类簇的新聚类中心点，然后再次迭代点划分聚类，和更新聚类中心点的相关步骤，直至聚类划分变化较小或无变化，或者达到指定的迭代次数时，算法执行过程结束。</p>
    <p class="dashboard-text">DIANA：DIANA（Divisive Analysis）算法，其属于分裂的层次聚类算法。层次聚类方法，是对给定的数据集进行层次的分解，直到满足某种条件为止。当得到距离值之后，元素与元素之间就可以被联系起来。通过分离和融合可以构建一个结构。传统上，元素表示方法是树形的数据结构，在层次聚类算法中，一种是自底向上的聚集型，即从叶子节点开始，最终汇聚到根节点；另一种是自顶向下分裂型的，即从根节点开始，递归的向下分裂。
    </p>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'name',
      'roles'
    ])
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 24px;
    line-height: 46px;
  }
}
</style>
