let striptags = require('striptags');

module.exports = (req, res, next) => {
    let isJSON = (string) => {
        try {
            JSON.parse(str);
        } catch (e) {
            return false;
        }
        return true;
    }

    let process = (obj) => {
        if((typeof obj != 'object' && !isArray(obj)) || obj == null || Object.keys(obj).length == 0) return obj;

        for(let key in obj) 
        {
            if(typeof obj[key] == 'object' || Array.isArray(obj[key]))
            {
                obj[key] = process(obj[key]);
            }
            else if(typeof obj[key] == 'string')
            {
                if(isFinite(obj[key]))
                {
                    obj[key] = +obj[key];
                }
                else if (obj[key] == 'true' || obj[key] == 'false')
                {
                    obj[key] = !!obj[key];
                }
                else if(isJSON(obj[key]))
                {
                    obj[key] = process(JSON.parse(obj[key]));
                }
                else
                {
                    obj[key] = striptags(obj[key]);
                }
            }
        }

        return obj;
    }
    req.query = process(req.query);
    req.body = process(req.body);
    req.params = process(req.params);
    next();
}