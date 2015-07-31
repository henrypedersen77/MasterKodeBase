using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
/// Summary description for ProductTypeTypeModel
/// </summary>
namespace Database.Models
{
    public class ProductTypeFacade
    {
        private garageMVCEntities db;

        public ProductTypeFacade()
        {
            db = new garageMVCEntities();
        }

        public ProductTypeFacade(garageMVCEntities theDB)
        {
            db = theDB;
        }

        public List<ProductType> Get()
        {
            try
            {
                List<ProductType> producttypes = (from x in db.ProductTypes select x).ToList();

                return producttypes;
            }
            catch (Exception)
            {
                return null;
            }
        }

        public ProductType Get(int id)
        {
            try
            {
                ProductType producttype = db.ProductTypes.Find(id);

                return producttype;
            }
            catch (Exception)
            {
                return null;
            }
        }

        public void Insert(ProductType productType)
        {
            db.ProductTypes.Add(productType);
            db.SaveChanges();
        }

        public void Update(ProductType productType)
        {
            //Fetch object from db
            ProductType p = db.ProductTypes.Find(productType.ID);

            p.Name = productType.Name;

            db.SaveChanges();
        }

        public void Delete(int id)
        {  
            ProductType productType = db.ProductTypes.Find(id);

            db.ProductTypes.Attach(productType);
            db.ProductTypes.Remove(productType);
            db.SaveChanges();
        }
    }
}