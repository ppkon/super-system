<template>
    <div class="index">
        <!-- 内容容器 -->
        <el-container>
            <!-- 左侧 -->
            <el-aside width="200px">
              <Nav></Nav>
            </el-aside>
            <!-- 右侧 -->
            <el-container>
                <!-- 右侧头 -->
                <el-header>
                  <!-- 头部组件 -->
                  <Top></Top>
                </el-header>

                <!-- 右侧中间 -->
                <el-main>
                    <!-- 路由出口 -->
                    <router-view />
                </el-main>

                <!-- 右侧尾部 -->
                <el-footer>
                  <!-- 尾部组件 -->
                  <Bottom></Bottom>
                </el-footer>
            </el-container>
        </el-container>
    </div>

</template>
<script>
// 引入导航组件
import Nav from '@/components/Nav/Nav.vue';
// 引入头部组件
import Top from '@/components/Top/Top.vue';
// 引入尾部组件
import Bottom from '@/components/Bottom/Bottom.vue';

export default {
  components:{
    Nav,
    Top,
    Bottom
  }
};
</script>
<style lang="less">
.index {
  height: 100%;
  .el-container {
    height: 100%;
    //   左侧
    .el-aside {
      background-color: #2d3a4f;
      text-align: center;
    }
    //   右侧中间
    .el-main {
      background-color: #e9eef3;
      text-align: center;
    }
    //   右侧头和尾
    .el-header,
    .el-footer {
      background-color: #b3c0d1;
      text-align: center;
      line-height: 60px;
    }
  }
}
</style>

