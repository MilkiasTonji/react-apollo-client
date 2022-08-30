
const graphql = require("graphql")


const { GraphQLSchema, GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLList } = graphql

const UserType = require('./TypeDefs/UserType')

const userData = require('../../MOCK_DATA.json')


const RootQuery = new GraphQLObjectType({
    name:"RootQueryType",
    fields: {
        getAllUsers: {
            type: new GraphQLList(UserType),
            args: {id: {type: GraphQLInt}},
            resolve(parent, args){
                // call the database if you have here....
                return userData
            }
        }
    }
})
const Mutation = new GraphQLObjectType({
    name: "Mutation",
    fields:{
        createUser: {
            type: UserType,
            args: {
                first_name: { type: GraphQLString},
                last_name: { type: GraphQLString },
                email: { type: GraphQLString },
                gender: { type: GraphQLString },
            },
            resolve(parent, args){
                console.log("args: ", userData.length)
                userData.push({
                    id: userData.length + 1,
                    first_name: args.first_name,
                    last_name: args.last_name,
                    email: args.email,
                    gender: args.gender
                })
               
                return args
            }
        }
    }
})

module.exports =  new GraphQLSchema({query: RootQuery, mutation: Mutation})
