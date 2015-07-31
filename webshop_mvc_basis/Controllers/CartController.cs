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
    public class CartController : ApiController
    {
        private Database.garageMVCEntities db;

        public CartController()
        {
            db = new Database.garageMVCEntities();
        }

        // POST: api/Cart
        [HttpPost]
        public void Post([FromBody]Cart cart)
        {
            CartFacade facade = new CartFacade(db);
            if (facade.Get(cart.ID) == null)
            {
                facade.Insert(cart);
            }
            else
            {
                facade.Update(cart);
            }
        }

        [HttpPost]
        [Route("api/paid")]
        public void MarkOrdersAsPaid([FromBody]List<Cart> carts)
        {
            CartFacade facade = new CartFacade(db);
            facade.MarkOrdersAsPaid(carts);
        }

        // POST: api/cart/{cartId}/amount {quantity}
        [HttpPost]
        [Route("api/cart/{cartId}/amount")]
        public void Post([FromUri]int cartId, [FromBody]int quantity)
        {
            CartFacade facade = new CartFacade(db);
            facade.UpdateQuantity(cartId, quantity);
        }

        // DELETE: api/Cart/5
        public void Delete(int id)
        {
            CartFacade facade = new CartFacade(db);
            facade.Delete(id);
        }

        // GET: api/cart/{userId}/orders
        [Route("api/cart/{userId}/orders")]
        public List<Cart> GetOrdersInCart(string userId)
        {
            CartFacade facade = new CartFacade(db);
            return facade.GetOrdersInCart(userId);
        }

        // GET: api/cart/{userId}/amount
        [Route("api/cart/{userId}/amount")]
        public int GetAmountOfOrders(string userId)
        {
            CartFacade facade = new CartFacade(db);
            return facade.GetAmountOfOrders(userId);
        }
    }
}
