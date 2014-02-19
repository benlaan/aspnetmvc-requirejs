using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;

namespace Laan.Mvc.RequireJs.Extensions
{
    public static class HtmlHelperExtensions
    {
        public static MvcHtmlString StartJs(this HtmlHelper helper)
        {
            var controller = helper.ViewContext.RouteData.Values["Controller"].ToString();
            var action = helper.ViewContext.RouteData.Values["Action"].ToString();

            var html = String.Format("App/{0}/{1}", controller, action);

            return new MvcHtmlString(html);
        }

        public static MvcHtmlString GetVersion(this HtmlHelper helper)
        {
            string version;
#if DEBUG
            version = DateTime.Now.Ticks.ToString();
#else
            version = Assembly.GetExecutingAssembly().GetName().Version.ToString();
#endif
            return new MvcHtmlString(version);
        }
    }
}