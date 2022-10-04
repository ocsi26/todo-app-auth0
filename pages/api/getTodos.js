import { table, getMinifiedRecords } from "./utils/Airtable";

export default async function handler(req, res) {

    try{
        const records = await table.select({}).firstPage();
        const minifiedRecords = getMinifiedRecords(records);
        res.status(200);
        res.json(minifiedRecords);
    }
    catch (err) {
        res.status(500);
        res.json({msg: 'Something went wrong'});
    }
  }
  