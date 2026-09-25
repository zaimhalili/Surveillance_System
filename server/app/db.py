import oracledb
from flask import current_app

def get_db_connection():
    connection = oracledb.connect(
            user=current_app.config['ORACLE_USER'],
            password=current_app.config['ORACLE_PASSWORD'],
            dsn=current_app.config['ORACLE_DSN']
    )
    return connection

def log_event(event_type: str, client_ip: str):
    """Esempio di query per inserire un log"""
    try:
        conn = get_db_connection()
        with conn.cursor() as cursor:
            sql = "INSERT INTO access_logs (event_type, client_ip) VALUES (:1, :2)"
            cursor.execute(sql, [event_type, client_ip])
            conn.commit()
        conn.close()
    except Exception as e:
        print(f"Errore Oracle DB: {e}")
    connection = get_db_connection()
    cursor = connection.cursor()
    cursor.execute(
        "INSERT INTO events (event_type, event_data) VALUES (:event_type, :event_data)",
        event_type=event_type,
        event_data=event_data
    )
    connection.commit()
    cursor.close()
    connection.close()