const mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

const SkillSchema = {
    skill_name: {
        type: String,
        unique: true
    }
};

var Skill = mongoose.model('Skill', SkillSchema);

module.exports = { Skill, SkillSchema };