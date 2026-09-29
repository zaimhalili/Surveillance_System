from flask import Blueprint, Response, jsonify, request
from app.camera import VideoCamera
from app.db import log_event  # Optional: log when stream starts

main_bp = Blueprint('main', __name__)
camera = None

def get_camera():
    global camera
    if camera is None:
        camera = VideoCamera("assets/video/sample_cctv.mp4")
    return camera

def generate_frames(cam):
    while True:
        frame = cam.get_frame()
        if frame is not None:
            yield (b'--frame\r\n'
                   b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')

@main_bp.route('/api/video_feed')
def video_feed():
    return Response(
        generate_frames(get_camera()),
        mimetype='multipart/x-mixed-replace; boundary=frame'
    )

@main_bp.route('/api/cameras', methods=['GET'])
def get_cameras():
    # Mock or DB query returning camera status for your grid
    cameras = [
        {"id": "cam-1", "name": "Main Entrance", "location": "First Floor", "status": "online"},
        {"id": "cam-2", "name": "Garage", "location": "Outside", "status": "online"},
        {"id": "cam-3", "name": "Backyard", "location": "Outside", "status": "online"},
        {"id": "cam-4", "name": "Corridor", "location": "Second Floor", "status": "offline"},
        {"id": "cam-5", "name": "Living Room", "location": "First Floor", "status": "online"},
        {"id": "cam-6", "name": "Kitchen", "location": "First Floor", "status": "online"},
    ]
    return jsonify(cameras)