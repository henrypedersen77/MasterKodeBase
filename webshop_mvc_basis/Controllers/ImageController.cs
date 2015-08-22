using System;
using System.Collections.Generic;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
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

        //Returnere Produkt billedet råt, skal måske måske ikke bruges?
        public HttpResponseMessage Post([FromBody]string billedeNavn){
            Image image = Image.FromFile(System.Web.Hosting.HostingEnvironment.MapPath("~/Content/Images/Products/") + billedeNavn);
           
            MemoryStream memoryStream = new MemoryStream();
            
            image.Save(memoryStream, System.Drawing.Imaging.ImageFormat.Jpeg);
            HttpResponseMessage result = new HttpResponseMessage(HttpStatusCode.OK);

            result.Content = new ByteArrayContent(memoryStream.ToArray());

            result.Content.Headers.ContentType = new MediaTypeHeaderValue("image/jpeg");
            result.StatusCode = HttpStatusCode.OK;

            return result;
        }
    }
}
