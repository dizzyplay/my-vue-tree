<template>
	<div class="container">
		im editor
		{{ currentNode }}
	</div>
</template>
<script>
	import {mapState} from 'vuex';

	export default {
		name: 'Editor',
		computed:{
			...mapState({
				currentNode : state => state.common.currentSelectedNode
			})
		}
	}
</script>
<style scoped>
	.container {
		position: fixed;
		top: 10px;
		right: 10px;
		border: 1px solid black;
		width: 300px;
		height: 400px;
	}
</style>