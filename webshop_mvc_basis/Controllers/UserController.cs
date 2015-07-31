﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

using Database;
using Database.Models;

namespace webshop_mvc_basis.Controllers
{
    public class UserController : ApiController
    {
        private Database.garageMVCEntities db;

        public UserController()
        {
            db = new garageMVCEntities();
        }

        // GET: api/user/{guid}
        public UserDetail Get(string guid)
        {
            UserDetailFacade facade = new UserDetailFacade(db);
            UserDetail user = facade.Get(guid);

            return user;
        }

        // POST: api/user {userdetail}
        [HttpPost]
        public void Post([FromBody]UserDetail user)
        {
            UserDetailFacade facade = new UserDetailFacade(db);
            if (facade.Get(user.Guid) == null)
            {
                facade.Insert(user);
            }
            else
            {
                facade.Update(user);
            }
        }
    }
}
