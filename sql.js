module.exports = async () => {
    const tables = [
    `CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`,
    `CREATE TYPE roleEnum AS ENUM ('user', 'author','admin')`,

`    CREATE TABLE tag(
        _id uuid DEFAULT uuid_generate_v4 (),
        name VARCHAR(50) UNIQUE NOT NULL,
        description VARCHAR(750) ,
        color VARCHAR(10),
        created_at TIMESTAMP NOT NULL,
        PRIMARY KEY (_id)

    )`,

    `CREATE TABLE file(
        _id uuid DEFAULT uuid_generate_v4 (),
        file_link VARCHAR(300) NOT NULL,
        s3_key VARCHAR(100) NOT NULL,
        original_name VARCHAR(50) NOT NULL,
        extention VARCHAR(5) NOT NULL,
        created_at TIMESTAMP NOT NULL,
        PRIMARY KEY (_id)
        )`,

     
`
            CREATE TABLE post(
                _id uuid DEFAULT uuid_generate_v4(),
                title VARCHAR(150)  NOT NULL,
                slug VARCHAR(150) UNIQUE NOT NULL,
                md VARCHAR(10000) NOT NULL,
                tags uuid[],
                author uuid REFERENCES account(_id),
                created_at TIMESTAMP NOT NULL,
                PRIMARY KEY (_id)
                )
            
            `,

            `
            CREATE TABLE post_tag(
                _id uuid DEFAULT uuid_generate_v4(),
                post uuid REFERENCES post(_id),
      			tag uuid  REFERENCES tag(_id),
                PRIMARY KEY (_id)
                )
            `
            ,
            `CREATE INDEX slug ON post(slug);`
            `
            CREATE TABLE account(
                _id uuid DEFAULT uuid_generate_v4 (),
                first_name VARCHAR(30) NOT NULL,
                last_name VARCHAR(30) NOT NULL,
                email VARCHAR(255) UNIQUE NOT NULL,
                phone_number VARCHAR(64) UNIQUE NOT NULL, 
                password VARCHAR(255) NOT NULL,
                profile_image uuid REFERENCES file(_id),
                about VARCHAR(800),
                role roleEnum NOT NULL,
                confirmed boolean DEFAULT false,
                reset_password_token  VARCHAR(6),
                reset_password_expires TIMESTAMP,
                created_at TIMESTAMP,
                PRIMARY KEY (_id)
                )
                
            `,
            `CREATE INDEX email ON account(email)`,
            `CREATE INDEX phone_number ON account(phone_number)`,
            `CREATE INDEX reset_password_token ON account(reset_password_token)`


    ]}