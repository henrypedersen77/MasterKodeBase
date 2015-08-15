using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.Owin.Security;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using webshop_mvc_basis.Model;

namespace webshop_mvc_basis.Controllers
{
    public class LoginController : ApiController
    {
        //Login brugerens detaljer, eller Bad request(400) hvis bruger ikke er logget ind
        public HttpResponseMessage Get()
        {
            HttpResponseMessage response;

            if(HttpContext.Current.User.Identity.IsAuthenticated){
                response = Request.CreateResponse(HttpStatusCode.OK, HttpContext.Current.User);
            } 
            else{
                 response = Request.CreateResponse(HttpStatusCode.BadRequest, "Bruger er ikke logget ind");
            }

            return response;
        }


        //Login funktion
        [HttpPost]
        public HttpResponseMessage Post([FromBody]LoginPassword lp)
        {
            UserStore<IdentityUser> userStore = new UserStore<IdentityUser>();

            userStore.Context.Database.Connection.ConnectionString =
                System.Configuration.ConfigurationManager.
                ConnectionStrings["GarageConnectionString"].ConnectionString;

            UserManager<IdentityUser> manager = new UserManager<IdentityUser>(userStore);

            var user = manager.Find(lp.login, lp.password);

            if (user != null)
            {
                //Call OWIN functionality
                var authenticationManager = HttpContext.Current.GetOwinContext().Authentication;
                var userIdentity = manager.CreateIdentity(user, DefaultAuthenticationTypes.ApplicationCookie);

                //Sign in user
                authenticationManager.SignIn(new AuthenticationProperties
                {
                    IsPersistent = false
                }, userIdentity);

                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, "Bruger er logget ind");
                return response;

            }
            else
            {
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.BadRequest, "Bruger findes ikke i systemet");
                return response;
            }
        }

        //Logout
        [HttpDelete]
        public HttpResponseMessage Delete()
        {
            HttpResponseMessage response; 

            try
            {
                IAuthenticationManager authenticationManager = HttpContext.Current.GetOwinContext().Authentication;
                authenticationManager.SignOut();

                response = Request.CreateResponse(HttpStatusCode.OK, "Bruger er logget ud");
            }
            catch(Exception e)
            {
                response = Request.CreateResponse(HttpStatusCode.BadRequest, e.Message);
            }

            return response;
        }
    }
}
