<template>
  <div>
    <div>host</div>

    <el-table :data="tableData" style="width: 100%">
      <el-table-column v-if="permissions.edit && permissions.delete" width="130" label="Actions" inline-template>
        <el-dropdown trigger="click" menu-align="start">
          <el-button type="primary">
            Actions<i class="el-icon-caret-bottom el-icon-right"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item v-if="permissions.impersonation" @click.native="impersonation(row)">LoginAsThisTenant</el-dropdown-item>
            <el-dropdown-item v-if="permissions.edit" @click.native="editTenant(row)">Edit</el-dropdown-item>
            <el-dropdown-item v-if="permissions.changeFeatures" @click.native="editFeatures(row)">Features</el-dropdown-item>
            <el-dropdown-item v-if="permissions.delete" @click.native="deleteTenant(row)">Delete</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-table-column>
      <el-table-column prop="date" label="日期" width="180">
      </el-table-column>
      <el-table-column prop="name" label="姓名" width="180">
      </el-table-column>
      <el-table-column prop="address" label="地址">
      </el-table-column>
    </el-table>
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
    </el-pagination>
    <el-dialog title="提示" :visible.sync="dialogVisible" size="tiny">
      <el-select v-model="value" multiple>
        <el-option v-for="item in options" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
      <el-select v-model="value" multiple>
        <el-option v-for="item in options" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
      <el-select v-model="value" multiple>
        <el-option v-for="item in options" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
      <el-select v-model="value" multiple>
        <el-option v-for="item in options" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
      <el-select v-model="value" multiple>
        <el-option v-for="item in options" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
      <el-select v-model="value" multiple>
        <el-option v-for="item in options" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
      <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
       </span>
    </el-dialog>
    <el-button style='margin-top: 500px'@click="dialogVisible = true">默认按钮</el-button>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        dialogVisible: false,
        pageSize: 10,
        currentPage: 1,
        total: 0,
        permissions: {},
        options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
        value: ['选项5', '选项1'],
        tableData: []
      }
    },
    created() {
      const permissions = {
        create: true,
        edit: true,
        changeFeatures: true,
        impersonation: true,
        'delete': true
      };
      this.permissions = permissions;
      const self = this;
      setTimeout(() => {
        this.tableData = [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }];
      }, 300)
    },
    methods: {
      handleSizeChange(val) {},
      handleCurrentChange(val) {
        if (val !== 0)
          val = val - 1;
      },
      impersonation(row) {

      },
      editTenant(row) {

      },
      editFeatures(row) {

      },
      deleteTenant(row) {

      }
    }
  }
</script>
