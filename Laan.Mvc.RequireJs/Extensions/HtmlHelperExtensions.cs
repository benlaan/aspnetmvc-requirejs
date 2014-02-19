using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;

namespace Laan.Mvc.RequireJs.Extensions
{
    public static class HtmlHelperExtensions
    {
        public static MvcHtmlString RequireJs(this HtmlHelper helper)
        {
            var controller = helper.ViewContext.RouteData.Values["Controller"].ToString();
            var action = helper.ViewContext.RouteData.Values["Action"].ToString();

            return new MvcHtmlString(String.Format(@"<script>require([""{0}/{1}""]);</script>", controller, action));
        }
    }
}