import * as tedious from "tedious";
import "isomorphic-fetch";

export class Utils {
  // Bind AdaptiveCard with data
}

export async function executeSQL(sqlStr: string) {
  const config = {
    server: process.env.SQL_ENDPOINT,
    authentication: {
      type: "default",
      options: {
        userName: process.env.SQL_USER_NAME,
        password: process.env.SQL_PASSWORD,
      },
    },
    options: {
      encrypt: true,
      database: process.env.SQL_DATABASE_NAME,
    },
  };

  let connection;
  try {
    const connection = new tedious.Connection(config);

    connection.connect((err) => {
      if (err) {
        console.log(err);
      } else {
        const request = new tedious.Request(sqlStr, (err) => {
          if (err) {
            console.log(err);
            throw err;
          }
        });
        connection.execSql(request);
      }
    });
  } catch (e) {
    console.log(e);
  } finally {
    if (connection) {
      connection.close();
    }
  }
}
