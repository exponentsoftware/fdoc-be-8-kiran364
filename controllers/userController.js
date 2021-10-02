const { user, todo } = require("../models");
const db = require("../models");
const User = db.user;
const Todo = db.todo;
const Op = db.Sequelize.Op;

// Create and Save a new user
exports.create = (req, res) => {
    // Validate request
    if (!req.body.username) {
        res.status(400).send({
        message: "Content can not be empty!"
        });

        return;
    }

    // Create a user
    const user = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        phone: req.body.phone,
        userRole: req.body.userRole
    };


  // Save Todo in the database
    User.create(user).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
        message:
          err.message || "Some error occurred while creating the user."
        });
    });
  
};

// Retrieve all users from the database.
exports.findAll = (req, res) => {
    const username = req.query.username;
    var condition = username ? { username: { [Op.iLike]: `%${username}%` } } : null;
  
    User.findAll({ where: condition }).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving users."
        });
    });
};



 // Update a user by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;
    user.update(req.body, {where: { id: id }}).then(num => {
        if (num == 1) {
            res.send({message: "user was updated successfully."});
        } else {
            res.send({message: `Cannot update user with id=${id}. Maybe user was not found or req.body is empty!`});
        }
    }).catch(err => {
        res.status(500).send({message: "Error updating user with id=" + id});
    });
};

// Delete a user with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
  
    User.destroy({ where: { id: id }}).then(num => {
        if (num == 1) {
            res.send({message: "user was deleted successfully!"});
        } else {
            res.send({message: `Cannot delete user with id=${id}. Maybe user was not found!`});
        }
    }).catch(err => {
        res.status(500).send({message: "Could not delete user with id=" + id});
    });
};

// Find a single user with an id:

exports.findOne = (req, res) => {
    const id = req.params.id;
    User.findByPk(id).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({message: "Error retrieving user with id=" + id});
    });
};


exports.getTodos = async (req, res) => {
    try{
        const {username, password} = req.body;
        const data = await User.findOne({where : {username:username, password:password}});
        if(data){
            const todos = await User.findAll({
                attributes:['username', 'email', 'phone'],
                include:[{
                    model: Todo,
                    as:'todoDetails',
                    attributes:['todoTital', 'status']
                }],
                where:{id:data.id}
            })
            res.status(200).json(todos);

        }else{
            res.status(404).json(`user not found with username: ${username} and password: ${password}`)
        }

    } catch(err){
        res.status(404).json(err);
    }
}