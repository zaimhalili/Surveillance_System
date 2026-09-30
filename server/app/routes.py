import time
from pathlib import Path

from flask import Blueprint, abort, current_app, jsonify, send_file, url_for
from app.db import get_db_connection

main_bp = Blueprint('main', __name__)

@main_bp.route('/api/cameras', methods=['GET'])
def get_cameras():
    with get_db_connection(current_app.config['DATABASE_PATH']) as connection:
        cameras = connection.execute('SELECT * FROM cameras ORDER BY id').fetchall()

    return jsonify([
        {
            'id': camera['id'],
            'name': camera['name'],
            'location': camera['location'],
            'status': 'online',
            'hasAlert': bool(camera['has_alert']),
            'imgSrc': '',
            'resolution': camera['resolution'],
            'fps': str(camera['fps']),
            'videoUrl': url_for('main.camera_video', camera_id=camera['id']),
        }
        for camera in cameras
    ])


@main_bp.route('/api/cameras/<int:camera_id>/video', methods=['GET'])
def camera_video(camera_id: int):
    with get_db_connection(current_app.config['DATABASE_PATH']) as connection:
        camera = connection.execute(
            'SELECT video_file FROM cameras WHERE id = ?', (camera_id,)
        ).fetchone()

    if camera is None:
        abort(404)

    video_path = Path(current_app.config['VIDEO_DIRECTORY']) / camera['video_file']
    if not video_path.is_file():
        abort(404, description='Camera recording is not available')

    return send_file(video_path, mimetype='video/mp4', conditional=True)


@main_bp.route('/api/sync-time', methods=['GET'])
def get_sync_time():
    with get_db_connection(current_app.config['DATABASE_PATH']) as connection:
        state = connection.execute(
            'SELECT started_at FROM playback_state WHERE id = 1'
        ).fetchone()

    return jsonify({'playbackOffset': max(0, time.time() - state['started_at'])})