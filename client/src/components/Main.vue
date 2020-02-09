<template>
	<div class="container">
		<div>
			<Tree :tree-data="treeData" :control-fn="cfn"/>
			<SearchBox/>
			<p>
				<button @click="openAll">open all</button>
				<button @click="closeAll">close all</button>
				<button @click="selectAll">select all</button>
				<button @click="unSelectAll">unselect All</button>
			</p>
			<p>
				id:<input v-model="nodeId"/>
				type:<input v-model="nodeType"/>
				<button @click="selectNode">select node</button>
			</p>
			<p>
				<input v-model="nodeTitle">
				<button @click="changeNodeTitle">change current node title</button>
			</p>
		</div>
		<div>
			<editor/>
		</div>
	</div>
</template>

<script>
	import Tree from "./Tree.vue";
	import Editor from "./editor.vue";
	import SearchBox from "./SearchBox.vue";
	import {mapState} from "vuex";

	function make(type){

	}
	export default {
		name: 'Main',
		components: {
			Tree,
			SearchBox,
			Editor
		},
		computed: {
			...mapState({
				treeData: state => state.common.treeData.root,
				cfn: state => state.common.cfn
			})
		},
		data() {
			return {
				nodeId: 14,
				nodeTitle:'',
				nodeType:'CT'
			}
		},
		async mounted() {
			console.log('mounted');
			await this.$store.dispatch('common/initTree')
		},
		methods: {
			changeNodeTitle(){
				this.$store.commit('common/changeCurrentNodeTitle',{title:this.nodeTitle})
			},
			selectNode() {
				const nodeId = Number(this.nodeId);
				const nodeType = this.nodeType;
				const fn = function (self) {
					const toSearch = [{id:0,type:'DM'},{id:5,type:'CR'},{id:nodeId,type:nodeType}];
					for (let i=0; i<toSearch.length; i++){
						setTimeout(()=>{
							if (self.treeData.id == toSearch[i].id && ['CR', 'LS', 'DM','CT', 'ST'].includes(self.treeData.type)) {
								console.info(self.treeData.id)
								console.info(self.treeData.type)
								this.isOpen = true;
								this.$store.commit('common/changeNode', {node:self.treeData})
							}
						},100)
					}
				};
				this.controlNode(fn);
			},
			selectAll() {
				const fn = function (self) {
					self.choice = true;
				};
				this.$store.commit('common/sendFn', {fn})
			},
			unSelectAll() {
				const fn = function (self) {
					self.choice = false;
				};
				this.controlNode(fn);
			},
			openAll() {
				let t = 1;
				const fn = function (self) {
					// 특정 노드까지만 열고싶을떄
					// if(self.id < 3){
					// 	self.isOpen =true;
					// }
					self.isOpen = true;
					console.info(t);
					t += 1;
				};
				this.$store.commit('common/sendFn', {fn})
			},
			closeAll() {
				const fn = function (self) {
					console.info(self.treeData.id);
					self.isOpen = false;
				};
				this.$store.commit('common/sendFn', {fn})
			},
			controlNode(fn) {
				this.$store.commit('common/sendFn', {fn})
			}
		}

	}

</script>

<style scoped>
	.container {
		display: flex;
		flex-direction: row;
	}
</style>
