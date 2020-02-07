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
	enum ParentType{
		LESSON
		CHAPTER
	}
	input StapleInput{
		title:String
		parentType:ParentType!
		parentId:String!
		problems:[ID!]!
	}
	input LessonInput{
		uid:String!
		title:String
		chapterId:ID
	}
	type Query{
		curriculum(id:ID):Curriculum
	}
	type Mutation {
		createProblem(input:ProblemInput!):ID!
		createChapter(input:ChapterInput):ID!
		createCurriculum(input:CurriculumInput):ID!
		createStaple(input:StapleInput):ID!
		createLesson(input:LessonInput):ID!
	}
	type Curriculum{
		id:ID
		uid:String
		title:String
		chapter:[Chapter]
	}
	type Chapter{
		id:ID
		uid:String
		curriculumId:ID
		title:String
		lessons:[Lesson]
	}
	type Lesson{
		id:ID
		uid:String
		title:String
		chapterId:ID
		staples:[Staple]
	}
	type Problem{
		id:ID
		title:String
		type:String!
		question:String
		solution:String
		uid:String!	
	}
	type Staple{
		id:ID
		title:String
		problems:[Problem]
		parentId:ID
	}
`;

module.exports = schema;
