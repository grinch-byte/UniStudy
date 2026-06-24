const fs = require('fs')
const path = require('path')

const dataDir = path.join(__dirname, '..', 'data')
const groupsFile = path.join(dataDir, 'groups.json')

function ensureDataDir(){
	if(!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true })
	if(!fs.existsSync(groupsFile)) fs.writeFileSync(groupsFile, JSON.stringify([]))
}

function loadGroups(){
	ensureDataDir()
	try{ return JSON.parse(fs.readFileSync(groupsFile, 'utf8')) } catch(e){ return [] }
}

function saveGroups(groups){
	ensureDataDir()
	fs.writeFileSync(groupsFile, JSON.stringify(groups, null, 2))
}

function createGroup(req, res){
	const { name, description } = req.body
	const auth = req.headers.authorization || ''
	const token = auth.replace('Bearer ', '')

	if(!token) return res.status(401).json({ message: 'Missing token' })
	if(!name) return res.status(400).json({ message: 'Group name required' })

	try{
		const jwt = require('jsonwebtoken')
		const payload = jwt.verify(token, process.env.JWT_SECRET || 'devsecret')
		const groups = loadGroups()

		const group = {
			id: Date.now().toString(),
			name,
			description: description || '',
			createdBy: payload.id,
			members: [payload.id],
			createdAt: new Date().toISOString()
		}

		groups.push(group)
		saveGroups(groups)

		res.status(201).json({ message: 'Group created', group })
	}catch(e){
		return res.status(401).json({ message: 'Invalid token' })
	}
}

function getGroups(req, res){
	try{
		const jwt = require('jsonwebtoken')
		const auth = req.headers.authorization || ''
		const token = auth.replace('Bearer ', '')

		if(!token) return res.status(401).json({ message: 'Missing token' })

		const payload = jwt.verify(token, process.env.JWT_SECRET || 'devsecret')
		const groups = loadGroups()
		const userGroups = groups.filter(g => g.members.includes(payload.id))

		res.json(userGroups)
	}catch(e){
		return res.status(401).json({ message: 'Invalid token' })
	}
}

module.exports = {
	createGroup,
	getGroups
}
