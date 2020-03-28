/**
 * @fileoverview Archivo que permite enviar las configuraciones 
 * a ser utilizadas por los servicios y componentes del aplicativo. * 
 * @author Juan Sebastian Maya <jumaya19@gmail.com> 
*/

/**
* Propiedad que permite parametrizar los elementos del menu principal
* @type {Class}
*/
export interface Componente {
   icon: string;
   name: string;
   redirectTo: string;
};

/**
* Propiedad donde se parametriza la ruta del aplicativo 
* @type {string}
*/
export default {
   ApiUrl: 'https://api7.cloudframework.io/freeme/mobile',
};
