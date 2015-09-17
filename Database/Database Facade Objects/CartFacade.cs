using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;

namespace Database
{
    public class CartFacade
    {
        private garageMVCEntities db;

        public CartFacade()
        {
            db = new garageMVCEntities();
        }

        public CartFacade(garageMVCEntities theDB)
        {
            db = theDB;
        }

        public void Insert(Cart cart)
        {
            try
            {
                db.Carts.Add(cart);
                db.SaveChanges();
            }
            catch (Exception e)
            {

            }
        }

        public void Update(Cart cart)
        {
            Cart p = db.Carts.Find(cart.ID);

            p.DatePurchased = cart.DatePurchased;
            p.ClientID = cart.ClientID;
            p.Amount = cart.Amount;
            p.IsInCart = cart.IsInCart;
            p.ProductID = cart.ProductID;

            db.SaveChanges();
        }

        public void Delete(int id)
        {
            Cart cart = db.Carts.Find(id);

            db.Carts.Attach(cart);
            db.Carts.Remove(cart);
            db.SaveChanges();
        }

        public Cart Get(int id)
        {
            try
            {
                Cart c = db.Carts.Find(id);
                return c;
            }
            catch(Exception e)
            {
                return null;
            }
        }

        public List<Cart> GetOrdersInCart(string clientId)
        {
            List<Cart> orders = (from x in db.Carts
                                 where x.ClientID == clientId
                                 && x.IsInCart
                                 orderby x.DatePurchased descending
                                 select x).ToList();
            return orders;
        }

        public int GetAmountOfOrders(string clientId)
        {
            try
            {
                int amount = (from x in db.Carts
                              where x.ClientID == clientId
                              && x.IsInCart
                              select x.Amount).Sum();

                return amount;
            }
            catch
            {
                return 0;
            }
        }

        public void UpdateQuantity(int id, int quantity)
        {
            Cart p = db.Carts.Find(id);
            p.Amount = quantity;

            db.SaveChanges();
        }

        public void MarkOrdersAsPaid(List<Cart> carts)
        {
            if (carts != null)
            {
                foreach (Cart cart in carts)
                {
                    Cart oldCart = db.Carts.Find(cart.ID);
                    oldCart.DatePurchased = DateTime.Now;
                    oldCart.IsInCart = false;
                }
                db.SaveChanges();
            }
        }
    }
}