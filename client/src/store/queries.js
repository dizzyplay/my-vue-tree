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
				chapters{
					id
					title
					lessons{
						id
						title
						staples{
							id
							title
							problems{
								id
								title
								question
							}
						}
					}
				}
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

export const fetchNodeData = async () => {
	const res = await apolloClient.query({query: rootQuery});
	return res.data.root;
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
