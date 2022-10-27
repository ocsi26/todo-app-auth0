import { table, getMinifiedRecord, getMinifiedRecords } from "./utils/Airtable";

export default async function handler(req, res) {
    const {id} = req.body;

    try{
        console.log("DEBUG: deleteTodo.js - DELETE WAS CALLED - ID: " + id + " and Req ID: " + req.id);
        const deletedRecords = await table.destroy([id]);
        res.status(200);
        res.json(getMinifiedRecord(deletedRecords[0]));
    }
    catch (err) {
        console.log(err);
        res.status(500);
        res.json({msg: 'Something went wrong'});
    }
  }
  