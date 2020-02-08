// {
// 	id: 1,
// 		type: "DM",
// 	childrenType: ["CR"],
// 	name: "root",
// 	children: []
// }
import gql from 'graphql-tag';
import {apolloClient} from "../main";

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
				id: 5,
				type: 'DM',
				title: 'df',
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
					chapter {
						id
						title
					}
				}
			}
			`, variables: {id: data.id}
			});
			commit('addChildTree', {data: res.data.curriculum.chapter});
			console.log(res);
		},
		async initTree({commit}) {
			const res = await apolloClient.query({
				query: gql`
			query Curriculum($id:ID!) {
				curriculum(id:$id){
					id
					title
					chapter{
						id
						title
						lessons{
							id
							title
						}
					}
				}
			}
			`, variables: {id: 5}
			});
			console.log(res);
			commit('sendTreeData', {data: res.data.curriculum});
		}
	},
	mutations: {
		sendFn(state, {fn}) {
			state.cfn = fn
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
			console.info(data)

			let tree={};
			for (const [k, v] of Object.entries(data)) {
				if (k === 'chapter') {
					const tt = v.map(d => {
						let lessonTree=[]
						for (const [kk,vv] of Object.entries(d)){
							if(kk==='lessons'){
								lessonTree = vv.map(ss => {
									return {
										id:ss.id,
										isOpen:false,
										children: [],
										type:'LS',
										title:ss.title
									}
								})
							}
						}
						return {
							id:d.id,
							isOpen:false,
							children:lessonTree,
							type:'CT',
							title:d.title
						}
					})
					tree['children'] = tt
				}
				tree[`${k}`] = v
				tree.type = 'DM'
			}

			console.info(tree)
			state.treeData = {root: tree}
		},
		changeNode(state, {node}) {
			state.currentSelectedNode = node;
		},
		addNode(state, {parentNode, node}) {
			const parent = traversal(state.treeData.root, parentNode);
			parent.children.push(node);
		}
	}
}

function traversal(treeRoot, target) {
	let queue = [treeRoot];
	while (queue.length > 0) {
		const node = queue.shift()
		console.info(node)
		console.info(node.type, target.type)
		if (node.type === target.type && node.id === target.id) {
			return node
		}
		if (node['children']) {
			queue = queue.concat(...node.children);
		}
	}
	return null;
}