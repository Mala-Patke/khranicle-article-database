const { get } = require('axios').default;
const attrEnum = ["title", "author", "beat", "desc", "edition", "date", "url"];
/**
 * @param {import("http").IncomingMessage} req
 * @param {import("http").ServerResponse} res
 */
export default async function handler(req, res) {
    const { data } = await get(process.env.GOOGLE_SHEET_URL);
    
    let sheetData = data.sheets[0].data[0].rowData
        .map(e => e.values.map(ee => ee.formattedValue))
        .filter(e => e[0])
        .map(e => 
            attrEnum.reduce((p, c, i) => 
                Object.defineProperty(p, c, { value: e[i], enumerable: true, writable: true }),
                {}
            )
        );

    let shouldFilter = [];
    for(let _enum of attrEnum) if(req.query[_enum]) shouldFilter.push(_enum);
    for(let filter of shouldFilter) {
        console.log(filter, req.query[filter]);
        //This is super rudimentiary but it'll work for now
        sheetData = sheetData.filter(e => e[filter].toLowerCase() == req.query[filter].toLowerCase())
    }

    return res.status(200).json(sheetData);
}
