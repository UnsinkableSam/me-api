const showdown = require('showdown');
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/texts.sqlite');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;

const converter = new showdown.Converter();


register = async (data) => {
    await bcrypt.hash(data.password, saltRounds, function (err, hash) {
        db.run("INSERT INTO users (email, password) VALUES (?, ?)",
            data.username,
            hash, (err) => {
                return err ? "Error" : "Success";
            });
    });
    return "Success";
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
    const secret = "123";
    const token = await jwt.sign(payload, secret, { expiresIn: '1h' });
    console.log(token);
    return token;
}



verify = async (token, res) => {
    let secret = "123";
    jwt.verify(token, secret, function (err, decoded) {
        if (err) {
            return res.json("FAILED BITCH");
        }
        next();
        // return true;
    });
}


saveReport = async (data) => {

    
    console.log(data.file);
    console.log("hello");
        db.run("INSERT INTO reports (filename, filetext) VALUES (?, ?)",
            data.filename,
            data.file, (err) => {
                return err ? "Error" : "Success";
            });
    // return "Success1";
} 


getReportNames = async (data) => {

    
    console.log(data.filename);
    console.log("Hello");
    
    const sql = "Select filename From reports";
    const text = await getAll(sql, data.filename)
    
        console.log(text);
        
        return text;

    
    
}



getReports = async (data) => {


    console.log(data.filename);
    console.log("Hello1");

    const sql = "Select filetext From reports WHERE filename=?";
    const text = await get(sql, data.filename)

    console.log(text);
    console.log("loool");
    text.data = converter.makeHtml(text.filetext);
    return text.data;



}

getTextMarkdown = async (data) => {


    console.log(data.filename);
    console.log("Hello1");

    const sql = "Select filetext From reports WHERE filename=?";
    const text = await get(sql, data.filename)

    console.log(text);
    console.log("loool");
    // text.data = converter.makeHtml(text.filetext);
    return text;



}


updateMarkdown = async (data) => {

    let parm = [data.filetext, data.filename];
    console.log(parm);
    const sql = "UPDATE reports SET filetext = ? WHERE filename=?";
    await update(sql, parm);

    



}
