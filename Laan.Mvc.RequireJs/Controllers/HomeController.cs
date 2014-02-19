using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Laan.Mvc.RequireJs.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            ViewBag.Message = "Welcome to ASP.NET MVC!";

            return View();
        }

        public ActionResult About()
        {
            return View();
        }

        private int FibonacciOf(int n)
        {
            int a = 0;
            int b = 1;

            for (int i = 0; i < n; i++)
            {
                int temp = a;
                a = b;
                b = temp + b;
            }
            return a;
        }

        public JsonResult GetFibonacci()
        {
            int value = Int32.Parse(Request.QueryString["number"]);

            var series = Enumerable
                .Range(1, value)
                .Select(n => FibonacciOf(n))
                .ToList();

            return new JsonResult { Data = series, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
        }
    }
}
