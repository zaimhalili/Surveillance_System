import os
from pathlib import Path

SERVER_DIR = Path(__file__).resolve().parent

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
    DATABASE_PATH = os.getenv('DATABASE_PATH', str(SERVER_DIR / 'data' / 'surveillance.db'))
    VIDEO_DIRECTORY = SERVER_DIR / 'media'
