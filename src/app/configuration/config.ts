export default {   
   message: localStorage.getItem('language')
};

export interface Componente {
   icon: string;
   name: string;
   redirectTo: string;
};

export interface Mensaje {
   user: string;
   password: string;    
};  