async function batchLesson(keys, conn) {
	const c = await conn.promise();
	const [row] = await c.query(`
		SELECT
			id,
			uid,
			title,
			chapter_id AS chapterId
		FROM
			lessons
		WHERE chapter_id IN (?)`, [keys]);

	const lessonMap = {};
	keys.map(k => {
		lessonMap[k] = row.filter(r => r.chapterId === k)
	});
	return keys.map(key => lessonMap[key])
}

async function batchStaple(keys, conn) {
	const c = await conn.promise();
	const [row] = await c.query(`
	SELECT
		id,
		title,
		parent_id as parentId
	FROM
		staples
	WHERE 
		parent_id IN (${keys.join(', ')});
	`);

	const stapleMap = {};
	keys.map(key => {
		stapleMap[key] = row.filter( r => r.parentId == key)
	});
	return keys.map( key => stapleMap[key])
}

async function batchProblem(keys, conn) {
	const c = await conn.promise();
	const [row] = await c.query(
		`
		SELECT
			p.id AS id,
			spr.staple_id AS staple_id,
			p.uid AS uid,
			p.question AS question,
			p.solution AS solution
		FROM
			problems p
		JOIN
			staple_problem_relation spr
		ON
			p.id = spr.problem_id
		WHERE
			p.id in (
				SELECT
					problem_id
				FROM
					staple_problem_relation
				WHERE
					staple_id IN (${keys.join(", ")})
				);`,keys.map(k => `"${k}"`).join(', '));
	const problemMap = {};
	keys.map(key => {
		problemMap[key] = row.filter(r => r.staple_id == key);
	});
	return keys.map(key => problemMap[key])
};
module.exports = {
	batchStaple,
	batchLesson,
	batchProblem
};