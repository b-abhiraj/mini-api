import connectDb from "../db.js";
import noteModel from "../models/noteModel.js";

connectDb();

exports.handler = async (event, context) => {
   try {
      const notes = await noteModel.find({});
      return {
         statusCode: 200,
         body: JSON.stringify({
            success: true,
            message: 'All Notes',
            notes,
         }),
      };
   } catch (error) {
      console.error(error);
      return {
         statusCode: 500,
         body: JSON.stringify({
            success: false,
            message: 'Error while fetching notes',
            error,
         }),
      };
   }
};
