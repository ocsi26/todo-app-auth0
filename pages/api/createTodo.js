import { table, getMinifiedRecords } from "./utils/Airtable";

export default async function handler(req, res) {
    const {description} = req.body;

    try{
        const createdRecords = await table.create([{fields: {description}}]);
        const createdRecord = {
            id: createdRecords[0].id,
            fields: createdRecords[0].fields,
        }
        res.status(200);
        res.json(createdRecord);
    }
    catch (err) {
        console.log(err);
        res.status(500);
        res.json({msg: 'Something went wrong'});
    }
  }
  