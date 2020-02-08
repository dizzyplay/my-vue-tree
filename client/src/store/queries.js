import gql from "graphql-tag";
import {apolloClient} from "../main";


const rootQuery = gql`
	query Root{
		root{
			title
			curriculums{
				id
				uid
				title
			}
		}
	}
`;

const curriculumQuery = () =>
	gql`query  Curriculum($id:ID){
		curriculum(id:$id){
			id
			title
			chapters{
				id
				title
			}
		}
	}
`;

export const fetchNodeData = async ({id, type}) => {
	let res;
	let data;
	let tree;
	switch (type) {
		case 'root':
			res = await apolloClient.query({query: rootQuery});
			data = res.data[type];
			tree =  makeTree(data, type, 'curriculums');
			tree.id =0;
			return tree;
		case 'curriculum':
			res = await apolloClient.query({query: curriculumQuery(type), variables: {id}});
			data = res.data[`${type}`];
			tree = makeTree(data, type, 'chapters');
			return tree
		case 'chapter':
			break;
		default:
			break;
	}
};

const makeTree = (data, type, targetChildType) => {
	let tree = {};
	for (const [k, v] of Object.entries(data)) {
		if (k === targetChildType) {
			tree.children = v.map(target => {
				return {
					id: target.id,
					title: target.title,
					isOpen: false,
					type: getShortTypeName(`${targetChildType.slice(0,-1)}`),
					children: []
				}
			})
		}else {
			tree[k] = v;
		}
		tree.type = getShortTypeName(type)
	}
	return tree;
};

const getShortTypeName = (type) => {
	switch (type) {
		case 'root':
			return 'DM';
		case 'curriculum':
			return 'CR';
		case 'chapter':
			return 'CT';
		default:
			return null
	}
};

const getChildType = (type) => {
	switch (type) {
		case 'root':
			return 'curriculums';
		case 'curriculum':
			return 'chapters';
		case 'chapters':
			return 'lessons';
		default:
			return null
	}
};
