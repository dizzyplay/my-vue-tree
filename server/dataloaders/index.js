const DataLoader = require('dataloader');

const chapterLoader = (conn) =>{
	return new DataLoader(async ids => {
		const c = await conn.promise();
		const [result] = await c.query(`
		SELECT
			*
		FROM
			lessons
		`);
		const map = {}
		result.forEach(r => {
			map[r.id] = r
		});
		return ids.map(id => map[id] );
	});
};

module.exports = {
	chapterLoader
};