import type { Alert, Camera } from './types';

export const CAMERAS: Camera[] = [
    { id: 1, name: 'Ingresso principale', location: 'Piano terra', status: 'online', hasAlert: true, imgSrc: 'https://images.unsplash.com/photo-1765766599670-a625d0fef258?w=1200&h=900&fit=crop&auto=format', resolution: '1920×1080', fps: '30', detectionBox: true },
    { id: 2, name: 'Garage', location: 'Esterno', status: 'online', hasAlert: false, imgSrc: 'https://images.unsplash.com/photo-1496368077930-c1e31b4e5b44?w=1200&h=900&fit=crop&auto=format', resolution: '1920×1080', fps: '25' },
    { id: 3, name: 'Giardino', location: 'Esterno', status: 'online', hasAlert: false, imgSrc: 'https://images.unsplash.com/photo-1582903032034-1e3f9c8f6bb9?w=1200&h=900&fit=crop&auto=format', resolution: '2560×1440', fps: '30' },
    { id: 4, name: 'Corridoio', location: 'Piano 1', status: 'offline', hasAlert: false, imgSrc: '', resolution: '1280×720', fps: '20' },
    { id: 5, name: 'Salotto', location: 'Piano terra', status: 'online', hasAlert: true, imgSrc: 'https://images.unsplash.com/photo-1786455588540-a3a5238c7924?w=1200&h=900&fit=crop&auto=format', resolution: '1920×1080', fps: '30', detectionBox: true },
    { id: 6, name: 'Cucina', location: 'Piano terra', status: 'online', hasAlert: false, imgSrc: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?w=1200&h=900&fit=crop&auto=format', resolution: '1920×1080', fps: '25' },
];

export const ALERTS: Alert[] = [
    { id: 1, cam: 'Ingresso principale', time: '14:32', msg: 'Persona rilevata' },
    { id: 2, cam: 'Salotto', time: '14:18', msg: 'Persona rilevata' },
    { id: 3, cam: 'Giardino', time: '13:54', msg: 'Movimento rilevato' },
    { id: 4, cam: 'Ingresso principale', time: '13:20', msg: 'Persona rilevata' },
];
