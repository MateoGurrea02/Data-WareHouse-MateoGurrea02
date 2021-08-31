const jwt = require('jsonwebtoken');
const userModel = require('../models/users');

class User {
    static async getAll(req, res) {
        try {
            const users = await userModel.findAll(
                {
                    attributes: {
                        exclude: ['password','profile_id']
                    },
                    include: ['profile']
                }
            );
            return res.json({
                status: 200,
                data: users
            });
        } catch (error) {
            return res.status(500).json({
                status: 500,
                message: error.message
            });
        }
    }

    static async login(req, res) {
        const user = await userModel.findOne({
            where: {
                email: req.body.email,
                password: req.body.password,
            },
            include:['profile']
        })
        if (!user) {
            return res.status(401).json({
                status: 401,
                error: "incorrect username and / or password"
            });
        }
        const token= jwt.sign({
            user:{
                id:user.id,
                email:user.email,
                profile: user.profile.name
            }
        },process.env.JWT_SECRET);
        return res.json({
            token,
            profile: user.profile.name
        });
    }

    static async create(req, res) {
        try {
            const { name, surname, email, password, profile_id } = req.body;
            if (!name|| !surname||!email || !password || !profile_id) {
                return res.status(422).json({
                    status: 422,
                    error: 'The input \"name\", \"surname\", \"email\", \"password\" and \"profile_id\" are required'
                });
            }
            const userCreated = await userModel.create(
                { name, surname, email, password, profile_id},
                { fields: ["name", "surname", "email", "password","profile_id"] }
            );
            return res.status(201).json({
                status: 201,
                message: 'user created'
            }) 
        } catch (err) {
            return res.status(500).json({
                status: 500,
                error: err
            })
        }
    }
    static async getById(req, res){
        try {
            const user = await userModel.findOne({
                where: {
                    id: req.params.id
                },
                include:['profile'],
                attributes: {   
                    exclude: ["profile_id", "password"]
                }
            });
            return res.json({
                status: 200,
                data: user
            });
        } catch (err) {
            return res.status(500).json({
                status: 500,
                error: err
            });
        }
    }

    static async update(req, res){
        try {
            const { name, surname, email, password, profile_id } = req.body;
            const userId = await userModel.findOne({
                where: {
                    id: req.params.id
                }
            });
            const update = await userId.update(
                {name, surname, email, password, profile_id},
                {fields: ["name", "surname", "email", "password","profile_id"]}
            )
            return res.status(201).json({
                status: 201,
                message: 'Updated user'
            }) 
        }catch{
            return res.status(500).json({
                status: 500,
                error
            })   
        }
    }
    static async delete(req, res){
        try {   
            const deleteU = await userModel.destroy({
                where:{
                    id: req.params.id
                }            
            });
            return res.status(201).json({
                status: 201,
                message: 'Deleted user'
            })
        }catch{
            return res.status(500).json({
                status: 500,
                error
            })   
        }
    }
}

module.exports = User;