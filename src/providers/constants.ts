export const URL_API = 'http://200.21.7.94/sat';
export const URL_API_SENSORES = `${URL_API}/api/sensor/getSensores`;
export const URL_API_SENSORES_BY_ID = (ID: Number) => URL_API + '/api/sensor/consultarSensorPorTipo/' + ID;
export const URL_API_TIPOS_SENSORES = URL_API + '/api/tiposensor/getTipoSensores';
export const URL_API_ESTACIONES = URL_API + '/api/estacion/getEstaciones';