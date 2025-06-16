-- Create furnitures table
CREATE TABLE IF NOT EXISTS customers (
    id VARCHAR(50) PRIMARY KEY DEFAULT (
        LOWER(
          SUBSTRING(CAST(FLOOR(EXTRACT(EPOCH FROM NOW()) * 1000) AS TEXT) || 
          LPAD(FLOOR(RANDOM() * 100000000)::TEXT, 8, '0')
          FROM 3)
        )
      ),
    name VARCHAR(100) NOT NULL,
    phone VARCHAR(15) NOT NULL,
    preferredContactMethod VARCHAR(100) NOT NULL,
    purposeOfVisit VARCHAR(100) NOT NULL,
    category VARCHAR(100) NOT NULL,
    deliveryLocation VARCHAR(255) DEFAULT NULL,
    branchId VARCHAR(50),
    timestamp BIGINT,
    interestedCategories JSONB NOT NULL, 
);