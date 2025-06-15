-- -- Create furnitures table
-- CREATE TABLE IF NOT EXISTS furnitures (
--     id SERIAL PRIMARY KEY,
--     name VARCHAR(100) NOT NULL,
--     phone VARCHAR(15) NOT NULL,
--     preferredContactMethod VARCHAR(100) NOT NULL,
--     purposeOfVisit VARCHAR(100) NOT NULL,
--     category VARCHAR(100) NOT NULL,
--     deliveryLocation VARCHAR(255) DEFAULT NULL,
--     branchId VARCHAR(50),
--     timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
-- );

-- Create furnitures table
CREATE TABLE IF NOT EXISTS customers (
    id SERIAL PRIMARY KEY,
    customerId VARCHAR(100) NOT NULL,
    name VARCHAR(100) NOT NULL,
    phoneNumber VARCHAR(15) NOT NULL,
    preferredContactMethod VARCHAR(100) NOT NULL,
    purposeOfVisit VARCHAR(100) NOT NULL,
    interestedCategories JSONB NOT NULL, -- Store array of category objects
    deliveryLocation VARCHAR(255) DEFAULT '',
    branchId VARCHAR(50) DEFAULT 'main-branch',
    timestamp VARCHAR(100)
);