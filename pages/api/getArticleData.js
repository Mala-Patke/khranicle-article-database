const attrEnum = ["title", "author", "beat", "desc", "edition", "date", "url"];

/**
 * @param {import("http").IncomingMessage} req
 * @param {import("http").ServerResponse} res
 */
export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', 'https://www.khranicle.com');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version')

    const request = await fetch(process.env.GOOGLE_SHEET_URL);
    const data = await request.json();

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
