const showdown = require('showdown');
const sqlite3 = require('sqlite3').verbose();


// const db = new sqlite3.Database('./db/texts.sqlite');

const path = process.env.NODE_ENV === 'test' 
        ? './db/test.sqlite'
        :'./db/texts.sqlite';
        console.log(path);
const db = new sqlite3.Database(path);
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET ? process.env.JWT_SECRET : "123";

const converter = new showdown.Converter();

register  = (data) => {

    let sql = "INSERT INTO users (email, password, name, birth) VALUES (?, ?, ?, ?)";

    return new Promise((resolve, reject) => {
        bcrypt.hash(data[1], saltRounds, function (err, hash) {
            data[1] = hash;
        

            db.run(sql, data, (err, result) => {
                if (err) {
                    return reject("Failed");
                } else {
                    return resolve("Success");        
                }
            })
        })
        
    })

} 



passwordCompare = async (data) => {
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




update = (sql, params = []) => {
    return new Promise((resolve, reject) => {
        db.run(sql, params, (err, result) => {
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


getAll = (sql, params = []) => {
    return new Promise((resolve, reject) => {
        db.all(sql, params, (err, result) => {
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



verify = async (token, res, next) => {
    
    if (process.env.NODE_ENV === 'test') {
        return true;
    }

    jwt.verify(token, secret, function (err, decoded) {
 
        if (err && process.env.NODE_ENV !== 'test') {
            return res.json("failed");
        }

        
        next();
    });
    
  
}


saveReport = async (data, res) => {

    
    console.log(data.file);
    console.log("hello");
        db.run("INSERT INTO reports (filename, filetext) VALUES (?, ?)",
            data.filename,
            data.file, (err) => {
                return err ? "Error" : "Success";
            });
    return res.json("Success");
    // return "Success1";
} 


getReportNames = async (data) => {
    const sql = "Select filename From reports";
    const text = await getAll(sql, data.filename)

        return text;

    
    
}



getReports = async (data) => {
    const sql = "Select filetext From reports WHERE filename=?";
    const text = await get(sql, data.filename)

    text.data = converter.makeHtml(text.filetext);
    return text.data;



}

getTextMarkdown = async (data) => {
    const sql = "Select filetext From reports WHERE filename=?";
    const text = await get(sql, data.filename)
    return text;



}


updateMarkdown = async (data) => {

    let parm = [data.filetext, data.filename];
    console.log(parm);
    const sql = "UPDATE reports SET filetext = ? WHERE filename=?";
    await update(sql, parm);

    



}
