<template>

<div>
    <!-- 如果设置了lazy,那么data数据无效 -->
    <el-tree
    :data="data"
    :props="defaultProps"
    :render-content="renderNode"
    :load="loadNode"
    :highlight-current="true"

    ref="tree"
 
    show-checkbox
    node-key="id"
    @node-click="handleNodeClick"
    :expand-on-click-node="false"
    :default-expanded-keys="[2]"
    :default-checked-keys="[1]"
  ></el-tree>
</div>

</template>    


<script>
let id = 10
export default {
  data() {
    return {
      defaultProps: { children: "children", label: "label", isLeaf: "isLeaf" },
      data: [
        {
          id: 1,
          label: "一级",
          children: [{ label: "二级", id: 2 ,children:[{label:'xx',id:id++}]}]
        }
      ]
    };
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
      if(!Array.isArray(data.children)) {
        this.$set(data,'children',[])
      }
      data.children.push(node)
    },
    renderNode(h, { node, data, store }) {
      return (
        <span>
          {node.label}
   
        </span>
      );
    },
    handleNodeClick(...[data,node]){
       this.$refs.tree.setCurrentKey(null)
        console.log('CurrentKey',this.$refs.tree.getCurrentKey());
    }
  }
};
</script>