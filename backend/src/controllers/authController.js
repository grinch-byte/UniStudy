const fs = require('fs')
const path = require('path')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const dataDir = path.join(__dirname, '..', 'data')
const usersFile = path.join(dataDir, 'users.json')

function ensureDataDir(){
	if(!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true })
	if(!fs.existsSync(usersFile)) fs.writeFileSync(usersFile, JSON.stringify([]))
}

function loadUsers(){
	ensureDataDir()
	try{ return JSON.parse(fs.readFileSync(usersFile, 'utf8')) } catch(e){ return [] }
}

function saveUsers(users){
	ensureDataDir()
	fs.writeFileSync(usersFile, JSON.stringify(users, null, 2))
}

function generateReferralCode(){
	return Date.now().toString(36) + Math.random().toString(36).slice(2, 8)
}

function register(req, res){
	const { firstName, lastName, email, program, role, password, referralCode } = req.body

	if(!email || !password) return res.status(400).json({ message: 'Email and password required' })

	const users = loadUsers()

	if(users.find(u => u.email === email)){
		return res.status(400).json({ message: 'Email already registered' })
	}

	const referrer = referralCode ? users.find(u => u.referralCode === referralCode) : null
	const hashed = bcrypt.hashSync(password, 10)

	const user = {
		id: Date.now().toString(),
		firstName: firstName || '',
		lastName: lastName || '',
		email,
		program: program || '',
		role: role || 'Student',
		password: hashed,
		avatarUrl: null,
		referralCode: generateReferralCode(),
		referredBy: referrer ? referrer.id : null
	}

	users.push(user)
	saveUsers(users)

	const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, process.env.JWT_SECRET || 'devsecret', { expiresIn: '2h' })

	res.json({
		message: 'Account created',
		token,
		user: {
			id: user.id,
			email: user.email,
			firstName: user.firstName,
			lastName: user.lastName,
			program: user.program,
			role: user.role,
			avatarUrl: user.avatarUrl,
			referralCode: user.referralCode,
			referredBy: user.referredBy
		}
	})
}

function login(req, res){
	const { email, password } = req.body
	if(!email || !password) return res.status(400).json({ message: 'Email and password required' })

	const users = loadUsers()
	const user = users.find(u => u.email === email)
	if(!user) return res.status(401).json({ message: 'Invalid credentials' })

	const ok = bcrypt.compareSync(password, user.password)
	if(!ok) return res.status(401).json({ message: 'Invalid credentials' })

	const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, process.env.JWT_SECRET || 'devsecret', { expiresIn: '2h' })

	res.json({
		message: 'Logged in',
		token,
		user: {
			id: user.id,
			email: user.email,
			firstName: user.firstName,
			lastName: user.lastName,
			program: user.program,
			role: user.role,
			avatarUrl: user.avatarUrl,
			referralCode: user.referralCode,
			referredBy: user.referredBy
		}
	})
}

function getUsers(req, res){
	const users = loadUsers()
	// hide passwords
	const out = users.map(u => ({
		id: u.id,
		firstName: u.firstName,
		lastName: u.lastName,
		email: u.email,
		program: u.program,
		role: u.role,
		avatarUrl: u.avatarUrl,
		referralCode: u.referralCode,
		referredBy: u.referredBy
	}))
	res.json(out)
}

function me(req, res){
	const auth = req.headers.authorization || ''
	const token = auth.replace('Bearer ', '')
	if(!token) return res.status(401).json({ message: 'Missing token' })
	try{
		const payload = jwt.verify(token, process.env.JWT_SECRET || 'devsecret')
		const users = loadUsers()
		const user = users.find(u => u.id === payload.id)
		if(!user) return res.status(404).json({ message: 'User not found' })
		const referrals = users.filter(u => u.referredBy === user.id).length
		const { password, ...safe } = user
		return res.json({ ...safe, referralCount: referrals })
	}catch(e){
		return res.status(401).json({ message: 'Invalid token' })
	}
}

module.exports = {
	register,
	login,
	getUsers,
	me
}