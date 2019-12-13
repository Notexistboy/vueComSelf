<!--
* Element-UI-Tree
* 树形数据，带搜索框。可自定义icon
* Daicong
* 2019.10.8
-->
<template>
	<div style="width:500px">
		<el-input placeholder="输入关键字进行过滤" v-model="filterText">
		</el-input>
		<el-tree
			ref="tree"
      :data="data"
      show-checkbox
      node-key="id"
      default-expand-all
			:lazy="true"
			:load="loadNode"
			@node-click="nodeClick"
			@node-contextmenu="nodeClickContextmenu"
			:filter-node-method="filterNode"
      :expand-on-click-node="false"
      :render-content="renderContent">
    </el-tree>
		<el-dialog :visible.sync="showInfoDialog" v-if="showInfoDialog" @close="controlDialog" :modal="false" width="60%">
				<el-form>
					<el-form-item label="名称:">
						<el-input v-model="newItem" style="width:200px"/>
					</el-form-item>
				</el-form>
				<div slot="footer" class="dialog-footer">
					<el-button type="primary" @click="confirm" >确 定</el-button>
					<el-button type="danger" @click="controlDialog">取 消</el-button>
				</div>
    </el-dialog>
	</div>
</template>

<script>
	export default {
		props: {
			data: Array, // 传入的数据
			props: { // data中对应字段配置
				type: Object,
				default: () => {
					return {
						children: 'children', // children	指定子树为节点对象的某个属性值	string
						label: 'label', // label	指定节点标签为节点对象的某个属性值	string | function(data, node)、
						// disabled: 'disabled', // disabled	指定节点选择框是否禁用为节点对象的某个属性值	boolean | function(data, node)
						// isLeaf: 'isLeaf', // isLeaf	指定节点是否为叶子节点，仅在指定了 lazy 属性的情况下生效	boolean | function(data, node)
						node: null,
						firstTime: true,
						resolve: Function,
					}
				}
			}
		},
		data() {
			let id = 1000;
			return {
				filterText: '',
				showInfoDialog: false,
				newItem: "",
				itemData: {},
			};
		},
		watch: {
			//实现搜索
			filterText(val) {
				this.$refs.tree.filter(val);
			}
		},
		methods: {
			loadNode(node, resolve) {
				debugger
				if(this.firstTime){
					this.firstTime = false
					this.node = node
					this.resolve = resolve
				}
				resolve(this.data)
			},
			// element提供的节点右键点击事件。共四个参数，依次为：event、传递给 data 属性的数组中该节点所对应的对象、节点对应的 Node、节点组件本身。
			nodeClickContextmenu(ev, data, node, component) {
				this.$emit('node-contextmenu', ev, data, node, component)
			},
			// element提供的节点点击事件，共三个参数，依次为：传递给 data 属性的数组中该节点所对应的对象、节点对应的 Node、节点组件本身。
			nodeClick(data, node, component) {
				this.$emit('node-click', node, component)
			},
			filterNode(value, data) {
				if (!value) return true;
				return data.label.indexOf(value) !== -1;
			},
			//确认按钮
			confirm(){
				this.append(this.itemData)
			},
			//模态框显示隐藏
			controlDialog(data) {
				debugger
				this.newItem = ""
				this.itemData = data
				this.showInfoDialog = !this.showInfoDialog
			},
			//添加的方法
      append(node,data) {
				debugger
				this.showInfoDialog = !this.showInfoDialog
        const newChild = { id: data.id++, label: this.newItem, children: [] };
        if (!data.children) {
          this.$set(data, 'children', []);
        }
				data.children.push(newChild);
				debugger
				this.loadNode(this.node, this.resolve)
      },
      remove(node, data) {
				debugger
        const parent = node.parent;
        const children = parent.data.children || parent.data;
        const index = children.findIndex(d => d.id === data.id);
        children.splice(index, 1);
			},
			renderContent(h, { node, data, store }) {
        return (
          <span class="custom-tree-node">
            <span>{node.label}</span>
            <span>
              <el-button size="mini" type="text" on-click={ () => this.controlDialog(data) }>Append</el-button>
              <el-button size="mini" type="text" on-click={ () => this.remove(node, data) }>Delete</el-button>
            </span>
          </span>);
      }
		},
		mounted() {},

	};
</script>
<style>
  .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
  }
</style>
