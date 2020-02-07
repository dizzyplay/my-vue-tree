const {chapterLoader} = require('../dataloaders');

module.exports = {
	Query: {
		async curriculum(_,args,{conn}){
			const c = await conn.promise();
			const [row] = await c.query(`
		SELECT 
			*
		FROM curriculums 
		WHERE id=${args.id}`);
			return row[0]
		},
	},
	Curriculum:{
		async chapter(parent, args, {conn}){
			return chapterLoader().load(conn,parent.id);
			// const c= await conn.promise();
			// const [row] = await c.query(`
			// SELECT
			// 	*
			// FROM
			// 	chapters
			// WHERE
			// 	curriculum_id=${parent.id}
			// `);
			// return row;
		}
	},
	Chapter:{
		lessons(parent, args, {conn}){
			console.info(parent);

			chapterLoader.load(args.id);
			return []
		}
	},
	Staple:{
		problems(){
			return []
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
			const convertedValue= await conn.promise();
			const con = converter(args.input);
			try{
				const [result] = await convertedValue.query(`INSERT INTO staples SET ${con}`);
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
