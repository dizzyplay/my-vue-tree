const DataLoader = require('dataloader');

const chapterLoader = (conn,ids)=>{
	return new DataLoader(async() => {
		const c = await conn.promise();
		const [row] = await c.query(`
		SELECT
			*
		FROM
			chapters
		WHERE
			curriculum_id=?
		`,ids);
		console.info(keys);
		return ids.map(id => row[id])
	});
};

module.exports = {
	chapterLoader
};