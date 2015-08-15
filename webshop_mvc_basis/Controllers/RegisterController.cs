using Database;
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
    public class RegisterController : ApiController
    {
        //Registrere en ny bruger, + efterfølgende login
        [HttpPost]
        public HttpResponseMessage Post([FromBody]LoginPassword user)
        {
            //UserDetail user, 

            // Default UserStore constructor uses the default connection string named: DefaultConnection
            var userStore = new UserStore<IdentityUser>();

            //Set ConnectionString to GarageConnectionString
            userStore.Context.Database.Connection.ConnectionString =
                System.Configuration.ConfigurationManager.ConnectionStrings["GarageConnectionString"].ConnectionString;
            var manager = new UserManager<IdentityUser>(userStore);

            //Create new user and try to store in DB.
            var iUser = new IdentityUser { UserName = user.login };

            IdentityResult result = manager.Create(iUser, user.password);
            if (result.Succeeded)
            {
                //UserDetail userDetail = new UserDetail
                //{
                //    Address = txtAddress.Text,
                //    FirstName = txtFirstName.Text,
                //    LastName = txtLastName.Text,
                //    Guid = user.Id,
                //    PostalCode = Convert.ToInt32(txtPostalCode.Text)
                //};

                //UserDetailModel model = new UserDetailModel();
                //model.InsertUserDetail(userDetail);

                //Store user in DB
                var authenticationManager = HttpContext.Current.GetOwinContext().Authentication;
                var userIdentity = manager.CreateIdentity(iUser, DefaultAuthenticationTypes.ApplicationCookie);

                //If succeedeed, log in the new user and set the cookie
                authenticationManager.SignIn(new AuthenticationProperties(), userIdentity);

                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, "Bruger er registreret");
                return response;
            }
            else
            {
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.BadRequest, result.Errors.ToString());
                return response;
            }
        }
    }
}
