import mongoose from'mongoose';

const noteModel = new mongoose.Schema({
   title: {
       type: String,
       required: true,
       trim: false
   },
   description: {
       type: String,
       required: true,
   },
   is_completed:{
    type:Boolean
   }
}, { timestamps: true })

export default mongoose.model('notes', noteModel);