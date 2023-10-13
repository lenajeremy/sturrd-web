import Mailjet from "node-mailjet";

const apiKey = process.env.MAILJET_API_KEY
const secretKey = process.env.MAILJET_SECRET_KEY

const mailjet = Mailjet.apiConnect(apiKey || '', secretKey || '')

export async function sendEmail(emailAddress: string, textContent: string, htmlContent: string, url: string) {
    
    try {
        const request = await mailjet
            .post('send', { version: 'v3.1' })
            .request({
                Messages: [
                    {
                        From: {
                            Email: "jeremiah@fusionintel.io",
                            Name: "Jeremiah Lena"
                        },
                        To: [
                            {
                                Email: emailAddress,
                                Name: "New User"
                            }
                        ],
                        Subject: "Email Login",
                        TextPart: "Login with this url",
                        HTMLPart: `<h3>Login with this <a href = "${url}">URL</a></h3>`
                    }
                ]
            })

            if (request.response.status === 200) {
                console.log("Message sent successfully")
            }

    } catch (error) {
        // @ts-ignore
        console.log(error.statusCode)
    }
}