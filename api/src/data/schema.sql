-- Create furnitures table
CREATE TABLE IF NOT EXISTS furnitures (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    phone VARCHAR(10) NOT NULL,
    contact_method VARCHAR(20),
    purpose VARCHAR(20),
    category VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
