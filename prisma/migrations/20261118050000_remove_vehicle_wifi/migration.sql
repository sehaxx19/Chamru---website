-- Data-only migration: remove "Free Wi-Fi" from the vehicle's feature list
-- (the vehicle doesn't actually offer Wi-Fi).
UPDATE "Vehicle" SET "features" = array_remove("features", 'Free Wi-Fi');
