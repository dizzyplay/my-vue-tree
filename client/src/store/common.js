export default {
	namespaced: true,
	state: {
		cfn: () => {
			console.log('hello')
		},
		currentSelectedNode:null,
		treeData: {
			root: {
				id: 1,
				type: "DM",
				childrenType: ["CR"],
				name: "root",
				children: [
					{
						id: 2,
						type: "CR",
						childrenType: ["LS"],
						name: "chapter",
						children: [
							{
								id: 3,
								type: "LS",
								childrenType: ["ST", "PR"],
								name: "lesson",
								children: [
									{
										id: 4,
										type: "ST",
										name: "staple",
										children: []
									}
								]
							}
						],
					},
					{
						id: 5,
						type: "CR",
						childrenType: ["LS"],
						name: "chapter",
						children: [
							{
								id: 6,
								type: "ST",
								name: "staple",
								children: []
							},
							{
								id: 8,
								type: "ST",
								name: "staple",
								children: []
							},
							{
								id: 9,
								type: "ST",
								name: "staple",
								children: []
							},
							{
								id: 10,
								type: "ST",
								name: "staple",
								children: []
							},
						]
					},
					{
						id: 7,
						type: "ST",
						childrenType: ["PR"],
						name: "staple",
						children: []
					}
				]
			}
		}
	},
	actions: {},
	mutations: {
		sendFn(state,{fn}) {
			state.cfn = fn
		},
		changeNode(state,{node}){
			state.currentSelectedNode = node;
		},
		addNode(state,{parentNode,node}){
			const parent = traversal(state.treeData.root, parentNode);
			parent.children.push(node);
		}
	}
}

function traversal(treeRoot,target){
	let queue = [treeRoot];
	while (queue.length > 0) {
		const node = queue.shift()
		console.info(node)
		console.info(node.type,target.type)
		if (node.type === target.type && node.id === target.id) {
			return node
		}
		if (node['children']){
			queue = queue.concat(...node.children);
		}
	}
	return null;
}