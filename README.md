# linkly - A Modern Link Shortener

![linkly logo](https://via.placeholder.com/150) <!-- Replace with actual logo URL -->

## Overview

linkly is a free and open-source link shortener built with Next.js, Tailwind CSS, and PostgreSQL. It allows users to create short links quickly and effortlessly while providing features like tracking clicks and managing links with passwords. The service prioritizes security and privacy, with no sign-ups required.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Configuration](#configuration)
- [Self-hosting](#self-hosting)
- [Contributing](#contributing)
- [License](#license)

## Features

- Create short links instantly
- Track clicks on your links
- Manage links with passwords
- No sign-ups required
- Rate limits to prevent spam
- Custom domain support coming soon

## Technologies Used

- **Next.js**: A React framework for building server-rendered applications.
- **Tailwind CSS**: A utility-first CSS framework for styling.
- **PostgreSQL**: A powerful, open-source relational database.
- **Prisma**: An ORM for Node.js and TypeScript.

## Installation

To get started with linkly, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/linkly.git
   cd linkly
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up your environment variables in a `.env` file:
   ```env
   DATABASE_URL=your_database_connection_string
   URL=your_domain
   LIMIT=your_limit
   ```

4. Push the Prisma schema to your database:
   ```bash
   npx prisma db push
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

## Usage

Once the server is running, you can access the application at `http://localhost:3000`. 

### Creating a Short Link

1. Navigate to the create link page.
2. Enter the URL you want to shorten and a custom slug (optional).
3. Click on "Proceed" to generate your short link.

### Viewing Your Links

You can view the links you have created and their analytics on the dashboard.

## Configuration

### Environment Variables

- `DATABASE_URL`: Connection string for your PostgreSQL database.
- `LIMIT`: Maximum number of links allowed to be created (optional).
- `URL`: The domain of your site for generating short links.

## Self-hosting

Self-hosting is straightforward. You can host this app on your own VPS or use platforms like Vercel. Just ensure you set the `DATABASE_URL` in your `.env` file and push the Prisma schema.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request for any improvements or features.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
