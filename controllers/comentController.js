const db = require("../models");
const Coments = db.coments;
const User = db.user;

exports.addComment = async (req, res) => {
    try{
        const {username, password, text} = req.body;
        const data = await User.findOne({where : {username:username, password:password}});
        console.log(data.id)
        if(data){
            const coment = {
                posted_by: data.id,
                text: text
            }
            
            const comentData = await Coments.create(coment);
            console.log(comentData)
            if(comentData)
                res.status(200).json(comentData);
            else
                res.status(404).json(`anable to comment with ${data.id}`)
        }else{
            res.status(404).json(`user not found with username: ${username} and password: ${password}`)
        }

    }catch(err){
        res.status(400).json(err);
    }
}