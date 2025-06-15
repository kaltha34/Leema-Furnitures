-- Create furnitures table
CREATE TABLE IF NOT EXISTS furnitures (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    phone VARCHAR(15) NOT NULL,
    contact_method VARCHAR(100) NOT NULL,
    purpose VARCHAR(100) NOT NULL,
    category VARCHAR(100) NOT NULL,
    delivery_location VARCHAR(255) DEFAULT NULL,
    branch VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
