import {Notyf} from 'notyf';
import 'notyf/notyf.min.css';

export function notifyError(msg) {
   const notyf = new Notyf({
      types: [
         {
            type: "error",
            backgroundColor: "#E24133",
            icon: {
               className: 'notify-icon-img',
               tagName: 'div'
               // text: 'BRAND STORE'
            }
         }
      ]
   });

   notyf.open({
      type: "error",
      message: msg
   });
}

export function notifySuccess(msg) {
   const notyf = new Notyf({
      types: [
         {
            type: "success",
            backgroundColor: "#5BC55F",
            icon: {
               className: 'notify-icon-img',
               tagName: 'div'
               // text: 'BRAND STORE'
            }
         }
      ]
   });

   notyf.open({
      type: "success",
      message: msg
   });
}


export function notifyWarn(msg) {
   const notyf = new Notyf({
      types: [
         {
            type: "warning",
            backgroundColor: "orange",
            icon: {
               className: 'notify-icon-img',
               tagName: 'div'
               // text: 'BRAND STORE'
            }
         }
      ]
   });

   notyf.open({
      type: "warning",
      message: msg
   });
}
