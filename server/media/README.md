# Camera recordings

The SQLite camera IDs map to these files:

- Camera 1, Main Entrance: `entrance.mp4`
- Camera 2, Garage: `garage.mp4`
- Camera 3, Backyard: `backyard.mp4`

Replace a recording by keeping its filename. The database seed updates metadata by camera ID on server startup, so replacing a file does not require deleting or recreating the SQLite database. Update the mapping in `server/app/db.py` only if a filename or camera assignment changes.

The original clips are served without transcoding. They are provided under the [Pexels free video license](https://www.pexels.com/license/):

- `entrance.mp4`: [Rooftop parking scene](https://www.pexels.com/video/monochrome-urban-rooftop-parking-scene-39745977/)
- `garage.mp4`: [Nighttime garage door](https://www.pexels.com/video/nighttime-garage-door-closing-routine-32078346/)
- `backyard.mp4`: [Suburban street](https://www.pexels.com/video/sunny-suburban-street-view-with-blue-skies-31446558/)