module.exports = async () => {
  const tables = [
    `CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`,
    `CREATE TYPE roleEnum AS ENUM ('user', 'author','admin')`,
    `CREATE TYPE accountTypeEnum AS ENUM ('registred', 'google',  'facebook', 'linkedin')`

    `    CREATE TABLE tag(
        _id uuid DEFAULT uuid_generate_v4 (),
        name VARCHAR(50) UNIQUE NOT NULL,
        description VARCHAR(750) ,
        color VARCHAR(10) UNIQUE NOT NULL,,
        created_at TIMESTAMP NOT NULL,
        PRIMARY KEY (_id)

    )`,

    `CREATE TABLE file(
        _id uuid DEFAULT uuid_generate_v4 (),
        file_link VARCHAR(400) NOT NULL,
        s3_key VARCHAR(100) NOT NULL,
        original_name VARCHAR(50) NOT NULL,
        extention VARCHAR(5) NOT NULL,
        created_at TIMESTAMP NOT NULL,
        PRIMARY KEY (_id)
        )`,
    `
        CREATE TABLE account(
            _id uuid DEFAULT uuid_generate_v4 (),
            first_name VARCHAR(30) NOT NULL,
            last_name VARCHAR(30) NOT NULL,
            email VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL,
	  		role roleEnum NOT NULL,
	  		profile_image_link VARCHAR(400),
			profile_image_s3_key VARCHAR(100),
            bio VARCHAR(1000),
            confirmed boolean DEFAULT false,
            reset_password_token  VARCHAR(6),
            reset_password_expires TIMESTAMP,
            created_at TIMESTAMP,
            PRIMARY KEY (_id)
            )
            
        `,
    `CREATE INDEX email ON account(email)`,
    `CREATE INDEX reset_password_token ON account(reset_password_token)`,

    `
            CREATE TABLE post(
                _id uuid DEFAULT uuid_generate_v4(),
                author uuid REFERENCES account(_id),
                title VARCHAR(150)  NOT NULL,
                slug VARCHAR(150) UNIQUE NOT NULL,
                excerpt VARCHAR(800),
                cover_image_link VARCHAR(400),
                cover_image_s3_key VARCHAR(100),
                tags uuid[],
                md VARCHAR(10000) NOT NULL,
                love_count integer,
                share_count integer,
                count_minutes_read integer,
                published boolean DEFAULT false,
                created_at TIMESTAMP NOT NULL,
                PRIMARY KEY (_id)
                )
            `,
    ,
    `CREATE INDEX slug ON post(slug);`,
    `
            CREATE TABLE post_tag(
                _id uuid DEFAULT uuid_generate_v4(),
                post uuid REFERENCES post(_id),
      			tag uuid  REFERENCES tag(_id),
                PRIMARY KEY (_id)
                )
            `,
    `
            create table social_link(
                _id uuid DEFAULT uuid_generate_v4 (),
                author uuid REFERENCES account(_id),
                name VARCHAR(50) NOT NULL,
                link VARCHAR(600) NOT NULL,
                PRIMARY KEY (_id)
            )`,

    `   CREATE TABLE saved_post(
        _id uuid DEFAULT uuid_generate_v4 (),
	    post_id uuid REFERENCES post(_id),
        account_id uuid REFERENCES account(_id),
        created_at TIMESTAMP NOT NULL,
        PRIMARY KEY (_id)
        )
		`,
  ];
};
