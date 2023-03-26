import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

export const verifyToken = (token) => {
	try {
		const decode = jwt.verify(token, JWT_SECRET);
		return decode;
	} catch(err) {
		return false;
	}
};

export const generateToken = (data) => jwt.sign({data}, JWT_SECRET, { expiresIn: '1h' });