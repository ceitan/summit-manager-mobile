using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;

namespace EventManager.Helpers
{
    public enum ErrorNumber
    {
        NO_INTERNET_CONECTION = 53,
        NO_ERROR = 0,
        EMAIL_NO_TOADRESS = 1000,
        EMAIL_NOT_SEND = 1001,
        NO_PERMISSION = 50000, // Mobile app 
	BAD_CODE = 50001, // Mobile app 
        LOGIN_FAILED = 50002,
        NO_USER_REGISTERED = 50003,
        NO_USERNAME = 50004,
        NO_PASSWORD = 50005,
        USED_CODE = 50010,
        NO_PERSON_NAME = 57000,
        NO_PERSON_SURNAME = 57001,
        NO_PERSON_LASTNAME = 57002,
        NO_PERSON_PHONE = 57003,
        NO_PERSON_EMAIL = 57004,
        NO_PERSON_COMPANY = 57005,
        NO_PERSON_JOB = 57006,
        NO_PERSON_SEX = 57007,
        NO_PERSON_JOB_CATEGORY = 57008,
        NO_PERSON_INDUSTRY = 57009,
        NO_PERSON_COUNTRY = 57010,
        NO_PERSON_ID = 57011,
        NO_PERSON_AGE = 57012,
        PERSON_NOT_EXIST = 57500,
        PERSON_EMAIL_ALREADY = 57501,
        NO_EVENT = 58000,
        NO_PARTNER_NAME = 58001,
        NO_CATEGORY_NAME = 58002,
        NO_CONTACT_NAME = 58003,
        NO_CONTACT_EMAIL = 58004,
        NO_CONTACT_PHONE = 58005,
        NO_EVENT_NAME = 58006,
        NO_EVENT_DATE = 58007,
        EVENT_CREATE_FAIL = 58008,
        NO_EVENT_TIME = 58009,

        PARTNER_ALREADY_EVENT = 59000,
        PARTNER_NOT_EXIST = 59001,
        NO_INVITATION_LEFT = 59002,
        INVITATION_ALREADY = 59004,
        NO_STAFF_LEFT = 59003,
        INVITATION_ERROR = 59005,
        INVITATION_TRY_AGAIN = 59006,
        VISIT_ALREADY = 59101, // Mobile app 
        NO_EVENTMANAGER = 59500,
        MAX_EVENTS_REACHED = 59501,
        CODE_ALREADY_USED = 60010,
        INVITATION_REJECTED = 60011,
        INVITATION_EXPIRED = 60012
    }

    public class ErrorHelper
    {
        static internal string getErrorMessage(ErrorNumber errorNumber)
        {
            switch (errorNumber)
            {

                #region USER DATA
                case ErrorNumber.BAD_CODE:
                    return ("El codigo es invalido");
                case ErrorNumber.NO_USERNAME:
                    return ("Por favor ingrese el usuario");
                case ErrorNumber.NO_PASSWORD:
                    return ("Por favor ingrese la contraseña");
                case ErrorNumber.LOGIN_FAILED:
                    return ("El usuario o clave son incorrectos");
                case ErrorNumber.NO_USER_REGISTERED:
                    return ("El usuario no se encuentra registrado");
                #endregion

                #region EVENT
                case ErrorNumber.NO_EVENTMANAGER:
                    return ("No existe la cuenta asociada");
                case ErrorNumber.NO_EVENT:
                    return ("No existe el evento");
                case ErrorNumber.NO_EVENT_NAME:
                    return ("El campo de nombre es obligatorio");
                case ErrorNumber.NO_EVENT_DATE:
                    return ("El campo de fecha es obligatorio");
                case ErrorNumber.MAX_EVENTS_REACHED:
                    return ("Se ha alcanzado el numero de eventos permitido");
                case ErrorNumber.EVENT_CREATE_FAIL:
                    return ("No fue posible crear el evento");
                case ErrorNumber.NO_EVENT_TIME:
                    return ("El campo de hora es obligatorio");

                #endregion

                #region PARTNER
                case ErrorNumber.PARTNER_ALREADY_EVENT:
                    return ("El patrocinador ya se encuentra en el evento");

                case ErrorNumber.NO_PARTNER_NAME:
                    return ("Por favor ingrese un nombre de patrocinador");
                case ErrorNumber.NO_CATEGORY_NAME:
                    return ("Por favor ingrese una categoría");
                case ErrorNumber.NO_CONTACT_NAME:
                    return ("Por favor ingrese un nombre de contacto");
                case ErrorNumber.NO_CONTACT_EMAIL:
                    return ("Por favor ingrese una direccion de correo valida");
                case ErrorNumber.NO_CONTACT_PHONE:
                    return ("Por favor ingrese un numero de correo valida");
                case ErrorNumber.PARTNER_NOT_EXIST:
                    return ("El patrocinador no se encuentra registrado");

                #endregion

                #region INVITATION
                case ErrorNumber.NO_PERSON_EMAIL:
                    return ("El campo de correo es obligatorio");
                case ErrorNumber.NO_PERSON_NAME:
                    return ("El campo de nombre es obligatorio");
                case ErrorNumber.NO_PERSON_LASTNAME:
                    return ("El campo de apellido es obligatorio");
                case ErrorNumber.NO_PERSON_PHONE:
                    return ("El campo de telefono es obligatorio");
                case ErrorNumber.NO_INVITATION_LEFT:
                    return ("El patrocinador no posee invitaciones");
                case ErrorNumber.NO_STAFF_LEFT:
                    return ("El patrocinador no posee staff Restante");
                case ErrorNumber.INVITATION_ALREADY:
                    return ("La persona ya ha sido invitada al evento");
                case ErrorNumber.NO_PERSON_COMPANY:
                    return ("El campo de empresa es obligatorio");
                case ErrorNumber.NO_PERSON_JOB:
                    return ("El campo de puesto es obligatorio");
                case ErrorNumber.NO_PERSON_SEX:
                    return ("El campo de sexo es obligatorio");
                case ErrorNumber.NO_PERSON_JOB_CATEGORY:
                    return ("El campo de categoria es obligatorio");
                case ErrorNumber.NO_PERSON_INDUSTRY:
                    return ("El campo de industria es obligatorio");
                case ErrorNumber.NO_PERSON_COUNTRY:
                    return ("El campo de pais es obligatorio");
                case ErrorNumber.NO_PERSON_ID:
                    return ("El campo de identificacion es obligatorio");
                case ErrorNumber.NO_PERSON_AGE:
                    return ("El campo de edad es obligatorio");
                case ErrorNumber.PERSON_NOT_EXIST:
                    return ("La persona no se encuentra registrada");
                case ErrorNumber.PERSON_EMAIL_ALREADY:
                    return ("Ya existe una persona con el correo ingresado");
                case ErrorNumber.INVITATION_ERROR:
                    return ("Ha ocurrido un error al crear la invitación");
                case ErrorNumber.INVITATION_TRY_AGAIN:
                    return ("Por favor vuelve a intentarlo");
                case ErrorNumber.CODE_ALREADY_USED:
                    return ("El codigo ya ha sido utilizado");
                case ErrorNumber.INVITATION_REJECTED:
                    return ("La persona rechazo la entrada");
                case ErrorNumber.INVITATION_EXPIRED:
                    return ("La invitación ha expirado");
                #endregion

                #region VISIT
                case ErrorNumber.VISIT_ALREADY:
                    return ("La persona ya ha visitado el stand");
                #endregion
                //Uknow errors
                case ErrorNumber.NO_INTERNET_CONECTION:
                    return ("No hay conexion a internet");
                case ErrorNumber.EMAIL_NO_TOADRESS:
                    return ("No se tiene dirección de envío");

                default:
                    return ("Se ha presentado un error desconocido");
            }
        }

        static internal HttpStatusCodeResult getHttpError(ErrorNumber errorNumber)
        {
            return new HttpStatusCodeResult(HttpStatusCode.BadRequest, getErrorMessage(errorNumber));
        }
    }
}