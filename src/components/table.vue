<template>
    <div class="tabal_container">
        <el-table
        :data="tableData"
        ref="multipleTable"
        border
        class="dataTable"
        @selection-change="handleSelectionChange"
        style="width: 100%">
            <template>
                <el-table-column
                v-if="position=='0'"
                type="selection"
                align="center">
                </el-table-column>
                <el-table-column
                show-overflow-tooltip
                v-for="item in modelP"
                :key="item.modelP"
                :prop="item.modelP"
                align="center"
                :label="item.title">
                {{item.type}}
                <template scope="scope" v-if='item.type==1||item.type==2||item.type==6||item.type==7||item.type==8||item.type==11'>
                    {{item.imgUrl}}
                    <span v-if='item.type==1'>{{scope.row[item.modelP]===item.val[0].value?item.val[0].label:item.val[1].label}}</span>
                    <span v-if='item.type==6'>{{scope.row.partyMember.partyBranchName}}</span>
                    <img v-if='item.type==11' style="width:100px;height:60px" :src="item.imgUrl" alt="">
                    <span v-if='item.type==8'>{{scope.row.poorVisited.visitType==item.val[0].value?item.val[0].label:item.val[1].label}}</span>
                    <span v-if='item.type==2' v-for="list in scope.row[item.modelP]" :key="list.id">{{list.name}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                </template>
                </el-table-column>
            </template>
            <el-table-column fit min-width="240" v-if="NeedExamine"
            label="操作">
            <template scope="scope">
                <el-button v-if='NeedExamine' class="editBtn" plain @click="handleClick(scope.row,scope.$index)" type="primary" size="small" icon="iconfont icon-dangjian_xiugai"></el-button>
                <el-button class="editBtn" plain @click="deleTClick(scope.row,scope.$index)" type="danger" size="small" icon="iconfont icon-dangjian_shanchu"></el-button>
                <el-button v-if="showOption==0.1"  @click="enterClick(scope.row)" type="primary" :disabled="scope.row.partyMember.isDev==0" size="small" plain>{{scope.row.partyMember.isDev=='0'?'已转入':'确认转入'}}</el-button>
                <el-button v-if='showOption==3' @click="handleUserClick(scope.row)" type="primary" size="small" plain>参会人状态</el-button>
                <el-button v-if='showOption==3' @click="handleTemplateClick(scope.row)" type="primary" size="small" plain>导出文档模板</el-button>
                <!-- <el-button @click="deleTClick(scope.row,scope.$index)" type="danger" plain  size="small">删除</el-button> -->
            </template>
            </el-table-column>
        </el-table>
        <el-pagination
        style="margin-top:10px"
        v-if="position!=1"
        background
        layout="prev, pager, next"
        :total="Tpage" :page-size='PSize||5' hide-on-single-page @current-change='currutpage'>
        </el-pagination>
    </div>
</template>
<script>
export default {
    data() {
        return {
            multipleSelection:''
        }
    },
    props: {
        tableData: {
            type: String,
            default: ()=>''
        },
        position:{
            type:String,
            default:()=>''
        },
        Tpage:{
            type:Number,
            default:0
        },
        modelP:{
            type:Array,
            default:()=>[]
        },
        modelP1:{
            type:Array,
            default:()=>[]
        },
        PSize:{
            type:Number,
            default:()=>0
        } ,
        showOption:{
            type:Number,
            default:()=>1
        },
        NeedExamine:{
            type:Boolean,
            default:()=>true
        }
    },
    methods:{
        handleClick(row){
            this.$emit("edit",row)
        },
        deleTClick(row,index){
            this.$emit("delet",row,index)
        },
        handleSelectionChange(val) {
            if(val.length>1){
                this.$refs.multipleTable.clearSelection()
                this.$refs.multipleTable.toggleRowSelection(val.pop())
            }else{
                this.multipleSelection = val.pop()
            }
            this.$emit("choseWhich",this.multipleSelection)
        },
      enterClick(val){
          this.$emit("sureEnter",val)
      },
        handleUserClick(val){
            this.$emit("handleUserClick",val)
        },
        handleTemplateClick(val){
            this.$emit("handleTemplateClick",val)
        },
      currutpage(v){
          this.$emit("changePage",v)
      }
    }
}
</script>
<style lang="less" >
.tabal_container{
    width: 100%;
    height: 100%;
    .el-table{
        width:100%;
        height:100%;
        .el-table__header-wrapper{
            background-color: #2a58ad;
            .el-table__header{
                background-color: #2a58ad;
                .has-gutter{
                    background-color: #2a58ad;
                    tr{
                        background-color: #2a58ad;
                        th{
                            background-color: #2a58ad;
                            border-color:#2a58ad;
                            color: #ffffff;
                            font-size: 16px;
                            font-weight: normal;
                        }
                    }
                }
            }
        }
        .el-table__body-wrapper{
            .el-table__body{
                tbody{
                    .el-table__row:nth-child(even){
                        background:#eef4ff;;
                    }
                    .el-table__row:nth-child(odd){
                        background-color: #ffffff;
                    }
                    .el-table__row{
                        font-size: 14.5px;
                        .editBtn{
                            border: none;
                            background-color: inherit;
                            color: #666666;
                            i{
                                font-size: 22px;
                            }
                        }
                        .editBtn:hover{
                            color: #2a58ad;;
                        }
                    }
                    .el-table__row:hover{
                        background-color: #eef4ff;
                    }
                }
            }
        }
    }
    .el-pagination.is-background .el-pager li:not(.disabled).active{
        background-color:rgba(225, 255, 244, 1);
    }
    .el-pagination.is-background .el-pager li:not(.disabled):hover {
    color: rgba(225, 255, 244, 1);
}
}
</style>