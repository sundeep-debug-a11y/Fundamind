import psycopg2
from psycopg2.extensions import ISOLATION_LEVEL_AUTOCOMMIT

# Database connection parameters
DB_USER = "postgres"
DB_PASSWORD = "sundeep@2007"
DB_HOST = "localhost"
DB_PORT = "5432"
DB_NAME = "prospera_db"

try:
    # Connect to PostgreSQL server (default postgres database)
    conn = psycopg2.connect(
        user=DB_USER,
        password=DB_PASSWORD,
        host=DB_HOST,
        port=DB_PORT,
        database="postgres"  # Connect to default database first
    )
    conn.set_isolation_level(ISOLATION_LEVEL_AUTOCOMMIT)
    
    cursor = conn.cursor()
    
    # Check if database exists
    cursor.execute(f"SELECT 1 FROM pg_database WHERE datname = '{DB_NAME}'")
    exists = cursor.fetchone()
    
    if exists:
        print(f"✓ Database '{DB_NAME}' already exists!")
    else:
        # Create the database
        cursor.execute(f"CREATE DATABASE {DB_NAME}")
        print(f"✓ Database '{DB_NAME}' created successfully!")
    
    cursor.close()
    conn.close()
    
except psycopg2.Error as e:
    print(f"✗ Error: {e}")
    print("\nPlease check:")
    print("1. PostgreSQL is running")
    print("2. Username and password are correct")
    print("3. PostgreSQL is listening on localhost:5432")
