export const URL_API = 'http://200.21.7.94/sat';
export const URL_API_SENSORES = `${URL_API}/api/sensor/getSensores`;
export const URL_API_SENSORES_BY_ID = (ID: Number) => URL_API + '/api/sensor/consultarSensorPorTipo/' + ID;
export const URL_API_SENSORES_GET_DATA = (ID: Number) => `${URL_API}/api/dato/getdatossensor/${ID}`;
export const URL_API_TIPOS_SENSORES = URL_API + '/api/tiposensor/getTipoSensores';
export const URL_API_ESTACIONES = URL_API + '/api/estacion/getEstaciones';
export const URL_API_SENSORES_BY_ESTACION = (ID_ESTACION: Number) => `${URL_API}/api/estacion/getsensoresestacion/${ID_ESTACION}`;
export const URL_API_SENSORES_DATOS_BY_ESTACION = (ID_ESTACION: Number) => `${URL_API}/api/dato/getdatosestacion/${ID_ESTACION}`;

export const KEY_SENSORES = 'KEY_SENSORES';
export const KEY_ESTACIONES = 'KEY_ESTACIONES';