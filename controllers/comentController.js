const db = require("../models");
const Coments = db.coments;
const User = db.user;
const Todo = db.todo;
const todo_Coments = db.todo_coments;

exports.addComment = async (req, res) => {
    try{
        const {username, password, text, todo_id} = req.body;
        const data = await User.findOne({where : {username:username, password:password}});
        console.log(data.id)
        if(data){
            // const coment = {
            //     posted_by: data.id,
            //     text: text
            // }
            const comentData = Coments.build({ posted_by: data.id, text: text, username: username});
            // const comentData = await Coments.create(coment);
            const saveComent = await comentData.save()
            if(saveComent) {
                const todoComentData = todo_Coments.build({todo_id: todo_id, coment_id: saveComent.id});
                console.log(todoComentData)
                await todoComentData.save();
                res.status(200).json(saveComent);
            }
            else
                res.status(404).json(`anable to comment with ${data.id}`)
        }else{
            res.status(404).json(`user not found with username: ${username} and password: ${password}`)
        }

    }catch(err){
        res.status(400).json(err);
    }
}


exports.getTodoComment = async (req, res) => {
    try{
            const data = await Todo.findAll({
                attributes:['username', 'todoTital', 'status'],
                include:[
                    {
                        model: Coments,
                        attributes:['username', 'text']
                    }
                ]
            })
        res.status(200).json(data);  
    }catch(err){
        res.status(404).json(err);
    }
}