const pageList = {
    page: function (listQuery) {
        var sql = 'SELECT * FROM ' + listQuery.table ;
        sql = this.condition(sql, listQuery)
        if (listQuery.page && listQuery.pageSize) {
            var pos = (listQuery.page - 1) * listQuery.pageSize
            var end = listQuery.page * listQuery.pageSize
            sql += ' LIMIT ' + pos + ',' + end
        }
        return sql
    },

    count: function (listQuery) {
        var sql = 'SELECT count(*) as count FROM ' + listQuery.table;
        sql = this.condition(sql, listQuery)
        return sql
    },

    condition: function (sql, listQuery) {
        var d = listQuery.like
        if (d != undefined) {
            sql+=' where 1=1 '
            for (const key in d) {
                sql = sql + ' AND ' + key + ' like '
                if (d.hasOwnProperty(key)) {
                    const element = d[key];
                    sql += element 
                }
            }
            
        }
        d = listQuery.and
        if (d != undefined) {
            sql+=' where 1=1 '
            for (const key in d) {
                sql = sql + ' AND ' + key + ' =  '
                if (d.hasOwnProperty(key)) {
                    const element = d[key];
                    sql += element 
                }
            }
            
        }
        d = listQuery.or
        if (d != undefined) {
            sql+=' where 1=2 '
            for (const key in d) {
                sql = sql + ' OR ' + key + ' =  '
                if (d.hasOwnProperty(key)) {
                    const element = d[key];
                    sql +='"' +element+'"' 
                }
            }
            
        }
        return sql
    }
}

const base = {
    getCourseList: function (params) {
        var sql = 'select * from  pub_content where id in ('
        for (let index = 0; index < params.length; index++) {
            const element = params[index];
            sql += element + ","
        }
        sql = sql.substring(0, sql.lastIndexOf(','))
        sql += ')'
        return sql;
    },
    getList: function (table,params) {
        var sql = 'select * from '+table+' where id in ('
        for (let index = 0; index < params.length; index++) {
            const element = params[index];
            sql += element + ","
        }
        sql = sql.substring(0, sql.lastIndexOf(','))
        sql += ')'
        return sql;
    },
}

const userOpt = {
    getUser: 'select * from user where username=?'
}

const work = {
    delete: 'delete  from work where id=?'
}

const customers = {
    login: 'select * from customers where tel=? AND password=?'
}
/**  首页 */
const resource = {
    getAll: 'select * from resource',
    getOne:'select * from resource where id=?'
}
//实战
const reclist={
    getAll: 'select * from reclist'
}
//好课程
const newlist={
    getAll: 'select * from newlist'
}

//猿问
const wendalist={
    getAll: 'select * from wendalist'
}

/**  详情 */
const classData={
    getClassData: 'select * from classData where id=?'
}

const chapterlist={
    getChapterlist: 'select * from chapterlist cl where cl.cla_id in (select c.id from classData c where c.id=?)'
}

const intro={
    getIntro: 'select * from intro cl where cl.cla_id = ?',
    getOne: 'select * from intro cl where cl.id = ?'
}

const teacherOpt={
    getTeacher: 'select * from teacher cl where cl.cla_id = ?',
    getOne: 'select * from teacher cl where cl.id = ?'
}

const rate={
    getrate: 'select * from rate cl where cl.cla_id in (select c.id from classData c where c.id=?)'
}


/**  课程 */

const course_class={
    getAll: 'select * from course_class cl'
}

const typelist={
    find: 'select * from typelist cl where cc_id=?'
}

const courselist={
    find: 'select * from courselist cl where cc_id=?'
}



const users={
    login: 'select * from users where nickname="?" and password="?" ',
    getOne: 'select * from users where id=?',
    
    updateF:'update users set followers="?" where id=?',
    updateL:'update users set likes="?" where id=?',
    updateBio:'update users set bio="?" where id=?',
    updateNick:'update users set nickname="?" where id=?',
    updatePass:'update users set password="?" where id=?',
    updatePhoto:'update users set photo="?" where id=?',
}

const pub_content={
    getOne: 'select * from pub_content where id=?',
    getAll:'select * from pub_content',
    find:'select * from pub_content where cus_id=?',
    findByTitle:'select * from pub_content where title like "%?%"',
    delete:'delete  from pub_content where id=?',
    inc_like:'update pub_content set like_count=like_count+1 where id=?',
    des_like:'update pub_content set like_count=like_count-1 where id=?',
    inc_com:'update pub_content set com_count=com_count+1 where id=?',
    des_com:'update pub_content set com_count=com_count-1 where id=?',
    topN:'SELECT * FROM pub_content ORDER BY like_count DESC LIMIT 0,3'
}

const user_pub={
    find: 'select pc.* from users u left join user_pub up on up.cus_id=u.id left join pub_content pc on pc.id=up.pub_id where u.id=?',
    delete:'delete from user_pub where cus_id=? AND pub_id=?',
    findLike:'select * from user_pub where cus_id=? AND pub_id=?',
    findMyLike:'select * from user_pub where cus_id=?'
}

const user_follow={
    find: 'SELECT * FROM pub_content WHERE cus_id in( SELECT uf.cus_id FROM users u LEFT JOIN user_follow uf ON uf.cus_follow_id=u.id  WHERE u.id=?)',
    findMyFollow:'SELECT u.* FROM users u WHERE id IN (	SELECT	uf.cus_id	FROM user_follow uf	WHERE uf.cus_follow_id =?)',
    findFollow:'select * from user_follow where cus_id=? AND cus_follow_id=?',
    delete:'delete from user_follow where cus_id=? AND cus_follow_id=?'
}


const commentlist={
    find: 'select c.id ,c.cus_nickname,c.`comment`,c.cus_id,c.pub_id ,c.create_time from commentlist c where pub_id=?',
}


module.exports = {
    pageList,
    userOpt,
    work,
    base,
    customers,
    resource,
    reclist,
    newlist,
    wendalist,
    classData,// 详情
    chapterlist,
    intro,
    teacherOpt,
    rate,
    commentlist,
    course_class,
    typelist,
    courselist,

    users,
    pub_content,
    user_pub,
    user_follow
};