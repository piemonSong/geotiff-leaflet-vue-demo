<template>
  <div>
    <hou v-if="false"></hou>
    <div style="height: 1700px">
    <ele-multi-cascader
      v-for="item in satellite" :key="item.id"
      :placeholder="item.label"
      :options="item.equipment"
      v-model="item.channels"
      collapse-tags
      selectChildren
      v-if="false"
    >
    </ele-multi-cascader>
    <el-button v-if="false" @click="getSth">click</el-button>
      <hello></hello>
    </div>
  </div>
</template>


<script>
  import Channel from './channel-list.js'
  import Hou from './DateComp/Hou'
  import Popper from 'vue-popperjs';
  import 'vue-popperjs/dist/css/vue-popper.css';
  import Hello from './test/Hello.vue'

  export default {
    data(){
        return {
          options: [
              {
            value: 'zhinan',
            label: '指南',
            children: [{
              value: 'shejiyuanze',
              label: '设计原则',
              children: [{
                value: 'yizhi',
                label: '一致'
              }, {
                value: 'fankui',
                label: '反馈'
              }, {
                value: 'xiaolv',
                label: '效率'
              }, {
                value: 'kekong',
                label: '可控'
              }]
            }, {
              value: 'daohang',
              label: '导航',
              children: [{
                value: 'cexiangdaohang',
                label: '侧向导航'
              }, {
                value: 'dingbudaohang',
                label: '顶部导航'
              }]
            }]
          }, {
            value: 'zujian',
            label: '组件',
            children: [{
              value: 'basic',
              label: 'Basic',
              children: [{
                value: 'layout',
                label: 'Layout 布局'
              }, {
                value: 'color',
                label: 'Color 色彩'
              }, {
                value: 'typography',
                label: 'Typography 字体'
              }, {
                value: 'icon',
                label: 'Icon 图标'
              }, {
                value: 'button',
                label: 'Button 按钮'
              }]
            }, {
              value: 'form',
              label: 'Form',
              children: [{
                value: 'radio',
                label: 'Radio 单选框'
              }, {
                value: 'checkbox',
                label: 'Checkbox 多选框'
              }, {
                value: 'input',
                label: 'Input 输入框'
              }, {
                value: 'input-number',
                label: 'InputNumber 计数器'
              }, {
                value: 'select',
                label: 'Select 选择器'
              }, {
                value: 'cascader',
                label: 'Cascader 级联选择器'
              }, {
                value: 'switch',
                label: 'Switch 开关'
              }, {
                value: 'slider',
                label: 'Slider 滑块'
              }, {
                value: 'time-picker',
                label: 'TimePicker 时间选择器'
              }, {
                value: 'date-picker',
                label: 'DatePicker 日期选择器'
              }, {
                value: 'datetime-picker',
                label: 'DateTimePicker 日期时间选择器'
              }, {
                value: 'upload',
                label: 'Upload 上传'
              }, {
                value: 'rate',
                label: 'Rate 评分'
              }, {
                value: 'form',
                label: 'Form 表单'
              }]
            }, {
              value: 'data',
              label: 'Data',
              children: [{
                value: 'table',
                label: 'Table 表格'
              }, {
                value: 'tag',
                label: 'Tag 标签'
              }, {
                value: 'progress',
                label: 'Progress 进度条'
              }, {
                value: 'tree',
                label: 'Tree 树形控件'
              }, {
                value: 'pagination',
                label: 'Pagination 分页'
              }, {
                value: 'badge',
                label: 'Badge 标记'
              }]
            }, {
              value: 'notice',
              label: 'Notice',
              children: [{
                value: 'alert',
                label: 'Alert 警告'
              }, {
                value: 'loading',
                label: 'Loading 加载'
              }, {
                value: 'message',
                label: 'Message 消息提示'
              }, {
                value: 'message-box',
                label: 'MessageBox 弹框'
              }, {
                value: 'notification',
                label: 'Notification 通知'
              }]
            }, {
              value: 'navigation',
              label: 'Navigation',
              children: [{
                value: 'menu',
                label: 'NavMenu 导航菜单'
              }, {
                value: 'tabs',
                label: 'Tabs 标签页'
              }, {
                value: 'breadcrumb',
                label: 'Breadcrumb 面包屑'
              }, {
                value: 'dropdown',
                label: 'Dropdown 下拉菜单'
              }, {
                value: 'steps',
                label: 'Steps 步骤条'
              }]
            }, {
              value: 'others',
              label: 'Others',
              children: [{
                value: 'dialog',
                label: 'Dialog 对话框'
              }, {
                value: 'tooltip',
                label: 'Tooltip 文字提示'
              }, {
                value: 'popover',
                label: 'Popover 弹出框'
              }, {
                value: 'card',
                label: 'Card 卡片'
              }, {
                value: 'carousel',
                label: 'Carousel 走马灯'
              }, {
                value: 'collapse',
                label: 'Collapse 折叠面板'
              }]
            }]
          }, {
            value: 'ziyuan',
            label: '资源',
            children: [{
              value: 'axure',
              label: 'Axure Components'
            }, {
              value: 'sketch',
              label: 'Sketch Templates'
            }, {
              value: 'jiaohu',
              label: '组件交互文档'
            }]
          }],
          selectedOptions:[],
          satellite:[
            {
              id:1,
              label:'aqua',
              checked:false,
              channels:['airs_1'],
              equipment: [
                {
                  value:"airs",
                  label:"airs"
                },
                {
                  value:"amsua",
                  label:"amsua"
                }
              ]
            },
            {
              id:2,
              label:'metop-a',
              checked:false,
              channels:[],
              equipment: [
                {
                  value:"amsua",
                  label:"amsua",
                  children:[]
                },
                {
                  value:"hirs4",
                  label:"hirs4",
                  children:[]
                },
                {
                  value:"iasi",
                  label:"iasi",
                  children:[]
                },
                {
                  value:"mhs",
                  label:"mhs",
                  children:[]
                },
              ]
            },
            {
              id:3,
              label:'metop-b',
              checked:false,
              channels:[],
              equipment: [
                {
                  value:"amsua",
                  label:"amsua",
                  children:[]
                },
                {
                  value:"hirs4",
                  label:"hirs4",
                  children:[]
                },
                {
                  value:"iasi",
                  label:"iasi",
                  children:[]
                },
                {
                  value:"mhs",
                  label:"mhs",
                  children:[]
                },
              ]
            },
            {
              id:4,
              label:'n15',
              checked:false,
              channels:[],
              equipment: [
                {
                  value:"amsua",
                  label:"amsua",
                  children:[]
                },
              ]

            },
            {
              id:5,
              label:'n18',
              checked:false,
              channels:[],
              equipment:
                [
                  {
                    value:"amsua",
                    label:"amsua",
                    children:[]
                  },
                  {
                    value:"mhs",
                    label:"mhs",
                    children:[]
                  },
                ]
            },
            {
              id:6,
              label:'n19',
              checked:false,
              channels:[],
              equipment:[
                {
                  value:"amsua",
                  label:"amsua",
                  children:[]
                },
                {
                  value:"hirs4",
                  label:"hirs4",
                  children:[]
                },
                {
                  value:"mhs",
                  label:"mhs",
                  children:[]
                }
              ]
            },
            {
              id:7,
              label:'npp',
              checked:false,
              channels:[],
              equipment:[
                {
                  value:"atms",
                  label:"atms",
                  children:[]
                },
                {
                  value:"cris",
                  label:"cris",
                  children:[]
                }
              ]
            },
            {
              id:8,
              label:'m8',
              checked:false,
              channels:[],
              equipment:
                [
                  {
                    value:"seviri",
                    label:"seviri",
                    children:[]
                  }
                ]

            },
            {
              id:9,
              label:'m10',
              checked:false,
              channels:[],
              equipment:
                [
                  {
                    value:"seviri",
                    label:"seviri",
                    children:[]
                  }
                ]

            },
            {
              id:10,
              label:'g15',
              checked:false,
              channels:[],
              equipment:
                [
                  {
                    value:"sndrd1",
                    label:"sndrd1",
                    children:[]
                  },
                  {
                    value:"sndrd2",
                    label:"sndrd2",
                    children:[]
                  },
                  {
                    value:"sndrd3",
                    label:"sndrd3",
                    children:[]
                  },
                  {
                    value:"sndrd4",
                    label:"sndrd4",
                    children:[]
                  }
                ]
            },
            {
              id:11,
              label:"f17",
              checked:false,
              channels:[],
              equipment:
                [
                  {
                    value:"ssmis",
                    label:"ssmis",
                    children:[]
                  }
                ]
            },
            {
              id:12,
              label:"f18",
              checked:false,
              channels:[],
              equipment:
                [
                  {
                    value:"ssmis",
                    label:"ssmis",
                    children:[]
                  }
                ]

            }
          ],
          show:false
        }
    },
    mounted(){
      this.satellite.forEach( item => {
        item.equipment.forEach(equ => {
          equ.children  = Channel[item.label+'_'+equ.label]
        })
      })
      this.show = true
    },
    components: {
      'popper': Popper,
      Hou,
      Hello
    },
    methods:{
      getSth(){
          console.log(this.satellite[0].channels)
      }
    }
  }
</script>
