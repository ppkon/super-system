<template>
    <div class="account-manage">
        <!-- 面板组件 -->
       <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>账号管理</span>
            </div>
            <div class="text item">
                <!-- 账号管理表格 -->
                <el-table
                    ref="multipleTable"
                    :data="accountTableData"
                    tooltip-effect="dark"
                    style="width: 100%"
                    @selection-change="handleSelectionChange">
                   <!-- 单选框 -->
                    <el-table-column
                        type="selection"
                        width="55">
                    </el-table-column>
                    <el-table-column
                        prop="username"
                        label="账号">
                    </el-table-column>
                    <!-- 用户组 -->
                    <el-table-column
                        prop="usergroup"
                        label="用户组"
                        show-overflow-tooltip>
                    </el-table-column>
                    <!-- 日期 -->
                    <el-table-column
                        label="创建日期">
                    <template slot-scope="scope">{{ scope.row.ctime |filterCtime }}</template>

                    <!-- 修改删除 -->
                    </el-table-column>
                    <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button
                        type="primary"
                        size="mini"
                        @click="handleEdit(scope.row.id)">
                        <i class="el-icon-edit"></i>
                        修改</el-button>
                        <el-button
                        size="mini"
                        type="danger"
                        @click="handleDelete(scope.row.id)">
                        <i class="el-icon-delete"></i>
                        删除</el-button>
                    </template>
                    </el-table-column>
                </el-table>
            </div>
        </el-card>
    </div>
</template>
<script>
// 引入moment模块
import moment from "moment";
export default {
  // 数据
  data() {
    return {
      accountTableData: [] //用户账号表格数据。
    };
  },
  // 生命周期的钩子函数 created 自动触发 vue组件是咧对象创建完成 dom还没有绑定
  // 这个函数里面适合发送ajax请求 获取数据
  created() {
    // console.log("222");
    // 自动发送请求 获取所有用户账号数据
    // 调用getAccountList方法
    this.getAccountList();
    // // 调用handleDelete删除方法
    // this.handleDelete();
  },
  // 方法
  methods: {
    getAccountList() {
      // 自动发送请求 获取所有用户账号数据
      this.axios
        .get("http://127.0.0.1:666/account/accountlist")
        .then(response => {
          // console.log('接收到后端返回的数据',response.data);
          // 把后端返回的账号数据 赋值给前端账号表格数据 accountTableData
          this.accountTableData = response.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    // 修改账号信息
    handleEdit(id) {
      // 弹出模态框
    },
    // 删除账号
    handleDelete(id) {
      // 弹出确认框
      this.$confirm("你确定要删除吗？", "删除提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
      .then(() => {
        // 发送ajax请求 把id传给后端
        this.axios.get(`http://127.0.0.1:666/account/accountdel?id=${id}`)
          .then(response => {
            // 接收后端返回的错误码 和 错误信息
            let { error_code, reason } = response.data;
            // 判断错误码
            if (error_code === 0) {
              // 弹出删除成功的提示
              this.$message({
                type: "success",
                message: reason
              });
              // 输出列表 (再次调用请求所有的用户账号的函数 由于之前已经删除 所有再次请求 得到删除后的数据)
              this.getAccountList();
            } else {
              // 弹出删除失败的提示
              this.$message.error(reason);
            }
          })
          .catch(err => {
            console.log(err);
          });
      })
      .catch(() => {
        this.$message({
          type:'info',
          message:'已取消删除'
        });
      });
    }
  },
  // 过滤器
  filters: {
    // 过滤时间的函数
    filterCtime(ctime) {
      return moment(ctime).format("YYYY-MM-DD HH:mm:ss"); //时间格式年月日小时大写 使用moment之前下载并引入moment模块
    }
  }
};
</script>
<style lang="less">
.account-manage {
  .el-card {
    .el-card__header {
      text-align: left;
      font-size: 20px;
      font-weight: 600;
      background-color: #f1f1f1;
    }
  }
}
</style>


