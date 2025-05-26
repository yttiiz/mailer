# ![logo](./mailer.png) Mailer

This application is an **api** designed to handle sending emails with `nodemailer`.

### Specifications

- **Language** : [Typescript](https://www.typescriptlang.org/)
- **Runtime** : [deno](https://deno.com/)
- **Framework** : [oak](https://deno.land/x/oak)

The application configuration is define in the `deno.json` file. You ned to set your environnement variable.

```
PORT=3000
HOST=127.0.0.1
API_KEY="your_api_key"
ADMIN_EMAIL="your_email_address"
ADMIN_USERNAME="your_username"
ADMIN_PASSWORD="your_password"
```

Then, you can start working with the application by running this command :

```sh
deno task start
```
