using System;
using System.Collections.Generic;
using System.Linq;

namespace Database.Models
{
    public class ProductFacade
    {
        private garageMVCEntities db;

        public ProductFacade()
        {
            db = new garageMVCEntities();
        }

        public ProductFacade(garageMVCEntities theDB)
        {
            db = theDB;
        }

        public void Insert(Product product)
        {  
            db.Products.Add(product);
            db.SaveChanges();      
        }

        public void Update(Product product)
        {
            //Fetch object from db
            Product p = db.Products.Find(product.ID);

            p.Name = product.Name;
            p.Price = product.Price;
            p.TypeID = product.TypeID;
            p.Description = product.Description;
            p.Image = product.Image;

            db.SaveChanges();
        }

        public void Delete(int id)
        {
            Product product = db.Products.Find(id);

            db.Products.Attach(product);
            db.Products.Remove(product);
            db.SaveChanges();
        }

        public Product Get(int id)
        {
            try
            {
                Product product = db.Products.Find(id);
                return product;   
            }
            catch (Exception)
            {
                return null;
            }
        }

        public  List<Product> GetAll()
        {
            try
            {
                List<Product> products = (from x in db.Products select x).ToList();

                return products;
            }
            catch (Exception)
            {
                return null;
            }
        }

        public List<Product> GetProductsByType(int typeId)
        {
            List<Product> products = (from x in db.Products
                                        where x.TypeID == typeId
                                        select x).ToList();
            return products;
        }
    }
}