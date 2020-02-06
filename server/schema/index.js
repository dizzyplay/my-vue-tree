const {gql} = require('apollo-server');


const schema = gql`
	input ProblemInput{
		title:String
		type:String!
		question:String
		solution:String
		uid:String!
	}
	input CurriculumInput{
		uid:String,
		title:String
	}
	input ChapterInput{
		uid:String!
		curriculumId:ID
		title:String
	}
	input StapleInput{
		title:String
	}
	input LessonInput{
		uid:String!
		title:String
		chapterId:ID
	}
	type Query{
		hello:String
	}
	type Mutation {
		createProblem(input:ProblemInput!):ID!
		createChapter(input:ChapterInput):ID!
		createCurriculum(input:CurriculumInput):ID!
		createStaple(input:StapleInput):ID!
		createLesson(input:LessonInput):ID!
	}
`;

module.exports = schema;
