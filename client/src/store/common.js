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
		},
		async initTree({commit}) {
			const tree = await fetchNodeData();
			commit('INIT_TREE',{tree})
		}
	},
	mutations: {
		[`INIT_TREE`](state,{tree}){
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
			state.treeData.root.children.push(...data);
		},
		changeNode(state, {node}) {
			state.currentSelectedNode = node;
		},
		sendFn(state, {fn}) {
			state.cfn = fn
			setTimeout(()=>{
				// 함수가 지정되어있어서 제거해야함 안그러면 마운트 될때마다 마지막으로 저장된 함수가 실행됨
				state.cfn = ()=>{}
			},1000)
		},
	}
}


