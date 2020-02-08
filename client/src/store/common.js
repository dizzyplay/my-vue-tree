// {
// 	id: 1,
// 		type: "DM",
// 	childrenType: ["CR"],
// 	name: "root",
// 	children: []
// }
import gql from 'graphql-tag';
import {apolloClient} from "../main";
import {fetchNodeData} from "./queries";

export default {
	namespaced: true,
	state: {
		cfn: () => {
			console.log('hello')
		},
		currentSelectedNode: null,
		treeData: {
			root: {
				isOpen: false,
				id: 0,
				type: 'DM',
				title: 'empty title',
				selected:false,
				children: []
			}
		}

	},
	actions: {
		async selectNode({commit}, data) {
			console.info(data);
			const res = await apolloClient.query({
				query: gql`
			query Curriculum($id:ID!) {
				curriculum(id:$id){
					id
					title
					chapters {
						id
						title
					}
				}
			}
			`, variables: {id: data.id}
			});
			commit('addChildTree', {data: res.data.curriculum.chapters});
			console.log(res);
		},
		async initTree({commit}) {
			const tree = await fetchNodeData();
			commit('INIT_TREE',{tree})
		}
	},
	mutations: {
		[`INIT_TREE`](state,{tree}){
			console.info(tree)
			tree.id=0;
			tree.type='DM';
			state.treeData.root=tree;
		},
		changeCurrentNodeTitle(state,{title}){
			state.currentSelectedNode.title = title
		},
		addChildTree(state, {data}) {
			data = data.map(d => {
				return {
					...d,
					isOpen: false,
					children: [],
					type: 'CT'
				}
			});
			console.info(data)
			state.treeData.root.children.push(...data);
		},
		sendTreeData(state, {data}) {
		},
		changeNode(state, {node}) {
			console.info(node)
			state.currentSelectedNode = node;
		},
		addNode(state, {parentNode, node}) {
			const parent = traversal(state.treeData.root, parentNode);
			parent.children.push(node);
		},
		sendFn(state, {fn}) {
			state.cfn = fn
		},
	}
}


function traverseAndInsert(tree,targetId,targetType, data){
	let t = tree;
	for( const [k,v] of Object.entries(tree)) {
		if (k ===targetType){
			tree[targetType] = data;
			return;
		}
		if (k === 'type' && v === targetType) {
			console.info('t')
			console.info(data)
			tree.children = data.children;
		}
	}
	for( const [k,v] of Object.entries(tree)) {
		if(k === 'root') {
			tree.root.children.forEach( t => {
				traverseAndInsert(t, targetId, targetType, data);
			})
		}
	}
}

function traverseTree(tree,nodeType,nodeId){
	for (const [k,v] of Object.entries(tree)) {
		if( k=== nodeType) {
			console.info(nodeType)
			return tree
		}
	}
	if (tree.children && tree.children.length > 0) {
		tree.children.forEach( t => {
			traverseTree(t, nodeType, id)
		})
	}
	return  null
}


function traversal(treeRoot, target,data) {
	let queue = [treeRoot];
	while (queue.length > 0) {
		let node = queue.shift()
		console.info(node)
		if (node.type === target.type && node.id == target.id) {
			console.info(target.type, target.id)
			node = data;
			return
		}
		if (node['children']) {
			queue = queue.concat(...node.children);
		}
	}
	return null;
}
