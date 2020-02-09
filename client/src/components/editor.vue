<template>
	<div class="editor-container">
		<div class="row">
			<p v-if="currentNode">
				{{ currentNode.id }}
				{{ currentNode.type }}
				{{ currentNode.title }}
			</p>
			<div>
				title : <input v-model="title">
			</div>
		</div>
		<div class="row">
			<button @click="changeNodeTitle">save</button>
			<button @click="addNode">add note</button>
		</div>
	</div>
</template>
<script>
	import {mapState} from 'vuex';

	export default {
		name: 'Editor',
		data(){
			return {
				title:''
			}
		},
		computed:{
			...mapState({
				currentNode : state => state.common.currentSelectedNode
			})
		},
		watch:{
			currentNode(){
				this.title = this.currentNode.title;
			}
		},
		methods:{
			addNode(){
				const parentId=this.currentNode.id;
				const node = {
					id:Math.floor(Math.random()*10000),
					title: 'new tree node',
					type: this.currentNode.type,
					children: []
				};
				const fn = self => {
					if(self['children'] && self.type === node.type && self.treeData.id == parentId){
						self.children.push(node)
					}
				}
				this.$store.commit('common/sendFn',{fn});
			},
			changeNodeTitle(){
				this.$store.commit('common/changeCurrentNodeTitle',{title:this.title})
			},
		}
	}
</script>
<style scoped>
	.editor-container {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		border: 1px solid black;
		margin-left: 100px;
		width: 300px;
		height: 400px;
	}
	.row {
		width: 100%;
	}
</style>