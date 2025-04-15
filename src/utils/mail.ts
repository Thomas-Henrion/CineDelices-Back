import { MailerSend, Sender } from "mailersend";
import dotenv from "./dotenv";

const mailerSend = new MailerSend({
	apiKey: dotenv.MAIL.APIKEY,
});

const sentFrom = new Sender(
	"cinedelice@test-yxj6lj9x8zq4do2r.mlsender.net",
	"Cinedelice",
);

export { mailerSend, sentFrom };
