import faunadb from 'faunadb'
require('dotenv').config()

const headers = {
	'Access-Control-Allow-Origin': '*',
	'Access-Control-Allow-Headers': 'Content-Type',
	'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
}

const client = new faunadb.Client({
	secret: 'fnAEBPfdzRACBsdQdHLTJfBjBhowg_GeMC9xItsa',
})

export { client, headers }