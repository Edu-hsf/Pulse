import pool from "../../config/database";

export function Create () {
    return pool.query('INSERT INTO CONVERSATIONS () VALUES ()');
}