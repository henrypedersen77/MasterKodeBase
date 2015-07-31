using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

using Database;
using Database.Models;

namespace webshop_mvc_basis.Controllers
{
    public class ProductController : ApiController
    {
        private Database.garageMVCEntities db;

        public ProductController()
        {
            db = new garageMVCEntities();
        }

        // GET: api/Product
        public List<Product> Get()
        {
            ProductFacade facade = new ProductFacade(db);
            List<Product> AllProducts = facade.GetAll();

            return AllProducts;
        }

        // GET: api/Product/5
        public Product Get(int id)
        {
            ProductFacade facade = new ProductFacade(db);
            return facade.Get(id);
        }

        // POST: api/Product
        [HttpPost]
        public void Post([FromBody]Product product)
        {
            ProductFacade facade = new ProductFacade(db);
            if (facade.Get(product.ID) == null)
            {
                facade.Insert(product);
            }
            else
            {
                facade.Update(product);
            }
        }

        // DELETE: api/Product/5
        public void Delete(int id)
        {
            ProductFacade facade = new ProductFacade(db);
            facade.Delete(id);
        }

        [Route("api/product/type/{typeId}")]
        public List<Product> GetProductsByType(int typeId)
        {
            ProductFacade facade = new ProductFacade(db);
            return facade.GetProductsByType(typeId);
        }
    }
}
