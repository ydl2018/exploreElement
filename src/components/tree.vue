<template>

<div>
  <el-button @click="show = true"></el-button>
    <!-- 如果设置了lazy,那么data数据无效 -->
   <el-dialog 
   :destroy-on-close="true"
   :visible.sync="show"
   > 

   <el-tree
    :data="data"
    :props="defaultProps"

    :load="loadNode"
    :highlight-current="true"
 
    ref="tree"
 
    show-checkbox
    node-key="id"
    @node-click="handleNodeClick"
    :expand-on-click-node="false"
    :default-expanded-keys="[2]"
    :draggable="true"
    :allow-drag="allowDrag"
    :allow-drop="allowDrop"
  ></el-tree>
   </el-dialog>

    </div>
 


</template>    


<script>
let id = 10
export default {
  data() {
    return {
      show:true,
      defaultProps: { children: "children", label: "label", isLeaf: "isLeaf" },
      data: [
        {
          id: 1,
          label: "1-1",
          children: [{ label: "1-1-1", id: 2 ,children:[{label:'1-1-1-1',id:id++}]}]
        },
        {
          id: 3,
          label: "1-2",
          children: [{ label: "1-2-1", id: 4 ,children:[{label:'1-2-1-1',id:id++}]}]
        },
        {
          id:6,
          label:'不可拖拽'
        },
        {
          id:7,
          label:'不可放置'
        }
      ]
    };
  },
  mounted(){
    //this.$refs.tree.updateKeyChildren(3,[{label:'替换二级-1',id:id++}])
    // this.$refs.tree.setChecked(4,true,true)
    // console.log(this.$refs.tree.setCurrentKey(1));
    
  },
  methods: {
    loadNode(node, resolve) {
         const data = node.data.children || [];
      if (node.level === 0) {
        return resolve([
          { label: "二级-1", id: 1 },
          { label: "二级-2", id: 3 }
        ]);
      } else if (node.level === 1) {
        console.log(node);
        resolve(data.concat([{ label: "三级-1", id: id++ }]));
      } else if (node.level === 2) {
        setTimeout(() => {
          resolve(data.concat([
            { label: "三级-2", id: Math.random() },
            { label: "三级-4", id: Math.random()},
            { label: "三级-3", id: Math.random() }
          ]));
        }, 1000);
      } else {
        resolve(data);
      }
    },

    append(data) {
      const node = {label:'测试',id:Math.random()}
      // if(!Array.isArray(data.children)) {
      //   this.$set(data,'children',[])
      // }
      // data.children.push(node)
      this.$refs.tree.append(node,data)
    },
    renderNode(h, { node, data, store }) {
      return (
        <span>
          {node.label}
         < el-button on-click={()=>this.append(data)}></ el-button>
        </span>
      );
    },
    handleNodeClick(...[data,node]){
       this.$refs.tree.setCurrentKey(null)
        console.log('CurrentKey',this.$refs.tree.getCurrentKey());
        // this.show = false
        // setTimeout(()=>{
        //   this.show = true
        // },2000)
    },
    allowDrag(node){
      return node.data.label !== "不可拖拽"
  
    },
    allowDrop(dragNode,dropNode,type){
      console.log(type,dropNode.label);
      
      if(type === 'prev' && dropNode.label === '不可放置'){
          return false
      }else{
        return true
      }
     
    }
  }
};
</script>