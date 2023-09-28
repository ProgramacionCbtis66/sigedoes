 
import { HttpHeaders } from '@angular/common/http';
export const environment = {
  production: true,
  //HTTPS : "https://backendconstancias.herokuapp.com",
  HTTPS: "http://localhost:8000",
  autorization: {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'authorization': 'Bearer ' + localStorage.getItem('color')
    })
  },
  proyecto:"Sistema para la emisión de Constancias de EstudiosSistema para la emisión de Constancias de Estudios",
};
