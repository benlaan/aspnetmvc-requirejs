using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Laan.Mvc.RequireJs.Extensions
{
    public static class HtmlHelperExtensions
    {
        private static string _ticks;

        static HtmlHelperExtensions()
        {
            _ticks = DateTime.Now.Ticks.ToString();
        }

        public static MvcHtmlString StartJs(this HtmlHelper helper)
        {
            var controller = helper.ViewContext.RouteData.Values["Controller"].ToString();
            var action = helper.ViewContext.RouteData.Values["Action"].ToString();

            var path = HttpContext.Current.Server.MapPath(String.Format(@"~\{0}\App\{1}\{2}.js", ScriptsFolder(helper), controller, action));

            if (File.Exists(path))
            {
                var html = String.Format("App/{0}/{1}", controller, action);

                return new MvcHtmlString(html);
            }

            return null;
        }

        public static MvcHtmlString GetVersion(this HtmlHelper helper)
        {
            string version;
#if DEBUG
            version = _ticks;
#else
            version = System.Reflection.Assembly.GetExecutingAssembly().GetName().Version.ToString();
#endif
            return new MvcHtmlString(version);
        }

        public static string ScriptsFolder(this HtmlHelper helper)
        {
#if DEBUG
            return "Scripts";
#else
            return "Scripts-Built";
#endif
        }
    }
}