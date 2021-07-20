const CREATE_TABLE = `
    CREATE TABLE IF NOT EXISTS urls(
        id VARCHAR(128) PRIMARY KEY,
        original_url VARCHAR(2048) NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
`;

const CREATE_SHORT_URL = `
    INSERT INTO urls (id, original_url) VALUES (?, ?)
`;

const FIND_SHORT_URL = `
    SELECT original_url FROM urls WHERE id = ?
`;

module.exports = { CREATE_TABLE, CREATE_SHORT_URL, FIND_SHORT_URL };
