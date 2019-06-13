<template>
  <div class="i-date-comp">
  <el-input class="i-input" v-model="input" placeholder="请输入内容" @focus="showHouPicker" @>

  </el-input>
    <transition  name="el-zoom-in-bottom">
      <div class="i-date-picker" v-if="show"  v-click-outside="config">
        <div class="i-picker-header">


          <i class="f-left i-picker-icon el-icon-d-arrow-left" @click="changeHeader(1)"></i>
          <i class="f-left i-picker-icon el-icon-arrow-left"  @click="changeHeader(2)"></i>
          <span class="header-label">{{ houTextLabel }}</span>

          <i class="f-right i-picker-icon el-icon-d-arrow-right"  @click="changeHeader(3)"></i>
          <i class="f-right i-picker-icon  el-icon-arrow-right"  @click="changeHeader(4)"></i>
        </div>
        <div class="i-picker-body">
          <table class="hou-tab" @click="cellClick">
            <tbody>
              <tr>
                <td><a class="cell" data-hou="1">一候</a></td>
                <td><a class="cell" data-hou="2">二候</a></td>
                <td><a class="cell" data-hou="3">三候</a></td>
              </tr>
              <tr>
                <td><a class="cell" data-hou="4">四候</a></td>
                <td><a class="cell" data-hou="5">五候</a></td>
                <td><a class="cell" data-hou="6">六候</a></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        input: '',
        date:new Date(),
        show:false,
        config:{
          handler: this.handler,
          middleware: this.middleware,
          events: ["dblclick", "click"]
        },
        houValue:[],//y , m ,ho,
        houTextLabel:''
      }
    },
    created(){
         this.houValue[0] = this.date.getFullYear()
          this.houValue[1] = this.date.getMonth()+1
        this.houTextLabel = this.date.getFullYear()+'年 '+(this.date.getMonth()+1)+'月'
    },
    methods:{
      showHouPicker(){
        this.show = true
      },
      changeHeader(i){ // 1:previous year,2:previous month,3:next year,4:next month\
        switch(i){
          case 1:this.date.setFullYear(this.date.getFullYear() - 1)
            break;
          case 2:this.date.setMonth(this.date.getMonth() - 1)
            break;
          case 3:this.date.setFullYear(this.date.getFullYear() + 1)
            break;
          case 4:this.date.setMonth(this.date.getMonth() + 1)
            break;
        }
        this.houTextLabel = this.date.getFullYear()+'年 '+(this.date.getMonth()+1)+'月'
        this.houValue[0] = this.date.getFullYear()
        this.houValue[1] = this.date.getMonth()+1

      },
      handler(e, el) {
        this.show = false
      },
      middleware(e, el) {
        return e.target.className !== 'el-input__inner'
      },
      cellClick(e){
          if(e.target.nodeName==='A'){
              this.input =
                this.houValue[0] +'年'+
                this.houValue[1] +'月第'+
                e.target.dataset.hou+'候'
            this.houValue[2] =  e.target.dataset.hou
            this.show = false
          }
      }
    }
  }
</script>
<style scoped>
  .i-date-comp{
    position:relative ;
    width: 330px;
    margin: 400px;
    user-select:none ;

  }
  .f-left{
    float: left;
  }
  .f-right{
    float:right
  }
  .i-date-picker{
    position: absolute;
    bottom: 100%;
    left:0;
    color: #606266;
    border: 1px solid #e4e7ed;
    box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
    background: #fff;
    border-radius: 4px;
    line-height: 30px;
    margin: 5px 0;
    width: 322px;
    height: 340px;
    z-index: 333;
  }
  .i-picker-header{
    text-align: center;
    margin: 12px;
  }
  .i-picker-icon {
    font-size: 12px;
    color: #303133;
    border: 0;
    background: transparent;
    cursor: pointer;
    outline: none;
    margin-top: 8px;
    padding: 1px 6px;
  }
  .i-picker-icon:hover{
    color:#409eff
  }
  .header-label{
    font-size: 16px;
    font-weight: 500;
    padding: 0 5px;
    line-height: 22px;
    text-align: center;
    cursor: pointer;
    color: #606266;
  }
  .hou-tab{
    table-layout: fixed;
    width: 100%;
    font-size: 13px;
    margin: -1px;
    border-collapse: collapse;
  }
  .hou-tab td{
    text-align: center;
    padding: 30px 3px;
    cursor: pointer;
  }
  .hou-tab td .cell:hover{
    color:#409eff;
  }
</style>
