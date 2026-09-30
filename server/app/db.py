import sqlite3
import time
from pathlib import Path


CAMERAS = [
    (1, 'Main Entrance', 'First Floor', 1, 'entrance.mp4', '1920x1080', 30),
    (2, 'Garage', 'Outside', 0, 'garage.mp4', '1920x1080', 25),
    (3, 'Backyard', 'Outside', 0, 'entrance.mp4', '2560x1440', 30),
    (4, 'Corridor', 'Second Floor', 0, 'entrance.mp4', '1280x720', 20),
    (5, 'Living Room', 'First Floor', 1, 'garage.mp4', '1920x1080', 30),
    (6, 'Kitchen', 'First Floor', 0, 'garage.mp4', '1920x1080', 25),
]


def get_db_connection(database_path: str) -> sqlite3.Connection:
    connection = sqlite3.connect(database_path)
    connection.row_factory = sqlite3.Row
    return connection


def initialize_database(database_path: str) -> None:
    Path(database_path).parent.mkdir(parents=True, exist_ok=True)
    with get_db_connection(database_path) as connection:
        connection.execute(
            '''CREATE TABLE IF NOT EXISTS cameras (
                id INTEGER PRIMARY KEY,
                name TEXT NOT NULL,
                location TEXT NOT NULL,
                has_alert INTEGER NOT NULL DEFAULT 0,
                video_file TEXT NOT NULL,
                resolution TEXT NOT NULL,
                fps INTEGER NOT NULL
            )'''
        )
        connection.execute(
            '''CREATE TABLE IF NOT EXISTS playback_state (
                id INTEGER PRIMARY KEY CHECK (id = 1),
                started_at REAL NOT NULL
            )'''
        )
        connection.executemany(
            '''INSERT OR IGNORE INTO cameras
                (id, name, location, has_alert, video_file, resolution, fps)
                VALUES (?, ?, ?, ?, ?, ?, ?)''',
            CAMERAS,
        )
        connection.execute(
            'INSERT OR IGNORE INTO playback_state (id, started_at) VALUES (1, ?)',
            (time.time(),),
        )