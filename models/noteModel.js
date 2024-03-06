import mongoose from'mongoose';

const noteModel = new mongoose.Schema({
   title: {
       type: String,
       required: true,
       trim: false
   },
   desc: {
       type: String,
       required: true,
   }
}, { timestamps: true })

export default mongoose.model('notes', noteModel);