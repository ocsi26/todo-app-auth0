import { table, getMinifiedRecord, getMinifiedRecords } from "./utils/Airtable";

export default async function handler(req, res) {
    const {id, fields} = req.body;

    try{
        const updatedRecords = await table.update([{id, fields}]);

        res.status(200);
        res.json(getMinifiedRecord(updatedRecords[0]));
    }
    catch (err) {
        console.log(err);
        res.status(500);
        res.json({msg: 'Something went wrong'});
    }
  }
  