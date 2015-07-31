using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

using Database;
using Database.Models;

namespace webshop_mvc_basis.Controllers
{
    public class HomeController : Controller
    {
        // GET: Index
        public ActionResult Index()
        {
            //ProductModel pm = new ProductModel(new garageMVCEntities());
            //List<Product> AllProducts = pm.GetAllProducts();
            List<Product> AllProducts = (new ProductController()).Get();

            return View(AllProducts);
        }

        public ActionResult About()
        {
            return View();
        }

        public ActionResult Product(int id)
        {
            //ProductFacade pm = new ProductFacade(new garageMVCEntities());
            //Product p = pm.GetProduct(id);

            Product p = (new ProductController()).Get(id);
            return View(p);
        }

        [HttpPost]
        public ActionResult btnAdd_Click(string quantity, string productID)
        {
            return View();
        }
    }
}