/**
 * Created by 毅 on 2016/9/5.
 */
var mongoose = require('mongoose');

module.exports = new mongoose.Schema({
    //pid
    pid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'File',
        default: null
    },
    //文件夹或文件的名称
    name: String,
    type: {
        type: Boolean,
        default: true
    },
    createTime: {
        type: Date,
        default: Date.now()
    }
});