import connectDb from "../db.js";
import noteModel from "../models/noteModel.js";

connectDb();

exports.handler = async (event, context) => {
   try {
      const { id } = event.queryStringParameters;
      await noteModel.findByIdAndDelete(id);
      return {
         statusCode: 200,
         body: JSON.stringify({
            success: true,
            message: 'Deleted Successfully',
         }),
      };
   } catch (error) {
      console.error(error);
      return {
         statusCode: 500,
         body: JSON.stringify({
            success: false,
            message: 'Error In Delete note',
            error,
         }),
      };
   }
};