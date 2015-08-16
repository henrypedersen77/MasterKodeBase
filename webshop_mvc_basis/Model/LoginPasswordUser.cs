using Database;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace webshop_mvc_basis.Model
{
    public class LoginPasswordUser
    {
        public string login { get; set; }
        public string password { get; set; }

        public UserDetail user { get; set; }
    }
}