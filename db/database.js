const postgres = require('postgres')
const moment = require('moment')
const sql = postgres('postgres://username:password@host:port/database', {
        host: '127.0.0.1',
        port: 5432,
        database: 'postgres',
        username: 'postgres',
        password: 'psqlpass'
    }
)

const format_week = function (db_week){
    return {
        id: db_week.id,
        days: {
            Sunday: db_week.sunday,
            Monday: db_week.monday,
            Tuesday: db_week.tuesday,
            Wednesday: db_week.wednesday,
            Thursday: db_week.thursday,
            Friday: db_week.friday,
            Saturday: db_week.saturday,
        },
        times: {
            open: db_week['open'],
            close: db_week['close'],
            allDay: db_week.allday,
        }
    }
}

const listWeekdays = async function () {
    let weeks = await sql`select * from public.weekdays_table order by id`
    return weeks
}

const newWeekdays = async function () {
    let [week] = await sql`INSERT INTO public.weekdays_table DEFAULT VALUES returning *`
    return format_week(week)
}

const updateWeekdays = async function (id, field, value ) {
    const q={
        id: id,
    }
    q[field] = value
    let week = await sql`update public.weekdays_table set ${sql(q, field)} where id = ${ q.id }`
    return week
}

const deleteWeekdays = async function ( id ) {
    let week = await sql`DELETE FROM public.weekdays_table where id = ${ id }`
    return week
}
module.exports = {
    format_week, listWeekdays, newWeekdays, updateWeekdays, deleteWeekdays
};