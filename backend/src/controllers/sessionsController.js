const fs = require('fs')
const path = require('path')

const dataDir = path.join(__dirname, '..', 'data')
const sessionsFile = path.join(dataDir, 'sessions.json')

function ensureDataDir(){
	if(!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true })
	if(!fs.existsSync(sessionsFile)) fs.writeFileSync(sessionsFile, JSON.stringify([]))
}

function loadSessions(){
	ensureDataDir()
	try{ return JSON.parse(fs.readFileSync(sessionsFile, 'utf8')) } catch(e){ return [] }
}

function saveSessions(sessions){
	ensureDataDir()
	fs.writeFileSync(sessionsFile, JSON.stringify(sessions, null, 2))
}

function createSession(req, res){
	const { title, description, startTime, duration } = req.body
	const auth = req.headers.authorization || ''
	const token = auth.replace('Bearer ', '')

	if(!token) return res.status(401).json({ message: 'Missing token' })
	if(!title) return res.status(400).json({ message: 'Session title required' })

	try{
		const jwt = require('jsonwebtoken')
		const payload = jwt.verify(token, process.env.JWT_SECRET || 'devsecret')
		const sessions = loadSessions()

		const session = {
			id: Date.now().toString(),
			title,
			description: description || '',
			startTime: startTime || new Date().toISOString(),
			duration: duration || 60,
			createdBy: payload.id,
			participants: [payload.id],
			createdAt: new Date().toISOString()
		}

		sessions.push(session)
		saveSessions(sessions)

		res.status(201).json({ message: 'Session created', session })
	}catch(e){
		return res.status(401).json({ message: 'Invalid token' })
	}
}

function getSessions(req, res){
	try{
		const jwt = require('jsonwebtoken')
		const auth = req.headers.authorization || ''
		const token = auth.replace('Bearer ', '')

		if(!token) return res.status(401).json({ message: 'Missing token' })

		const payload = jwt.verify(token, process.env.JWT_SECRET || 'devsecret')
		const sessions = loadSessions()

		res.json(sessions)
	}catch(e){
		return res.status(401).json({ message: 'Invalid token' })
	}
}

module.exports = {
	createSession,
	getSessions
}
