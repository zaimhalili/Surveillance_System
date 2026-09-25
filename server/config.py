import os


def load_dotenv():
    """Load variables from a local .env file without requiring python-dotenv."""
    env_path = os.path.join(os.path.dirname(__file__), '.env')
    if not os.path.exists(env_path):
        return

    with open(env_path, encoding='utf-8') as env_file:
        for line in env_file:
            line = line.strip()
            if not line or line.startswith('#') or '=' not in line:
                continue
            key, value = line.split('=', 1)
            os.environ.setdefault(key.strip(), value.strip().strip('"\''))


load_dotenv()

class Config:
    SECRET_KEY = os.getenv('SECRET_KEY', 'default-secret-key')
    ORACLE_USER = os.getenv('ORACLE_USER', 'admin')
    ORACLE_PASSWORD = os.getenv('ORACLE_PASSWORD', 'password')
    ORACLE_DSN = os.getenv('ORACLE_DSN', 'localhost:1521/XEPDB1')
