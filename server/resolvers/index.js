const {chapterLoader} = require('../dataloaders');

module.exports = {
	Query: {
		async root(_,args, {conn}){
			const c = await conn.promise();
			const [row] = await c.query(`
				SELECT
					id,
					title
				FROM
					curriculums
			`);
			return {title:'digital math cms'};
		},
		async curriculum(_,args,{conn}){
			const c = await conn.promise();
			const [row] = await c.query(`
				SELECT 
					*
				FROM curriculums 
				WHERE id=${args.id}`);
			return row[0]
		},
		async chapter(_,args,{conn}){
			const c = await conn.promise();
			const [row] = await c.query(`
			SELECT
				*
			FROM
				chapters
			WHERE
				id=${args.id}
			`)
			return row[0]
		},
		async staple(_,args,{conn}){
			const c= await conn.promise();
			const [row] = await c.query(`
			SELECT 
				*
			FROM
				staples
			WHERE
				id=${args.id}
			`);
			return row[0];
		},
		async problem(_,args,{conn}){
			const c= await conn.promise();
			const [row] = await c.query(`
			SELECT 
				*
			FROM
				problems
			WHERE
				id=${args.id};
			`);
			return row[0];
		},
	},
	Root:{
		async curriculums(parent, args, {conn}){
			const c = await conn.promise();
			const [row]  = await c.query(`
			SELECT
				id,
				uid,
				title	
			FROM
				curriculums
				`);
			return row;
		}
	},
	Curriculum:{
		async chapters(parent, args, {conn}){
			const c = await conn.promise();
			const [row]  = await c.query(`
			SELECT
				id,
				uid,
				curriculum_id AS curriculumId,
				title	
			FROM
				chapters
			WHERE
				curriculum_id=${parent.id}
				`);
			return row;
		}
	},
	Chapter:{
		async lessons(parent, args, {conn, lessonLoader}){
			const c = await conn.promise();
			const [row]  = await c.query(`
			SELECT
				id,
				uid,
				title,
				chapter_id AS chapterId
			FROM
				lessons
			WHERE
				chapter_id=${parent.id}
				`);
			return lessonLoader.load(parent.id);
		}
	},
	Lesson:{
		async staples(parent, args, {conn, stapleLoader}){
			return stapleLoader.load(parent.id);
		}
	},
	Staple:{
		async problems(parent,args,{conn, problemLoader}){
			return problemLoader.load(parent.id);

		}
	},
	Mutation: {
		async createProblem(_,args,{conn}){
			const c= await conn.promise();
			const convertedValue = converter(args.input);
			try{
				const [result] = await c.query(`INSERT INTO problems SET ${convertedValue}`);
				return result.insertId;
			}catch (e) {
				throw e;
			}finally {
			}
		},
		async createChapter(_,args,{conn}){
			const convetedValue= await conn.promise();
			const con = converter(args.input);
			try{
				const [result] = await convetedValue.query(`INSERT INTO chapters SET ${con}`);
				return result.insertId;
			}catch (e) {
				throw e;
			}finally {
			}

		},
		async createCurriculum(_,args,{conn}){
			const convertedValue= await conn.promise();
			const con = converter(args.input);
			try{
				const [result] = await convertedValue.query(`INSERT INTO curriculums SET ${con}`);
				return result.insertId;
			}catch (e) {
				throw e;
			}finally {
			}
		},
		async createStaple(_,args,{conn}){
			const c= await conn.promise();
			const {parentType, parentId, problems, title} = args.input;
			try{
				const [result] = await c.query(`INSERT INTO staples SET title=?, parent_type=?, parent_id=?`,[title,parentType,parentId]);
				const stapleId = result.insertId;
				const q = problems.map(pId => [stapleId,pId]);
				await c.query(`INSERT INTO staple_problem_relation (staple_id, problem_id) values ?;`,[q]);
				return result.insertId;
			}catch (e) {
				throw e;
			}finally {
			}
		},
		async createLesson(_,args,{conn}){
			const convertedValue= await conn.promise();
			const con = converter(args.input);
			try{
				const [result] = await convertedValue.query(`INSERT INTO lessons SET ${con}`);
				return result.insertId;
			}catch (e) {
				throw e;
			}finally {
			}
		},
	}
};

function converter(input){
	let acc='';
	for(let [k,v] of Object.entries(input)){
		let match;
		const r = /([A-Z])/gm;
		while((match=r.exec(k)) !== null){
			k = k.replace(match[1],'_'+match[1].toLowerCase());
		}
		acc+=`${k}="${v}",`;
	}
	return acc.slice(0,-1);
}
