<template>
	<div>
		<div class="node-container">
			<input type="checkbox" v-model="choice"/>
			<div v-if="hasChildren">
				<div @click="openChild" class="open-btn"> {{ openStatus }}</div>
			</div>
			<div
				:style="{backgroundColor:`${selected ? 'red' : 'white'}`}"
				@click="()=>handleClickNode(id)"
				class="node-title-area">
				{{ type }} - {{ title }}
			</div>
			<div class="add-btn" v-for="t in childrenType" :key="t">
				<div @click="addChildren(t)">
					add {{t}}
				</div>
			</div>
		</div>
		<div v-if="isOpen" v-for="c in children" :key="c.id" class="child-node">
			<Tree :tree-data="c" :control-fn="controlFn"/>
		</div>
	</div>
</template>
<script>
	import {mapState} from "vuex";

	export default {
		name: 'Tree',
		props: {
			treeData: Object,
			controlFn: Function
		},
		data() {
			return {
				isOpen: this.treeData.isOpen || false,
				id: this.treeData.id || 0,
				title: this.treeData.title || '',
				type: this.treeData.type || '',
				childrenType: this.treeData.childrenType || '',
				children: this.treeData.children || [],
				choice: false
			}
		},
		mounted() {
			if (typeof this.controlFn === 'function') {
				this.controlFn(this);
			}
		},
		watch: {
			controlFn() {
				if (typeof this.controlFn === 'function') {
					console.log('exe fn');
					this.controlFn(this);
				}
			},
		},
		computed: {
			...mapState({
				currentNode: state => state.common.currentSelectedNode
			}),
			hasChildren() {
				return this.children.length > 0
			},
			openStatus() {
				return this.isOpen ? 'close' : 'open'
			},
			selected() {
				if (this.currentNode) {
					return this.currentNode.id === this.id
				}
				return false
			}
		},
		methods: {
			async handleClickNode(id) {
				this.treeData.selected = id === this.id;
				const node = {
					id: this.id,
					type: this.type,
				};
				await this.$store.dispatch('common/selectNode',{type:this.type,id:this.id});
				this.$store.commit('common/changeNode', {node})
			},
			openChild() {
				this.isOpen = !this.isOpen;
				this.treeData.isOpen = this.isOpen;
			},
			addChildren(cType) {
				const rId = Math.floor(Math.random() * 10000);
				const targetNode = {id:rId, type: cType, name: "--new--", children: []};
				this.$store.commit('common/addNode', {parentNode: this, node: targetNode});
			},
		},
	}
</script>
<style>
	.child-node {
		padding-left: 20px;
	}

	.node-title-area {
		display: flex;
		flex-direction: row;
		cursor: pointer;
		user-select: none;
		border: 1px solid black;
		width: 200px;
		align-items: center;
		justify-content: center;
	}

	.node-container {
		display: flex;
		flex-direction: row;
		height: 30px;
	}

	.open-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: gray;
		color: white;
		cursor: pointer;
		height: 100%;
		padding: 0 5px 0 5px;
		user-select: none;
	}

	.add-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: gray;
		color: white;
		cursor: pointer;
		height: 100%;
		padding: 0 5px 0 5px;
		user-select: none;
	}

	.selected-node {
		background-color: red;
	}
</style>