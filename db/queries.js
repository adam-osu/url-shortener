const CREATE_TABLE = `
    CREATE TABLE IF NOT EXISTS urls(
        id VARCHAR(128) PRIMARY KEY,
        original_url VARCHAR(2048) NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
`;

module.exports = { CREATE_TABLE };
