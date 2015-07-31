using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

using Database;
using Database.Models;

namespace webshop_mvc_basis.Controllers
{
    public class ProductTypeController : ApiController
    {
        private Database.garageMVCEntities db;

        public ProductTypeController()
        {
            db = new garageMVCEntities();
        }

        // GET: api/ProductType
        public List<ProductType> Get()
        {
            ProductTypeFacade facade = new ProductTypeFacade(db);
            List<ProductType> AllProductTypes = facade.Get();

            return AllProductTypes;
        }

        // GET: api/ProductType/5
        public ProductType Get(int id)
        {
            ProductTypeFacade facade = new ProductTypeFacade(db);
            return facade.Get(id);
        }

        // POST: api/ProductType
        [HttpPost]
        public void Post([FromBody]ProductType producttype)
        {
            ProductTypeFacade facade = new ProductTypeFacade(db);
            if (facade.Get(producttype.ID) == null)
            {
                facade.Insert(producttype);
            }
            else
            {
                facade.Update(producttype);
            }
        }

        // DELETE: api/ProductType/5
        public void Delete(int id)
        {
            ProductTypeFacade facade = new ProductTypeFacade(db);
            facade.Delete(id);
        }
    }
}
