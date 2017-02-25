import Mailgun from 'mailgun-js';

const apiKey = process.env.MAILGUN_API_KEY;
const domain = process.env.MAILGUN_DOMAIN; 

export default Mailgun({ apiKey, domain });
