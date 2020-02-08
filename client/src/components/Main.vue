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
				<input v-model="nodeId"/>
				<button @click="selectNode">select node</button>
			</p>
		</div>
		<div>
			<editor/>
			{{ this.treeData }}
		</div>
	</div>
</template>

<script>
	import Tree from "./Tree.vue";
	import Editor from "./editor.vue";
	import SearchBox from "./SearchBox.vue";
	import {mapState} from "vuex";

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
				nodeId: 4,
				copyTree:{}
			}
		},
		async mounted() {
			console.log('mounted');
			this.$store.dispatch('common/initTree')
		},
		methods: {
			selectNode() {
				const nodeId = Number(this.nodeId);
				const fn = function (self) {
					if (self.id < nodeId && ['CR', 'LS', 'DM'].includes(self.type)) {
						self.isOpen = true
					}
					const node = {id: this.id, type: this.type}
					this.$store.commit('common/changeNode', {node})
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
					console.info(self.id);
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
