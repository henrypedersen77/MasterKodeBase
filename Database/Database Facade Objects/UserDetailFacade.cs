using System.Linq;

namespace Database.Models
{
    public class UserDetailFacade
    {
        private garageMVCEntities db;

        public UserDetailFacade()
        {
            db = new garageMVCEntities();
        }

        public UserDetailFacade(garageMVCEntities theDB)
        {
            db = theDB;
        }

        public UserDetail Get(string guId)
        {
            var info = (from x in db.UserDetails
                        where x.Guid == guId
                        select x).FirstOrDefault();
            return info;
        }

        public void Insert(UserDetail userDetail)
        {
            db.UserDetails.Add(userDetail);
            db.SaveChanges();
        }

        public void Update(UserDetail userDetail)
        {
            //Fetch object from db
            UserDetail u = db.UserDetails.Find(userDetail.Id);

            u.Address = userDetail.Address;
            u.FirstName = userDetail.FirstName;
            u.LastName = userDetail.LastName;
            u.PostalCode = userDetail.PostalCode;

            db.SaveChanges();
        }
    }
}