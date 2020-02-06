<template>
	<div class="search-container">
		<input type="text" v-model="query"/>
		<button @click="open">search</button>
	</div>
</template>
<script>
	import {wrapFn} from "../main";
	import {sendFnToTree} from "../js/helper";

	export default {
		data(){
			return {
				query:0,
			}
		},
		methods:{
			open(){
				const nodeId = Number(this.query);
				const fn = node => {
					if (node.id < nodeId ){
						node.selected = true;
					}
				};
				sendFnToTree.call(this,fn)
			}
		}
	}

</script>

<style>
.search-container{
	border: 1px solid;
	width: 300px;
	margin-top: 50px;
	padding: 10px;
}
</style>