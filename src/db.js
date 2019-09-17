const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/texts.sqlite');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;



register = async (data) => {
    await bcrypt.hash(data[1], saltRounds, function (err, hash) {
        db.run("INSERT INTO users (email, password) VALUES (?, ?)",
            data[0],
            hash, (err) => {
                return err ? "Error" : "Success";
            });
    });
} 



passwordCompare = async (data) => {
    // We get password from db with username. 
    // db Password => hash compare to data[0] loginform password
    // Return true or false
    let sql = "Select password From users WHERE email=?";

    user = await get(sql, data.username);
    return await compare(data.password, user.password);
}

get = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    db.get(sql, params, (err, result) => {
      if (err) {
        console.log('Error running sql: ' + sql)
        console.log(err)
        reject(err)
      } else {
        resolve(result)
      }
    })
  })
}

compare = (password, hash) => {
    return new Promise((resolve, error) => {
        bcrypt.compare(password, hash, (err, success) => {
            if (err) { return error(err) }
            resolve(success)
        })
    })

}


signIn = async (mail) => {
    const payload = { email: mail };
    const token = await jwt.sign(payload, secret, { expiresIn: '1h' });
    console.log(token);
    return token;
}



verify = async () => {
    jwt.verify(token, process.env.JWT_SECRET, function (err, decoded) {
        if (err) {
            return false; 
        }

        return true;
    });
}