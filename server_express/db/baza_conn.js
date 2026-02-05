import mysql from 'mysql';

export const link = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "Hardware_OAnkiewicz"
});

link.connect(err => {
    if (err) throw err;
    console.log("CONNECTED to Hardware_OAnkiewicz database");
})
