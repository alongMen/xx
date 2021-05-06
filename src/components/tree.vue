<template>
    <div class="tree-container">
        <div class="leftNav">
            <div class="treeTitle">请选择组织层级</div>
                <el-tree
                    ref="tree"
                    :data="data"
                    :props="defaultProps"
                    :check-on-click-node="true"
                    :show-checkbox="true"
                    @check-change="handleCheckChange"
                    >
                </el-tree>
                </div>
    </div>
</template>
<script>
export default {
    data() {
      return {

        defaultProps: {
          children: 'children',
          label: 'label'
        }
      };
    },
    props:{
        data:{
            type:Array,
            default:[]
        }
    },
    components:{
        
    },
    mounted(){
    },
    methods: {

        handleCheckChange(data){
            //调用父方法
            this.$parent.getTreeClickList(JSON.stringify(this.$refs.tree.getCheckedNodes()))
        }
    },
}
</script>
<style lang="less">
.tree-container{
    width: 100%;
    height: 100%;
    .leftNav{
        width: 100%;
        height: 100%;
        background-color: #f2f2f2;
        .treeTitle{
            text-align: center;
            line-height: 48px;
            background-color: #e1e1e1;
            font-size: 15px;
            color: #666666;
            margin-bottom: 10px;
        }
        .el-tree{
            background: #f2f2f2;
            padding-right: 10px;
            .el-tree-node__content{
                height: 35px;
            }
            .el-checkbox{
                height: 13px;
            }
            
        }
    }
}
.el-checkbox__input.is-checked .el-checkbox__inner, .el-checkbox__input.is-indeterminate .el-checkbox__inner {
    background-color: #AF413B;
    border-color: #AF413B;
}
.el-tree-node__label{
    white-space: pre-wrap!important; 
    outline: 0;
}
.el-tree-node__content{
    display: flex;
    align-items: flex-start;
    .el-tree-node__label{
        font-size: 16px;
        color: #333333;

    }
}
.el-tree-node__children{
    margin-top:20px;
    .el-tree-node{ 
        // is-focusable
        .el-tree-node__content{
            .el-tree-node__label{
                display: flex;
                align-items: flex-start;
                font-size: 15px;
                color: #666666;
            }
        }
        .is-checked{
            color: #333333;
        }
    }
}

</style>
