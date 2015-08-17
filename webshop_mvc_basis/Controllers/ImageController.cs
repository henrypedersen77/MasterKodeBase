using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace webshop_mvc_basis.Controllers
{
    public class ImageController : ApiController
    {
        public List<string> Get()
        {
            string[] images = Directory.GetFiles(System.Web.Hosting.HostingEnvironment.MapPath("~/Content/Images/Products"));
            List<string> FileNames = new List<string>();
            foreach(string i in images)
            {
                FileNames.Add(i.Substring(i.LastIndexOf(@"\")+1));
            }

            return FileNames;
        }
    }
}
