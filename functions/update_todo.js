import connectDb from "../db.js";
import noteModel from "../models/noteModel.js";
import slugify from "slugify";

connectDb();

exports.handler = async (event, context) => {
   try {
      const { title, desc } = JSON.parse(event.body);
      const { id } = event.queryStringParameters;
      const note = await noteModel.findByIdAndUpdate(
         id,
         { title, desc, slug: slugify(title, desc) },
         { new: true }
      );
      return {
         statusCode: 200,
         body: JSON.stringify({
            success: true,
            message: 'Note updated successfully!',
            note,
         }),
      };
   } catch (error) {
      console.error(error);
      return {
         statusCode: 500,
         body: JSON.stringify({
            success: false,
            message: 'Error in update',
            error,
         }),
      };
   }
};
