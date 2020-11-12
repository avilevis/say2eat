const postgres = require('postgres')
const sql = postgres('postgres://username:password@host:port/database', {
        host: '127.0.0.1',
        port: 5432,
        database: 'postgres',
        username: 'postgres',
        password: 'psqlpass'
    }
)

function format_week(db_week){
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
            open: db_week.open,
            close: db_week.close,
            allDay: db_week.allday,
        }
    }
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

module.exports = {
    newWeekdays, updateWeekdays
};